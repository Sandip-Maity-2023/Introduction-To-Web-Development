"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
  product: Product;
  progress: MotionValue<number>;
}

const sectionTimings: [number, number, number, number][] = [
  [0, 0.08, 0.18, 0.28],
  [0.2, 0.3, 0.42, 0.54],
  [0.46, 0.56, 0.7, 0.82],
  [0.72, 0.82, 0.94, 1]
];

function OverlayCard({
  title,
  subtitle,
  progress,
  timing
}: {
  title: string;
  subtitle: string;
  progress: MotionValue<number>;
  timing: [number, number, number, number];
}) {
  const opacity = useTransform(progress, timing, [0, 1, 1, 0]);
  const y = useTransform(progress, timing, [60, 0, 0, -50]);

  return (
    <motion.div style={{ opacity, y }} className="absolute left-0 top-1/2 max-w-xl -translate-y-1/2">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-white/70">
        Future of Freshness
      </p>
      <h2 className="text-4xl font-semibold leading-[0.95] text-white sm:text-6xl md:text-7xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 max-w-lg text-base leading-7 text-white/78 sm:text-lg">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}

export function ProductTextOverlays({ product, progress }: ProductTextOverlaysProps) {
  const sections = [product.section1, product.section2, product.section3, product.section4];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <div className="relative h-full w-full">
        {sections.map((section, index) => {
          return (
            <OverlayCard
              key={section.title}
              title={section.title}
              subtitle={section.subtitle}
              progress={progress}
              timing={sectionTimings[index]}
            />
          );
        })}
      </div>
    </div>
  );
}
