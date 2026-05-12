"use client";

const stats = [
  { label: "Total Packages", value: "150+" },
  { label: "Reviews", value: "120+" },
  { label: "Happy Travelers", value: "1000+" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 px-6 py-12 md:px-12 md:py-16 lg:px-20 border-t border-border">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bcdafadc-cb7e-4cb7-9cbf-edcbaf2360a5_1-cNBCz5fomcLRmm1cTXSBOKCq10VP91.mp4"
        />
      </div>
    </section>
  );
}
