"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

function BananaBolt() {
  return (
    <svg viewBox="0 0 72 72" className="h-10 w-10" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="banana-bolt" x1="6" y1="10" x2="62" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDBA74" />
          <stop offset="0.5" stopColor="#FB7185" />
          <stop offset="1" stopColor="#FDE047" />
        </linearGradient>
      </defs>
      <path
        d="M50 10C38 16 28 27 24 38c-3 8-2 16 7 22 3 2 8 2 12 0-6-1-10-6-10-12 0-12 10-22 22-29-1-4-2-7-5-9Z"
        fill="url(#banana-bolt)"
      />
      <path d="M33 9 20 36h11l-8 27 29-34H39l8-20Z" fill="white" fillOpacity="0.94" />
    </svg>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(9, 9, 11, 0.6)" : "rgba(255,255,255,0.08)",
        borderColor: scrolled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"
      }}
      className="fixed inset-x-4 top-4 z-50 rounded-full border backdrop-blur-xl md:inset-x-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-7">
        <a href="#top" className="flex items-center gap-3">
          <BananaBolt />
          <div>
            <p className="bg-gradient-to-r from-orange-300 via-orange-500 to-pink-500 bg-clip-text text-lg font-semibold text-transparent">
              Nano Banana
            </p>
            <p className="text-xs uppercase tracking-[0.4em] text-white/55">Premium Juice</p>
          </div>
        </a>

        <a
          href="#buy-now"
          className="rounded-full border border-white/20 bg-white/12 px-5 py-2 text-sm font-medium text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-white/18"
        >
          Order Now
        </a>
      </div>
    </motion.header>
  );
}
