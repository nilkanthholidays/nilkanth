"use client";

import { FadeImage } from "@/components/fade-image";
import { ProductModal } from "@/components/ui/product-modal";
import {
  CARD1_ITINERARY,
  GOA_ITINERARY,
  RAJASTHAN_ITINERARY,
  KERALA_ITINERARY,
  HIMACHAL_ITINERARY,
  KASHMIR_ITINERARY,
  ANDAMAN_ITINERARY,
  LEHLADAKH_ITINERARY,
  UTTARAKHAND_ITINERARY,
  UTTARPRADESH_ITINERARY,
  MEGHALAYA_ITINERARY,
  SIKKIM_ITINERARY,
  ARUNACHAL_ITINERARY,
  KARNATAKA_ITINERARY,
  GUJARAT_ITINERARY,
  TAMILNADU_ITINERARY,
} from "@/components/sections/itinerary-data-card1";
import { useState } from "react";

const accessories = [
  {
    id: 1,
    name: "Goa Beach",
    price: "$89",
    image: "/images/goa.jpg",
    itinerary: GOA_ITINERARY,
  },
  {
    id: 2,
    name: "Rajasthan",
    price: "$45",
    image: "/images/r.jpg",
    itinerary: RAJASTHAN_ITINERARY,
  },
  {
    id: 3,
    name: "Kerala",
    price: "$129",
    image: "/images/Kerala.jpg",
    itinerary: KERALA_ITINERARY,
  },
  {
    id: 4,
    name: "Himachal Pradesh",
    price: "$39",
    image: "/images/simla.jpg",
    itinerary: HIMACHAL_ITINERARY,
  },
  {
    id: 5,
    name: "Kashmir",
    price: "$29",
    image: "/images/kl.jpg",
    itinerary: KASHMIR_ITINERARY,
  },
  {
    id: 6,
    name: "Andaman Islands",
    price: "$149",
    image: "/images/aan.jpg",
    itinerary: ANDAMAN_ITINERARY,
  },
  {
    id: 7,
    name: "Leh Ladakh",
    price: "$35",
    image: "/images/ld.jpg",
    itinerary: LEHLADAKH_ITINERARY,
  },
  {
    id: 8,
    name: "Uttarakhand",
    price: "$79",
    image: "/images/Uttarakhand.jpg",
    itinerary: UTTARAKHAND_ITINERARY,
  },
  {
    id: 9,
    name: "Uttar Pradesh",
    price: "$59",
    image: "/images/up.jpg",
    itinerary: UTTARPRADESH_ITINERARY,
  },
  {
    id: 10,
    name: "Meghalaya",
    price: "$49",
    image: "/images/Meghalaya.jpg",
    itinerary: MEGHALAYA_ITINERARY,
  },
  {
    id: 11,
    name: "Sikkim",
    price: "$69",
    image: "/images/Sikkim.jpg",
    itinerary: SIKKIM_ITINERARY,
  },
  {
    id: 12,
    name: "Arunachal Pradesh",
    price: "$34",
    image: "/images/ArunachalPradesh.jpg",
    itinerary: ARUNACHAL_ITINERARY,
  },
  {
    id: 13,
    name: "Gujarat",
    price: "$42",
    image: "/images/Gujarat.jpg",
    itinerary: GUJARAT_ITINERARY,
  },
  {
    id: 14,
    name: "Karnataka",
    price: "$89",
    image: "/images/Karnataka.jpg",
    itinerary: KARNATAKA_ITINERARY,
  },
  {
    id: 15,
    name: "Tamil Nadu",
    price: "$25",
    image: "/images/TamilNadu.jpg",
    itinerary: TAMILNADU_ITINERARY,
  },
  {
    id: 16,
    name: "Lakshadweep",
    price: "$95",
    image: "/images/lakdeep.jpeg",
    itinerary: ANDAMAN_ITINERARY,
  },
];

export function CollectionSection() {
  const [selectedAccessory, setSelectedAccessory] = useState<any>(null);
  return (
    <section id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-8 text-center md:px-12 md:py-12 lg:px-20 lg:py-14">
        <h2 className="text-[8vw] font-medium tracking-tighter text-foreground md:text-[6vw] lg:text-[5vw]">
          Domestic
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory) => (
            <div
              key={accessory.id}
              className="group flex-shrink-0 w-[60vw] snap-center"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-4">
                <h3 className="text-foreground/70 text-lg font-semibold">
                  {accessory.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <div
              key={accessory.id}
              className="group cursor-pointer"
              onClick={() => setSelectedAccessory(accessory)}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-4">
                <h3 className="text-foreground/70 text-lg font-semibold">
                  {accessory.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={selectedAccessory !== null}
        onClose={() => setSelectedAccessory(null)}
        product={selectedAccessory}
        productType="accessory"
      />
    </section>
  );
}
