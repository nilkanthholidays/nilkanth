"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const sideImages = [
  { src: "/images/mountain-hiking.jpg", alt: "Mountain hiking adventure tours from Ahmedabad", position: "left" },
  { src: "/images/camping-stars.jpg",   alt: "Camping under stars - Adventure travel packages", position: "left" },
  { src: "/images/forest-exploration.jpg", alt: "Forest exploration trips - Holiday packages India", position: "right" },
  { src: "/images/lake-camping.jpg",    alt: "Lake camping vacation - Travel agency Ahmedabad", position: "right" },
];

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const centerRef    = useRef<HTMLDivElement>(null);
  const leftColRef   = useRef<HTMLDivElement>(null);
  const rightColRef  = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number | null>(null);

  useEffect(() => {
    const section   = sectionRef.current;
    const text      = textRef.current;
    const center    = centerRef.current;
    const leftCol   = leftColRef.current;
    const rightCol  = rightColRef.current;
    const container = containerRef.current;
    if (!section || !text || !center || !leftCol || !rightCol || !container) return;

    const isMobile = window.innerWidth < 768;

    const update = () => {
      const rect     = section.getBoundingClientRect();
      const total    = window.innerHeight * 2;
      const scrolled = -rect.top;
      // p = 0 at top, 1 at fully scrolled
      const p = Math.max(0, Math.min(1, scrolled / total));

      // text fades out in first 25% of scroll
      const textOpacity = Math.max(0, 1 - p / 0.25);

      // layout animates from 0.1 to 1.0
      const lp = Math.max(0, Math.min(1, (p - 0.1) / 0.9));

      // ── INITIAL STATE (lp=0): equal 3-col grid ──────────────────
      // side cols = 22%, center = 56%  (22+56+22=100)
      // ── FINAL STATE (lp=1): bento ───────────────────────────────
      // side cols shrink to 0%, center fills 100%
      const sideW   = isMobile ? 22 * (1 - lp) : 22 * (1 - lp);
      const centerW = 100 - sideW * 2;
      const centerH = isMobile
        ? 55 + lp * 45          // 55% → 100%
        : 65 + lp * 35;         // 65% → 100%

      const br  = 12 + lp * 12; // border-radius 12 → 24
      const gap = isMobile ? 6 : 8 + lp * 8;
      const pad = isMobile ? 6 : 10 + lp * 6;
      const pb  = 60 + lp * 40;

      // side columns slide outward as they shrink
      const slideLeft  = -(lp * 100);   // 0% → -100%
      const slideRight =   lp * 100;    // 0% → +100%

      text.style.opacity = String(textOpacity);

      center.style.width        = `${centerW}%`;
      center.style.height       = `${centerH}%`;
      center.style.borderRadius = `${br}px`;

      leftCol.style.width     = `${sideW}%`;
      leftCol.style.transform = `translateX(${slideLeft}%)`;
      leftCol.style.gap       = `${gap}px`;

      rightCol.style.width     = `${sideW}%`;
      rightCol.style.transform = `translateX(${slideRight}%)`;
      rightCol.style.gap       = `${gap}px`;

      container.style.gap           = `${gap}px`;
      container.style.padding       = `${pad}px`;
      container.style.paddingBottom = `${pb}px`;

      leftCol.querySelectorAll<HTMLElement>(".si").forEach(el => {
        el.style.borderRadius = `${br}px`;
      });
      rightCol.querySelectorAll<HTMLElement>(".si").forEach(el => {
        el.style.borderRadius = `${br}px`;
      });
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
        <div className="flex h-full w-full items-center justify-center">
          <div
            ref={containerRef}
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: "6px", padding: "6px", paddingBottom: "60px" }}
          >
            {/* LEFT */}
            <div
              ref={leftColRef}
              className="flex flex-col overflow-hidden"
              style={{ width: "22%", gap: "6px" }}
            >
              {sideImages.filter(i => i.position === "left").map((img, idx) => (
                <div key={idx} className="si relative overflow-hidden" style={{ flex: 1, borderRadius: "12px" }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 22vw, 22vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* CENTER */}
            <div
              ref={centerRef}
              className="relative overflow-hidden flex-shrink-0"
              style={{ width: "56%", height: "65%", borderRadius: "12px" }}
            >
              <Image src="/images/abc.jpg" alt="Nilkanth Holidays Hero" fill priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div
                ref={textRef}
                className="absolute inset-0 flex items-end justify-start pl-4 md:pl-10 pb-3"
              >
                <h1 className="text-white font-medium tracking-tighter leading-[0.92]">
                  <span className="block text-[20vw] md:text-[15vw] animate-[slideUp_0.8s_ease-out_forwards]">Nilkanth</span>
                  <span className="block text-[14vw] md:text-[11vw] mt-1 animate-[slideUp_1s_ease-out_forwards]">Holidays</span>
                </h1>
              </div>
            </div>

            {/* RIGHT */}
            <div
              ref={rightColRef}
              className="flex flex-col overflow-hidden"
              style={{ width: "22%", gap: "6px" }}
            >
              {sideImages.filter(i => i.position === "right").map((img, idx) => (
                <div key={idx} className="si relative overflow-hidden" style={{ flex: 1, borderRadius: "12px" }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 22vw, 22vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space */}
      <div className="h-[200vh]" />
    </section>
  );
}
