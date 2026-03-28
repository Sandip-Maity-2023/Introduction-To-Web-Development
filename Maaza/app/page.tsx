"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductBottleScroll } from "@/components/ProductBottleScroll";
import { products } from "@/data/products";

const sectionReveal = {
  initial: { opacity: 0, y: 56 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
} as const;

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = useMemo(() => products[currentIndex], [currentIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    document.body.style.setProperty("--product-gradient", product.gradient);
  }, [product.gradient]);

  const nextIndex = (currentIndex + 1) % products.length;

  return (
    <main id="top" className="relative">
      <Navbar />

      <div className="fixed inset-y-0 left-4 z-40 hidden items-center md:flex">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)}
          className="rounded-full border border-white/20 bg-black/20 p-4 backdrop-blur-xl transition hover:bg-black/35"
          aria-label="Previous flavor"
        >
          ←
        </button>
      </div>

      <div className="fixed inset-y-0 right-4 z-40 hidden items-center md:flex">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
          className="rounded-full border border-white/20 bg-black/20 p-4 backdrop-blur-xl transition hover:bg-black/35"
          aria-label="Next flavor"
        >
          →
        </button>
      </div>

      <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-full border border-white/15 bg-black/25 p-2 backdrop-blur-xl">
        {products.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              index === currentIndex ? "bg-white text-black" : "bg-white/8 text-white hover:bg-white/14"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <section id="story" className="relative">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/20 to-transparent" />
            <div className="px-6 pt-28 md:px-10">
              <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.45em] text-white/70">Scrollytelling Drop</p>
                  <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-none sm:text-6xl md:text-8xl">
                    {product.name}
                  </h1>
                </div>
                <p className="max-w-md text-base leading-7 text-white/75 md:text-right">{product.description}</p>
              </div>
            </div>

            <ProductBottleScroll product={product} />
          </section>

          <section id="details" className="px-6 pb-24 md:px-10">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                {...sectionReveal}
                className="glass-panel rounded-[2rem] p-8 text-black shadow-2xl shadow-black/20 md:p-10"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-black/50">
                  Product Details
                </p>
                <h2 className="mt-5 text-4xl font-semibold md:text-5xl">
                  {product.detailsSection.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-black/70">
                  {product.detailsSection.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl bg-black/5 p-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-black/40">{stat.label}</p>
                      <p className="mt-3 text-3xl font-semibold">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...sectionReveal} className="glass-panel rounded-[2rem] p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/58">
                  Freshness System
                </p>
                <h2 className="mt-5 text-4xl font-semibold md:text-5xl">
                  {product.freshnessSection.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-white/76">
                  {product.freshnessSection.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm text-white/86"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="buy-now" className="px-6 pb-24 md:px-10">
            <motion.div
              {...sectionReveal}
              className="mx-auto grid max-w-7xl gap-8 rounded-[2.2rem] border border-white/12 bg-black/20 p-8 backdrop-blur-2xl md:grid-cols-[0.9fr_1.1fr] md:p-10"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/55">Buy Now</p>
                <h2 className="mt-4 text-4xl font-semibold md:text-6xl">{product.buyNowSection.price}</h2>
                <p className="mt-3 text-lg text-white/70">{product.buyNowSection.unit}</p>
                <button className="mt-8 rounded-full bg-white px-7 py-3 text-base font-semibold text-black transition hover:scale-[1.02]">
                  Add to Cart
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">Processing</p>
                  <ul className="mt-5 space-y-3 text-base text-white/85">
                    {product.buyNowSection.processingParams.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">Promise</p>
                  <p className="mt-5 text-base leading-7 text-white/80">
                    {product.buyNowSection.deliveryPromise}
                  </p>
                  <p className="mt-4 text-base leading-7 text-white/65">
                    {product.buyNowSection.returnPolicy}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="px-6 pb-24 md:px-10">
            <motion.button
              type="button"
              onClick={() => setCurrentIndex(nextIndex)}
              {...sectionReveal}
              className="mx-auto block w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/14 bg-black/30 px-8 py-8 text-left backdrop-blur-xl transition hover:bg-black/40"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 48px) 0, 100% 50%, calc(100% - 48px) 100%, 0 100%, 28px 50%)"
              }}
            >
              <p className="text-sm uppercase tracking-[0.45em] text-white/55">Continue Journey</p>
              <div className="mt-4 flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl font-semibold md:text-5xl">{products[nextIndex].name}</h3>
                  <p className="mt-3 text-white/72">{products[nextIndex].subName}</p>
                </div>
                <span className="text-4xl">→</span>
              </div>
            </motion.button>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
