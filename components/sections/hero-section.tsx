"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const sideImages = [
  { src: "/images/mountain-hiking.jpg", alt: "Best mountain hiking adventure tours from Ahmedabad - Tour packages", position: "left", span: 1 },
  { src: "/images/camping-stars.jpg",   alt: "Camping under stars - Adventure travel packages from Ahmedabad",     position: "left", span: 1 },
  { src: "/images/forest-exploration.jpg", alt: "Forest exploration trips - Customized holiday packages in India", position: "right", span: 1 },
  { src: "/images/lake-camping.jpg",    alt: "Lake camping vacation - Travel agency in Ahmedabad services",        position: "right", span: 1 },
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

    const update = () => {
      const rect            = section.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled        = -rect.top;
      const progress        = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      // exact same math as original
      const textOpacity      = Math.max(0, 1 - progress / 0.2);
      const imageProgress    = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

      const centerWidth      = 100 - imageProgress * 58;
      const centerHeight     = 100 - imageProgress * 30;
      const sideWidth        = imageProgress * 22;
      const sideOpacity      = imageProgress;
      const sideTranslateLeft  = -100 + imageProgress * 100;
      const sideTranslateRight =  100 - imageProgress * 100;
      const borderRadius     = imageProgress * 24;
      const gap              = imageProgress * 16;
      const sideTranslateY   = -(imageProgress * 15);
      const padding          = imageProgress * 16;
      const paddingBottom    = 60 + imageProgress * 40;

      // write directly to DOM — no React re-render, smooth on mobile
      text.style.opacity = String(textOpacity);

      center.style.width        = `${centerWidth}%`;
      center.style.height       = `${centerHeight}%`;
      center.style.borderRadius = `${borderRadius}px`;

      leftCol.style.width     = `${sideWidth}%`;
      leftCol.style.opacity   = String(sideOpacity);
      leftCol.style.transform = `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`;
      leftCol.style.gap       = `${gap}px`;

      rightCol.style.width     = `${sideWidth}%`;
      rightCol.style.opacity   = String(sideOpacity);
      rightCol.style.transform = `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`;
      rightCol.style.gap       = `${gap}px`;

      container.style.gap           = `${gap}px`;
      container.style.padding       = `${padding}px`;
      container.style.paddingBottom = `${paddingBottom}px`;

      leftCol.querySelectorAll<HTMLElement>(".si").forEach(el => {
        el.style.borderRadius = `${borderRadius}px`;
      });
      rightCol.querySelectorAll<HTMLElement>(".si").forEach(el => {
        el.style.borderRadius = `${borderRadius}px`;
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
          >
            {/* LEFT */}
            <div
              ref={leftColRef}
              className="flex flex-col"
              style={{ width: "0%", opacity: 0 }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div key={idx} className="si relative overflow-hidden" style={{ flex: img.span }}>
                  <Image src={img.src} alt={img.alt} fill sizes="22vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* CENTER */}
            <div
              ref={centerRef}
              className="relative overflow-hidden"
              style={{ width: "100%", height: "100%", flex: "0 0 auto" }}
            >
              <Image src="/images/abc.jpg" alt="Hero" fill priority sizes="100vw" className="object-cover" />

              <div
                ref={textRef}
                className="absolute inset-0 flex items-end justify-start overflow-hidden pl-6 md:pl-10 pb-2"
              >
                <h1 className="text-white font-medium tracking-tighter leading-[0.92] text-left">
                  <span className="block text-[22vw] animate-[slideUp_0.8s_ease-out_forwards]">Nilkanth</span>
                  <span className="block text-[16vw] mt-3 animate-[slideUp_1s_ease-out_forwards]">Holidays</span>
                </h1>
              </div>
            </div>

            {/* RIGHT */}
            <div
              ref={rightColRef}
              className="flex flex-col"
              style={{ width: "0%", opacity: 0 }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div key={idx} className="si relative overflow-hidden" style={{ flex: img.span }}>
                  <Image src={img.src} alt={img.alt} fill sizes="22vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[200vh]" />
    </section>
  );
}
