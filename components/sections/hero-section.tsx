"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sideImages = [
  {
    src: "/images/mountain-hiking.jpg",
    alt: "Best mountain hiking adventure tours from Ahmedabad - Tour packages",
    position: "left",
    span: 1,
  },
  {
    src: "/images/camping-stars.jpg",
    alt: "Camping under stars - Adventure travel packages from Ahmedabad",
    position: "left",
    span: 1,
  },
  {
    src: "/images/forest-exploration.jpg",
    alt: "Forest exploration trips - Customized holiday packages in India",
    position: "right",
    span: 1,
  },
  {
    src: "/images/lake-camping.jpg",
    alt: "Lake camping vacation - Travel agency in Ahmedabad services",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;

      const progress = Math.max(
        0,
        Math.min(1, scrolled / scrollableHeight)
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textOpacity = Math.max(
    0,
    1 - scrollProgress / 0.2
  );

  const imageProgress = Math.max(
    0,
    Math.min(
      1,
      (scrollProgress - 0.2) / 0.8
    )
  );

  const centerWidth = 100 - imageProgress * 58;
  const centerHeight = 100 - imageProgress * 30;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;

  const sideTranslateLeft =
    -100 + imageProgress * 100;

  const sideTranslateRight =
    100 - imageProgress * 100;

  const borderRadius =
    imageProgress * 24;

  const gap =
    imageProgress * 16;

  const sideTranslateY =
    -(imageProgress * 15);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
    >
      {/* Sticky Hero */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * 16}px`,
              paddingBottom: `${
                60 + imageProgress * 40
              }px`,
            }}
          >

            {/* LEFT */}
            <div
              className="flex flex-col"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                opacity: sideOpacity,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
              }}
            >
              {sideImages
                .filter(
                  (img) =>
                    img.position === "left"
                )
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
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

            {/* CENTER */}
            <div
              className="relative overflow-hidden"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/abc.jpg"
                alt="Hero"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              {/* BOTTOM ATTACHED TEXT */}
              {/* LEFT ATTACHED TEXT */}
<div
  className="absolute inset-0 flex items-end justify-start overflow-hidden pl-6 md:pl-10 pb-2"
  style={{ opacity: textOpacity }}
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
              className="flex flex-col"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                opacity: sideOpacity,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
              }}
            >
              {sideImages
                .filter(
                  (img) =>
                    img.position === "right"
                )
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
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

      {/* Scroll Space */}
      <div className="h-[200vh]" />



    </section>
  );
}
























// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// const word = "Nilkanth  Holidays";

// const sideImages = [
//   {
//     src: "/images/mountain-hiking.jpg",
//     alt: "Mountain hiking adventure",
//     position: "left",
//     span: 1,
//   },
//   {
//     src: "/images/camping-stars.jpg",
//     alt: "Camping under stars",
//     position: "left",
//     span: 1,
//   },
//   {
//     src: "/images/forest-exploration.jpg",
//     alt: "Forest exploration",
//     position: "right",
//     span: 1,
//   },
//   {
//     src: "/images/lake-camping.jpg",
//     alt: "Lake camping view",
//     position: "right",
//     span: 1,
//   },
// ];

// export function HeroSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;
      
//       const rect = sectionRef.current.getBoundingClientRect();
//       const scrollableHeight = window.innerHeight * 2;
//       const scrolled = -rect.top;
//       const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
//       setScrollProgress(progress);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
    
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Text fades out first (0 to 0.2)
//   const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
//   // Image transforms start after text fades (0.2 to 1)
//   const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
//   // Smooth interpolations
//   const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
//   const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
//   const sideWidth = imageProgress * 22; // 0% to 22%
//   const sideOpacity = imageProgress;
//   const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
//   const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
//   const borderRadius = imageProgress * 24; // 0px to 24px
//   const gap = imageProgress * 16; // 0px to 16px
  
//   // Vertical offset for side columns to move them up on mobile
//   const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

//   return (
//     <section ref={sectionRef} className="relative bg-background">
//       {/* Sticky container for scroll animation */}
//       <div className="sticky top-0 h-screen overflow-hidden">
//         <div className="flex h-full w-full items-center justify-center">
//           {/* Bento Grid Container */}
//           <div 
//             className="relative flex h-full w-full items-stretch justify-center"
//             style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
//           >
            
//             {/* Left Column */}
//             <div 
//               className="flex flex-col will-change-transform"
//               style={{
//                 width: `${sideWidth}%`,
//                 gap: `${gap}px`,
//                 transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
//                 opacity: sideOpacity,
//               }}
//             >
//               {sideImages.filter(img => img.position === "left").map((img, idx) => (
//                 <div 
//                   key={idx} 
//                   className="relative overflow-hidden will-change-transform"
//                   style={{
//                     flex: img.span,
//                     borderRadius: `${borderRadius}px`,
//                   }}
//                 >
//                   <Image
//                     src={img.src || "/placeholder.svg"}
//                     alt={img.alt}
//                     fill
//                     sizes="22vw"
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Main Hero Image - Center */}
//             <div 
//               className="relative overflow-hidden will-change-transform"
//               style={{
//                 width: `${centerWidth}%`,
//                 height: `${centerHeight}%`,
//                 flex: "0 0 auto",
//                 borderRadius: `${borderRadius}px`,
//               }}
//             >
//               <Image
//                 src="/images/abc.jpg"
//                 alt="Mountain landscape with camping tent at sunset"
//                 fill
//                 sizes="100vw"
//                 priority
//                 className="object-cover"
//               />
              
//               {/* Overlay Text - Fades out first */}
//               <div 
//                 className="absolute inset-0 flex items-end overflow-hidden"
//                 style={{ opacity: textOpacity }}
//               >
//                 <h1 className="w-full text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
//                   {word.split("").map((letter, index) => (
//                     <span
//                       key={index}
//                       className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
//                       style={{
//                         animationDelay: `${index * 0.08}s`,
//                         transition: 'all 1.5s',
//                         transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
//                       }}
//                     >
//                       {letter}
//                     </span>
//                   ))}
//                 </h1>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div 
//               className="flex flex-col will-change-transform"
//               style={{
//                 width: `${sideWidth}%`,
//                 gap: `${gap}px`,
//                 transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
//                 opacity: sideOpacity,
//               }}
//             >
//               {sideImages.filter(img => img.position === "right").map((img, idx) => (
//                 <div 
//                   key={idx} 
//                   className="relative overflow-hidden will-change-transform"
//                   style={{
//                     flex: img.span,
//                     borderRadius: `${borderRadius}px`,
//                   }}
//                 >
//                   <Image
//                     src={img.src || "/placeholder.svg"}
//                     alt={img.alt}
//                     fill
//                     sizes="22vw"
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Scroll space to enable animation */}
//       <div className="h-[200vh]" />

//       {/* Tagline Section */}
//       <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
//         <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
//           Lightweight, durable
//           <br />
//           and adventure-ready.
//         </p>
//       </div>
//     </section>
//   );
// }
