"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const overlayImages = [
  { src: "/images/mountain-hiking.jpg", alt: "Mountain hiking adventure tours" },
  { src: "/images/camping-stars.jpg",   alt: "Camping under stars packages" },
  { src: "/images/forest-exploration.jpg", alt: "Forest exploration trips" },
  { src: "/images/lake-camping.jpg",    alt: "Lake camping vacation" },
];

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const centerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text    = textRef.current;
    const center  = centerRef.current;
    const grid    = gridRef.current;
    if (!section || !text || !center || !grid) return;

    const update = () => {
      const rect   = section.getBoundingClientRect();
      const total  = window.innerHeight * 2;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));

      // Phase 1 (0 → 0.4): text fades out
      const textOpacity = Math.max(0, 1 - p / 0.4);

      // Phase 2 (0.3 → 0.8): 4 images slide in as overlay squares
      const gridP = Math.max(0, Math.min(1, (p - 0.3) / 0.5));

      // Center image shrinks slightly as grid comes in
      const scale = 1 - gridP * 0.08;

      text.style.opacity   = String(textOpacity);
      center.style.transform = `scale(${scale})`;
      center.style.borderRadius = `${gridP * 20}px`;

      // Grid overlay: slides up from bottom + fades in
      const translateY = (1 - gridP) * 60; // 60px → 0px
      grid.style.opacity   = String(gridP);
      grid.style.transform = `translateY(${translateY}px)`;
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* FULL SCREEN CENTER HERO IMAGE */}
        <div
          ref={centerRef}
          className="absolute inset-0 overflow-hidden"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/images/abc.jpg"
            alt="Nilkanth Holidays Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Dark gradient at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* HERO TEXT */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-end justify-start pl-6 md:pl-12 pb-16 md:pb-20"
          >
            <h1 className="text-white font-medium tracking-tighter leading-[0.92] text-left">
              <span className="block text-[20vw] md:text-[16vw] animate-[slideUp_0.8s_ease-out_forwards]">
                Nilkanth
              </span>
              <span className="block text-[14vw] md:text-[11vw] mt-2 animate-[slideUp_1s_ease-out_forwards]">
                Holidays
              </span>
            </h1>
          </div>
        </div>

        {/* 4 IMAGES GRID OVERLAY — appears on scroll, on top of hero */}
        <div
          ref={gridRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0, transform: "translateY(60px)" }}
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-[88vw] md:w-[70vw] max-w-2xl">
            {overlayImages.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 44vw, 35vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll Space */}
      <div className="h-[200vh]" />
    </section>
  );
}
