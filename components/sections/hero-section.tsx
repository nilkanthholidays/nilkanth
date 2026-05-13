"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const sideImages = [
  {
    src: "/images/mountain-hiking.jpg",
    alt: "Best mountain hiking adventure tours from Ahmedabad",
    position: "left",
  },
  {
    src: "/images/camping-stars.jpg",
    alt: "Camping under stars - Adventure travel packages from Ahmedabad",
    position: "left",
  },
  {
    src: "/images/forest-exploration.jpg",
    alt: "Forest exploration trips - Customized holiday packages in India",
    position: "right",
  },
  {
    src: "/images/lake-camping.jpg",
    alt: "Lake camping vacation - Travel agency in Ahmedabad services",
    position: "right",
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const center = centerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const container = containerRef.current;
    if (!section || !text || !center || !leftCol || !rightCol || !container) return;

    const isMobile = window.innerWidth < 768;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      // progress: 0 = page load (grid visible), 1 = fully scrolled (bento layout)
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      // Phase 1 (0→0.3): grid → bento transition
      // Phase 2 (0.3→1): text fades out
      const layoutProgress = Math.min(1, progress / 0.3);
      const textOpacity = Math.max(0, 1 - Math.max(0, (progress - 0.3) / 0.3));

      // At progress=0: 4 equal squares grid
      // At progress=1: center big, sides small (bento)
      const iM = isMobile;

      // Side columns: start at 25% (equal grid), end at 18/22%
      const sideStart = 25;
      const sideEnd = iM ? 18 : 22;
      const sideWidth = sideStart + (sideEnd - sideStart) * layoutProgress;

      // Center: starts at 50% (2 cols), expands to fill rest
      const centerStart = 50;
      const centerEnd = iM ? 64 : 56;
      const centerWidth = centerStart + (centerEnd - centerStart) * layoutProgress;

      // Height: side cols start at 50% height (2 rows), go to 80%
      const heightStart = 50;
      const heightEnd = iM ? 70 : 80;
      const centerHeight = heightStart + (heightEnd - heightStart) * layoutProgress;

      // Border radius: 12px at start, 24px at end
      const borderRadius = 12 + layoutProgress * 12;

      // Gap
      const gap = iM ? 6 + layoutProgress * 2 : 8 + layoutProgress * 8;

      // Padding
      const padding = iM ? 8 : 12 + layoutProgress * 4;
      const paddingBottom = iM ? 60 : 60 + layoutProgress * 40;

      // Side translate: start at 0 (already in place), slight upward shift at end
      const sideTranslateY = -(layoutProgress * (iM ? 8 : 15));

      // Apply to DOM
      text.style.opacity = String(textOpacity);

      center.style.width = `${centerWidth}%`;
      center.style.height = `${centerHeight}%`;
      center.style.borderRadius = `${borderRadius}px`;

      leftCol.style.width = `${sideWidth}%`;
      leftCol.style.opacity = "1";
      leftCol.style.transform = `translateY(${sideTranslateY}%)`;
      leftCol.style.gap = `${gap}px`;

      rightCol.style.width = `${sideWidth}%`;
      rightCol.style.opacity = "1";
      rightCol.style.transform = `translateY(${sideTranslateY}%)`;
      rightCol.style.gap = `${gap}px`;

      container.style.gap = `${gap}px`;
      container.style.padding = `${padding}px`;
      container.style.paddingBottom = `${paddingBottom}px`;

      leftCol.querySelectorAll<HTMLElement>(".side-img-wrap").forEach((el) => {
        el.style.borderRadius = `${borderRadius}px`;
      });
      rightCol.querySelectorAll<HTMLElement>(".side-img-wrap").forEach((el) => {
        el.style.borderRadius = `${borderRadius}px`;
      });
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // run on mount so initial state is correct

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky Hero */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            ref={containerRef}
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: "6px", padding: "8px", paddingBottom: "60px" }}
          >
            {/* LEFT COLUMN — starts visible as 2 square images */}
            <div
              ref={leftColRef}
              className="flex flex-col"
              style={{ width: "25%", gap: "6px" }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="side-img-wrap relative overflow-hidden"
                    style={{ flex: 1, borderRadius: "12px" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 25vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* CENTER — starts as 50% width */}
            <div
              ref={centerRef}
              className="relative overflow-hidden"
              style={{
                width: "50%",
                height: "50%",
                flex: "0 0 auto",
                borderRadius: "12px",
              }}
            >
              <Image
                src="/images/abc.jpg"
                alt="Nilkanth Holidays Hero"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              {/* TEXT overlay */}
              <div
                ref={textRef}
                className="absolute inset-0 flex items-end justify-start overflow-hidden pl-4 md:pl-10 pb-2"
              >
                <h1 className="text-white font-medium tracking-tighter leading-[0.92] text-left">
                  <span className="block text-[22vw] md:text-[18vw] animate-[slideUp_0.8s_ease-out_forwards]">
                    Nilkanth
                  </span>
                  <span className="block text-[16vw] md:text-[13vw] mt-2 animate-[slideUp_1s_ease-out_forwards]">
                    Holidays
                  </span>
                </h1>
              </div>
            </div>

            {/* RIGHT COLUMN — starts visible as 2 square images */}
            <div
              ref={rightColRef}
              className="flex flex-col"
              style={{ width: "25%", gap: "6px" }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="side-img-wrap relative overflow-hidden"
                    style={{ flex: 1, borderRadius: "12px" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 25vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Space */}
      <div className="h-[200vh]" />
    </section>
  );
}
