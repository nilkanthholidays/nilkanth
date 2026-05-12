"use client";

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-[8vw] font-medium tracking-tighter text-foreground md:text-[6vw] lg:text-[5vw]">
            About Us
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-6">
            Discover the best of India and international destinations with expertly crafted tour packages. Nilkanth Holidays specializes in immersive travel experiences that combine comfort, adventure, and authentic cultural exploration.
          </p>
          
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground/60 mb-3">
                  Innovation
                </h3>
                <p className="text-base text-foreground/70">
                  Cutting-edge technology meets practical design for real-world adventures.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground/60 mb-3">
                  Sustainability
                </h3>
                <p className="text-base text-foreground/70">
                  Eco-friendly materials and manufacturing processes for a better tomorrow.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground/60 mb-3">
                  Adventure
                </h3>
                <p className="text-base text-foreground/70">
                  Gear that empowers explorers to push boundaries and discover more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
