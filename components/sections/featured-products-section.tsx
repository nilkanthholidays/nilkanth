"use client";

import { FadeImage } from "@/components/fade-image";
import { ProductModal } from "@/components/ui/product-modal";
import { CARD1_ITINERARY, BHUTAN_ITINERARY, DUBAI_ITINERARY, VIETNAM_ITINERARY, MALDIVES_ITINERARY, NEPAL_ITINERARY, SRILANKA_ITINERARY, BALI_ITINERARY, SINGAPORE_ITINERARY } from "@/components/sections/itinerary-data-card1";
import { useState } from "react";

const features = [
  {
    title: "Nepal",
    description: "Innovation",
    image: "/images/nepal.jpg",
    itinerary: NEPAL_ITINERARY,
    alt: "Nepal tour package from Ahmedabad - Best travel agency packages"
  },
  {
    title: "Bhutan",
    description: "Performance",
    image: "/images/bhutan.jpg",
    itinerary: BHUTAN_ITINERARY,
    alt: "Bhutan adventure tour - customized holiday packages"
  },
  {
    title: "Dubai",
    description: "Durability",
    image: "/images/du.jpg",
    itinerary: DUBAI_ITINERARY,
    alt: "Dubai tour package from Ahmedabad - international travel agency"
  },
  {
    title: "Vietnam",
    description: "Navigation",
    image: "/images/vt.jpg",
    itinerary: VIETNAM_ITINERARY,
    alt: "Vietnam travel package - tour operator Ahmedabad"
  },
  {
    title: "Maldives",
    description: "Visibility",
    image: "/images/mal.jpg",
    itinerary: MALDIVES_ITINERARY,
    alt: "Maldives honeymoon package from Ahmedabad - travel consultant"
  },
  {
    title: "Sri Lanka",
    description: "Comfort",
    image: "/images/sh.jpg",
    itinerary: SRILANKA_ITINERARY,
    alt: "Sri Lanka tour package - vacation planner Ahmedabad"
  },
  {
    title: "Bali",
    description: "Sustainability",
    image: "/images/ba.jpg",
    itinerary: BALI_ITINERARY,
    alt: "Bali package from Ahmedabad - honeymoon packages"
  },
  {
    title: "Singapore",
    description: "Protection",
    image: "/images/sin.jpg",
    itinerary: SINGAPORE_ITINERARY,
    alt: "Singapore tour package - family vacation packages Ahmedabad"
  },
  
];

export function FeaturedProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  return (
    <section id="technology" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-8 text-center md:px-12 md:py-12 lg:px-20 lg:py-14">
        <h2 className="text-[8vw] font-medium tracking-tighter text-foreground md:text-[6vw] lg:text-[5vw]">
          International
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3 px-6 pb-20 md:grid-cols-4 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div 
            key={feature.title} 
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(feature)}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-md">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.alt || feature.title}
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="py-4">
              <h3 className="text-foreground/70 text-lg font-semibold">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        productType="technology"
      />
    </section>
  );
}
