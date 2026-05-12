"use client";

import { useEffect } from "react";
import { X, Check, Minus } from "lucide-react";
import { ItineraryBlock } from "../sections/itinerary-data-card1";
import type { ProductItinerary } from "../sections/itinerary-data-card1";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title?: string;
    name?: string;
    description: string;
    price?: string;
    image: string;
    category?: string;
    itinerary?: ProductItinerary;
  };
  productType?: "technology" | "accessory";
}

const DEFAULT_FACILITIES = ["🗺️ Sightseeing", "🚌 Transportation", "🏨 Stay", "🍽️ Dinner", "🥗 Breakfast"];

const DEFAULT_INCLUDED = [
  "Accommodation as per mentioned hotels or similar",
  "Breakfast & Dinner",
  "Pickup & Drop",
  "Sightseeing as per itinerary",
  "Toll, Parking & Driver allowance",
  "All transfers by NAC vehicle on private basis",
  "All Hotel Taxes",
];

const DEFAULT_EXCLUDED = [
  "05% GST (if bill required)",
  "AC not operating in hill area",
  "Any Airfare / Train fare",
  "Entry to Park, Monument or Museum",
  "Personal expenses — drinks, snacks, laundry, tips etc.",
  "Rohtang Pass / Special Entry fees",
];

const getTechnologyContent = (title: string) => {
  const data: Record<string, { facilities: string[]; included: string[]; excluded: string[] }> = {
    "Smart Temperature Control": {
      facilities: ["🌡️ Temperature Control", "📱 Smart App", "🔋 Energy Efficient", "⚡ Fast Response"],
      included: ["Digital temperature display", "Mobile app control", "Energy saving mode", "24/7 monitoring"],
      excluded: ["Battery replacement", "Installation charges", "Extended warranty"],
    },
    "Ultra-Light Carbon Frame": {
      facilities: ["🚴 Carbon Fiber", "⚖️ Ultra Lightweight", "🔧 Easy Assembly", "💪 High Strength"],
      included: ["Carbon fiber frame", "Quick release mechanism", "Tool kit included", "Weather resistant"],
      excluded: ["Professional installation", "Paint job", "Custom modifications"],
    },
    "Weather-Resistant Design": {
      facilities: ["🛡️ Weather Protection", "💧 Water Resistant", "🌬️ UV Protection", "🔄 All Weather"],
      included: ["Waterproof coating", "UV resistant materials", "Sealed joints", "Weather stripping"],
      excluded: ["Deep water submersion", "Salt water exposure", "Chemical cleaning"],
    },
    "Integrated GPS Tracking": {
      facilities: ["🛰️ GPS Module", "📡 Real-time Tracking", "📱 Mobile Sync", "🗺️ Route History"],
      included: ["GPS receiver", "Mobile app integration", "Route tracking", "Emergency SOS"],
      excluded: ["Satellite subscription", "International roaming", "Premium features"],
    },
    "Built-In LED Flashlight": {
      facilities: ["💡 LED Technology", "🔦 Multiple Modes", "🔋 Long Battery", "💪 Durable Build"],
      included: ["LED flashlight", "Multiple brightness modes", "Rechargeable battery", "Water resistant"],
      excluded: ["Bulb replacement", "Charging cable", "Carrying case"],
    },
    "Self-Heating Technology": {
      facilities: ["🔥 Smart Heating", "🌡️ Temperature Control", "⚡ Quick Heat", "🔋 Energy Safe"],
      included: ["Self-heating elements", "Temperature control", "Auto shut-off", "Battery included"],
      excluded: ["Power adapter", "Extension cord", "Remote control"],
    },
    "Solar Power Integration": {
      facilities: ["☀️ Solar Panels", "🔋 Battery Storage", "⚡ Power Management", "🌱 Eco Friendly"],
      included: ["Solar panels", "Battery system", "Power controller", "LED indicators"],
      excluded: ["Installation service", "Maintenance kit", "Extended warranty"],
    },
    "Anti-Theft Security": {
      facilities: ["🔒 Security System", "🚨 Alarm System", "📱 Mobile Alerts", "🛡️ Tamper Proof"],
      included: ["Anti-theft lock", "Alarm system", "Mobile alerts", "GPS tracking"],
      excluded: ["Monitoring service", "Police response", "Insurance coverage"],
    },
  };
  return data[title] ?? null;
};

