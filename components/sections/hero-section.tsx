"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const sideImages = [
  { src: "/images/mountain-hiking.jpg",    alt: "Mountain hiking adventure tours from Ahmedabad", position: "left" },
  { src: "/images/camping-stars.jpg",      alt: "Camping under stars - Adventure travel packages", position: "left" },
  { src: "/images/forest-exploration.jpg", alt: "Forest exploration trips - Holiday packages India", position: "right" },
  { src: "/images/lake-camping.jpg",       alt: "Lake camping vacation - Travel agency Ahmedabad",  position: "right" },
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

    const apply = (progress: number) => {
      // Phase 1 (0→0.2): text fades out
      const textOpacity = Math.max(0, 1 - progress / 0.2);
      // Phase 2 (0.2→1): bento layout animates in
      const ip = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

      // side columns: 0% → 28% of screen width
      const sideW = ip * 28;
      // center: 100% → 44% (100 - 28 - 28)
      const centerW = 100 - sideW * 2;

      // small gap between panels (0 → 6px)
      const gap = ip * 6;
      // small padding around whole container (0 → 6px)
      const pad = ip * 6;
      // border radius (0 → 16px)
      const br = ip * 16;

      // side images slide in from outside
      const slideLeft  = -100 + ip * 100;
      const slideRight =  100 - ip * 100;

      text.style.opacity = String(textOpacity);

      // center always full height, width shrinks
      center.style.width        = `${centerW}%`;
      center.style.height       = "100%";
      center.style.borderRadius = `${br}px`;

      leftCol.style.width     = `${sideW}%`;
      leftCol.style.opacity   = String(ip);
      leftCol.style.transform = `translateX(${slideLeft}%)`;
      leftCol.style.gap       = `${gap}px`;

      rightCol.style.width     = `${sideW}%`;
      rightCol.style.opacity   = String(ip);
      rightCol.style.transform = `translateX(${slideRight}%)`;
      rightCol.style.gap       = `${gap}px`;

      container.style.gap     = `${gap}px`;
      container.style.padding = `${pad}px`;

      leftCol.querySelectorAll<HTMLElement>(".si").forEach(el => {
        el.style.borderRadius = `${br}px`;
      });
      rightCol.querySelectorAll<HTMLElement>(".si").forEach(el => {
        el.style.borderRadius = `${br}px`;
      });
    };

    const update = () => {
      const rect     = section.getBoundingClientRect();
      const total    = window.innerHeight * 2;
      const scrolled = -rect.top;
      apply(Math.max(0, Math.min(1, scrolled / total)));
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    setTimeout(update, 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update,   { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* sticky viewport — 100svh handles mobile browser chrome */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>
        <div className="flex w-full h-full">
          <div
            ref={containerRef}
            className="flex w-full h-full items-stretch justify-center"
          >
            {/* LEFT — two equal rows, full height */}
            <div
              ref={leftColRef}
              className="flex flex-col flex-shrink-0 overflow-hidden"
              style={{ width: "0%", opacity: 0, height: "100%" }}
            >
              {sideImages.filter(i => i.position === "left").map((img, idx) => (
                <div key={idx} className="si relative overflow-hidden" style={{ flex: 1 }}>
                  <Image src={img.src} alt={img.alt} fill sizes="28vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* CENTER — always full height, shrinks in width */}
            <div
              ref={centerRef}
              className="relative overflow-hidden flex-shrink-0"
              style={{ width: "100%", height: "100%" }}
            >
              <Image
                src="/images/abc.jpg"
                alt="Nilkanth Holidays Hero"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div
                ref={textRef}
                className="absolute inset-0 flex items-end justify-start pl-6 md:pl-10 pb-8"
              >
                <h1 className="text-white font-medium tracking-tighter leading-[0.92] text-left">
                  <span className="block text-[22vw] animate-[slideUp_0.8s_ease-out_forwards]">
                    Nilkanth
                  </span>
                  <span className="block text-[16vw] mt-3 animate-[slideUp_1s_ease-out_forwards]">
                    Holidays
                  </span>
                </h1>
              </div>
            </div>

            {/* RIGHT — two equal rows, full height */}
            <div
              ref={rightColRef}
              className="flex flex-col flex-shrink-0 overflow-hidden"
              style={{ width: "0%", opacity: 0, height: "100%" }}
            >
              {sideImages.filter(i => i.position === "right").map((img, idx) => (
                <div key={idx} className="si relative overflow-hidden" style={{ flex: 1 }}>
                  <Image src={img.src} alt={img.alt} fill sizes="28vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* scroll space */}
      <div className="h-[200vh]" />
    </section>
  );
}
