"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-5xl text-center space-y-3">
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground">
            Nilkanth Holidays is your trusted travel partner,
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground">
            dedicated to making journeys memorable.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground">
            We specialize in India & International tours,
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground">
            offering personalized experiences, comfort,
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground">
            and affordable packages.
          </p>
        </div>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/abc.jpg"
          alt="Mountain peaks at sunrise"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