const getAccessoryContent = (name: string) => {
  const data: Record<string, { facilities: string[]; included: string[]; excluded: string[] }> = {
    "Wireless Charging Stand": {
      facilities: ["⚡ Fast Charging", "📱 Universal Compatibility", "🔋 Safe Charging", "💫 Cable Management"],
      included: ["Qi wireless charging", "Universal device support", "LED indicators", "Overcharge protection"],
      excluded: ["Power adapter", "USB cables", "Device specific cases"],
    },
    "Protective Silicone Sleeve": {
      facilities: ["🛡️ Shock Protection", "🌈 Multiple Colors", "🔧 Easy Installation", "💪 Premium Silicone"],
      included: ["Silicone sleeve", "Enhanced grip", "Screen protection", "Washable material"],
      excluded: ["Screen protector", "Cleaning kit", "Carrying case"],
    },
    "Carbon Fiber Bike Mount": {
      facilities: ["🚴 Carbon Fiber", "🔧 Quick Release", "⚖️ Lightweight", "🛡️ Secure Lock"],
      included: ["Carbon fiber mount", "Quick release system", "Security lock", "Adjustable angle"],
      excluded: ["Installation service", "Phone holder", "Extended warranty"],
    },
    "Premium Carry Strap": {
      facilities: ["🎒 Adjustable Length", "💪 High Strength", "🔧 Quick Release", "🌈 Multiple Styles"],
      included: ["Premium strap", "Adjustable length", "Quick release buckles", "Reinforced stitching"],
      excluded: ["Metal hardware", "Padding inserts", "Weather coating"],
    },
    "Portable Power Bank": {
      facilities: ["🔋 High Capacity", "⚡ Fast Charging", "📱 Multiple Ports", "💫 Compact Design"],
      included: ["20000mAh battery", "Fast charging technology", "Multiple device support", "LED indicators"],
      excluded: ["Power adapter", "Charging cables", "Carrying case"],
    },
    "Emergency Survival Kit": {
      facilities: ["🆘 Emergency Tools", "🔦 LED Flashlight", "🧭 Navigation Compass", "🏕️ Fire Starter"],
      included: ["Multi-tool kit", "LED flashlight", "Navigation compass", "Fire starter", "First aid supplies"],
      excluded: ["Food supplies", "Water purification", "Emergency shelter"],
    },
  };
  return data[name] ?? null;
};

export function ProductModal({ isOpen, onClose, product, productType = "technology" }: ProductModalProps) {

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const displayTitle = product.title ?? product.name ?? "";

  const content = productType === "technology"
    ? getTechnologyContent(displayTitle)
    : getAccessoryContent(displayTitle);

  const facilities = DEFAULT_FACILITIES;
  const included   = content?.included   ?? DEFAULT_INCLUDED;
  const excluded   = content?.excluded   ?? DEFAULT_EXCLUDED;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[88vh] flex flex-col
                      bg-white sm:rounded-3xl overflow-hidden
                      shadow-[0_32px_80px_-12px_rgba(0,0,0,0.4)] border border-white/20">

        {/* HERO */}
        <div className="relative flex-shrink-0 h-56 sm:h-72 overflow-hidden">
          <img src={product.image} alt={displayTitle}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.45) saturate(1.2)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-5">
            {product.category && (
              <span className="px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase
                               text-white/90 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                {product.category}
              </span>
            )}
            <button onClick={onClose}
              className="ml-auto w-8 h-8 flex items-center justify-center rounded-full
                         bg-white/10 hover:bg-white/25 border border-white/20 text-white
                         transition-all duration-200 backdrop-blur-sm">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-7 pb-5 sm:pb-6">
            <h2 className="text-2xl sm:text-[1.75rem] font-light text-white mb-1.5 tracking-tight leading-tight">
              {displayTitle}
            </h2>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto bg-[#f8f7f5]">

          {/* FEATURES */}
          <div className="px-5 sm:px-7 pt-6 pb-5 border-b border-stone-200/70">
            <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-stone-400 mb-3">
              Features & Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {facilities.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px]
                                         text-stone-700 bg-white border border-stone-200 rounded-full
                                         shadow-sm hover:border-stone-400 transition-all duration-200">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* ✅ ITINERARY — itinerary-data-card1.tsx se aata hai */}
          {product.itinerary && <ItineraryBlock itinerary={product.itinerary} />}

          {/* INCLUDED / EXCLUDED */}
          <div className="px-5 sm:px-7 py-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-stone-400 mb-4">✦ What's Included</p>
                <ul className="space-y-2.5">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-500">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-[13px] text-stone-600 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-stone-400 mb-4">✦ Not Included</p>
                <ul className="space-y-2.5">
                  {excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-stone-300">
                        <Minus className="w-2 h-2 text-stone-400" strokeWidth={3} />
                      </span>
                      <span className="text-[13px] text-stone-400 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex-shrink-0 bg-white border-t border-stone-200 px-5 sm:px-7 py-4
                        flex items-center justify-between gap-3">
          <div className="hidden sm:block">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-800">Nilkanth Holidays</p>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 text-[13px] font-medium text-stone-600
                         bg-stone-100 hover:bg-stone-200 rounded-full transition-colors duration-200">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}