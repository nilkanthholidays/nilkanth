"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const sideImages = [
  { src: "/images/mountain-hiking.jpg",   alt: "Mountain hiking adventure tours from Ahmedabad", position: "left" },
  { src: "/images/camping-stars.jpg",     alt: "Camping under stars - Adventure travel packages", position: "left" },
  { src: "/images/forest-exploration.jpg",alt: "Forest exploration trips - Holiday packages India", position: "right" },
  { src: "/images/lake-camping.jpg",      alt: "Lake camping vacation - Travel agency Ahmedabad",  position: "right" },
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
      // text fades 0→0.2
      const textOpacity   = Math.max(0, 1 - progress / 0.2);
      // images animate 0.2→1
      const ip            = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

      // center: 100%→42% width, 100%→100% height (always full height)
      const centerW       = 100 - ip * 58;   // 100% → 42%
      const centerH       = 100;              // always full height

      // side: 0%→22% width
      const sideW         = ip * 22;
      const sideOpacity   = ip;
      const slideLeft     = -100 + ip * 100;
      const slideRight    =  100 - ip * 100;
      const br            = ip * 20;
      const gap           = ip * 12;
      const pad           = ip * 12;
      const pb            = ip * 40;

      text.style.opacity        = String(textOpacity);

      // center fills full height always, width shrinks
      center.style.width        = `${centerW}%`;
      center.style.height       = `${centerH}%`;
      center.style.borderRadius = `${br}px`;

      leftCol.style.width     = `${sideW}%`;
      leftCol.style.opacity   = String(sideOpacity);
      leftCol.style.transform = `translateX(${slideLeft}%)`;
      leftCol.style.gap       = `${gap}px`;

      rightCol.style.width     = `${sideW}%`;
      rightCol.style.opacity   = String(sideOpacity);
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

    const update = () => {
      const rect     = section.getBoundingClientRect();
      const total    = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      apply(progress);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Run immediately + on scroll + on resize
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update,   { passive: true });

    // Also run after a short delay to catch mobile render
    const t = setTimeout(update, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="flex h-full w-full items-stretch">
          <div
            ref={containerRef}
            className="relative flex w-full items-stretch justify-center"
          >
            {/* LEFT */}
            <div
              ref={leftColRef}
              className="flex flex-col overflow-hidden flex-shrink-0"
              style={{ width: "0%", opacity: 0 }}
            >
              {sideImages.filter(i => i.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="si relative overflow-hidden flex-1"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="22vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* CENTER — full height always */}
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
              {/* gradient for text readability */}
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

            {/* RIGHT */}
            <div
              ref={rightColRef}
              className="flex flex-col overflow-hidden flex-shrink-0"
              style={{ width: "0%", opacity: 0 }}
            >
              {sideImages.filter(i => i.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="si relative overflow-hidden flex-1"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="22vw"
                    className="object-cover"
                  />
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
