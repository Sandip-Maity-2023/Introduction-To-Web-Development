"use client";

import { useEffect, useMemo, useRef } from "react";
import { MotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { Product } from "@/data/products";
import { ProductTextOverlays } from "@/components/ProductTextOverlays";

interface ProductBottleScrollProps {
  product: Product;
}

const TOTAL_FRAMES = 120;

function buildFrameCandidates(folderPath: string, frameNumber: number) {
  const padded = String(frameNumber).padStart(3, "0");

  return [
    `${folderPath}/${frameNumber}.webp`,
    `${folderPath}/${padded}.webp`,
    `${folderPath}/ezgif-frame-${padded}.webp`,
    `${folderPath}/ezgif-frame-${padded}.jpg`,
    `${folderPath}/${frameNumber}.jpg`
  ];
}

function loadFirstAvailableImage(paths: string[]) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let index = 0;

    const tryNext = () => {
      if (index >= paths.length) {
        reject(new Error("No frame source found"));
        return;
      }

      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        index += 1;
        tryNext();
      };
      image.src = paths[index];
    };

    tryNext();
  });
}

function drawContain(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const canvasAspect = canvas.width / canvas.height;
  const imageAspect = image.width / image.height;

  let drawWidth = canvas.width;
  let drawHeight = canvas.height;

  if (imageAspect > canvasAspect) {
    drawHeight = canvas.width / imageAspect;
  } else {
    drawWidth = canvas.height * imageAspect;
  }

  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

export function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const frameRequestRef = useRef<number | null>(null);
  const activeFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const preloadQueue = useMemo(() => Array.from({ length: TOTAL_FRAMES }, (_, index) => index + 1), []);

  useEffect(() => {
    frameCacheRef.current.clear();
    activeFrameRef.current = 0;
  }, [product.id]);

  useEffect(() => {
    let cancelled = false;

    const preloadFrames = async () => {
      await Promise.all(
        preloadQueue.map(async (frameNumber) => {
          try {
            const image = await loadFirstAvailableImage(buildFrameCandidates(product.folderPath, frameNumber));
            if (!cancelled) {
              frameCacheRef.current.set(frameNumber - 1, image);
            }
          } catch {
            // Missing frames are tolerated so flavors can be staged later.
          }
        })
      );
    };

    void preloadFrames();

    return () => {
      cancelled = true;
    };
  }, [preloadQueue, product.folderPath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      const image = frameCacheRef.current.get(index);
      if (!image) return;

      const ratio = window.devicePixelRatio || 1;
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));

      context.setTransform(1, 0, 0, 1, 0, 0);
      drawContain(context, canvas, image);
    };

    const resizeObserver = new ResizeObserver(() => renderFrame(activeFrameRef.current));
    resizeObserver.observe(canvas);

    const primeFirstFrame = async () => {
      try {
        if (!frameCacheRef.current.has(0)) {
          const firstImage = await loadFirstAvailableImage(buildFrameCandidates(product.folderPath, 1));
          frameCacheRef.current.set(0, firstImage);
        }
        renderFrame(0);
      } catch {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    void primeFirstFrame();

    return () => {
      resizeObserver.disconnect();
    };
  }, [product.folderPath]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const nextFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(latest * (TOTAL_FRAMES - 1)));
    activeFrameRef.current = nextFrame;

    if (frameRequestRef.current !== null) {
      cancelAnimationFrame(frameRequestRef.current);
    }

    frameRequestRef.current = requestAnimationFrame(() => {
      const image = frameCacheRef.current.get(nextFrame);
      if (!image) return;
      drawContain(context, canvas, image);
    });
  });

  useEffect(() => {
    return () => {
      if (frameRequestRef.current !== null) {
        cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-90" />
        <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative order-2 h-[54vh] sm:h-[62vh] lg:order-1 lg:h-[76vh]">
            <ProductTextOverlays product={product} progress={scrollYProgress} />
          </div>
          <div className="relative order-1 flex h-[48vh] items-center justify-center sm:h-[58vh] lg:order-2 lg:h-[76vh]">
            <div className="absolute inset-8 rounded-full bg-white/20 blur-3xl" />
            <canvas ref={canvasRef} className="relative h-full w-full max-w-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
