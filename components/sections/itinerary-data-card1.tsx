"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Clock } from "lucide-react";

// ============================================================
// TYPES
// ============================================================
export interface ItineraryDay {
  day: string;
  title: string;
  content: string;
}

export interface ProductItinerary {
  [duration: string]: ItineraryDay[];
}

// ============================================================
// DURATION TABS
// ============================================================
const DURATIONS = [
  { id: "3N4D",   label: "3N · 4D"   },
  { id: "4N5D",   label: "4N · 5D"   },
  { id: "5N6D",   label: "5N · 6D"   },
  { id: "6N7D",   label: "6N · 7D"   },
  { id: "7N8D",   label: "7N · 8D"   },
  { id: "8N9D",   label: "8N · 9D"   },
  { id: "9N10D",  label: "9N · 10D"  },
  { id: "12N13D", label: "12N · 13D" },
];

const DURATION_LABELS: Record<string, string> = {
  "3N4D":        "3N · 4D",
  "4N5D":        "4N · 5D",
  "5N6D":        "5N · 6D",
  "6N7D":        "6N · 7D",
  "7N8D":        "7N · 8D",
  "8N9D":        "8N · 9D",
  "9N10D":       "9N · 10D",
  "10N11D":      "10N · 11D",
  "12N13D":      "12N · 13D",
  "2N3D-JSL":    "2N·3D Jaisalmer",
  "2N3D-UDP":    "2N·3D Udaipur",
  "3N4D-KUMB":   "3N·4D Kumbhalgarh",
  "3N4D-CHITTO": "3N·4D Chittorgarh",
  "5N6D-JSL":    "5N·6D Jaisalmer",
  "5N6D-UDP":    "5N·6D Udaipur",
  "4N5D-RANN":   "4N·5D Rann Utsav",
  "7N8D-POLO":   "7N·8D Polo Forest",
  "4N5D-SOU":    "4N·5D Statue of Unity",
  "5N6DA":       "5N·6D Mysore-Coorg",
  "5N6DB":       "5N·6D Ooty-Kodai",
};

// ============================================================
// ✅ UI COMPONENT — accordion + duration tabs
// ProductModal.tsx mein use karo:
//   import { ItineraryBlock } from "./itinerary-data-card1";
//   <ItineraryBlock itinerary={product.itinerary} />
// ============================================================
export function ItineraryBlock({ itinerary }: { itinerary: ProductItinerary }) {
  const availableKeys = Object.keys(itinerary).filter(k => itinerary[k]?.length > 0);
  const allDurations = availableKeys.map(id => ({
    id,
    label: DURATION_LABELS[id] ?? id,
  }));
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>(availableKeys[0] ?? "");

  const currentDays: ItineraryDay[] = itinerary[selectedDuration] ?? [];

  return (
    <div className="px-5 sm:px-7 pt-6 pb-5 border-b border-stone-200/70">

      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-3.5 h-3.5 text-stone-400" />
        <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-stone-400">
          Tour Itinerary
        </p>
      </div>

      {/* Duration buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {allDurations.map(({ id, label }) => {
          const isSelected = selectedDuration === id;
          return (
            <button
              key={id}
              onClick={() => { setSelectedDuration(id); setActiveAccordion(null); }}
              className={`px-4 py-2 text-[12px] font-medium rounded-full border transition-all duration-200
                ${isSelected
                  ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-900/20"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-500 hover:shadow-sm"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Days count */}
      {currentDays.length > 0 && (
        <div className="flex items-center gap-1.5 mb-4">
          <Clock className="w-3 h-3 text-stone-400" />
          <span className="text-xs text-stone-400">{currentDays.length} days planned</span>
        </div>
      )}

      {/* Accordion */}
      {currentDays.length > 0 ? (
        <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm divide-y divide-stone-100">
          {currentDays.map((item, index) => {
            const isOpen = activeAccordion === `day-${index}`;
            return (
              <div key={index} className={`transition-colors ${isOpen ? "bg-stone-50" : "bg-white"}`}>
                <button
                  onClick={() => setActiveAccordion(isOpen ? null : `day-${index}`)}
                  className="w-full px-4 sm:px-5 py-3.5 flex items-center gap-3 text-left group"
                >
                  <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full
                                    text-[11px] font-bold transition-colors
                                    ${isOpen ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-stone-800 leading-snug">
                    {item.title}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform duration-200
                                           ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1">
                    <div className="ml-11 pl-3 border-l-2 border-stone-200">
                      <p className="text-[13px] text-stone-500 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-sm text-stone-400">Itinerary coming soon for this duration</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ✅ CARD 1 — ITINERARY DATA
// ============================================================
export const CARD1_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU & TRANSFER TO PAHALGAM",
      content: "Arrive to Jammu Airport / Railway station. Our driver will meet you and journey starts towards Pahalgam — valley of shepherds. Drive through pine forest and along Lidder river covering 280 kms in about 7 hours. Overnight stay in hotel.",
    },
    {
      day: "Day 02",
      title: "PAHALGAM LOCAL SIGHTSEEING",
      content: "After breakfast sightseeing in Pahalgam. Visit Aru valley, Betab valley and ChandanVari (by local taxi at own cost). Horse riding / Trekking available (excluded). Evening leisure at hotel.",
    },
    {
      day: "Day 03",
      title: "PAHALGAM – SRINAGAR – GULMARG",
      content: "After breakfast drive to Srinagar then proceed to Gulmarg (2730 mtrs), meadows of flowers. 60 kms in 2 hours. Highest 18-hole golf course in the world. View of Nanga Parbat if weather permits. Overnight in Gulmarg.",
    },
    {
      day: "Day 04",
      title: "GULMARG – SRINAGAR – SONAMARG",
      content: "Morning in Gulmarg, then drive to Sonamarg — most beautiful drive from Srinagar. 80 kms in 3 hours. Gateway of Ladakh across Zojila pass. Evening return to Srinagar. Overnight stay in houseboat.",
    },
    {
      day: "Day 05",
      title: "SRINAGAR LOCAL & DOODPATHRI",
      content: "After breakfast journey to Doodhpatri, 40 km from Srinagar in Budgam district. Local sightseeing. Visit Dal Lake, Mughal Gardens in the evening. Overnight stay in houseboat.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE FROM SRINAGAR",
      content: "After breakfast, departure to Jammu Airport / Railway station for onward journey. Safe travels!",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU & TRANSFER TO PAHALGAM",
      content: "Arrive Jammu, meet driver, proceed to Pahalgam (280 kms, ~7 hours) through pine forests along Lidder river. Check in hotel. Evening walk along the river. Overnight stay in Pahalgam.",
    },
    {
      day: "Day 02",
      title: "PAHALGAM – ARU & BETAB VALLEY",
      content: "Full day sightseeing — Aru Valley (11 km), Betab Valley (15 km), ChandanVari (16 km). Horse riding and trekking available at own cost. Evening at leisure. Overnight stay in Pahalgam.",
    },
    {
      day: "Day 03",
      title: "PAHALGAM – SRINAGAR",
      content: "After breakfast drive to Srinagar. En-route visit Awantipora ruins. Check in hotel. Evening visit Lal Chowk and local markets. Overnight stay in Srinagar hotel.",
    },
    {
      day: "Day 04",
      title: "SRINAGAR – GULMARG – SRINAGAR",
      content: "Drive to Gulmarg (2730 mtrs). Gondola ride (own cost). Highest golf course in the world. Snow activities in season. View of Nanga Parbat. Evening return to Srinagar. Overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "SRINAGAR – SONAMARG – SRINAGAR",
      content: "Drive to Sonamarg (80 kms, 3 hours). Visit Thajiwas Glacier (pony ride at own cost). Gateway to Ladakh via Zojila pass. Stunning views. Evening return to Srinagar. Overnight stay in houseboat on Dal Lake.",
    },
    {
      day: "Day 06",
      title: "SRINAGAR MUGHAL GARDENS & DAL LAKE",
      content: "Morning Shikara ride on Dal Lake. Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi gardens. Visit Shankaracharya Temple. Evening shopping at Polo View market. Overnight stay in houseboat.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "After breakfast check out. Transfer to Srinagar Airport / Jammu Railway station for onward journey. Tour ends with beautiful memories.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU – KATRA",
      content: "Arrive Jammu. Drive to Katra (50 kms). Check in hotel. Evening visit Katra market. Optional Vaishno Devi Darshan can be planned. Overnight stay in Katra.",
    },
    {
      day: "Day 02",
      title: "KATRA – PAHALGAM",
      content: "After breakfast drive from Katra to Pahalgam (230 kms, ~6 hours). En-route enjoy scenic Chenab River views. Check in hotel in Pahalgam. Evening walk by Lidder river. Overnight stay.",
    },
    {
      day: "Day 03",
      title: "PAHALGAM SIGHTSEEING",
      content: "Full day Pahalgam — Aru Valley, Betab Valley, ChandanVari. Mini Switzerland of India. Horse riding, trekking options available (own cost). Overnight stay in Pahalgam.",
    },
    {
      day: "Day 04",
      title: "PAHALGAM – SRINAGAR",
      content: "After breakfast drive to Srinagar. Visit Awantipora ruins en-route. Check in hotel / houseboat on Dal Lake. Evening Shikara ride. Overnight stay in Srinagar.",
    },
    {
      day: "Day 05",
      title: "SRINAGAR – GULMARG – SRINAGAR",
      content: "Drive to Gulmarg (2730 mtrs). Gondola ride to Kongdori (own cost). Ski slopes in winter. World's highest golf course. Panoramic views of Himalayan peaks. Evening return. Overnight stay.",
    },
    {
      day: "Day 06",
      title: "SRINAGAR – SONAMARG – SRINAGAR",
      content: "Drive to Sonamarg (Golden Meadow, 80 kms). Thajiwas Glacier, Zero Point (own cost jeep). Stunning alpine scenery. Gateway to Ladakh. Evening return to Srinagar. Overnight in houseboat.",
    },
    {
      day: "Day 07",
      title: "SRINAGAR – DOODPATHRI – MUGHAL GARDENS",
      content: "Morning visit Doodhpatri (40 kms). Afternoon visit Nishat Bagh, Shalimar Bagh, Chashme Shahi. Shopping at Polo View. Enjoy Kashmiri Wazwan cuisine. Overnight stay in Srinagar.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "After breakfast, check out and transfer to Srinagar Airport / Jammu for onward journey. Tour concludes.",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU – KATRA",
      content: "Arrive Jammu Airport / Railway station. Drive to Katra (50 kms). Check in. Visit Katra market. Overnight stay in Katra.",
    },
    {
      day: "Day 02",
      title: "KATRA – VAISHNO DEVI – PAHALGAM",
      content: "Early morning Vaishno Devi darshan (14 km trek each way, optional). After return, drive to Pahalgam (230 kms, ~6 hours). Check in hotel. Overnight stay.",
    },
    {
      day: "Day 03",
      title: "PAHALGAM – ARU – BETAB – CHANDANVARI",
      content: "Full day Pahalgam sightseeing. Aru Valley, Betab Valley, ChandanVari. Horse riding, trekking (own cost). Baisaran meadow visit. Overnight stay in Pahalgam.",
    },
    {
      day: "Day 04",
      title: "PAHALGAM – SRINAGAR – DAL LAKE",
      content: "Drive to Srinagar. Check in houseboat on Dal Lake. Afternoon Shikara ride through floating gardens, lotus flowers, fish market on the lake. Evening market visit. Overnight on houseboat.",
    },
    {
      day: "Day 05",
      title: "SRINAGAR – GULMARG",
      content: "Drive to Gulmarg (2730 mtrs). Stay overnight in Gulmarg. Gondola ride (own cost). Snow activities, skiing. World's highest golf course. Sunset views of Himalayan range. Overnight in Gulmarg.",
    },
    {
      day: "Day 06",
      title: "GULMARG – SRINAGAR – SONAMARG",
      content: "Morning in Gulmarg, drive back to Srinagar then continue to Sonamarg (80 kms). Thajiwas Glacier trek. Zero Point via jeep (own cost). Golden meadows. Evening return to Srinagar. Overnight stay.",
    },
    {
      day: "Day 07",
      title: "SRINAGAR – DOODPATHRI",
      content: "After breakfast drive to Doodhpatri (40 kms). Beautiful meadows, milk-white streams. Local sightseeing. Afternoon return to Srinagar. Visit Hazratbal Shrine. Overnight stay in houseboat.",
    },
    {
      day: "Day 08",
      title: "SRINAGAR MUGHAL GARDENS & MARKETS",
      content: "Morning Nishat Bagh, Shalimar Bagh, Chashme Shahi gardens. Visit Shankaracharya Temple. Afternoon Polo View market — buy Kashmiri shawls, dry fruits, carpets, saffron. Overnight stay.",
    },
    {
      day: "Day 09",
      title: "DEPARTURE",
      content: "After breakfast, transfer to Srinagar Airport / Jammu Railway station. Tour ends. Safe onward journey.",
    },
  ],

  "9N10D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU",
      content: "Arrive Jammu Airport / Railway station. Check in hotel. Visit Raghunath Temple, Bahu Fort, Mubarak Mandi Palace. Evening at leisure. Overnight stay in Jammu.",
    },
    {
      day: "Day 02",
      title: "JAMMU – KATRA – VAISHNO DEVI",
      content: "Drive to Katra (50 kms). Vaishno Devi Darshan (14 km trek or helicopter option). Return to Katra. Overnight stay.",
    },
    {
      day: "Day 03",
      title: "KATRA – PAHALGAM",
      content: "Drive to Pahalgam via scenic NH-44 (230 kms, ~6 hours). En-route stop at Patnitop for views. Check in hotel. Evening walk by Lidder river. Overnight stay.",
    },
    {
      day: "Day 04",
      title: "PAHALGAM FULL DAY SIGHTSEEING",
      content: "Aru Valley, Betab Valley, ChandanVari, Baisaran (Mini Switzerland). Horse riding, trekking options. Explore local craft shops. Overnight stay in Pahalgam.",
    },
    {
      day: "Day 05",
      title: "PAHALGAM – SRINAGAR",
      content: "Drive to Srinagar. Visit Awantipora ruins en-route. Check in Dal Lake houseboat. Shikara ride on Dal Lake at sunset. Overnight stay on houseboat.",
    },
    {
      day: "Day 06",
      title: "SRINAGAR – GULMARG",
      content: "Drive to Gulmarg (60 kms). Gondola cable car ride (own cost). Snow activities. World's highest golf course. Panoramic Himalayan views. Overnight stay in Gulmarg resort.",
    },
    {
      day: "Day 07",
      title: "GULMARG – SRINAGAR – SONAMARG",
      content: "Morning at Gulmarg. Drive to Sonamarg (80 kms from Srinagar). Thajiwas Glacier. Zero Point excursion by jeep (own cost). Return to Srinagar. Overnight stay.",
    },
    {
      day: "Day 08",
      title: "SRINAGAR – DOODPATHRI – YUSMARG",
      content: "Morning Doodhpatri (40 kms). Afternoon visit Yusmarg — meadow of flowers, Doodh Ganga river, pine forests. Trekking options. Return to Srinagar. Overnight stay.",
    },
    {
      day: "Day 09",
      title: "SRINAGAR MUGHAL GARDENS & SHOPPING",
      content: "Nishat Bagh, Shalimar Bagh, Chashme Shahi. Shankaracharya Temple. Hazratbal Shrine. Afternoon shopping — Kashmiri carpets, pashmina shawls, dry fruits, saffron. Overnight on houseboat.",
    },
    {
      day: "Day 10",
      title: "DEPARTURE",
      content: "After leisurely breakfast on houseboat, check out. Transfer to Srinagar Airport / Jammu. Tour ends with unforgettable Kashmir memories.",
    },
  ],

  "12N13D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU",
      content: "Arrive Jammu. Visit Raghunath Temple, Bahu Fort. Evening at Jammu market. Overnight stay in Jammu hotel.",
    },
    {
      day: "Day 02",
      title: "JAMMU – PATNITOP – KATRA",
      content: "Drive to Patnitop (2024 mtrs) for scenic views and short trek. Continue to Katra. Check in hotel. Evening at Katra market. Overnight stay.",
    },
    {
      day: "Day 03",
      title: "VAISHNO DEVI DARSHAN",
      content: "Early morning Vaishno Devi Darshan trek (28 km round trip or helicopter option). Sacred cave shrine. Return to Katra by evening. Overnight stay.",
    },
    {
      day: "Day 04",
      title: "KATRA – PAHALGAM",
      content: "Drive to Pahalgam (230 kms). En-route see Chenab river, apple orchards, saffron fields. Check in hotel. Evening riverside walk. Overnight stay in Pahalgam.",
    },
    {
      day: "Day 05",
      title: "PAHALGAM – ARU – BETAB – CHANDANVARI",
      content: "Full day Pahalgam sightseeing. Aru Valley (11 km), Betab Valley (15 km), ChandanVari (16 km). Baisaran meadow. Horse riding, trekking (own cost). Overnight stay.",
    },
    {
      day: "Day 06",
      title: "PAHALGAM – SRINAGAR",
      content: "Drive to Srinagar via Awantipora ruins. Check in Dal Lake houseboat. Afternoon Shikara ride. Visit floating vegetable market. Overnight on houseboat.",
    },
    {
      day: "Day 07",
      title: "SRINAGAR – GULMARG",
      content: "Drive to Gulmarg (60 kms). Gondola ride to Kongdori & Afarwat Peak (own cost). Skiing, snow activities in season. Overnight stay in Gulmarg.",
    },
    {
      day: "Day 08",
      title: "GULMARG – SRINAGAR – SONAMARG",
      content: "Morning Gulmarg activities. Drive to Sonamarg (80 kms). Thajiwas Glacier. Zero Point by jeep (own cost). Golden Meadow views. Return to Srinagar. Overnight stay.",
    },
    {
      day: "Day 09",
      title: "SRINAGAR – DOODPATHRI – YUSMARG",
      content: "Doodhpatri morning visit (40 kms). Afternoon Yusmarg — meadow of flowers, Doodh Ganga, pine forests. Trekking available. Return to Srinagar. Overnight stay.",
    },
    {
      day: "Day 10",
      title: "SRINAGAR – GUREZ VALLEY",
      content: "Drive to Gurez Valley (125 kms) via Razdan Pass (3450 mtrs). Remote, pristine valley on the LoC. Habba Khatoon peak. Dawar village. Overnight stay in Gurez.",
    },
    {
      day: "Day 11",
      title: "GUREZ – SRINAGAR",
      content: "Morning explore Gurez — Tulail Valley, Kishanganga river. Drive back to Srinagar (125 kms). Evening Mughal Gardens — Nishat, Shalimar. Overnight on houseboat.",
    },
    {
      day: "Day 12",
      title: "SRINAGAR MARKETS & CULTURAL TOUR",
      content: "Shankaracharya Temple, Hazratbal Shrine. Polo View market — Kashmiri shawls, carpets, papier-mâché, dry fruits, saffron. Traditional Wazwan dinner. Overnight stay.",
    },
    {
      day: "Day 13",
      title: "DEPARTURE",
      content: "After breakfast check out from houseboat. Transfer to Srinagar Airport / Jammu Railway station for onward journey. Tour concludes with lifetime memories of Paradise on Earth.",
    },
  ],
};

// ============================================================
// ✅ CARD 2 — BHUTAN ITINERARY
// ============================================================
export const BHUTAN_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL IN THIMPHU & LEISURE DAY",
      content: "After arriving at the Paro airport, you will be transferred to Thimphu. Check into your hotel. You can spend the afternoon relaxing or visit the interesting Centenary Farmer's Market (only open on weekends). In the evening, visit the Tashichho Dzong (The Monk Body's block between 5:30-6:00 PM) as you stroll around the town. Overnight stay in Thimphu.",
    },
    {
      day: "Day 02",
      title: "THIMPHU SIGHTSEEING",
      content: "After breakfast, start your sightseeing tour of Thimphu. Visit the National Memorial Chorten, followed by the Buddha Point (Kuensel Phodrang) for panoramic views of Thimphu valley. Next, visit the Changangkha Monastery (the oldest temple in the valley) and the Takin Zoo. In the afternoon, visit Changlimithang Stadium, the Jungshi handmade paper factory, and the Institute for Zorig Chusum (13 arts and crafts School). Overnight stay at the hotel.",
    },
    {
      day: "Day 03",
      title: "PUNAKHA SIGHTSEEING",
      content: "Relish breakfast and leave for Punakha after obtaining a permit. Stop at the Dochula Pass en route, from where the highest peaks of Bhutan are visible. In Punakha, visit the Punakha Dzong, built at the confluence of Po and Mo Chu rivers. Afterwards, visit Chhimi Lhakhang. Check in and retire after a tiring day.",
    },
    {
      day: "Day 04",
      title: "PARO: ARRIVAL AND SIGHTSEEING",
      content: "Right after breakfast, check out and begin your drive to Paro. Enjoy the views of Shaba River Point and Paro Airport on your way. Arrive in Paro, check in, and then visit the great Paro Dzong. Overnight stay in Paro.",
    },
    {
      day: "Day 05",
      title: "PARO: TIGER'S NEST TREK",
      content: "After breakfast, embark on an adventurous trek to the popular Taktsang Monastery. This is a 5-hour trek to the Tiger's Nest, which is located on top of a cliff. After a rewarding time at the monastery, return to your hotel for an unwinding overnight stay.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After a delectable breakfast, check out and get transferred to the Paro airport. Board your flight back home.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT PARO & SIGHTSEEING",
      content: "Arrive at the Paro airport, complete formalities, and meet with our representatives. You will be transferred to your hotel in Paro. Visit the National Museum as well as the Paro Dzong (Rinpung Dzong). Spend the evening exploring the local markets. Overnight stay at the hotel.",
    },
    {
      day: "Day 02",
      title: "PARO: TIGER NEST MONASTERY",
      content: "Post breakfast, begin your hike to the Tiger Nest Monastery, which takes around 5 hours to reach. This monastery is one of the oldest in Bhutan and is clinging to a rock cliff, 900 m above the valley floor. After enjoying a memorable time, return to Paro. Overnight stay at the hotel.",
    },
    {
      day: "Day 03",
      title: "PUNAKHA SIGHTSEEING",
      content: "After breakfast, check out and begin your drive to Punakha. Visit Dochula Pass en route to capture splendid views of the higher Himalayas. In Punakha, begin by visiting the Punakha Dzong. This is followed by a trek to the Chhimi Lhakhang (temple of fertility). Walk through the rice fields. Overnight stay will be at the hotel.",
    },
    {
      day: "Day 04",
      title: "PUNAKHA: ADVENTURE & CAMPING",
      content: "After breakfast, check out and go for an exhilarating walk on the longest suspension bridge of Bhutan. Visit the Khamsum Yulley Namgyal Chorten by a short trek. Afterwards, embark on an adventurous river rafting and head to the camping grounds for the night. Overnight stay will be in tents at the campsite with dinner and bonfire.",
    },
    {
      day: "Day 05",
      title: "THIMPHU: ARRIVAL AND SIGHTSEEING",
      content: "After breakfast, check out and drive to Thimphu, the Capital of Bhutan. Check in at the hotel and relax. Spend the rest of the day visiting the interesting weekend markets or walk around the town and visit the Tashichho Dzong. Overnight stay at the hotel.",
    },
    {
      day: "Day 06",
      title: "THIMPHU SIGHTSEEING",
      content: "After breakfast, drive to Dodona. Visit the beautiful Tango monastery by hiking and return for a pleasant picnic lunch by the riverside. Drive back to Thimphu. As you arrive, visit the Buddha viewpoint, followed by the Simply Bhutan living Museum and the Crafts Bazaar. Overnight stay at the hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Grab a hearty breakfast and check out. You will be transferred to the airport by our representatives. Bid farewell to Bhutan as you board your flight back home.",
    },
  ],
};

// ============================================================
// ✅ CARD 3 — DUBAI ITINERARY
// ============================================================
export const DUBAI_ITINERARY: ProductItinerary = {

  "4N5D": [
    {
      day: "Day 01",
      title: "ARRIVAL & DHOW CRUISE",
      content: "Welcome to Dubai. Arrive at Dubai airport and transfer to your hotel. In the evening, proceed for Dhow Cruise with buffet dinner. Experience cruising on a traditional wooden vessel surrounded by Arabic music. Overnight in Dubai.",
    },
    {
      day: "Day 02",
      title: "CITY TOUR, BURJ KHALIFA & AQUARIUM",
      content: "Experience the historic sites of Dubai. Visit Jumeirah Mosque, stop at Jumeirah Public Beach, and take a photo stop at Burj Al Arab. Pass by Sheikh Mohamed palace and later visit Burj Khalifa at the Top (124th Floor). Following this, visit Aquarium and Underwater Zoo inside Dubai Mall. Overnight in Dubai.",
    },
    {
      day: "Day 03",
      title: "DESERT SAFARI WITH DINNER",
      content: "After breakfast, proceed for a thrilling Desert Safari. Stop to watch the beautiful sunset before reaching the campsite. Enjoy a camel ride and have the opportunity for sand boarding (at additional cost). Enjoy a delicious barbeque dinner followed by a belly dancing performance. Overnight in Dubai.",
    },
    {
      day: "Day 04",
      title: "DAY AT LEISURE (OPTIONAL: ABU DHABI / FRAME)",
      content: "After breakfast, the day is at leisure. You can explore Dubai on your own or visit Dubai Mall for shopping. Optional tours include: Abu Dhabi city tour & Ferrari World, Dubai Frame, or Museum of Future (all at additional price). Overnight in Dubai.",
    },
    {
      day: "Day 05",
      title: "DEPARTURE",
      content: "After breakfast, it's time to check out. Transfer to the airport for your onward flight or back home.",
    },
  ],

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL IN DUBAI & DHOW CRUISE",
      content: "On your arrival, our representative will welcome you and take you to Dhow Cruise. Enjoy the Dubai Creek, Magician show, and International Buffet. Have your dinner with music and Tanura Dance show. Check into your hotel.",
    },
    {
      day: "Day 02",
      title: "DESERT SAFARI",
      content: "After breakfast, you will be taken for a thrilling Desert Safari with dune bashing in a 4x4 Land Cruiser. Indulge in activities like camel riding, henna painting, and Hubble-Bubble (Shisha) smoking. Enjoy a lavish Barbeque dinner and Belly Dance performance. Return to the hotel.",
    },
    {
      day: "Day 03",
      title: "DUBAI CITY TOUR & BURJ KHALIFA",
      content: "Enjoy a delightful breakfast. Start with a half-day city tour. Visit the Jumeirah Mosque, Jumeirah Beach, and the Burj Al Arab. Walk through the narrow lanes of Bastakiya and enjoy an Abra ride. Shop at the Spice Souk and Gold Souk. In the afternoon, visit the Burj Khalifa.",
    },
    {
      day: "Day 04",
      title: "DAY AT LEISURE",
      content: "A relaxed start with a toothsome traditional breakfast. The day is at leisure. You can stay indoors and just relax or go out and explore nearby attractions, have a shopping spree in local markets, or enjoy the traditional exotic cuisine of Dubai.",
    },
    {
      day: "Day 05",
      title: "PALM JUMEIRAH: ATLANTIS, THE PALM",
      content: "Have your breakfast. Get ready to be transferred to Atlantis, The Palm in Palm Jumeirah Island. Enjoy the aquariums and marine life in the famous Lost chambers of Atlantis. The cost of entry tickets is included.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After a hearty breakfast, you will be transferred to the airport for your final departure.",
    },
  ],
};

// ============================================================
// ✅ CARD 4 — VIETNAM ITINERARY
// ============================================================
export const VIETNAM_ITINERARY: ProductItinerary = {

  "6N7D": [
    {
      day: "Day 01",
      title: "HANOI ARRIVAL",
      content: "Upon reaching Hanoi, complete the immigration and visa on arrival process at the airport. Meet our driver and board your transfers to reach the pre-booked hotel. After check-in, you will have free time for leisure to enjoy the Old Quarter and the bustling local life. Return to the hotel for an overnight stay.",
    },
    {
      day: "Day 02",
      title: "NINH BINH DAY TRIP",
      content: "After a hearty breakfast, start your journey to Ninh Binh province. Visit Hoa Lu, the Ancient Capital of the Dinh dynasty. See the age-old temples built on the grounds of the old royal palace. In the afternoon, start a 2-hour boat trip to Tam Coc, popularly known as 'Halong Bay on land,' passing through limestone mountains and rice paddies, including 3 caves. Afterwards, climb 500 steps to Mua Cave (Lying Dragon Peak) for a splendid sunset view. Overnight stay in Hanoi.",
    },
    {
      day: "Day 03",
      title: "HANOI TO HALONG BAY",
      content: "After breakfast, start your drive to Halong Bay, passing through the Red River Delta. Upon arrival, board a traditional cruise (junk). In the afternoon, explore the stunning caves, clean beaches, and floating villages scattered across the bay. After a delicious lunch onboard, you can join the chef's cooking demonstration and try traditional Vietnamese cooking skills. In the evening, enjoy the sunset on the sundeck. Options for entertainment include Movie Night or Squid Fishing with dinner. Overnight stay on the cruise.",
    },
    {
      day: "Day 04",
      title: "HALONG BAY TO DA NANG",
      content: "Start your day with the sunrise and a Tai Chi lesson on the sundeck. Have a light breakfast followed by brunch. Continue exploring Halong Bay. After returning to Hanoi, the driver will transfer you to the airport for your flight to Da Nang. Upon arrival in Da Nang, transfer to the hotel and check in. Use the free time to explore the vibrant nightlife, local cuisine, and night markets.",
    },
    {
      day: "Day 05",
      title: "BA NA HILLS FULL DAY TRIP",
      content: "Embark on a full-day trip to Ba Na Hills, famous for its breathtaking mountain scenery and French colonial architecture. Enjoy a Cable Car ride, one of the longest and highest in the world. Visit the Golden Bridge, a pedestrian bridge held up by giant stone hands. At the top, explore other attractions like the French Village, a flower garden, an amusement park, and a Wax Museum.",
    },
    {
      day: "Day 06",
      title: "MARBLE MOUNTAIN AND HOI AN ANCIENT TOWN",
      content: "Hotel pickup in the afternoon (15:00 - 15:30). Start your tour by visiting the Non Nuoc carvings-stone village. Conquer the Marble Mountains, where you can explore caves and ancient temples (like Linh Ung and Tam Thai). At 17:30, do some local market shopping. At 18:00, have dinner at a charming restaurant in Hoi An. At 19:30, stroll through the Hoi An Ancient Town (a UNESCO World Heritage site) and witness the city's magical transformation illuminated by colorful lanterns. At 20:00, you will be dropped back at your hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "After a delightful breakfast, check out from the hotel and take your transfer to the airport. Your splendid Vietnam tour comes to an end.",
    },
  ],
};

// ============================================================
// ✅ CARD 5 — MALDIVES ITINERARY
// ============================================================
export const MALDIVES_ITINERARY: ProductItinerary = {

  "4N5D": [
    {
      day: "Day 01",
      title: "ARRIVAL & LEISURE DAY",
      content: "On your arrival at the airport in Maldives, you will be received by our representative. After a warm welcoming session, board the speedboat waiting to transfer you to the resort. Complete all check-in formalities and unwind in your rooms. The remaining part of the day is free for you to relax and enjoy the mesmerising views of crystal clear waters and sandy beaches. Later, enjoy a comfortable overnight stay at the hotel.",
    },
    {
      day: "Day 02",
      title: "LEISURE DAY",
      content: "After a lip-smacking breakfast, the rest of the day is free for you to explore the tropical paradise as you wish. Bask in the sun while relaxing on the beach beds, enjoy a session of swimming, or just take time off and relax in your rooms. After enjoying a full day at leisure, head back to the hotel for an overnight stay.",
    },
    {
      day: "Day 03",
      title: "LEISURE DAY",
      content: "Wake up to a refreshing day and get ready to savor a delicious breakfast. Day 3 is free for you to explore at leisure. You can opt to partake in several activities of your liking at the resort. As the day gets over, return to the hotel for an overnight stay.",
    },
    {
      day: "Day 04",
      title: "LEISURE DAY & ROMANTIC DINNER (OPTIONAL)",
      content: "After a heart-filling breakfast, enjoy another day at leisure. Spend time with each other amidst the majestic landscapes and soothing environment, or head out to embark on a shopping spree. Couples can also go out for a romantic dinner date at one of the restaurants or cafes (at one's own expense). Later, head back to the hotel for an overnight stay.",
    },
    {
      day: "Day 05",
      title: "DEPARTURE",
      content: "After a scrumptious breakfast, pack your luggage, and prepare to check out from the hotel. Our representative will escort you to the airport via a speedboat from where you can board your flight back home.",
    },
  ],
};

// ============================================================
// ✅ CARD 6 — NEPAL ITINERARY
// ============================================================
export const NEPAL_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL IN KATHMANDU",
      content: "After arriving at the Tribhuvan International Airport, Kathmandu, the agency representative will escort you to the hotel. After check-in, unwind yourself and take rest. Engage yourself in the evening walk at the Kathmandu Durbar Square. At night, indulge yourself into deep and peaceful sleep at the hotel room.",
    },
    {
      day: "Day 02",
      title: "NAGARKOT: ARRIVAL AND ENROUTE SIGHTSEEING IN KATHMANDU",
      content: "Have a tasty breakfast at the hotel. Get ready for strolling around this popular city in Nepal. Spend some spare time at the few sightseeing — Pashupatinath, Swayambhunath and Patan Durbar Square and drive to Nagarkot. Check-in at the hotel and have a good sleep at the hotel room.",
    },
    {
      day: "Day 03",
      title: "SIGHTSEEING AND TRAVEL TO JANAKPUR",
      content: "Wake up early for the ultimate surprise of picturesque sunrise from the Nagarkot View Tower. After witnessing the blissful moment, get back to the hotel for a delicious breakfast. Get ready to explore the local sightseeing of Bhaktapur. Then, drive back directly to Janakpur via private car. Check-in the hotel and spend your night there.",
    },
    {
      day: "Day 04",
      title: "EXPLORING JANAKPUR",
      content: "Wake up early and have the hearty breakfast at the hotel. Then, get out to explore the famous sightseeing — Ram Mandir, Janaki Mandir, Raj Devi Mandir, Ganga Sagar, Mani Mandip, Mithila Art Gallery, and Dhanusha Dham. Overnight stay at the hotel.",
    },
    {
      day: "Day 05",
      title: "TRAVEL TO KATHMANDU AND LEISURE",
      content: "Have the delightful breakfast at the hotel. Get ready to have a drive to Kathmandu via private car. Check-in the hotel. Today, you have the full day for leisure activities. Unwind yourself by just relaxing at the hotel or taking a short and refreshing walk in the local markets. Overnight stay at the hotel in Kathmandu.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After having a delightful breakfast, check out from the hotel. You will be transferred to the Tribhuvan International Airport, Kathmandu for your flight back home.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT GORAKHPUR & DRIVE TO POKHARA",
      content: "Arrive at Gorakhpur Railway station and proceed to Pokhara. En route, visit the Gorakhnath Temple. Check-in at the hotel in Pokhara for an overnight stay.",
    },
    {
      day: "Day 02",
      title: "POKHARA CITY TOUR",
      content: "After breakfast, proceed for a full day of sightseeing in Pokhara. Attractions include Gupteshwar Mahadev Cave, Barahi temple, Seti river, Vindhyawasini Temple, Devil's fall (White waterfall), and Fewa lake. Overnight stay in Pokhara.",
    },
    {
      day: "Day 03",
      title: "POKHARA TO KATHMANDU",
      content: "Have breakfast, check out, and proceed towards Kathmandu (4-5 hours journey). En route, you will visit the Manokamana Temple. Check-in at Kathmandu, and the rest of the day is at leisure.",
    },
    {
      day: "Day 04",
      title: "KATHMANDU LOCAL SIGHTSEEING",
      content: "After breakfast, visit temples in Kathmandu such as Pashupatinath Temple, Gujeshwari, Syambhunath, Budhaneelkantha, and the Royal Palace. Return to the hotel for an overnight stay.",
    },
    {
      day: "Day 05",
      title: "KATHMANDU TO CHITWAN",
      content: "Check out from Kathmandu and transfer to Chitwan. Check into your hotel and spend the rest of the day at leisure. A package for the next day's activities, including a Tharu cultural Program, is purchased with a local agent. Overnight stay in Chitwan.",
    },
    {
      day: "Day 06",
      title: "CHITWAN ACTIVITIES & TRAVEL TO GORAKHPUR",
      content: "After breakfast, enjoy the booked package which includes a Jeep/Elephant safari, Elephant Bath, Elephant Breeding Centre, Canoe ride, and a jungle/village walk. After jungle activities, proceed to Bhairhawa and spend the night at a hotel in Gorakhpur.",
    },
    {
      day: "Day 07",
      title: "FINAL DAY AND DEPARTURE",
      content: "After breakfast, you will be picked up from the hotel and dropped at Gorakhpur Airport.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "ARRIVAL IN KATHMANDU",
      content: "Arrive at Kathmandu Airport, meet with the representative, and transfer to the hotel. Rest of the day is free for individual activities. Overnight stay at the hotel.",
    },
    {
      day: "Day 02",
      title: "KATHMANDU - PATAN SIGHTSEEING",
      content: "Sightseeing starts with Pashupatinath Temple and Bouddhanath Stupa (one of the biggest Stupa in the World). After lunch, drive to Patan city to visit Patan Durbar Square, Krishna Temple, Golden temple, and Patan museum. These are all UNESCO world heritage sites.",
    },
    {
      day: "Day 03",
      title: "KATHMANDU TO CHITWAN & JUNGLE ACTIVITIES",
      content: "After breakfast, depart early to Chitwan National Park (a UNESCO world heritage site). After lunch, you will do Jungle walking, a Tharu (ethnic group) village tour, and watch the sunset view in Budhi Rapti River. Overnight stay at the resort in Chitwan.",
    },
    {
      day: "Day 04",
      title: "FULL DAY CHITWAN ACTIVITIES",
      content: "Start a full day of Jungle activities, including a visit to the Elephant Breeding Center, canoeing on the Budhi Rapti River to see reptiles, an Elephant Safari, Jungle walking, Bird watching, and watching the Tharu cultural show in the evening.",
    },
    {
      day: "Day 05",
      title: "CHITWAN TO POKHARA",
      content: "After breakfast, depart to Pokhara (6-7 hours drive). Pokhara is the natural city of lakes and Mountains. En route, there is Optional Rafting in Phewa Lake @INR3500 per person. Overnight stay at Pokhara.",
    },
    {
      day: "Day 06",
      title: "POKHARA SIGHTSEEING",
      content: "Drive up to the Sarangkot hill for sunrise view (with Optional Paragliding @INR8500 per person). On the way, visit Bindabasini temple. After breakfast, start Pokhara valley sightseeing, including Davis falls and Gupteshwor cave. Afternoon is for shopping, individual activities & boating on Fewa Lake, visiting Talbarahi temple. Overnight stay at Pokhara.",
    },
    {
      day: "Day 07",
      title: "POKHARA TO KATHMANDU",
      content: "After breakfast, departure to Kathmandu. By road it needs 6-7 hours. Optional Zipline flyer or Bungee Jumping @INR6000 pp. On the way you can visit Manakamana Temple. Rest of the time is free for individual activities. Overnight stay at the hotel.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "After breakfast, morning is free for individual activities. Transfer to the airport for your final departure.",
    },
  ],
};

// ============================================================
// ✅ CARD 7 — SRI LANKA ITINERARY
// ============================================================
export const SRILANKA_ITINERARY: ProductItinerary = {

  "6N7D": [
    {
      day: "Day 01",
      title: "COLOMBO: ARRIVAL, SIGHTSEEING & TRANSFER TO KANDY",
      content: "Upon arrival at Colombo International Airport (CMB), you will be greeted by our representative and escorted to Kandy. En route, visit Pinnawala Elephant Orphanage, where you can witness caretakers feeding and bathing abandoned elephants. Next, visit Peradeniya Botanical Gardens to spot different varieties of orchids and medicinal plants. Then, visit the Temple of Tooth Relic (Sri Dalada Maligawa) and the Gem Museum. After check-in, relax at the hotel for the overnight stay in Kandy.",
    },
    {
      day: "Day 02",
      title: "NUWARA ELIYA: SCENIC DRIVE & SIGHTSEEING",
      content: "Post a lavish breakfast, check-out and head out for Nuwara Eliya. En route, visit the scenic Peradeniya Botanical Garden and a tea factory while driving through the winding hills. In Nuwara Eliya, visit Seetha Amman Temple and Ashok Vatika. Then, stop at Gregory Lake. Check in to your hotel for an overnight stay in Nuwara Eliya.",
    },
    {
      day: "Day 03",
      title: "NUWARA ELIYA: HORTON PLAINS NATIONAL PARK",
      content: "Begin your day with an early start and drive to Horton Plains National Park at 6:00 AM. Embark on a challenging trek to the beautiful World's End and Baker's Falls. After the trek, return to your hotel for breakfast. The rest of the day is at leisure. Overnight stay in Nuwara Eliya.",
    },
    {
      day: "Day 04",
      title: "BENTOTA: TRAVEL & LEISURE DAY",
      content: "Enjoy breakfast and check out from your hotel as you travel to Bentota. Upon arrival, check-in at the hotel. Spend the rest of the day at your leisure. You can opt to relax on the golden beaches of Bentota or indulge in watersports like jetskiing, windsurfing, or parasailing (at your own expense). Overnight stay in Bentota.",
    },
    {
      day: "Day 05",
      title: "BENTOTA: MADHU RIVER SAFARI & TURTLE HATCHERY",
      content: "Enjoy breakfast and travel to Bentota. Embark on a boat ride along the Madhu River, passing islets forested with mangroves on this scenic tour. Also, visit the Turtle Hatchery, a prime turtle nesting site where you can see huge tanks filled with newborn hatchlings. Come back to your hotel in Bentota for an overnight rest.",
    },
    {
      day: "Day 06",
      title: "COLOMBO: TRANSFER & CITY EXPLORATION",
      content: "Post breakfast, check-out from the hotel and leave for Colombo. En route, visit another Turtle Hatchery. Upon your arrival in Colombo, check-in at the hotel. In the evening, you can stroll on the shopping streets or try out the local food. Overnight stay at the hotel in Colombo.",
    },
    {
      day: "Day 07",
      title: "COLOMBO: DEPARTURE FROM SRI LANKA",
      content: "Begin the day with a scrumptious breakfast. Spend some time leisurely before your departure. In the afternoon, check-out from the hotel and you will be transferred to Colombo International Airport to board your flight back home.",
    },
  ],
};

// ============================================================
// ✅ CARD 8 — BALI ITINERARY
// ============================================================
export const BALI_ITINERARY: ProductItinerary = {

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL BALI & LEISURE DAY IN KUTA",
      content: "Arrive at the Ngurah Rai International Airport in Bali, where you will be met by a representative. You will be transferred to your hotel in Kuta, where you check in and can relax for a while. You have the rest of the day at leisure to explore the area, spend time at the beach, or look at the local markets. You can enjoy one of the most beautiful sunsets of your lives. Return to the hotel for a relaxing night.",
    },
    {
      day: "Day 02",
      title: "SOUTH BALI TOUR WITH WATER SPORTS",
      content: "After breakfast, proceed for a South Bali tour including Water Sports activities at Bintang Beach Club. Activities include Jet Ski, Banana Boat, and Fly Fish. Afterwards, visit Uluwatu Temple and Dreamland Beach. Return back to the hotel for an overnight stay in Kuta.",
    },
    {
      day: "Day 03",
      title: "NORTH BALI TOUR",
      content: "After breakfast, you will leave for a North Bali Tour. Visit Twin Lake View, Ulun Danu Beratan Temple, Wanagiri hidden hills, and Handara Gate. Return back to the hotel for an overnight stay in Kuta. Start your tour as early as possible, as the Bedugul area often gets cloudy in the afternoon.",
    },
    {
      day: "Day 04",
      title: "O CLUB BY OCULUS KINTAMANI - MT BATUR VIEW POINT",
      content: "After a delicious breakfast, visit Tegallalang Rice Terrace. Then, visit O Club By Oculus at Kintamani Range to enjoy the warm water swimming pool with Mt Batur View. Warm water swimming starts at 3:00 pm. Compulsory Towel and Locker charges of 50,000 IDR per person need to be paid directly to the club.",
    },
    {
      day: "Day 05",
      title: "KUTA TO UBUD TRANSFER & SIGHTSEEING",
      content: "After a delicious breakfast, check out from the hotel in Kuta. Today you will be transferred to Ubud. Check in to your new hotel. Afterwards, visit Tanah Lot Temple and PicHeaven Bali Swing. Evening back to the hotel for an overnight stay in Ubud.",
    },
    {
      day: "Day 06",
      title: "LEISURE DAY",
      content: "Enjoy your delicious breakfast at the hotel. Spend the day at leisure. You can visit places nearby the hotel or simply relax and enjoy your free time. Overnight stay at the hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "After breakfast, check out from the hotel. Proceed to the airport as per your flight schedule, taking back sweet memories of Bali Island.",
    },
  ],
};

// ============================================================
// ✅ CARD 9 — SINGAPORE ITINERARY
// ============================================================
export const SINGAPORE_ITINERARY: ProductItinerary = {

  "6N7D": [
    {
      day: "Day 01",
      title: "SINGAPORE: ARRIVAL & NIGHT SAFARI",
      content: "On your arrival in Singapore, a representative will meet and escort you to your hotel. After you check in and relax, get ready for an exciting trip in the evening. You will visit the world's first wildlife park at night, the Night Safari. Watch how animals behave in their natural habitat when night falls. Return to the hotel for a relaxing overnight stay.",
    },
    {
      day: "Day 02",
      title: "SINGAPORE: CITY TOUR & SENTOSA ISLAND",
      content: "Savor a hearty breakfast at the hotel and proceed for an amazing Singapore City Tour. Visit Chinatown, Gem Factory, Little India, and the Central Business District. Walk through Orchard Road and explore museums, The Esplanade, and Kampong Glam. Once you have visited the city's major attractions, you will be taken to the tranquil Sentosa Island. Tickets include a one-way cable car, Underwater World, Dolphin Lagoon, and Songs of the Sea. Return to the hotel for a peaceful overnight stay.",
    },
    {
      day: "Day 03",
      title: "SINGAPORE: UNIVERSAL STUDIOS TRIP",
      content: "After breakfast, be prepared to live the movies at Universal Studios - Asia's only Hollywood movie theme park. The theme park offers thrilling rides and shows based on popular blockbuster movies. Enjoy the day exploring the park. Come back to the hotel for a relaxing overnight stay in Singapore.",
    },
    {
      day: "Day 04",
      title: "KUALA LUMPUR: TRANSFER & CITY TOUR",
      content: "Enjoy a filling breakfast, check out from the hotel, and take your flight from Singapore to Kuala Lumpur. Upon arrival, check-in at the hotel. In the evening, leave for a Kuala Lumpur City Tour. Attractions include the King's Palace, National Monument, National Museum, National Mosque, Sultan Abdul Samad Building, and Petronas Twin Towers. Return to the hotel after an action-packed day for a refreshing overnight stay.",
    },
    {
      day: "Day 05",
      title: "KUALA LUMPUR: FUN-FILLED DAY AT SUNWAY LAGOON",
      content: "Savor a delectable breakfast and leave for Sunway Lagoon, a one-stop destination for non-stop fun and entertainment with more than 80 attractions sprawling across 88 acres. Enjoy the rides of the Amusement Park and have splashing moments at the Water Park. Interact with the animals at the Wildlife Park and gear up for more action at the Extreme Park, followed by an experience to face your fears at the Scream Park. Return to the hotel and stay overnight.",
    },
    {
      day: "Day 06",
      title: "KUALA LUMPUR: TOUR TO GENTING",
      content: "Have a hearty breakfast and check out from the hotel, then start for Genting. En route, you will be greeted by many sightseeing attractions that include Batu Caves and a one-way cable car ride. Take time to explore these limestone caves that have religious significance. Once you reach Genting, be prepared to visit Snow World, a theme park. Return to KL and stay overnight at the hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Have breakfast in your hotel and check out. You will be transferred to the airport where you will board a flight back home.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 1 — GOA BEACH ITINERARY
// ============================================================
export const GOA_ITINERARY: ProductItinerary = {

  "3N4D": [
    {
      day: "Day 01",
      title: "GOA ARRIVAL & LEISURE",
      content: "As you arrive at the Goa airport/railway station, an agent's representative will receive you and escort you to the hotel. Complete check-in formalities and relax for some time. Spend the entire first day of your Goa trip leisurely. Explore the sun-kissed beaches of Goa or try some amazing Goan delicacies like pork vindaloo and Goan fish curry. Come back to the hotel for a good night's sleep.",
    },
    {
      day: "Day 02",
      title: "NORTH GOA SIGHTSEEING",
      content: "Have breakfast and get ready to embark on a full-day North Goa sightseeing tour. The first attraction that you will visit is the ancient Fort Aguada. Later, explore Baga Beach, Anjuna Beach, Sinquerim Fort & Beach, and Vagator Beach. Come back to the hotel and sleep off the night.",
    },
    {
      day: "Day 03",
      title: "SOUTH GOA SIGHTSEEING",
      content: "Relish a delicious breakfast and get ready to explore the tourist hotspots of South Goa. Visit Shri Shantadurga Temple at Kavlem and Shri Manguesh Temple at Priol. Next, take a trip to the churches of Old Goa like Basilica of Bom Jesus and Se Cathedral. Post lunch, visit the Dona Paula Bay and Miramar Beach. Later, indulge in street shopping at the Panjim Market.",
    },
    {
      day: "Day 04",
      title: "DEPARTURE",
      content: "Post breakfast, check-out from the hotel and you will be transferred to the airport/railway station to reach your home destination, thereby, marking an end to your fun-filled Goa holiday.",
    },
  ],

  "4N5D": [
    {
      day: "Day 01",
      title: "GOA ARRIVAL & LEISURE",
      content: "As you arrive at the Goa airport/railway station, an agent's representative will receive you and escort you to the hotel. Complete check-in formalities and relax for some time. Spend the entire first day of your Goa trip leisurely. Explore the sun-kissed beaches of Goa or try some amazing Goan delicacies. Come back to the hotel for a good night's sleep.",
    },
    {
      day: "Day 02",
      title: "NORTH GOA SIGHTSEEING",
      content: "Have breakfast and get ready to embark on a full-day North Goa sightseeing tour. Visit the ancient Fort Aguada. Later, explore Baga Beach, Anjuna Beach, Sinquerim Fort & Beach, and Vagator Beach. Come back to the hotel and sleep off the night.",
    },
    {
      day: "Day 03",
      title: "SOUTH GOA SIGHTSEEING",
      content: "Relish a delicious breakfast and get ready to explore the tourist hotspots of South Goa. Visit Shri Shantadurga Temple and Shri Manguesh Temple. Next, take a trip to the churches of Old Goa like Basilica of Bom Jesus and Se Cathedral. Post lunch, visit the Dona Paula Bay and Miramar Beach. Later, indulge in street shopping at the Panjim Market.",
    },
    {
      day: "Day 04",
      title: "DAY FOR FREE & CRUISE DINNER",
      content: "After breakfast enjoy your day visiting a nearby beach and market for some shopping. In the evening, enjoy a Cruise Dinner and then return back to the hotel for an overnight stay.",
    },
    {
      day: "Day 05",
      title: "DEPARTURE",
      content: "Post breakfast, check-out from the hotel and you will be transferred to the airport/railway station to reach your home destination, thereby, marking an end to your fun-filled Goa holiday.",
    },
  ],

  "5N6D": [
    {
      day: "Day 01",
      title: "GOA ARRIVAL & LEISURE",
      content: "As you arrive at the Goa airport/railway station, an agent's representative will receive you and escort you to the hotel. Complete check-in formalities and relax for some time. Spend the entire first day of your Goa trip leisurely. Explore the sun-kissed beaches of Goa or try some amazing Goan delicacies. Come back to the hotel for a good night's sleep.",
    },
    {
      day: "Day 02",
      title: "NORTH GOA SIGHTSEEING",
      content: "Have breakfast and get ready to embark on a full-day North Goa sightseeing tour. Visit the ancient Fort Aguada. Later, explore Baga Beach, Anjuna Beach, Sinquerim Fort & Beach, and Vagator Beach. Come back to the hotel and sleep off the night.",
    },
    {
      day: "Day 03",
      title: "SOUTH GOA SIGHTSEEING",
      content: "Relish a delicious breakfast and get ready to explore the tourist hotspots of South Goa. Visit Shri Shantadurga Temple and Shri Manguesh Temple. Next, take a trip to the churches of Old Goa like Basilica of Bom Jesus and Se Cathedral. Post lunch, visit the Dona Paula Bay and Miramar Beach. Later, indulge in street shopping at the Panjim Market.",
    },
    {
      day: "Day 04",
      title: "CASINO & LOCAL MARKET",
      content: "After breakfast visit the local market. In the evening, enjoy a day at the Casino. Return back to the hotel for overnight stay.",
    },
    {
      day: "Day 05",
      title: "BEACHES & SHOPPING",
      content: "After breakfast visit Shopping Market & some shopping. Then visit the beaches area, enjoy your leisure time. Return back to the hotel for an overnight stay.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "Post breakfast, check-out from the hotel and you will be transferred to the airport/railway station to reach your home destination, thereby, marking an end to your fun-filled Goa holiday.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 2 — RAJASTHAN ITINERARY
// ============================================================
export const RAJASTHAN_ITINERARY: ProductItinerary = {

  "2N3D-JSL": [
    {
      day: "Day 01",
      title: "ARRIVAL IN JAISALMER",
      content: "On arrival meet & greet your driver and transfer to hotel. Evening visit the Gadisar Lake to enjoy the Sunset view over the fort. Overnight Jaisalmer.",
    },
    {
      day: "Day 02",
      title: "INN JAISALMER",
      content: "After delicious breakfast at the hotel drive towards Longewala. Visit the Indo-Pak border. Visit the Tanot Mata Temple & War Memorial Museum. Later drive towards Sam Sand Dunes. On arrival check-in to the desert camp. Evening enjoy the Sunset view at the dunes during the camel Safari. Later relish the dinner with cultural dances. Overnight at the desert camp.",
    },
    {
      day: "Day 03",
      title: "DEPARTURE",
      content: "After delicious breakfast at the hotel embark for the sightseeing tour of the city. We will visit the Jaisalmer Fort, Jain Temple, Salim Singh Ki Haveli & Patwa Haveli. Later drop at Jaisalmer Airport / Railway station for journey towards home.",
    },
  ],

  "2N3D-UDP": [
    {
      day: "Day 01",
      title: "ARRIVAL IN UDAIPUR",
      content: "Arrive in Udaipur, where your personal driver will pick you up from the airport or railway station and transfer you to your hotel. Check-in at the hotel and rest for a while before heading out for a half-day sightseeing adventure. Explore iconic attractions including the City Palace, the fascinating Vintage Car Museum, and enjoy a serene boat ride on Lake Pichola. Experience the thrill of the Karni Mata Ropeway, riding a cable car to witness breathtaking panoramic views of Udaipur. In the evening, immerse yourself in the local culture by strolling through the bustling markets and indulging in delicious street food. Return to your hotel for an overnight stay.",
    },
    {
      day: "Day 02",
      title: "UDAIPUR SIGHTSEEING WITH BAHUBALI HILL",
      content: "After breakfast we will start city tour of Udaipur. Driver will pick you up from your hotel and drive to Bahubali Hill, Saheliyon ki Bari, Jagdish Temple, Sajjangarh Palace, Jag Mandir Palace and famous Lake Pichola. After that come back to your hotel and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "NATHDWARA SHRINATHJI – HALDIGHATI + DROP",
      content: "After breakfast excursion of Udaipur visit: Eklingji Mahadev Temple, Nathdwara Shrinathji Temple & Haldighati Maharana Pratap Museum. After return back Udaipur drop at nearby Railway Station.",
    },
  ],

  "3N4D-KUMB": [
    {
      day: "Day 01",
      title: "ARRIVAL IN UDAIPUR",
      content: "Meet our driver at Udaipur Airport/Railway Station. Check-in at Hotel & Day for Leisure. If time allows you explore local market, which is famous for its traditional lifestyle, pichwai & miniature paintings, handicraft silver and copper jewelry, sculptures, gemstone and minakari items. Overnight stay at Udaipur Hotel.",
    },
    {
      day: "Day 02",
      title: "UDAIPUR SIGHTSEEING",
      content: "After breakfast we will start city tour of Udaipur. The city of lakes Udaipur is surrounded by azure water lakes and located in lush green hills of Aravallis. You will explore City Palace, Sajjangarh Palace, Vintage Car Museum, Jag Mandir Palace and famous Lake Pichola. After that come back to your hotel and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "UDAIPUR – KUMBHALGARH – UDAIPUR",
      content: "After having breakfast at the hotel we start our trip from Udaipur to Kumbhalgarh Fort, which is 80 kms and takes approximately 2 hrs to reach. Kumbhalgarh Fort is birthplace of Mewar's legendary king Maharana Pratap. It has second largest wall after the great wall of China. There is a magnificent array of temples built by the Mauryas of which the most picturesque place is the Badal Mahal or the palace of the clouds. At Sunset, a beautiful light and sound show is organised in the fort. In evening head back to Udaipur. Overnight stay in Udaipur.",
    },
    {
      day: "Day 04",
      title: "DEPARTURE",
      content: "After Breakfast, Check-out from hotel and drop to Udaipur Airport/Railway Station.",
    },
  ],

  "3N4D-CHITTO": [
    {
      day: "Day 01",
      title: "UDAIPUR ARRIVAL",
      content: "Welcome to Udaipur. Udaipur was founded in 1553 by Maharana Udai Singh II as the new capital of Mewar Kingdom. Famously known as 'The City of Lake' and often referred to as the 'Venice of the East'. On arrival at the airport, proceed to your hotel. Rest of the day is at leisure. Optional: In the evening you can enjoy a boat ride on the Lake Pichola at direct payment basis. Overnight in Udaipur.",
    },
    {
      day: "Day 02",
      title: "UDAIPUR CITY TOUR",
      content: "Udaipur was founded in 1553 by Maharana Udai Singh II as the new capital of Mewar Kingdom. Famously known as 'The City of Lake' and often referred to as the 'Venice of the East'. Udaipur is located around azure water lakes and is hemmed in by lush green hills of Aravallis. Full day city tour. Overnight in Udaipur.",
    },
    {
      day: "Day 03",
      title: "UDAIPUR – CHITTORGARH – UDAIPUR",
      content: "Today after breakfast we visit Chittorgarh Fort — symbol of bravery of Rajputs, also a UNESCO world heritage site. Here we will see Ranakumbha Palace — place where founder of Udaipur Maharana Udai Singh was born, Meera Mandir — was once the home of famous bhakti poetess Meerabai, Vijay Stambha — victory monument constructed by Mewar king to commemorate victory over Mahmud Khilji and Queen Padmini's Palace — located amidst water bodies. In the evening return to Udaipur. Overnight in Udaipur.",
    },
    {
      day: "Day 04",
      title: "UDAIPUR – DEPARTURE",
      content: "After breakfast proceed to Udaipur Airport/Station to board flight or train to your hometown. Holiday Concludes.",
    },
  ],

  "5N6D-JSL": [
    {
      day: "Day 01",
      title: "JAIPUR ARRIVAL",
      content: "Pick up from Jaipur Airport/Railway Station and transfer to hotel. On the way visit Sisodiya Rani Temple, Laxmi Narayan Temple. Overnight at Jaipur.",
    },
    {
      day: "Day 02",
      title: "JAIPUR SIGHTSEEING",
      content: "Jaipur local sightseeing covering HawaMahal, City Palace, Amer Fort, JantarMantar, Nahargarh Fort, JalMahal, Jaigarh Fort, Rambagh Palace and PannaMeenaKaKund. Overnight at Jaipur.",
    },
    {
      day: "Day 03",
      title: "JAIPUR – JODHPUR",
      content: "Transfer from Jaipur to Jodhpur. On the way visit the Mehrangarh Fort, UmaidBhawan Palace, Balsamand Lake, Kaylana Lake, GhantaGhar, RaoJodha Desert Rock Park, Mandore Gardens, MotiMahal, PhoolMahal and JaswantThada. Overnight at Jodhpur.",
    },
    {
      day: "Day 04",
      title: "JODHPUR – JAISALMER",
      content: "After breakfast we drive to Jaisalmer and check in to Hotel. After freshup Evening visit the Gadisar Lake to enjoy the Sunset view over the fort. Overnight Jaisalmer.",
    },
    {
      day: "Day 05",
      title: "INN JAISALMER",
      content: "After delicious breakfast at the hotel drive towards Longewala. Visit the Indo-Pak border. Visit the Tanot Mata Temple & War Memorial Museum. Later drive towards Sam Sand Dunes. On arrival check-in to the desert camp. Evening enjoy the Sunset view at the dunes during the camel Safari. Later relish the dinner with cultural dances. Overnight at the desert camp.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After delicious breakfast at the hotel embark for the sightseeing tour of the city. We will visit the Jaisalmer Fort, Jain Temple, Salim Singh Ki Haveli & Patwa Haveli. Later drop at Jaisalmer Airport/Railway station for journey towards home.",
    },
  ],

  "5N6D-UDP": [
    {
      day: "Day 01",
      title: "JAIPUR ARRIVAL",
      content: "Pick up from Jaipur Airport/Railway Station and transfer to hotel. On the way visit Sisodiya Rani Temple, Laxmi Narayan Temple. Overnight at Jaipur.",
    },
    {
      day: "Day 02",
      title: "JAIPUR SIGHTSEEING",
      content: "Jaipur local sightseeing covering HawaMahal, City Palace, Amer Fort, JantarMantar, Nahargarh Fort, JalMahal, Jaigarh Fort, Rambagh Palace and PannaMeenaKaKund. Overnight at Jaipur.",
    },
    {
      day: "Day 03",
      title: "JAIPUR – JODHPUR",
      content: "Transfer from Jaipur to Jodhpur. On the way visit the Mehrangarh Fort, UmaidBhawan Palace, Balsamand Lake, Kaylana Lake, GhantaGhar, RaoJodha Desert Rock Park, Mandore Gardens, MotiMahal, PhoolMahal and JaswantThada. Overnight at Jodhpur.",
    },
    {
      day: "Day 04",
      title: "JODHPUR – UDAIPUR",
      content: "After breakfast check out from hotel and transfer from Jodhpur to Udaipur. Overnight at Udaipur.",
    },
    {
      day: "Day 05",
      title: "UDAIPUR SIGHTSEEING",
      content: "Udaipur local sightseeing covering City Palace, Lake Pichola, FatehSagar Lake, Monsoon palace, Jag Mandir, Saheliyon Ki Bari, GulabBagh, MaharanaPratap Memorial, Vintage Collection of Classic Car Museum, Sajjangarh Wildlife Sanctuary and Shilpgram. Overnight at Udaipur.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After Breakfast checkout from hotel and transfer Airport/Railway Station. Tour End.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "JAIPUR ARRIVAL",
      content: "Pick up from Jaipur Airport/Railway Station and transfer to hotel. On the way visit Sisodiya Rani Temple, Laxmi Narayan Temple. Overnight at Jaipur.",
    },
    {
      day: "Day 02",
      title: "JAIPUR SIGHTSEEING",
      content: "Jaipur local sightseeing covering HawaMahal, City Palace, Amer Fort, JantarMantar, Nahargarh Fort, JalMahal, Jaigarh Fort, Rambagh Palace and PannaMeenaKaKund. Overnight at Jaipur.",
    },
    {
      day: "Day 03",
      title: "JAIPUR – JODHPUR",
      content: "After breakfast we drive to Jodhpur and check in to Hotel. After freshup Evening visit the local market and then back to hotel dinner and overnight stay at hotel.",
    },
    {
      day: "Day 04",
      title: "JODHPUR SIGHTSEEING",
      content: "After breakfast we visit the Mehrangarh Fort, UmaidBhawan Palace, Balsamand Lake, Kaylana Lake, GhantaGhar, RaoJodha Desert Rock Park, Mandore Gardens, MotiMahal, PhoolMahal and JaswantThada. Overnight at Jodhpur.",
    },
    {
      day: "Day 05",
      title: "JODHPUR – JAISALMER",
      content: "After breakfast we drive to Jaisalmer and check in to Hotel. After freshup Evening visit the Gadisar Lake to enjoy the Sunset view over the fort. Overnight Jaisalmer.",
    },
    {
      day: "Day 06",
      title: "INN JAISALMER",
      content: "After delicious breakfast at the hotel drive towards Longewala. Visit the Indo-Pak border. Visit the Tanot Mata Temple & War Memorial Museum. Later drive towards Sam Sand Dunes. On arrival check-in to the desert camp. Evening enjoy the Sunset view at the dunes during the camel Safari. Later relish the dinner with cultural dances. Overnight at the desert camp.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "After delicious breakfast at the hotel embark for the sightseeing tour of the city. We will visit the Jaisalmer Fort, Jain Temple, Salim Singh Ki Haveli & Patwa Haveli. Later drop at Jaisalmer Airport/Railway station for journey towards home.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "ARRIVAL IN JAISALMER",
      content: "On arrival meet & greet your driver and transfer to hotel. Evening visit the Gadisar Lake to enjoy the Sunset view over the fort. Overnight Jaisalmer.",
    },
    {
      day: "Day 02",
      title: "JAISALMER SIGHTSEEING",
      content: "After delicious breakfast at the hotel embark for the sightseeing tour of the city. We will visit the Jaisalmer Fort, Jain Temple, Salim Singh Ki Haveli & Patwa Haveli. Later drop at hotel.",
    },
    {
      day: "Day 03",
      title: "JAISALMER CAMP",
      content: "After delicious breakfast at the hotel drive towards Longewala. Visit the Indo-Pak border. Visit the Tanot Mata Temple & War Memorial Museum. Later drive towards Sam Sand Dunes. On arrival check-in to the desert camp. Evening enjoy the Sunset view at the dunes during the camel Safari. Later relish the dinner with cultural dances. Overnight at the desert camp.",
    },
    {
      day: "Day 04",
      title: "JAISALMER TO JODHPUR",
      content: "After breakfast we drive to Jodhpur and transferred to your hotel. In the evening Visit Clock Tower and Market of Jodhpur.",
    },
    {
      day: "Day 05",
      title: "JODHPUR SIGHTSEEING",
      content: "After breakfast, enjoy a tour of Jodhpur starts Mehrangarh Fort, Jaswant Thada and after lunch visit Umed Bhawan Museum. The rest of the day is at leisure for independent activities. Overnight in Jodhpur.",
    },
    {
      day: "Day 06",
      title: "JODHPUR TO JAIPUR",
      content: "After breakfast we drive to Jaipur sightseeing tour of the city. On the way visit Sisodiya Rani Temple, Laxmi Narayan Temple. Overnight at Jaipur.",
    },
    {
      day: "Day 07",
      title: "JAIPUR SIGHTSEEING",
      content: "Jaipur local sightseeing covering HawaMahal, City Palace, Amer Fort, JantarMantar, Nahargarh Fort, JalMahal, Jaigarh Fort, Rambagh Palace and PannaMeenaKaKund. Overnight at Jaipur.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed Airport/Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 3 — KERALA ITINERARY
// ============================================================
export const KERALA_ITINERARY: ProductItinerary = {

  "4N5D": [
    {
      day: "Day 01",
      title: "WELCOME TO COCHIN, TRANSFER TO MUNNAR",
      content: "When you arrive at Cochin, you will be received by our travel representative and brought to Munnar crossing a very picturesque route. We will be passing through the stunning attraction of Cheeyappara, Valera, and Kallar waterfalls. You can capture some pictures in Karadippara. Check into your hotel when you arrive. The first day is a leisure day, so you can rest for a while then have fun by touring around the beautiful hill station. Return back to your hotel and have a restful sleep.",
    },
    {
      day: "Day 02",
      title: "SIGHTSEEING TOUR OF MUNNAR",
      content: "Starting your day with appetizing breakfast, make your first visit to the Eravikulam National Park, where Nilgiri Tahr (an endangered species) is found. You will be touring on a park bus while you can sink deep into the natural beauty around you. After that, you will visit the tea museum by Tata tea where you can learn about tea processing and taste a cup of energizing tea. You will now take visits to Rose Garden, Photo Point, Elephant Arrival Point, and Echo Point. You will also be taken to the Indo Swiss Project. Return back to the hotel and have a sound sleep.",
    },
    {
      day: "Day 03",
      title: "MUNNAR TO THEKKADY",
      content: "Get up early to enjoy the sunrise and a tasty breakfast, before proceeding to Thekkady - a verdant paradise ideal for unwinding. Upon arrival, check-in at the hotel. In the evening, enjoy the scenic Periyar Lake, occasionally catching glimpses of rare varieties of birds and while enjoying a jungle safari in the Periyar National Park. Return to the hotel for an overnight stay at Thekkady.",
    },
    {
      day: "Day 04",
      title: "THEKKADY TO ALLEPPEY (BACKWATERS)",
      content: "Have a delightful breakfast and check-out from the hotel. You will now move towards Alleppey. When you arrive, check-in to the hotel/houseboat and rest in your room for a bit. Then start your sail across the beautiful backwaters of Alleppey with a series of lake and ponds. After the soothing cruise, get a pleasant dinner and have a sound sleep.",
    },
    {
      day: "Day 05",
      title: "DEPARTURE",
      content: "Have your fill of a delicious breakfast. If time permits, proceed to Cochin Airport or Railway Station. Drive back to your hometown with the sweet memories of Kerala.",
    },
  ],

  "5N6D": [
    {
      day: "Day 01",
      title: "WELCOME TO COCHIN, TRANSFER TO MUNNAR",
      content: "When you arrive at Cochin, you will be received by our travel representative and brought to Munnar crossing a very picturesque route. We will be passing through the stunning attraction of Cheeyappara, Valera, and Kallar waterfalls. You can capture some pictures in Karadippara. Check into your hotel when you arrive. The first day is a leisure day. Return back to your hotel and have a restful sleep.",
    },
    {
      day: "Day 02",
      title: "SIGHTSEEING TOUR OF MUNNAR",
      content: "Starting your day with appetizing breakfast, visit the Eravikulam National Park to see Nilgiri Tahr. Visit the tea museum by Tata tea. You will now take visits to Rose Garden, Photo Point, Elephant Arrival Point, Echo Point, and the Indo Swiss Project. Return back to the hotel and have a sound sleep.",
    },
    {
      day: "Day 03",
      title: "MUNNAR TO THEKKADY",
      content: "Proceed to Thekkady. Upon arrival, check-in at the hotel. In the evening, enjoy the scenic Periyar Lake and a jungle safari in the Periyar National Park. Return to the hotel for an overnight stay at Thekkady.",
    },
    {
      day: "Day 04",
      title: "THEKKADY TO ALLEPPEY (BACKWATERS)",
      content: "Move towards Alleppey. Check-in to the hotel/houseboat. Start your sail across the beautiful backwaters of Alleppey. After the soothing cruise, have a sound sleep.",
    },
    {
      day: "Day 05",
      title: "HEAD BACK TO COCHIN & SIGHTSEEING",
      content: "Start your day with breakfast in the houseboat/hotel. Transfer to Cochin. Upon arrival at Cochin, check into the hotel. You can visit Marine Drive for a quick stroll. You can also visit the Jewish Synagogue, St. Francis Church and Dutch Palace. Enjoy your overnight stay at the hotel.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "Have your fill of a delicious breakfast and if time permits, proceed to Cochin Airport or Railway Station. Drive back to your hometown with the sweet memories of Kerala.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "WELCOME TO COCHIN, TRANSFER TO MUNNAR",
      content: "When you arrive at Cochin, you will be received and brought to Munnar. En-route witness Cheeyappara, Valera, and Kallar waterfalls. Check into your hotel. The first day is a leisure day. Return back to your hotel for a restful sleep.",
    },
    {
      day: "Day 02",
      title: "SIGHTSEEING TOUR OF MUNNAR",
      content: "Visit the Eravikulam National Park (Nilgiri Tahr). Visit the tea museum by Tata tea. Tour the Rose Garden, Photo Point, Elephant Arrival Point, Echo Point, and the Indo Swiss Project. Return back to the hotel and have a sound sleep.",
    },
    {
      day: "Day 03",
      title: "MUNNAR TO THEKKADY",
      content: "Proceed to Thekkady. In the evening, enjoy the scenic Periyar Lake and a jungle safari in the Periyar National Park. Overnight stay at Thekkady.",
    },
    {
      day: "Day 04",
      title: "THEKKADY TO ALLEPPEY (BACKWATERS)",
      content: "Move towards Alleppey. Check-in to the hotel/houseboat. Start your sail across the beautiful backwaters. Have a sound sleep.",
    },
    {
      day: "Day 05",
      title: "ALLEPPEY TO KOVALAM",
      content: "Check out from the hotel/houseboat and leave for Kovalam, a city of vintage castles and flawless beaches. Check into the hotel and relax, as it is a leisure day. Return back to your hotel and have a restful sleep.",
    },
    {
      day: "Day 06",
      title: "KOVALAM SIGHTSEEING",
      content: "Proceed to Lighthouse Beach, Hawah Beach and Samudra Beach and watch the sunset. Return back to the hotel and enjoy your sleep.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Have your fill of a delicious breakfast and if time permits, proceed to the Airport or Railway Station. Drive back to your hometown with the sweet memories of Kerala.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "KOCHI: ARRIVAL AND SIGHTSEEING",
      content: "You will be picked up from the Cochin international airport and brought to the hotel. After check-in, proceed with sightseeing. Visit the Mattancherry Palace and the Jewish Synagogue. After that, you can jaunt around the local markets. Return back to your hotel and sleep comfortably.",
    },
    {
      day: "Day 02",
      title: "COCHIN TO MUNNAR",
      content: "Check-in to the hotel at Munnar and have rest. This day in Munnar is for leisure. Return back to your hotel for a sound sleep.",
    },
    {
      day: "Day 03",
      title: "SIGHTSEEING TOUR OF MUNNAR",
      content: "Visit the Eravikulam National Park (Nilgiri Tahr). Visit the tea museum by Tata tea. Tour the Rose Garden, Photo Point, Elephant Arrival Point, Echo Point, and the Indo Swiss Project. Return back to the hotel and have a sound sleep.",
    },
    {
      day: "Day 04",
      title: "MUNNAR TO THEKKADY",
      content: "Proceed to Thekkady. In the evening, enjoy the scenic Periyar Lake and a jungle safari in the Periyar National Park. Overnight stay at Thekkady.",
    },
    {
      day: "Day 05",
      title: "THEKKADY TO ALLEPPEY (BACKWATERS)",
      content: "Move towards Alleppey. Check-in to the hotel/houseboat. Start your sail across the beautiful backwaters. Have a sound sleep.",
    },
    {
      day: "Day 06",
      title: "ALLEPPEY TO KOVALAM",
      content: "Check out from the hotel/houseboat and leave for Kovalam. Check in into the hotel and relax, as it is a leisure day. Return back to your hotel and have a restful sleep.",
    },
    {
      day: "Day 07",
      title: "KOVALAM SIGHTSEEING",
      content: "Proceed to Lighthouse Beach, Hawah Beach and Samudra Beach and watch the sunset. Return back to the hotel and enjoy your sleep.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "Have your fill of a delicious breakfast and if time permits, proceed to the Airport or Railway Station. Drive back to your hometown with the sweet memories of Kerala.",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "KOCHI: ARRIVAL AND SIGHTSEEING",
      content: "You will be picked up from the Cochin international airport and brought to the hotel. Visit the Mattancherry Palace and the Jewish Synagogue. Jaunt around the local markets. Return back to your hotel and sleep comfortably.",
    },
    {
      day: "Day 02",
      title: "COCHIN TO MUNNAR",
      content: "Check-in to the hotel at Munnar. This day in Munnar is for leisure. Return back to your hotel for a sound sleep.",
    },
    {
      day: "Day 03",
      title: "SIGHTSEEING TOUR OF MUNNAR",
      content: "Visit the Eravikulam National Park (Nilgiri Tahr). Visit the tea museum. Tour the Rose Garden, Photo Point, Echo Point, and the Indo Swiss Project. Return back to the hotel and have a sound sleep.",
    },
    {
      day: "Day 04",
      title: "MUNNAR TO THEKKADY",
      content: "Proceed to Thekkady. In the evening, enjoy the scenic Periyar Lake and a jungle safari in the Periyar National Park. Overnight stay at Thekkady.",
    },
    {
      day: "Day 05",
      title: "THEKKADY TO ALLEPPEY (BACKWATERS)",
      content: "Move towards Alleppey. Check-in to the hotel/houseboat. Start your sail across the beautiful backwaters. Have a sound sleep.",
    },
    {
      day: "Day 06",
      title: "ALLEPPEY TO KOVALAM",
      content: "Check out from the hotel/houseboat and leave for Kovalam. Check in into the hotel and relax, as it is a leisure day. Return back to your hotel and have a restful sleep.",
    },
    {
      day: "Day 07",
      title: "KOVALAM SIGHTSEEING",
      content: "Proceed to Lighthouse Beach, Hawah Beach and Samudra Beach and watch the sunset. Return back to the hotel and enjoy your sleep.",
    },
    {
      day: "Day 08",
      title: "KOVALAM TO KANYAKUMARI",
      content: "After breakfast, you leave for the coastal city of Kanyakumari famous for its sunrise view. As you reach Kanyakumari, check into the hotel. Later, visit the famous Vivekananda Rock Memorial, Thiruvalluvar Statue, Vattakottai Fort at the beach and Lady of Ransom Church. Return to the hotel and enjoy a good night's sleep.",
    },
    {
      day: "Day 09",
      title: "DEPARTURE",
      content: "Have your fill of a delicious breakfast and if time permits, proceed to the Airport or Railway Station. Drive back to your hometown with the sweet memories of Kerala.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 4 — HIMACHAL PRADESH ITINERARY
// ============================================================
export const HIMACHAL_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "CHANDIGARH – SHIMLA",
      content: "On Arrival in Chandigarh we will meet you and transfer to Shimla. Shimla is capital of Himachal, former capital of British also set amidst the snow copper, Shaivalik, Mountains which offer some of the most beautiful view of Himalaya. Reach there and check in hotel. Dinner and overnight at Shimla.",
    },
    {
      day: "Day 02",
      title: "SHIMLA – KUFRI – SHIMLA CITY TOUR",
      content: "After Breakfast Excursion to Kufri. Kufri is famous for its Himalayan National Park, Poney and Yak Ride (Extra cost), Green Valley, Kufri mini Zoo, Fagu Valley and one can see the endless Himalayan Panorama from Kufri. Sightseeing of various places then drive for Shimla Local Sightseeing: Kali Barri Temple, Lakkad Bazzar, Lower Bazar & Mall Road, Jakhu Temple, The Scandal Point, Church & free for shopping and roaming in the mall. Evening back to hotel. Dinner and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "SHIMLA – MANALI",
      content: "Drive from Shimla to Manali (280 kms, 7/8 hrs) on the way covering sightseeing with Sunder Nagar Lake, Pandoh Dam and Hanogi Temple. Arrive Manali, transfer to hotel. Dinner and Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "MANALI – SOLANG VALLEY TOURS",
      content: "After Breakfast proceed to Solang Valley — a side valley at the top of the Kullu Valley, 14 km northwest of Manali on the way to Rohtang Pass, known for its summer and winter sport conditions. Sports most commonly offered are parachuting, paragliding, skating and zorbing. After that drive back to hotel. Dinner and overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "MANALI LOCAL TOUR",
      content: "After breakfast drive to the local city tour of Manali — Hadimba Temple (built in 1553 with a superbly crafted four tiered pagoda roof), Club House (roller skating rink, auditorium, billiards rooms, library, bar and restaurant), Tibetan Monastery, Van Vihar, and Vashist (well known for its hot springs, old temples dedicated to sage Vashisth and Lord Rama). Dinner and overnight stay at Hotel in Manali.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed to Chandigarh. Evening drop at Chandigarh Airport / Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "CHANDIGARH – SHIMLA",
      content: "On Arrival in Chandigarh we will meet you and transfer to Shimla. Shimla is capital of Himachal, former capital of British also set amidst the snow copper, Shaivalik, Mountains which offer some of the most beautiful view of Himalaya. Reach there and check in hotel. Dinner and overnight at Shimla.",
    },
    {
      day: "Day 02",
      title: "SHIMLA – KUFRI – SHIMLA CITY TOUR",
      content: "After Breakfast Excursion to Kufri. Kufri is famous for its Himalayan National Park, Poney and Yak Ride (Extra cost), Green Valley, Kufri mini Zoo, Fagu Valley. Shimla Local Sightseeing: Kali Barri Temple, Lakkad Bazzar, Lower Bazar & Mall Road, Jakhu Temple, The Scandal Point, Church & free for shopping. Evening back to hotel. Dinner and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "SHIMLA – MANALI",
      content: "Drive from Shimla to Manali (280 kms, 7/8 hrs) on the way covering sightseeing with Sunder Nagar Lake, Pandoh Dam and Hanogi Temple. Arrive Manali, transfer to hotel. Dinner and Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "MANALI – SOLANG VALLEY TOURS (ATAL TUNNEL + SISSU + ROHTANG PASS COST DIRECT PAYABLE)",
      content: "After Breakfast proceed to Solang Valley — known for its summer and winter sport conditions. Sports most commonly offered are parachuting, paragliding, skating and zorbing. After that drive back to hotel. Dinner and overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "MANALI LOCAL TOUR",
      content: "After breakfast drive to the local city tour of Manali — Hadimba Temple, Club House, Tibetan Monastery, Van Vihar, and Vashist (hot springs, old temples dedicated to sage Vashisth and Lord Rama). Dinner and overnight stay at Hotel in Manali.",
    },
    {
      day: "Day 06",
      title: "MANALI – DHARAMSHALA",
      content: "After breakfast, take the road to Dharamshala. Though a long drive, you will enjoy the fresh mountain air and the scenic surroundings. Once you reach Dharamshala, you will check in and settle down. The rest of the evening is yours to spend in this lush green landscape. Dinner and overnight stay are at the hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed to Chandigarh. Evening drop at Chandigarh Airport / Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "CHANDIGARH – SHIMLA",
      content: "On Arrival in Chandigarh we will meet you and transfer to Shimla. Shimla is capital of Himachal, former capital of British also set amidst the snow copper, Shaivalik, Mountains which offer some of the most beautiful view of Himalaya. Reach there and check in hotel. Dinner and overnight at Shimla.",
    },
    {
      day: "Day 02",
      title: "SHIMLA – KUFRI – SHIMLA CITY TOUR",
      content: "After Breakfast Excursion to Kufri. Kufri is famous for its Himalayan National Park, Poney and Yak Ride (Extra cost), Green Valley, Kufri mini Zoo, Fagu Valley. Shimla Local Sightseeing: Kali Barri Temple, Lakkad Bazzar, Lower Bazar & Mall Road, Jakhu Temple, The Scandal Point, Church & free for shopping. Evening back to hotel. Dinner and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "SHIMLA – MANALI",
      content: "Drive from Shimla to Manali (280 kms, 7/8 hrs) on the way covering sightseeing with Sunder Nagar Lake, Pandoh Dam and Hanogi Temple. Arrive Manali, transfer to hotel. Dinner and Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "MANALI – SOLANG VALLEY TOURS (ATAL TUNNEL + SISSU + ROHTANG PASS COST DIRECT PAYABLE)",
      content: "After Breakfast proceed to Solang Valley — known for its summer and winter sport conditions. Sports most commonly offered are parachuting, paragliding, skating and zorbing. After that drive back to hotel. Dinner and overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "MANALI LOCAL TOUR",
      content: "After breakfast drive to the local city tour of Manali — Hadimba Temple, Club House, Tibetan Monastery, Van Vihar, and Vashist (hot springs, old temples dedicated to sage Vashisth and Lord Rama). Dinner and overnight stay at Hotel in Manali.",
    },
    {
      day: "Day 06",
      title: "MANALI – DHARAMSHALA",
      content: "Check out hotel and drive to Dharamshala via Manikaran and Palampur tea gardens. Reach Dharamshala, check in hotel.",
    },
    {
      day: "Day 07",
      title: "DHARAMSHALA LOCAL SIGHTSEEING",
      content: "Morning after breakfast check out hotel, visit Mcleodganj, Dalai Lama temple, Naddi Dal Lake and do shopping there. Check in overnight at hotel.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed to Chandigarh. Evening drop at Chandigarh Airport / Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "CHANDIGARH – SHIMLA",
      content: "On Arrival in Chandigarh we will meet you and transfer to Shimla. Reach there and check in hotel. Dinner and overnight at Shimla.",
    },
    {
      day: "Day 02",
      title: "SHIMLA – KUFRI – SHIMLA CITY TOUR",
      content: "After Breakfast Excursion to Kufri. Shimla Local Sightseeing: Kali Barri Temple, Lakkad Bazzar, Lower Bazar & Mall Road, Jakhu Temple, The Scandal Point, Church & free for shopping. Evening back to hotel. Dinner and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "SHIMLA – MANALI",
      content: "Drive from Shimla to Manali (280 kms, 7/8 hrs) on the way covering sightseeing with Sunder Nagar Lake, Pandoh Dam and Hanogi Temple. Arrive Manali, transfer to hotel. Dinner and Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "MANALI – SOLANG VALLEY TOURS (ATAL TUNNEL + SISSU + ROHTANG PASS COST DIRECT PAYABLE)",
      content: "After Breakfast proceed to Solang Valley — known for its summer and winter sport conditions. Sports most commonly offered are parachuting, paragliding, skating and zorbing. After that drive back to hotel. Dinner and overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "MANALI LOCAL TOUR",
      content: "After breakfast drive to the local city tour of Manali — Hadimba Temple, Club House, Tibetan Monastery, Van Vihar, and Vashist. Dinner and overnight stay at Hotel in Manali.",
    },
    {
      day: "Day 06",
      title: "MANALI – DHARAMSHALA",
      content: "Check out hotel and drive to Dharamshala via Manikaran and Palampur tea gardens. Reach Dharamshala, check in hotel.",
    },
    {
      day: "Day 07",
      title: "DHARAMSHALA LOCAL SIGHTSEEING",
      content: "Morning after breakfast check out hotel, visit Mcleodganj, Dalai Lama temple, Naddi Dal Lake and do shopping there. Check in overnight at hotel.",
    },
    {
      day: "Day 08",
      title: "DHARAMSHALA – AMRITSAR (TRANSFER)",
      content: "After breakfast check out from the hotel in Dharamshala and proceed for Amritsar. On arrival, check into the hotel. The rest of the evening is for leisure. Overnight at Amritsar Hotel.",
    },
    {
      day: "Day 09",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed. Evening drop at Amritsar Airport / Railway Station. Tour ends, But Sweet Memories Always Remain...",
    },
  ],

  "9N10D": [
    {
      day: "Day 01",
      title: "CHANDIGARH – SHIMLA",
      content: "On Arrival in Chandigarh we will meet you and transfer to Shimla. Reach there and check in hotel. Dinner and overnight at Shimla.",
    },
    {
      day: "Day 02",
      title: "SHIMLA – KUFRI – SHIMLA CITY TOUR",
      content: "After Breakfast Excursion to Kufri. Shimla Local Sightseeing: Kali Barri Temple, Lakkad Bazzar, Lower Bazar & Mall Road, Jakhu Temple, The Scandal Point, Church & free for shopping. Evening back to hotel. Dinner and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "SHIMLA – MANALI",
      content: "Drive from Shimla to Manali (280 kms, 7/8 hrs) on the way covering sightseeing with Sunder Nagar Lake, Pandoh Dam and Hanogi Temple. Arrive Manali, transfer to hotel. Dinner and Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "MANALI – SOLANG VALLEY TOURS (ATAL TUNNEL + SISSU + ROHTANG PASS COST DIRECT PAYABLE)",
      content: "After Breakfast proceed to Solang Valley — known for its summer and winter sport conditions. Sports most commonly offered are parachuting, paragliding, skating and zorbing. After that drive back to hotel. Dinner and overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "MANALI LOCAL TOUR",
      content: "After breakfast drive to the local city tour of Manali — Hadimba Temple, Club House, Tibetan Monastery, Van Vihar, and Vashist. Dinner and overnight stay at Hotel in Manali.",
    },
    {
      day: "Day 06",
      title: "MANALI – DHARAMSHALA",
      content: "Check out hotel and drive to Dharamshala via Manikaran and Palampur tea gardens. Reach Dharamshala, check in hotel.",
    },
    {
      day: "Day 07",
      title: "DHARAMSHALA LOCAL SIGHTSEEING",
      content: "Morning after breakfast check out hotel, visit Mcleodganj, Dalai Lama temple, Naddi Dal Lake and do shopping there. Check in overnight at hotel.",
    },
    {
      day: "Day 08",
      title: "DHARAMSHALA – AMRITSAR (WAGAH BORDER)",
      content: "After breakfast check out from the hotel and proceed for Amritsar. On arrival check into the hotel. In the evening proceed to visit Wagah Border Ceremony at the time of sunset. The flag-lowering ceremony at the end of each day on the India-Pakistan border at Wagah has over the years become a tourist destination. The Wagah check-point is about mid-way between Lahore in Pakistan and Amritsar in India, each about 25 kilometers away. After that in evening back to the Hotel. Overnight at Amritsar Hotel.",
    },
    {
      day: "Day 09",
      title: "AMRITSAR LOCAL SIGHTSEEING",
      content: "After Breakfast, Start your city tour with the blessings of Sri Harmandir Sahib (Golden Temple), the holiest shrine of the Sikh religion. Then visit Jallianwala Bagh — a memorial to the countless innocent Indians massacred by General Dyer on 13 April 1919. After visit Maharaja Ranjit Singh Museum. Then proceed to visit Mata Lal Devi Temple. You can also do shopping in Amritsar Market. Return to Hotel. Overnight at Amritsar Hotel.",
    },
    {
      day: "Day 10",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed. Evening drop at Airport / Railway Station. Tour ends, But Sweet Memories Always Remain...",
    },
  ],

  "10N11D": [
    {
      day: "Day 01",
      title: "CHANDIGARH – SHIMLA",
      content: "On Arrival in Chandigarh we will meet you and transfer to Shimla. Reach there and check in hotel. Dinner and overnight at Shimla.",
    },
    {
      day: "Day 02",
      title: "SHIMLA – KUFRI – SHIMLA CITY TOUR",
      content: "After Breakfast Excursion to Kufri. Shimla Local Sightseeing: Kali Barri Temple, Lakkad Bazzar, Lower Bazar & Mall Road, Jakhu Temple, The Scandal Point, Church & free for shopping. Evening back to hotel. Dinner and overnight stay in Hotel.",
    },
    {
      day: "Day 03",
      title: "SHIMLA – MANALI",
      content: "Drive from Shimla to Manali (280 kms, 7/8 hrs) on the way covering sightseeing with Sunder Nagar Lake, Pandoh Dam and Hanogi Temple. Arrive Manali, transfer to hotel. Dinner and Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "MANALI – SOLANG VALLEY TOURS (ATAL TUNNEL + SISSU + ROHTANG PASS COST DIRECT PAYABLE)",
      content: "After Breakfast proceed to Solang Valley — known for its summer and winter sport conditions. Sports most commonly offered are parachuting, paragliding, skating and zorbing. After that drive back to hotel. Dinner and overnight stay in hotel.",
    },
    {
      day: "Day 05",
      title: "MANALI LOCAL TOUR",
      content: "After breakfast drive to the local city tour of Manali — Hadimba Temple, Club House, Tibetan Monastery, Van Vihar, and Vashist. Dinner and overnight stay at Hotel in Manali.",
    },
    {
      day: "Day 06",
      title: "MANALI – DHARAMSHALA",
      content: "Check out hotel and drive to Dharamshala via Manikaran and Palampur tea gardens. Reach Dharamshala, check in hotel.",
    },
    {
      day: "Day 07",
      title: "DHARAMSHALA LOCAL SIGHTSEEING",
      content: "Morning after breakfast check out hotel, visit Mcleodganj, Dalai Lama temple, Naddi Dal Lake and do shopping there. Check in overnight at hotel.",
    },
    {
      day: "Day 08",
      title: "DHARAMSHALA – AMRITSAR (TRANSFER)",
      content: "After breakfast check out from the hotel in Dharamshala and proceed for Amritsar. On arrival, check into the hotel. The rest of the day is for leisure. Overnight at Amritsar Hotel.",
    },
    {
      day: "Day 09",
      title: "AMRITSAR – WAGAH BORDER CEREMONY",
      content: "After breakfast check out from the hotel and proceed for Amritsar. In the evening proceed to visit Wagah Border Ceremony at the time of sunset. The flag-lowering ceremony at the end of each day on the India-Pakistan border at Wagah has over the years become a tourist destination. The Wagah check-point is about mid-way between Lahore in Pakistan and Amritsar in India, each about 25 kilometers away. After that in evening back to the Hotel. Overnight at Amritsar Hotel.",
    },
    {
      day: "Day 10",
      title: "AMRITSAR LOCAL SIGHTSEEING",
      content: "After Breakfast, Start your city tour with the blessings of Sri Harmandir Sahib (Golden Temple), the holiest shrine of the Sikh religion. Then visit Jallianwala Bagh — a memorial to the countless innocent Indians massacred by General Dyer on 13 April 1919. After visit Maharaja Ranjit Singh Museum. Then proceed to visit Mata Lal Devi Temple. You can also do shopping in Amritsar Market. Return to Hotel. Overnight at Amritsar Hotel.",
    },
    {
      day: "Day 11",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed. Evening drop at Airport / Railway Station. Tour ends, But Sweet Memories Always Remain...",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 5 — KASHMIR ITINERARY
// ============================================================
export const KASHMIR_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVE JAMMU & TRANSFER TO PAHALGAM",
      content: "Arrive to Jammu Airport / Railway station and then our cab driver will meet you outside. Your journey will start towards Pahalgam, the valley of shepherds. Drive through the pine forest and along Lidder river. The total distance of 280 kms will be covered in about 7 hours. Pahalgam is the most famous place for Indian film industry. Overnight stay in hotel.",
    },
    {
      day: "Day 02",
      title: "PAHALGAM – SRINAGAR",
      content: "After breakfast sightseeing in Pahalgam. Pahalgam the valley of shepherds and the most famous place for Indian film industry. One can visit Amusement park Aru, Betab valley and ChandanVari (By Local Taxi at Own Cost) & one can enjoy horse riding / Trekking (which is excluded in the package). In the evening transfer to Srinagar & overnight stay in hotel.",
    },
    {
      day: "Day 03",
      title: "SRINAGAR – GULMARG – SRINAGAR",
      content: "After breakfast drive to Gulmarg the meadows of flowers 2730 mtrs above sea level. The distance of 60 kms will be covered in 2 hours. It has delightful ski slopes and the highest 18 hole golf course of the world. If weather permits, you can also have view of Nanga Parbat. The view enroute from Tangmarg to Gulmarg is magnificent. Evening back to Srinagar overnight stay in hotel.",
    },
    {
      day: "Day 04",
      title: "SRINAGAR – SONAMARG – SRINAGAR",
      content: "After breakfast drive to Sonamarg which is the most beautiful drive from Srinagar. On the way we stop at many beautiful spots. The total distance of 80 kms will be covered in 3 hours. Sonamarg is also the takeoff station for the drive to Ladakh across the Zojila, a major pass in the great Himalayan range. Sonamarg is known as gateway of Ladakh. In the evening return to Srinagar overnight stay in houseboat.",
    },
    {
      day: "Day 05",
      title: "SRINAGAR – DOODPATHRI – SRINAGAR",
      content: "After Breakfast, your journey will start towards Doodhpatri, the total distance of 40 km located in central Kashmir district Budgam. On this day do the local sightseeing there and in the evening travel back to Srinagar overnight stay in the houseboat.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "This morning after breakfast departure to Jammu Airport / Railway station for your onwards safe journey.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL – SRINAGAR",
      content: "Welcome to Srinagar Airport. You will meet our representative and get transferred to Hotel. Check-in Hotel. After relaxing, visit Shankaracharya Temple in the evening and enjoy a beautiful evening at Srinagar. Overnight stay in the Hotel.",
    },
    {
      day: "Day 02",
      title: "GULMARG DAY TRIP",
      content: "Today post breakfast, drive to Gulmarg (Meadow of Flowers) 2730 Mts. above sea level. The distance of 56 kms will be covered in about 2 hrs. Gulmarg has one of the best Ski slopes in the world and highest golf course of the world with 18 holes. One can also have the view of Nanga Parbat if weather permits. One can also have a short trek upto Khilangmarg or enjoy a cable car ride. Evening return back to Srinagar. Overnight at Hotel.",
    },
    {
      day: "Day 03",
      title: "SONMARG DAY TRIP",
      content: "After breakfast leave for Sonamarg for a Day trip. The name Sonamarg means 'Meadow of Gold'. The drive from Srinagar to Sonamarg is very beautiful passing through towns and villages. In Sonamarg you can visit Thajiwas Glacier which is around 4 kms from Sonamarg (Pony Ride at Own Cost). Return back to Srinagar in the evening. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 04",
      title: "SRINAGAR – PAHALGAM",
      content: "Today you will be transferred by road to Pahalgam, Valley of Shepherds. En route, you will have a rare opportunity to visit the Saffron fields. Also, visit Awantipura Ruins & Anantnag Sulpher Springs enroute. Visit to Bisaran (Pony Ride at Own Cost). Arrive and proceed to your hotel. Dinner & overnight at Pahalgam.",
    },
    {
      day: "Day 05",
      title: "INN PAHALGAM",
      content: "After Breakfast, Visit Aru Valley, Betab Valley, Chandanwadi (Local union taxi at Own Cost). The snow Point (14 Km) at your own cost or enjoy a pony ride at your own cost. Return back to Pahalgam, the rest of the day at leisure to explore the countryside and enjoy leisurely walks through the pine forest along the River Lidder. Dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 06",
      title: "PAHALGAM – SRINAGAR – LOCAL SIGHTSEEING",
      content: "After breakfast transfer to Srinagar. Visit Shankaracharya Temple & PariMahal (Palace of Fairies — a seven terraced garden at the top of Zabarwan mountain range). Then visit Chesham Shahi (Mughal garden built in 1632 AD). Visit Nishat Garden (Garden of pleasure, built 1633) and Shalimar Garden (Garden of love, built 1619 by Mughal King Jehangir for Noor Jehan). Evening enjoy Shikara ride on the world-famous Dal Lake covering Floating Gardens, Vegetable Gardens, Golden Lake, Inner markets like Mena Bazar, and Canals. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from Kashmir and take home precious memories of your wonderful trip.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "ARRIVAL – SRINAGAR",
      content: "Welcome to Srinagar Airport. You will meet our representative and get transferred to Hotel. Check-in Hotel. After relaxing, visit Shankaracharya Temple in the evening and enjoy a beautiful evening at Srinagar. Overnight stay in the Hotel.",
    },
    {
      day: "Day 02",
      title: "SRINAGAR TO GULMARG",
      content: "Srinagar to Gulmarg 'Meadow of Flowers' — discovered by the Kashmiri romantic poet in the 16th century who was inspired by its grassy slopes covered with wildflowers. In winter Gulmarg looks more beautiful due to heavy snowfall and turns into India's premier Ski resort. After check in, leave with your guide for some adventure activity in Gulmarg. Overnight stay at Gulmarg.",
    },
    {
      day: "Day 03",
      title: "INN GULMARG",
      content: "After breakfast, you will leave for a Gondola ride (Own Cost) in the highest cable car corporation in the world. After that you will spend your rest of the day by visiting places like the Golf course, Maharaja palace, children's park and also see some good places there. Overnight stay at Gulmarg.",
    },
    {
      day: "Day 04",
      title: "GULMARG – PAHALGAM",
      content: "Today you will be transferred by road to Pahalgam, Valley of Shepherds. En route, you will have a rare opportunity to visit the Saffron fields. Also, visit Awantipura Ruins & Anantnag Sulpher Springs enroute. Visit to Bisaran (Pony Ride at Own Cost). Arrive and proceed to your hotel. Dinner & overnight at Pahalgam.",
    },
    {
      day: "Day 05",
      title: "INN PAHALGAM",
      content: "After Breakfast, Visit Aru Valley, Betab Valley, Chandanwadi (Local union taxi at Own Cost). The snow Point (14 Km) at your own cost or enjoy a pony ride at your own cost. Return back to Pahalgam, the rest of the day at leisure to explore the countryside and enjoy leisurely walks through the pine forest along the River Lidder. Dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 06",
      title: "PAHALGAM – SRINAGAR – LOCAL SIGHTSEEING",
      content: "After breakfast transfer to Srinagar. Visit Shankaracharya Temple & PariMahal (Palace of Fairies). Then visit Chesham Shahi, Nishat Garden (Garden of pleasure, built 1633) and Shalimar Garden (Garden of love, built 1619). Evening enjoy Shikara ride on the world-famous Dal Lake covering Floating Gardens, Vegetable Gardens, Golden Lake, Inner markets like Mena Bazar, and Canals. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 07",
      title: "SONMARG DAY TRIP",
      content: "After breakfast leave for Sonamarg for a Day trip. The name Sonamarg means 'Meadow of Gold'. The drive from Srinagar to Sonamarg is very beautiful. In Sonamarg you can visit Thajiwas Glacier which is around 4 kms from Sonamarg (Pony Ride at Own Cost). Return back to Srinagar in the evening. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from Kashmir and take home precious memories of your wonderful trip.",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "KATRA ARRIVAL",
      content: "Welcome to Katra Railway Station pickup. You will meet our representative and get transferred to Hotel. Check-in Hotel. Overnight stay in the Hotel.",
    },
    {
      day: "Day 02",
      title: "KATRA",
      content: "After breakfast visit Mata Vaishno Devi Mandir (Own Cost for Palki, Helicopter, Horse Ride).",
    },
    {
      day: "Day 03",
      title: "KATRA TO PAHALGAM",
      content: "After breakfast you will drive to Pahalgam, Valley of Shepherds. Check in the hotel. The rest of the day at leisure to explore the countryside and enjoy leisurely walks through the pine forest along the River Lidder. Overnight stay at Pahalgam.",
    },
    {
      day: "Day 04",
      title: "PAHALGAM TO SRINAGAR",
      content: "Today you will be transferred by road to Srinagar. En route, you will have a rare opportunity to visit the Saffron fields. Also, visit Awantipura Ruins & Anantnag Sulpher Springs en route. Visit Chandanwadi, The Snow Point (14 Km) at your own cost or enjoy a pony ride at your own cost. Dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 05",
      title: "GULMARG DAY TRIP",
      content: "Today post breakfast, drive to Gulmarg (Meadow of Flowers) 2730 Mts. above sea level. The distance of 56 kms will be covered in about 2 hrs. Gulmarg has one of the best Ski slopes in the world and highest golf course of the world with 18 holes. One can also have the view of Nanga Parbat if weather permits. One can also have a short trek upto Khilangmarg or enjoy a cable car ride. Evening return back to Srinagar. Overnight at Hotel.",
    },
    {
      day: "Day 06",
      title: "SONMARG DAY TRIP",
      content: "After breakfast leave for Sonamarg for a Day trip. The name Sonamarg means 'Meadow of Gold'. The drive from Srinagar to Sonamarg is very beautiful. In Sonamarg you can visit Thajiwas Glacier which is around 4 kms from Sonamarg (Pony Ride at Own Cost). Return back to Srinagar in the evening. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 07",
      title: "SRINAGAR LOCAL SIGHTSEEING",
      content: "After breakfast visit PariMahal (Palace of Fairies — a seven terraced garden at the top of Zabarwan mountain range). Then visit Chesham Shahi (Mughal garden built in 1632 AD). Visit Nishat Garden (Garden of pleasure, built 1633) and Shalimar Garden (Garden of love, built 1619). Evening enjoy Shikara ride on the world-famous Dal Lake covering Floating Gardens, Vegetable Gardens, Golden Lake, Inner markets like Mena Bazar, and Canals. Overnight stay in Houseboat at Srinagar.",
    },
    {
      day: "Day 08",
      title: "SRINAGAR TO KATRA",
      content: "After breakfast transfer to Katra. Check in the hotel. Overnight stay at the hotel.",
    },
    {
      day: "Day 09",
      title: "DEPARTURE",
      content: "After breakfast drop at Katra railway station.",
    },
  ],

  "9N10D": [
    {
      day: "Day 01",
      title: "ARRIVAL – KATRA",
      content: "Welcome to Katra. Upon arrival our representative will assist you with the hotel check in. Rest of the day is for leisure. Overnight stay at the hotel.",
    },
    {
      day: "Day 02",
      title: "KATRA – MATA VAISHNODEVI DARSHAN – KATRA",
      content: "After breakfast, start your Holy Journey to Mata Vaishnodevi Darshan. Mata Vaishno Devi temple is one of the holiest Hindu temples dedicated to Shakti and is the second most visited religious shrine in India after Tirupati Balaji Temple. Take a trek to Mata Vaishno Devi shrine (14 km), ponies can also be arranged by self (at your own cost) for the trek. Return back to Katra late in evening/night. Dinner and Overnight stay at hotel in Katra.",
    },
    {
      day: "Day 03",
      title: "KATRA – SHIVKHORI – KATRA",
      content: "Early morning after breakfast, proceed for Shiv Khori — the Holy Cave abode of Lord Shiva situated at a distance of 70 Kms from Katra. The cave measures nearly half a kilometer in length with a 4 feet high naturally formed Shiv-lingam at the heart of the Sanctum Sanctorum. Have darshans of Lord Shiva and back to Katra in the evening. If time permits, en route, visit Siar Baba waterfalls, Baba Dhansal & Nau Devis. Overnight stay at Katra.",
    },
    {
      day: "Day 04",
      title: "KATRA – SRINAGAR",
      content: "After breakfast leave for Srinagar. Check-in Hotel. After relax visit Shankaracharya Temple in the evening. Enjoy beautiful evening at Srinagar. Overnight stay in the Hotel.",
    },
    {
      day: "Day 05",
      title: "SONAMARG DAY TRIP",
      content: "After breakfast leave for Sonamarg for a Day trip. The name Sonamarg means 'Meadow of Gold'. The drive from Srinagar to Sonamarg is very beautiful. In Sonamarg you can visit Thajiwas Glacier which is around 4 kms from Sonamarg (Local Taxi or Pony Ride at Own Cost). Return back to Srinagar in the evening. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 06",
      title: "SRINAGAR TO GULMARG",
      content: "After breakfast proceed to Gulmarg 'Meadow of Flowers'. Gulmarg has one of the best ski slopes in the world and the highest golf course with 18 holes. You can also enjoy Gondola Cable Car (Own Cost) offering rides to the upland meadows of Kongdori and beyond to the top of Apharwat range at 14000 ft. In the evening overnight stay in Hotel at Gulmarg.",
    },
    {
      day: "Day 07",
      title: "GULMARG – PAHALGAM",
      content: "Today you will be transferred by road to Pahalgam, Valley of Shepherds. En route, you will have a rare opportunity to visit the Saffron fields. Also, visit Awantipura Ruins & Anantnag Sulpher Springs en route. Arrive and proceed to your hotel. Dinner & overnight at Pahalgam.",
    },
    {
      day: "Day 08",
      title: "PAHALGAM LOCAL SIGHTSEEING",
      content: "After Breakfast, Visit Aru Valley, Betab Valley & Chandanwadi (Own Cost). The snow Point (14 Km) at your own cost or enjoy a pony ride at your own cost. Return back to Pahalgam, the rest of the day at leisure to explore the countryside and enjoy leisurely walks through the pine forest along the River Lidder. Dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 09",
      title: "PAHALGAM TO SRINAGAR & SRINAGAR LOCAL SIGHTSEEING",
      content: "After breakfast transfer to Srinagar. Visit PariMahal (Palace of Fairies — a seven terraced garden at the top of Zabarwan mountain range). Then visit Chesham Shahi (Mughal garden built in 1632 AD). Visit Nishat Garden (Garden of pleasure, built 1633) and Shalimar Garden (Garden of love, built 1619 by Mughal King Jehangir for Noor Jehan). Evening enjoy Shikara ride on the world-famous Dal Lake covering Floating Gardens, Vegetable Gardens, Golden Lake, Inner markets like Mena Bazar, and Canals. Overnight stay in Houseboat at Srinagar.",
    },
    {
      day: "Day 10",
      title: "DEPARTURE",
      content: "After breakfast get a transfer to Srinagar Airport for further next destination back Home.",
    },
  ],

  "12N13D": [
    {
      day: "Day 01",
      title: "SRINAGAR – GULMARG",
      content: "Welcome to Srinagar Airport pickup. You will meet our representative and get a drive to Gulmarg (Meadow of Flowers) 2730 Mts. above sea level. The distance of 56 kms will be covered in about 2 hrs. Gulmarg has one of the best Ski slopes in the world and the highest golf course of the world with 18 holes. One can also have the view of Nanga Parbat if weather permits. One can also have a short trek upto Khilanmarg or enjoy a cable car ride. Overnight at the Hotel.",
    },
    {
      day: "Day 02",
      title: "GULMARG – PAHALGAM",
      content: "Today you will be transferred by road to Pahalgam, Valley of Shepherds. En route, you will have a rare opportunity to visit the Saffron fields. Also, visit Awantipura Ruins & Anantnag Sulpher Springs en route. Arrive and proceed to your hotel. Dinner & overnight at Pahalgam.",
    },
    {
      day: "Day 03",
      title: "INN PAHALGAM",
      content: "After Breakfast, Visit Aru Valley, Betab Valley & Chandanwadi (Own Cost). The snow Point (14 Km) at your own cost or enjoy a pony ride at your own cost. Return back to Pahalgam, the rest of the day at leisure to explore the countryside and enjoy leisurely walks through the pine forest along the River Lidder. Dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 04",
      title: "PAHALGAM TO SRINAGAR & SRINAGAR LOCAL SIGHTSEEING",
      content: "After breakfast visit PariMahal (Palace of Fairies — a seven terraced garden at the top of Zabarwan mountain range). Then visit Chesham Shahi (Mughal garden built in 1632 AD). Visit Nishat Garden (Garden of pleasure, built 1633) and Shalimar Garden (Garden of love, built 1619). Evening enjoy Shikara ride on the world-famous Dal Lake covering Floating Gardens, Vegetable Gardens, Golden Lake, Inner markets like Mena Bazar, and Canals. Overnight stay in Hotel at Srinagar.",
    },
    {
      day: "Day 05",
      title: "SRINAGAR TO DOODHPATHRI TO SRINAGAR",
      content: "After breakfast check out from the Houseboat and transfer to Srinagar Hotel. After refreshments, proceed to visit Doodhpathri. The Valley of Doodhpathri in Srinagar is one of Kashmir's beautiful secrets. The snow caps on the surrounding mountains, lush green grass and pure white snow create an enchanting color play. Overnight stay at Srinagar Hotel.",
    },
    {
      day: "Day 06",
      title: "SRINAGAR TO KARGIL VIA SONMARG",
      content: "After Breakfast, we will proceed for Kargil. En-route cross Zero point Zojila Pass — the highest pass on Srinagar Leh Highway. We will witness Drass, the village popularly known as 'The Gateway to Ladakh', the coldest inhabited place in India and the second coldest in the world. The mountain village of Dras came into limelight in 1999 during the Kargil War. Later visit Kargil War Memorial. Overnight Stay in Kargil.",
    },
    {
      day: "Day 07",
      title: "KARGIL TO LEH",
      content: "Post a scrumptious breakfast, head out and explore the beautiful land of Leh. You will cover Namilla Pass and Fotula Pass. Then visit Moonland Landscapes. Visit the Hall of Fame and feel the pull of the magnetic hill. Pray at the Gurudwara Pathar Sahib, Magnetic Hill and watch the marvelous sight of the confluence of rivers of Indus and Zanskar. Overnight stay is provided at Leh.",
    },
    {
      day: "Day 08",
      title: "LEH",
      content: "Post a scrumptious breakfast, Visit to Leh bazaar, Shanti Stupa and Leh Palace. After that day, leisurely rest. Overnight Stay in a Hotel.",
    },
    {
      day: "Day 09",
      title: "LEH TO PANGONG",
      content: "We get ready to visit the Pangong Lake! We will cross Changla Pass 17,350 ft. (One of the Highest Motorable roads in the world). Enroute visit Rancho School (Known as 3 Idiot School), Thikshey & Shey Monastery. The first view of the lake will leave you spellbound. A sumptuous dinner with a chit-chat session would bring an end to the day. Overnight stay at Pangong.",
    },
    {
      day: "Day 10",
      title: "PANGONG TO NUBRA VIA SHYOK",
      content: "Post breakfast, take a stroll around the place to see the lifestyle of people living in the northernmost region of India. Visit the exact location of the famous movie 'Three Idiots' & enjoy an outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. After that, proceed to Nubra via Shyok Route. Overnight stay in Nubra.",
    },
    {
      day: "Day 11",
      title: "TURTUK DAY EXCURSION",
      content: "Post Breakfast, We will head towards Turtuk Village (A village that India recaptured from Pakistan in 1971) — the last site of Pakistan Side. Then Visit LOC side Thang and Tyakshi Village. Turtuk falls in Baltistan and is predominantly Muslim. Don't miss the chance to interact with the locals. You can try delicious apricots here. Visit Turtuk Waterfall and Turtuk Museum. Enjoy the magnificent view of K2 peak while walking around. Overnight stay in Nubra.",
    },
    {
      day: "Day 12",
      title: "NUBRA VALLEY TO LEH VIA KHARDUNGLA PASS",
      content: "In the morning visit Sand Dunes of Nubra Valley and enjoy a Double hump camel ride. These camels are very special and rare in the world. Visit Diskit Monastery belonging to the 14th century — the largest and oldest monastery in Nubra Valley. We will take you to Khardungla pass which was the world's highest motorable road situated at 18,400 feet. Overnight stay and dinner at Leh.",
    },
    {
      day: "Day 13",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from the mystical land of Ladakh and take home precious memories of your wonderful trip.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 6 — ANDAMAN ISLANDS ITINERARY
// ============================================================
export const ANDAMAN_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL PORT BLAIR",
      content: "Arrive at Port Blair in the morning/afternoon by flight. You will be taken to your hotel to relax and rest. Later, proceed to attend the enthralling Sound and Light Show at Cellular Jail. Post completion, you will be dropped back to your hotel.",
    },
    {
      day: "Day 02",
      title: "PORT BLAIR – HAVELOCK ISLAND",
      content: "Depart from Port Blair to Havelock Island (rated as the best island in India) in a ferry. Upon reaching, you will be dropped at your beachside resort. Later, visit Radhanagar Beach, one of Asia's best white sand beaches.",
    },
    {
      day: "Day 03",
      title: "HAVELOCK ISLAND – PORT BLAIR",
      content: "Visit the Kalapathar beach and spend the day at leisure enjoying the white sand beaches. In the evening, catch the afternoon ferry and return to Port Blair. Our representative will meet you and drop you to your hotel for overnight stay.",
    },
    {
      day: "Day 04",
      title: "INN PORT BLAIR – LOCAL SIGHTSEEING",
      content: "Start your day by visiting city attractions including the famous Chatham Saw Mill (one of the oldest in Asia), Anthropological Museum, Fisheries Museum, and Naval Marine museums. Later, visit the famous Cellular Jail.",
    },
    {
      day: "Day 05",
      title: "ROSS ISLAND & NORTH BAY ISLAND EXCURSION",
      content: "Visit Ross Island, the first Administrative settlement of the Britishers in the Andaman Islands, which today has ruins of their luxury. Then, move forward on a boat to visit the Coral Island of Port Blair, North Bay Island. You can do Scuba Diving, Sea Walk, Snorkeling and Glass boat rides here at an additional cost.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "Drop to the Airport to return home with sweet memories of the Andaman Islands.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL PORT BLAIR",
      content: "Arrive at Port Blair in the morning/afternoon by flight. You will be taken to your hotel to relax and rest. Later, proceed to attend the enthralling Sound and Light Show at Cellular Jail. Post completion, you will be dropped back to your hotel.",
    },
    {
      day: "Day 02",
      title: "PORT BLAIR – HAVELOCK ISLAND",
      content: "Depart from Port Blair to Havelock Island in a ferry. Upon reaching, you will be dropped at your beachside resort. Later, visit Radhanagar Beach.",
    },
    {
      day: "Day 03",
      title: "INN HAVELOCK ISLAND",
      content: "Day at leisure to relax in the lap of nature and spend the day enjoying white sand beaches. Additional activities such as Scuba Diving and Sea Walk can be done on this day.",
    },
    {
      day: "Day 04",
      title: "HAVELOCK ISLAND – NEIL ISLAND",
      content: "Check out from the hotel and board a premium cruise to Neil Island. Visit Bharatpur Beach and Laxmanpur beach. View the natural coral bridge and stay to view the mesmerizing sunset.",
    },
    {
      day: "Day 05",
      title: "NEIL ISLAND – PORT BLAIR",
      content: "In the morning, board a ferry to return to Port Blair. Upon reaching, you will be taken to the hotel for check-in. Evening is for a Shopping Tour to purchase gifts.",
    },
    {
      day: "Day 06",
      title: "PORT BLAIR LOCAL SIGHTSEEING",
      content: "Visit city attractions including the famous Chatham Saw Mill, Anthropological Museum, and Fisheries Museum. Later, begin your journey to the famous Cellular Jail.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Drop to the Airport and return home with sweet memories of the Andaman Islands.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "ARRIVAL PORT BLAIR",
      content: "Arrive at Port Blair in the morning/afternoon by flight. You will be taken to your hotel to relax and rest. Later, proceed to attend the enthralling Sound and Light Show at Cellular Jail. Post completion, you will be dropped back to your hotel.",
    },
    {
      day: "Day 02",
      title: "PORT BLAIR – HAVELOCK ISLAND",
      content: "Depart from Port Blair to Havelock Island in a ferry. Upon reaching, you will be dropped at your beachside resort. Later, visit Radhanagar Beach.",
    },
    {
      day: "Day 03",
      title: "INN HAVELOCK ISLAND",
      content: "Visit the Kalapathar beach and spend the rest of the day at leisure enjoying white sand beaches.",
    },
    {
      day: "Day 04",
      title: "HAVELOCK ISLAND – NEIL ISLAND",
      content: "Check out from the hotel and board a premium cruise to Neil Island. Visit Bharatpur Beach and Laxmanpur beach. View the natural coral bridge and stay to view the mesmerizing sunset.",
    },
    {
      day: "Day 05",
      title: "NEIL ISLAND – PORT BLAIR",
      content: "In the morning, board a ferry to return to Port Blair. Upon reaching, you will be taken to the hotel for check-in.",
    },
    {
      day: "Day 06",
      title: "PORT BLAIR LOCAL SIGHTSEEING",
      content: "Visit city attractions including the famous Chatham Saw Mill, Anthropological Museum, and Fisheries Museum. Later, begin your journey to the famous Cellular Jail.",
    },
    {
      day: "Day 07",
      title: "INN PORT BLAIR – ROSS ISLAND & NORTH BAY",
      content: "Visit Ross Island, the first Administrative settlement of the Britishers in the Andaman Islands. Then, move forward on a boat to visit the Coral Island of Port Blair, North Bay Island. Scuba Diving, Sea Walk, Snorkeling and Glass boat rides can be done here at additional cost.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "Drop to the Airport and return home with sweet memories of the Andaman Island.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 7 — LEH LADAKH ITINERARY
// ============================================================
export const LEHLADAKH_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "LEH ARRIVAL",
      content: "Hello And Julley, Welcome to Leh. We will pick you from the Airport and transfer to the hotel. It will be acclimatization day and you will rest for a day which is very important. Later in the evening, you can visit Leh bazaar, Shanti Stupa and Leh Palace. Overnight Stay in Hotel.",
    },
    {
      day: "Day 02",
      title: "LEH TO SHAM VALLEY (35 KMS – 1 HR ONE WAY)",
      content: "Post a scrumptious breakfast, be ready for adventure. Visit Hall of Fame and feel the pull of the magnetic hill. Pray at the Gurudwara Pathar Sahib and watch the marvelous sight of the confluence of rivers of Indus and Zanskar. Later return to Leh, enroute visit Magnetic Hill. Return to the hotel and enjoy a delicious dinner. Overnight stay is provided at Leh.",
    },
    {
      day: "Day 03",
      title: "LEH TO NUBRA VALLEY VIA KHARDUNG LA PASS (125 KMS – 5 HRS)",
      content: "We will take you to Khardungla pass which was the world's highest motorable road situated at 18,400 feet. Then Diskit, headquarters of Nubra Valley — home to an ancient monastery built in the 14th century. Visit Diskit Monastery, the largest and oldest monastery in Nubra Valley with the huge Maitreya Buddha statue inaugurated by HH Dalai Lama. Later visit Sand Dunes of Nubra Valley and enjoy a Double hump camel ride. These camels are very special and rare in the world. Overnight stay in camps at Hunder Village of the Nubra Valley.",
    },
    {
      day: "Day 04",
      title: "NUBRA TO PANGONG VIA SHYOK RIVER",
      content: "Post breakfast, take a stroll around the place to see the lifestyle of people living at the northernmost region of India. Proceed to Pangong Lake via Shyok Route. Pangong Lake is a salt water body of 120 km in length and 6-7 Km broad at the longest point. It is bisected by the international border between India & China (2/3 of the lake is in China's possession). Visit the exact location of the famous movie 'Three Idiots' & enjoy outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. Overnight stay at Pangong.",
    },
    {
      day: "Day 05",
      title: "PANGONG TO LEH",
      content: "After healthy breakfast at the finest landscape, we get ready to visit Rancho School (Known as 3 Idiot School), Thikshey & Shey Monastery. Evening shopping at the Leh Main Market and try some local dishes. Overnight Stay In Leh.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from the mystical land of Ladakh and take home precious memories of your wonderful trip.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "LEH ARRIVAL",
      content: "Hello And Julley, Welcome to Leh. We will pick you from the Airport and transfer to the hotel. It will be acclimatization day and you will rest for a day which is very important. Later in the evening, you can visit Leh bazaar, Shanti Stupa and Leh Palace. Overnight Stay in Hotel.",
    },
    {
      day: "Day 02",
      title: "LEH TO SHAM VALLEY (35 KMS – 1 HR ONE WAY)",
      content: "Post a scrumptious breakfast, be ready for adventure. Visit Hall of Fame and feel the pull of the magnetic hill. Pray at the Gurudwara Pathar Sahib and watch the marvelous sight of the confluence of rivers of Indus and Zanskar. Later return to Leh, enroute visit Magnetic Hill. Overnight stay is provided at Leh.",
    },
    {
      day: "Day 03",
      title: "LEH TO NUBRA VALLEY VIA KHARDUNG LA PASS (125 KMS – 5 HRS)",
      content: "We will take you to Khardungla pass which was the world's highest motorable road situated at 18,400 feet. Then Diskit, headquarters of Nubra Valley — home to an ancient monastery built in the 14th century. Visit Diskit Monastery, the largest and oldest monastery in Nubra Valley with the huge Maitreya Buddha statue inaugurated by HH Dalai Lama. Later visit Sand Dunes of Nubra Valley and enjoy a Double hump camel ride. Overnight stay in camps at Hunder Village of the Nubra Valley.",
    },
    {
      day: "Day 04",
      title: "TURTUK DAY EXCURSION (90 KMS – ONE WAY)",
      content: "Post Breakfast, We will head towards Turtuk Village (A village that India recaptured from Pakistan in 1971) — the last site of Pakistan Side. Then Visit LOC side Thang and Tyakshi Village. Turtuk falls in Baltistan and is predominantly Muslim. Don't miss the chance to interact with the locals. You can try delicious apricots here. Visit Turtuk Waterfall and Turtuk Museum. Enjoy the magnificent view of K2 peak while walking around. Overnight stay in Nubra.",
    },
    {
      day: "Day 05",
      title: "NUBRA TO PANGONG VIA SHYOK (160 KMS – 5 HRS)",
      content: "Post breakfast, take a stroll around the place to see the lifestyle of people living at the northernmost region of India. Proceed to Pangong Lake via Shyok Route. Pangong Lake is a salt water body of 120 km in length and 6-7 Km broad at the longest point. It is bisected by the international border between India & China. Visit the exact location of the famous movie 'Three Idiots' & enjoy outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. Overnight stay in Pangong.",
    },
    {
      day: "Day 06",
      title: "PANGONG TO LEH (130 KMS – 5 HRS)",
      content: "We will ride back to Leh, crossing Changla Pass 17,350 ft. (One of the Highest Motorable roads in the world). The ride will leave you spellbound with beautiful views and mind-blowing landscape. Enroute visit Rancho School (Known as 3 Idiot School), Thikshey & Shey Monastery. We retreat to the hotel for a night's stay. Overnight stay at the hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from the mystical land of Ladakh and take home precious memories of your wonderful trip.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "LEH ARRIVAL",
      content: "Hello And Julley, Welcome to Leh. We will pick you from the Airport and transfer to the hotel. It will be acclimatization day and you will rest for a day which is very important. Later in the evening, you can visit Leh bazaar, Shanti Stupa and Leh Palace. Overnight Stay in Hotel.",
    },
    {
      day: "Day 02",
      title: "LEH TO SHAM VALLEY (35 KMS – 1 HR ONE WAY)",
      content: "Post a scrumptious breakfast, be ready for adventure. Visit Hall of Fame and feel the pull of the magnetic hill. Pray at the Gurudwara Pathar Sahib and watch the marvelous sight of the confluence of rivers of Indus and Zanskar. Later return to Leh, enroute visit Magnetic Hill. Overnight stay is provided at Leh.",
    },
    {
      day: "Day 03",
      title: "LEH TO NUBRA VALLEY VIA KHARDUNG LA PASS (125 KMS – 5 HRS)",
      content: "We will take you to Khardungla pass which was the world's highest motorable road situated at 18,400 feet. Visit Diskit Monastery, the largest and oldest monastery in Nubra Valley with the huge Maitreya Buddha statue inaugurated by HH Dalai Lama. Later visit Sand Dunes of Nubra Valley and enjoy a Double hump camel ride. Overnight stay in camps at Hunder Village of the Nubra Valley.",
    },
    {
      day: "Day 04",
      title: "TURTUK DAY EXCURSION (90 KMS – ONE WAY)",
      content: "Post Breakfast, We will head towards Turtuk Village (A village that India recaptured from Pakistan in 1971). Then Visit LOC side Thang and Tyakshi Village. Turtuk falls in Baltistan and is predominantly Muslim. You can try delicious apricots here. Visit Turtuk Waterfall and Turtuk Museum. Enjoy the magnificent view of K2 peak while walking around. Overnight stay in Nubra.",
    },
    {
      day: "Day 05",
      title: "NUBRA TO PANGONG VIA SHYOK (160 KMS – 5 HRS)",
      content: "Post breakfast, proceed to Pangong Lake via Shyok Route. Pangong Lake is a salt water body of 120 km in length and 6-7 Km broad at the longest point. It is bisected by the international border between India & China. Visit the exact location of the famous movie 'Three Idiots' & enjoy outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. Overnight stay in Pangong.",
    },
    {
      day: "Day 06",
      title: "PANGONG TO HANLE (175 KMS – 6 HRS)",
      content: "After an early breakfast drive to Hanle. Hanle in Changthang region of Ladakh is one of the most beautiful calm and soul-soothing places in India. Hanle has a lovely monastery offering great aerial views of the whole village. Hanle monastery is a 17th century monastery of the Drukpa lineage of the Kagyu school of Tibetan Buddhism, home to about 60 monks. Hanle also houses an Indian astronomical observatory — the world's highest observatory at a staggering height of 4500 mtrs. Overnight in local Homestay.",
    },
    {
      day: "Day 07",
      title: "HANLE TO LEH (280 KMS – 6 HRS)",
      content: "Post breakfast we check out from the Camp and explore the lake area and Korzok village. Later drive back to Leh along the river Indus. Enroute visit Rancho School (Known as 3 Idiot School), Thikshey & Shey Monastery. We retreat to the hotel for a night's stay. Overnight stay at the hotel.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from the mystical land of Ladakh and take home precious memories of your wonderful trip.",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "LEH ARRIVAL",
      content: "Hello And Julley, Welcome to Leh. We will pick you from the Airport and transfer to the hotel. It will be acclimatization day and you will rest for a day which is very important. Later in the evening, you can visit Leh bazaar, Shanti Stupa and Leh Palace. Overnight Stay in Hotel.",
    },
    {
      day: "Day 02",
      title: "LEH TO KARGIL VIA LAMAYURU (220 KMS – 7 HRS ONE WAY)",
      content: "Post a scrumptious breakfast, be ready for adventure. Visit Hall of Fame and feel the pull of the magnetic hill. Pray at the Gurudwara Pathar Sahib and watch the marvelous sight of the confluence of rivers of Indus and Zanskar. Enroute visit Magnetic Hill. Enjoy the view of Moonland. Then visit Fotula Pass, Namikla Pass & Mulbek. Overnight stay is provided at Kargil.",
    },
    {
      day: "Day 03",
      title: "KARGIL TO LEH (220 KMS – 7 HRS ONE WAY)",
      content: "After breakfast, proceed to your return journey to Leh. In the evening you will be reaching at Leh. Post check in have a wholesome Dinner. Overnight stay at Leh.",
    },
    {
      day: "Day 04",
      title: "LEH TO NUBRA VALLEY VIA KHARDUNG LA PASS (125 KMS – 5 HRS)",
      content: "We will take you to Khardungla pass which was the world's highest motorable road situated at 18,400 feet. Visit Diskit Monastery, the largest and oldest monastery in Nubra Valley with the huge Maitreya Buddha statue inaugurated by HH Dalai Lama. Later visit Sand Dunes of Nubra Valley and enjoy a Double hump camel ride. Overnight stay in camps at Hunder Village of the Nubra Valley.",
    },
    {
      day: "Day 05",
      title: "TURTUK DAY EXCURSION (90 KMS – ONE WAY)",
      content: "Post Breakfast, We will head towards Turtuk Village (A village that India recaptured from Pakistan in 1971). Then Visit LOC side Thang and Tyakshi Village. Turtuk falls in Baltistan and is predominantly Muslim. You can try delicious apricots here. Visit Turtuk Waterfall and Turtuk Museum. Enjoy the magnificent view of K2 peak while walking around. Overnight stay in Nubra.",
    },
    {
      day: "Day 06",
      title: "NUBRA TO PANGONG VIA SHYOK (160 KMS – 5 HRS)",
      content: "Post breakfast, proceed to Pangong Lake via Shyok Route. Pangong Lake is a salt water body of 120 km in length and 6-7 Km broad at the longest point. It is bisected by the international border between India & China. Visit the exact location of the famous movie 'Three Idiots' & enjoy outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. Overnight stay in Pangong.",
    },
    {
      day: "Day 07",
      title: "PANGONG TO TSO MORIRI (220 KMS – 6 HRS)",
      content: "After breakfast drive to Tsomoriri Lake. It is a breathtaking journey on a trail that is literally a 'no man's land'. Vast lonely stretches on the Chanthang plateau makes this drive one of the best isolated drives of this tour. Tsomoriri is situated at an altitude of 4511m above sea level with an area of about 140 Sq.km. Spend your evening watching shadows of the surrounding mountain and the varying depths of Tsomoriri lake. Stay in tented cottages/Hotels at Tso Moriri.",
    },
    {
      day: "Day 08",
      title: "TSO MORIRI TO LEH (260 KMS – 6 HRS)",
      content: "Post breakfast we check out from the Camp and explore the lake area and Korzok village. Later drive back to Leh along the river Indus. Enroute visit Rancho School (Known as 3 Idiot School), Thikshey & Shey Monastery. We retreat to the hotel for a night's stay. Overnight stay at the hotel.",
    },
    {
      day: "Day 09",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from the mystical land of Ladakh and take home precious memories of your wonderful trip.",
    },
  ],

  "9N10D": [
    {
      day: "Day 01",
      title: "LEH ARRIVAL",
      content: "Hello And Julley, Welcome to Leh. We will pick you from the Airport and transfer to the hotel. It will be acclimatization day and you will rest for a day which is very important. Later in the evening, you can visit Leh bazaar, Shanti Stupa and Leh Palace. Overnight Stay in Hotel.",
    },
    {
      day: "Day 02",
      title: "LEH TO KARGIL VIA LAMAYURU (220 KMS – 7 HRS ONE WAY)",
      content: "Post a scrumptious breakfast, be ready for adventure. Visit Hall of Fame and feel the pull of the magnetic hill. Pray at the Gurudwara Pathar Sahib and watch the marvelous sight of the confluence of rivers of Indus and Zanskar. Enroute visit Magnetic Hill. Enjoy the view of Moonland. Then visit Fotula Pass, Namikla Pass & Mulbek. Overnight stay is provided at Kargil.",
    },
    {
      day: "Day 03",
      title: "KARGIL TO LEH (220 KMS – 7 HRS ONE WAY)",
      content: "After breakfast, proceed to your return journey to Leh. In the evening you will be reaching at Leh. Post check in have a wholesome Dinner. Overnight stay at Leh.",
    },
    {
      day: "Day 04",
      title: "LEH TO NUBRA VALLEY VIA KHARDUNG LA PASS (125 KMS – 5 HRS)",
      content: "We will take you to Khardungla pass which was the world's highest motorable road situated at 18,400 feet. Visit Diskit Monastery, the largest and oldest monastery in Nubra Valley with the huge Maitreya Buddha statue inaugurated by HH Dalai Lama. Later visit Sand Dunes of Nubra Valley and enjoy a Double hump camel ride. Overnight stay in camps at Hunder Village of the Nubra Valley.",
    },
    {
      day: "Day 05",
      title: "TURTUK DAY EXCURSION (90 KMS – ONE WAY)",
      content: "Post Breakfast, We will head towards Turtuk Village (A village that India recaptured from Pakistan in 1971). Then Visit LOC side Thang and Tyakshi Village. Turtuk falls in Baltistan and is predominantly Muslim. You can try delicious apricots here. Visit Turtuk Waterfall and Turtuk Museum. Enjoy the magnificent view of K2 peak while walking around. Overnight stay in Nubra.",
    },
    {
      day: "Day 06",
      title: "NUBRA TO PANGONG VIA SHYOK (160 KMS – 5 HRS)",
      content: "Post breakfast, proceed to Pangong Lake via Shyok Route. Pangong Lake is a salt water body of 120 km in length and 6-7 Km broad at the longest point. It is bisected by the international border between India & China. Visit the exact location of the famous movie 'Three Idiots' & enjoy outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. Overnight stay in Pangong.",
    },
    {
      day: "Day 07",
      title: "PANGONG TO HANLE (175 KMS – 6 HRS)",
      content: "After an early breakfast drive to Hanle. Hanle in Changthang region of Ladakh is one of the most beautiful calm and soul-soothing places in India. Hanle monastery is a 17th century monastery of the Drukpa lineage of the Kagyu school of Tibetan Buddhism, home to about 60 monks. Hanle also houses an Indian astronomical observatory — the world's highest observatory at a staggering height of 4500 mtrs. Overnight in local Homestay.",
    },
    {
      day: "Day 08",
      title: "HANLE TO TSO MORIRI (160 KMS – 6 HRS)",
      content: "After breakfast drive to Tsomoriri Lake. It is a breathtaking journey on a trail that is literally a 'no man's land'. Vast lonely stretches on the Chanthang plateau makes this drive one of the best isolated drives of this tour. Tsomoriri is situated at an altitude of 4511m above sea level with an area of about 140 Sq.km. Spend your evening watching shadows of the surrounding mountain and the varying depths of Tsomoriri lake. Stay in tented cottages/Hotels at Tso Moriri.",
    },
    {
      day: "Day 09",
      title: "TSO MORIRI TO LEH (260 KMS – 6 HRS)",
      content: "Post breakfast we check out from the Camp and explore the lake area and Korzok village. Later drive back to Leh along the river Indus. Enroute visit Rancho School (Known as 3 Idiot School), Thikshey & Shey Monastery. We retreat to the hotel for a night's stay. Overnight stay at the hotel.",
    },
    {
      day: "Day 10",
      title: "DEPARTURE",
      content: "Post breakfast, prepare for your departure. Depart from the mystical land of Ladakh and take home precious memories of your wonderful trip.",
    },
  ],

  "10N11D": [
    {
      day: "Day 01",
      title: "DELHI TO MANALI",
      content: "Reach Delhi by the evening by own. You will have to reach (Approx 5 PM) Majnu Ka Tila / Kashmiri Gate to board in Volvo to Manali. Overnight Journey.",
    },
    {
      day: "Day 02",
      title: "MANALI ARRIVAL",
      content: "Upon arrival in Manali, we check in to our hotels and gear up for exploring the beautiful city! Explore the primal city filled with rich cultural heritage and generational traditions. People can explore mall road, Hadimba Devi temple, Vashishta by own. Overnight stay in Manali.",
    },
    {
      day: "Day 03",
      title: "MANALI TO JISPA/SARCHU",
      content: "After Breakfast, we will start our Ladakh journey! We will cross the famous Atal Tunnel built at an altitude of 10,171 feet and stretching up to 9.2 kms. We will ride via Chandra Valley. Enroute Sarchu, we will visit Suraj Tal (lake of Sun God) and Deepak Tal. We will also cross the famous Baralacha Pass located at 16,616 ft. which connects Lahaul district in Himachal Pradesh to Ladakh. Upon arrival, we would settle down in our campsite.",
    },
    {
      day: "Day 04",
      title: "JISPA/SARCHU TO LEH",
      content: "After breakfast, we will start our journey towards Leh. This route will give you a mesmerizing view of the landscape of this beautiful cold desert. Tanglang La pass cuts through the mountains while one can witness a gentle stream flowing on a clear day surrounded by snow-capped mountains. Upon arrival, we settled down in the Hotel and the evening is left free to explore the local market. Conclude your hectic day with fantastic dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 05",
      title: "LEH TO NUBRA VALLEY",
      content: "We will take you to Khardungla pass which is the world's highest motorable pass and then Diskit, headquarters of Nubra Valley. Its attraction is that of an ancient monastery built in the 14th Century. After a memorable day in Nubra Valley, it's time to relax and end your day with a tempting dinner and overnight stay in camps at Hunder Village of the Nubra Valley.",
    },
    {
      day: "Day 06",
      title: "TURTUK DAY EXCURSION",
      content: "After Breakfast, check out from the camps & visit Diskit Monastery. Then continue further till Turtuk. Turtuk falls in Baltistan and is predominantly Muslim. Don't miss the chance to interact with the locals. You can try delicious apricots here. Visit Turtuk Waterfall and Turtuk Museum. Enjoy the magnificent view of K2 peak while walking around. Dinner and overnight stay in Turtuk.",
    },
    {
      day: "Day 07",
      title: "NUBRA TO PANGONG VIA SHYOK RIVER",
      content: "After breakfast, visit Diskit & Hunder Villages and monasteries. Proceed to Pangong Lake via Shyok Route. Pangong Lake is a salt water body of 120 km in length and 6-7 Km broad at the longest point. It is bisected by the international border between India & China. Visit the exact location of the famous movie 'Three Idiots' & enjoy outing along the banks of the lake. On a clear sunny day, you can see seven colour formations in the crystal-clear salt water lake. Overnight stay in Pangong.",
    },
    {
      day: "Day 08",
      title: "PANGONG TO LEH VIA CHANGLA PASS",
      content: "We will ride back to Leh, crossing Changla Pass 17,350 ft. (Third Highest Motorable road in the world). The ride will leave you spellbound with beautiful views and mind-blowing landscape. We retreat to the hotel for a night's stay. Dinner and overnight stay at the hotel.",
    },
    {
      day: "Day 09",
      title: "LEH TO JISPA/SARCHU VIA TANGLANG LA PASS",
      content: "After breakfast, check out from the hotel and drive back to Jispa/Sarchu. After reaching Jispa/Sarchu you have the day to relax and explore the beautiful destination on your own. Enjoy a comfortable overnight stay at the Hotel/Camp.",
    },
    {
      day: "Day 10",
      title: "JISPA/SARCHU TO MANALI",
      content: "After exploring Jispa's vibrant views on foot, we will start our journey back to Manali via Sissu and Atal Tunnel. Upon reaching Manali, you can indulge in souvenir shopping and as evening approaches, travelers will assemble at the pick-up point and board their overnight bus to Delhi.",
    },
    {
      day: "Day 11",
      title: "DELHI REACHED",
      content: "You will be arriving Delhi 8:00 AM. You can plan your upcoming tour accordingly.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 8 — UTTARAKHAND ITINERARY
// ============================================================
export const UTTARAKHAND_ITINERARY: ProductItinerary = {

  "4N5D": [
    {
      day: "Day 01",
      title: "MUSSOORIE ARRIVAL",
      content: "On arrival, you will be escorted to the hotel by the agent's representative. Once you finish all the check-in formalities at the hotel, you can spend the overnight at your freedom. You can relax and unwind at the hotel while using all the amenities available or go around the shop at Mall road or just wander enjoying the snowy weather. At the end of the day, you can come back to the hotel and get ready for the next day.",
    },
    {
      day: "Day 02",
      title: "MUSSOORIE LOCAL SIGHTSEEING",
      content: "After a delicious breakfast, you'll be taken to the major attractions of the place. Kempty Fall, Gun Hill, George Hill Everest, Company Garden, Camel's back, Mall road and Lal Tibba will be your photobooths for the day. This would be followed by the overnight stay in Mussoorie.",
    },
    {
      day: "Day 03",
      title: "EXCURSION TO DHANAULTI",
      content: "On this day, take an excursion to Dhanaulti, a peaceful hill station nearby, known for its tranquil environment and beautiful apple orchards. Visit the Eco Park and enjoy the peaceful surroundings. You can also take short nature walks here. Return to Mussoorie in the evening for some rest.",
    },
    {
      day: "Day 04",
      title: "MUSSOORIE – DEHRADUN",
      content: "After a delicious breakfast, you will drive towards Dehradun, the capital of Uttarakhand. After checking into your hotel, visit local attractions such as Robber's Cave, Sahastradhara, and the Tapkeshwar Temple. Spend the evening leisurely exploring the town, then relax in your hotel.",
    },
    {
      day: "Day 05",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed. Evening drop at Nearest Airport / Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],

  "5N6D": [
    {
      day: "Day 01",
      title: "DELHI TO NAINITAL",
      content: "Morning arrival at Delhi Airport / Railway Station. Depart for Nainital. On Arrival Check in at Hotel. After fresh up enjoy strolling on the Mall Road for shopping. Enjoy your dinner and an overnight stay at the hotel.",
    },
    {
      day: "Day 02",
      title: "NAINITAL LOCAL SIGHTSEEING",
      content: "After breakfast, proceed for the sightseeing tour, beginning with boating at the famous Naini Lake and a visit to the holy Naina Devi Temple. After that, visit famous picnic spots like Naina Peak, Snow View, Lands' End etc. Enjoy day at leisure. Dinner and overnight stay at hotel.",
    },
    {
      day: "Day 03",
      title: "NAINITAL TO CORBETT",
      content: "After Breakfast, Check out from the Hotel and Drive to Corbett. En route Visit Hanuman Dham — newly opened India's largest Lord Hanuman temple. Afternoon arrival at Corbett. Visit Corbett Jeep Safari (Extra Cost). Safari Zone: Bijrani, Jhirna, Dhela, Garjia, Durga Devi, Sitabani, Phato.",
    },
    {
      day: "Day 04",
      title: "CORBETT TO MUSSOORIE",
      content: "Morning, after breakfast check out from the hotel and Drive to Mussoorie. On arrival check in at Hotel. After fresh up, enjoy rest leisure day at Mussoorie Mall Road (By Own). Overnight at Mussoorie Hotel.",
    },
    {
      day: "Day 05",
      title: "MUSSOORIE LOCAL SIGHTSEEING",
      content: "After Morning breakfast, visit Mussoorie Local Sightseeing like Kempty Fall. After enjoying the waterfall of Kempty, come back to Mussoorie. Evening explore local Mussoorie — Gun Hill, Lal Tibba, Company Garden and Camel back (Own Cost Sightseeing). Dinner & overnight at hotel.",
    },
    {
      day: "Day 06",
      title: "MUSSOORIE – DELHI (DEPARTURE)",
      content: "After breakfast checkout from hotel and proceed to Delhi. Evening drop at Delhi Airport / Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "MUSSOORIE ARRIVAL",
      content: "On arrival, you will be escorted to the hotel by the agent's representative. Once you finish all the check-in formalities at the hotel, you can spend the overnight at your freedom. You can relax and unwind at the hotel while using all the amenities available or go around the shop at Mall road or just wander enjoying the snowy weather.",
    },
    {
      day: "Day 02",
      title: "MUSSOORIE SIGHTSEEING TOUR",
      content: "The second day will be an early start where you will begin your day with a sightseeing tour to Kempty Falls. After which you will be escorted back to the hotel for breakfast. After that experiencing the trek to the peak of Gun Hills and George Hill Everest and then for some fresh air our next spot will be Company Garden. Enjoy a walk on Camel's Backroad after that. Ending the evening with the most beautiful sunset at Lal Tibba hill. After the tour, you will be escorted back to the hotel for dinner.",
    },
    {
      day: "Day 03",
      title: "MUSSOORIE TO HARIDWAR",
      content: "After your comfortable overnight stay, an early morning Breakfast will be served. Head to Haridwar with a heart full of memories and a soul at peace. On the way visit Shatradhara waterfall, Sai Temple, Parkasheshwar temple. At the end of the day, you can come back to the hotel and get ready for the next day.",
    },
    {
      day: "Day 04",
      title: "HARIDWAR – RISHIKESH – HARIDWAR",
      content: "After a delicious breakfast, you will drive towards Rishikesh for local sightseeing. Known as the gateway to the Char Dham, this holy city is full of sacred sites, like Lakshman Jhula, Ram Jhula, Triveni Ghat, Bharat Mandir, Nilkanth Mahadev, Parmarth Niketan, Gita Bhawan, Vashistha Cave that you must visit too. After the tour, you will be back to Haridwar hotel for overnight stay.",
    },
    {
      day: "Day 05",
      title: "HARIDWAR SIGHTSEEING",
      content: "After a delicious breakfast, you will begin your sightseeing tour of Haridwar, one of the seven holiest cities in India. You will visit popular attractions like Har Ki Pauri, Maya Devi Temple, Mansa Devi Temple, Chandi Devi Temple, and Shanti Kunj. In the evening, enjoy some local shopping before returning to the hotel for overnight stay.",
    },
    {
      day: "Day 06",
      title: "INN HARIDWAR",
      content: "After Breakfast visit Market & some shopping and visit local area. Enjoy time & day at leisure. Evening back to hotel overnight stay in hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "After breakfast checkout from hotel and proceed. Evening drop at Nearest Airport / Railway Station. Tour end, But Sweet Memories Always Remain...",
    },
  ],

  "9N10D": [
    {
      day: "Day 01",
      title: "HARIDWAR ARRIVAL",
      content: "Arrive at the designated reporting place, report to vehicle and proceed to Haridwar — an ancient temple city located on the banks of the River Ganga. Located at the foothills of the Himalayas, Haridwar is a city of temples and ashrams and its pious ambiance envelops everyone. In the evening experience the blissful Ganga Aarti (If time permits).",
    },
    {
      day: "Day 02",
      title: "HARIDWAR SIGHTSEEING",
      content: "After a delicious breakfast, you will begin your sightseeing tour of Haridwar, one of the seven holiest cities in India. You will visit popular attractions like Har Ki Pauri, Maya Devi Temple, Mansa Devi Temple, Chandi Devi Temple, and Shanti Kunj. In the evening, enjoy some local shopping before returning to the hotel for overnight stay.",
    },
    {
      day: "Day 03",
      title: "HARIDWAR – RISHIKESH – MUSSOORIE",
      content: "In the morning visit Gangaghat, sit calmly on the banks of Ganga and enjoy the cool breeze from the river. Later proceed to Rishikesh. Take a photostop at Laxman Jhula. Arrive at Mussoorie in the evening — a hill station in the foothills of the Garhwal Himalayan range.",
    },
    {
      day: "Day 04",
      title: "MUSSOORIE",
      content: "Begin your day with a sightseeing tour to Kempty Falls. After which you will be escorted back to the hotel for breakfast. After that experiencing the trek to the peak of Gun Hills and George Hill Everest and then for some fresh air our next spot will be Company Garden. Enjoy a walk on Camel's Backroad after that. Ending the evening with the most beautiful sunset at Lal Tibba hill. Return to hotel for overnight stay.",
    },
    {
      day: "Day 05",
      title: "MUSSOORIE TO NAINITAL",
      content: "Proceed to Nainital — commonly known as the Lake District of India. On arrival free time for relaxation.",
    },
    {
      day: "Day 06",
      title: "NAINITAL SIGHTSEEING",
      content: "Today take a cable car to experience Snow View Point, which offers a picturesque view of the mighty Himalayas. Visit Nainadevi Temple, an ancient Hindu Temple and enjoy boating at Naini Lake. Free time for shopping in the evening.",
    },
    {
      day: "Day 07",
      title: "RANIKHET DAY TRIP",
      content: "Proceed to Ranikhet. Visit Kainchi Temple, pass by Kumaon Regiment Shahid Smarak and Golf Course in Ranikhet.",
    },
    {
      day: "Day 08",
      title: "NAINITAL TO CORBETT",
      content: "Today visit Ghodakhal Bell temple followed by a Lake tour of Bhimtal and Naukuchiatal. Take a memorable boat ride in Naukuchiatal. Later proceed to Corbett Park — The magical landscape of Corbett is well known and fabled for its tiger richness. Established in the year 1936 as Hailey National Park, Corbett has the glory of being India's oldest and most prestigious National Park. En-route visit Corbett Museum. Arrive in Jim Corbett National Park.",
    },
    {
      day: "Day 09",
      title: "CORBETT PARK",
      content: "Today experience the most thrilling Jeep safari adventure of wildlife viewing in the region of 'Man eaters of Kumaon'. You may spot the Royal Bengal Tiger, Deer, Indian Hog Deer, Sambar Deer, Otter, Asiatic Black Bear, Sloth Bear, etc. Enjoy nature walk and live Guitar performance in the evening.",
    },
    {
      day: "Day 10",
      title: "DEPARTURE",
      content: "Proceed to Delhi. Board the flight for your home town. Tour Concludes.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 9 — UTTAR PRADESH ITINERARY
// ============================================================
export const UTTARPRADESH_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "EXPLORE VRINDAVAN",
      content: "In morning our driver will meet and greet you at Mathura Railway Station. After that proceed towards your hotel. On arrival complete the check in process and take some rest. After that visit Banke Bihari Temple (one of Vrindavan's most famous temples), Keshi Ghat (where you can enjoy boating at your own cost) and Prem Mandir (as per time permit). After that back to your hotel and stay overnight here.",
    },
    {
      day: "Day 02",
      title: "BARSANA – VRINDAVAN",
      content: "In morning after breakfast proceed towards Barsana. On arrival visit Shri Radha Rani Temple, Kirti Mandir, Prem Sarovar and Maan Mandir. After that back to Vrindavan and stay overnight here.",
    },
    {
      day: "Day 03",
      title: "EXPLORE VRINDAVAN",
      content: "In early morning have your breakfast. After that visit Radha Raman Temple, Seva Kunj and Nidhivan and Iskcon Temple. After that explore Vrindavan's local market. After that back to your hotel and stay overnight here.",
    },
    {
      day: "Day 04",
      title: "TOWARDS MATHURA",
      content: "In morning have your breakfast and check out from the hotel. After that proceed towards Mathura. On arrival complete the check in process. After that visit Dwarkadhish Temple, Birla Mandir (Gita Mandir), Shri Krishna Janmabhoomi Temple, and Vishram Ghat. After that back to your hotel and stay overnight here.",
    },
    {
      day: "Day 05",
      title: "TOWARDS GOKUL",
      content: "In morning have your breakfast and proceed towards Gokul. After that visit Shri Nand Yashoda Bhawan, Thakurani Ghat, Raman Reti and Brahmand Ghat (as per time permit). After that back to Mathura and stay overnight here.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "In morning have your breakfast and check out from the hotel. Driver will drop you at Mathura Railway Station with memorable experiences.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 10 — MEGHALAYA ITINERARY
// ============================================================
export const MEGHALAYA_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "GUWAHATI – SHILLONG (100 KMS / 3 HRS)",
      content: "Welcome to Awesome Assam. Meet and be assisted by our representative at the airport/Railway Station. Proceed to Shillong, also called 'Scotland of the East'. Reach the majestic Umiam Lake (Barapani). You may do the water sports here (Optional). On arrival at Shillong, check in at your hotel. Overnight stay in Shillong.",
    },
    {
      day: "Day 02",
      title: "SHILLONG – MAWLYNNONG – DAWKI – SHILLONG",
      content: "Morning after breakfast depart for a whole day excursion to Mawlynnong Village, which has earned the distinction of being the cleanest village in India. It is situated 90 kms from Shillong. Dawki lies 2 Kms from Bangladesh. Dawki is a small village and its main attraction is the Umngot River that marks the natural separation between the Khasi and the Jaintia Hills. Overnight stay at Shillong.",
    },
    {
      day: "Day 03",
      title: "CHERRAPUNJEE EXCURSION",
      content: "After breakfast, drive to Cherrapunjee (4,400 ft.), the wettest place in the world. On the way enjoy the following places: Shillong Peak, Elephanta Falls, Mawsmai Cave, Nohkalikai falls, Seven Sister waterfalls. Back to Shillong and Overnight stay at Shillong.",
    },
    {
      day: "Day 04",
      title: "SHILLONG – GUWAHATI",
      content: "After Breakfast drive to Guwahati. Check in at Hotel. Guwahati, 'The light of the East' is the commercial capital of North East lying adjacent to the shores of the turbulent Brahmaputra. Evening enjoy a River cruise over the river Brahmaputra (cruise charges additional). Overnight in Guwahati.",
    },
    {
      day: "Day 05",
      title: "GUWAHATI LOCAL SIGHTSEEING",
      content: "Morning starts the Full day sightseeing in and around this capital city of Assam, covering Kamakhya Temple (situated on top of the Nilachal Hill, the most sacred among the tantrik shrines of Shakti worship in the world), Balaji Temple, State Museum, Navagraha Temple (dedicated to the nine planets located on the top of Chhatrasal Hill), Umananda Temple on Bhasmach (a Shiva temple located at the Peacock Island — smallest inhabited riverine island in the world), Sankardeva Kalakshetra (a cultural institution in the Panjabari area). Overnight stay at Guwahati.",
    },
    {
      day: "Day 06",
      title: "GUWAHATI TO AIRPORT",
      content: "Early morning after breakfast transfer to Guwahati airport / Rly station. Tour Ends.",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "GUWAHATI – SHILLONG (100 KMS / 3 HRS)",
      content: "Welcome to Awesome Assam. Meet and be assisted by our representative at the airport/Railway Station. Proceed to Shillong, also called 'Scotland of the East'. Reach the majestic Umiam Lake (Barapani). You may do the water sports here (Optional). On arrival at Shillong, check in at your hotel. Overnight stay in Shillong.",
    },
    {
      day: "Day 02",
      title: "SHILLONG LOCAL SIGHTSEEING",
      content: "After breakfast we proceed to the local sightseeing area of Shillong: Laitlum Canyons, Don Bosco Center for Indigenous Cultures, Ward's Lake, Cathedral Catholic Church, Lady Hydari Park, Golf Course. Overnight in Shillong.",
    },
    {
      day: "Day 03",
      title: "SHILLONG – MAWLYNNONG – DAWKI – SHILLONG",
      content: "Morning after breakfast depart for a whole day excursion to Mawlynnong Village, which has earned the distinction of being the cleanest village in India. It is situated 90 kms from Shillong. Dawki lies 2 Kms from Bangladesh. Dawki is a small village and its main attraction is the Umngot River that marks the natural separation between the Khasi and the Jaintia Hills. Overnight stay at Shillong.",
    },
    {
      day: "Day 04",
      title: "SHILLONG TO CHERRAPUNJEE TRANSFER",
      content: "After breakfast, drive to Cherrapunjee (4,400 ft.), the wettest place in the world. On the way enjoy the following places: Shillong Peak, Elephanta Falls, Mawkdok Valley, Nohkalikai falls, Dainthlen Falls. On arrival at Cherrapunjee, check in at your hotel. Overnight stay at Cherrapunjee.",
    },
    {
      day: "Day 05",
      title: "CHERRAPUNJEE LOCAL SIGHTSEEING",
      content: "After breakfast proceed for the local sightseeing: Wei Sawdong Falls, Seven Sisters Waterfalls, Arwah Cave, Nohkalikai Falls, Mawsmai Cave. Overnight Stay at Cherrapunjee.",
    },
    {
      day: "Day 06",
      title: "SHILLONG – KAZIRANGA (253 KMS / 5 HRS)",
      content: "After breakfast, drive & transfer to Kaziranga National Park, the home of 'One Horned Rhinoceros'. Check in at your hotel. Evening is free for leisure. Overnight stay at Kaziranga.",
    },
    {
      day: "Day 07",
      title: "KAZIRANGA SAFARIS (ADDITIONAL CHARGE)",
      content: "Early morning, explore Western Zone of Kaziranga National Park on the back of an elephant. The Park sustains half the world's population of genetically pure Wild Water Buffaloes, over 1000 Wild elephants and perhaps the densest population of Royal Bengal Tigers anywhere. Afternoon go for a jeep safari through the Central Zone of the National Park. Note: Cost for elephant and Jeep Safari not inclusive. Overnight stay at the hotel.",
    },
    {
      day: "Day 08",
      title: "KAZIRANGA – GUWAHATI (150 KMS / 5 HRS)",
      content: "After Breakfast drive to Guwahati. Check in at Hotel. Evening enjoy a River cruise over the river Brahmaputra (cruise charges additional). Overnight in Guwahati.",
    },
    {
      day: "Day 09",
      title: "DEPARTURE",
      content: "After Breakfast drive to Guwahati Airport/Station. If time permits, visit Kamakhya Temple. Temple doors remain open for devotees in the following timings — 08:00 am to 01:00 pm & 3:00 pm to 5:00 pm.",
    },
  ],

  "10N11D": [
    {
      day: "Day 01",
      title: "GUWAHATI – SHILLONG (100 KMS / 3 HRS)",
      content: "Welcome to Awesome Assam. Meet and be assisted by our representative at the airport/Railway Station. Proceed to Shillong, also called 'Scotland of the East'. Reach the majestic Umiam Lake (Barapani). You may do the water sports here (Optional). On arrival at Shillong, check in at your hotel. Overnight stay in Shillong.",
    },
    {
      day: "Day 02",
      title: "SHILLONG – MAWLYNNONG – DAWKI – SHILLONG",
      content: "Morning after breakfast depart for a whole day excursion to Mawlynnong Village, which has earned the distinction of being the cleanest village in India. It is situated 90 kms from Shillong. Dawki lies 2 Kms from Bangladesh. Dawki is a small village and its main attraction is the Umngot River that marks the natural separation between the Khasi and the Jaintia Hills. Overnight stay at Shillong.",
    },
    {
      day: "Day 03",
      title: "CHERRAPUNJEE EXCURSION",
      content: "After breakfast, drive to Cherrapunjee (4,400 ft.), the wettest place in the world. On the way enjoy the following places: Shillong Peak, Elephanta Falls, Mawsmai Cave, Nohkalikai falls, Seven Sister waterfalls. Back to Shillong and Overnight stay at Shillong.",
    },
    {
      day: "Day 04",
      title: "SHILLONG – KAZIRANGA (253 KMS / 5 HRS)",
      content: "After breakfast, drive & transfer to Kaziranga National Park, the home of 'One Horned Rhinoceros'. Check in at your hotel. Evening is free for leisure. Overnight stay at Kaziranga.",
    },
    {
      day: "Day 05",
      title: "KAZIRANGA SAFARIS (ADDITIONAL CHARGE)",
      content: "Early morning, explore Western Zone of Kaziranga National Park on the back of an elephant. The Park sustains half the world's population of genetically pure Wild Water Buffaloes, over 1000 Wild elephants and perhaps the densest population of Royal Bengal Tigers anywhere. Afternoon go for a jeep safari through the Central Zone of the National Park. Note: Cost for elephant and Jeep Safari not inclusive. Overnight stay at the hotel.",
    },
    {
      day: "Day 06",
      title: "KAZIRANGA – DIRANG (140 KMS / 4 HRS)",
      content: "After an early breakfast, drive to Dirang. On the way, visit Tipi Orchidarium situated on the banks of the river Bharali, a place of over 500 orchids. Visit Nag Temple. Dirang is also famous for hot water springs where people take baths to cure skin ailments. Visit the Dirang Dzong and a Monpa village. Overnight stay at Dirang.",
    },
    {
      day: "Day 07",
      title: "DIRANG – TAWANG (155 KMS / 6 HRS)",
      content: "Early morning after breakfast drive to Tawang. Enroute witness the snow capped Sella Pass at 14000 ft and the Jaswant Garh War Memorial. Before reaching Tawang visit the Nuranang falls. Overnight at Tawang.",
    },
    {
      day: "Day 08",
      title: "SANGESTAR TSO (MADHURI LAKE) & BUM LA PASS (ADDITIONAL CHARGE)",
      content: "After a breakfast day trip to Sangestar Tso which got famous as Madhuri Lake (12165 ft) & Bumla La Pass (15,200 ft). A special permit is required to visit the Bum La Pass. Permits are requested at the Office of the Deputy Commissioner in Tawang District. Without the army stamp, visitors are not allowed through the numerous check posts along the way. Overnight at Tawang.",
    },
    {
      day: "Day 09",
      title: "TAWANG – BOMDILA (180 KMS / 6 HRS)",
      content: "Early morning after breakfast transfer to Bomdila (8,200 ft.). Later visit Gontse Rabgyaling Monastery (Upper Gonpa), Thub-Chog Gatsel Ling Monastery (Lower Gonpa). Bomdila offers a wonderfully panoramic view of Himalayan landscapes. Evening you can visit the local market. Overnight stay at Bomdila.",
    },
    {
      day: "Day 10",
      title: "BOMDILA – GUWAHATI (270 KMS / 7.5 HRS)",
      content: "Early morning after breakfast drive to Guwahati. Check in Hotel. Evening enjoy sunset River cruise over the river Brahmaputra if time permits (Cruise is subject to weather conditions & availability, payment will be directed).",
    },
    {
      day: "Day 11",
      title: "KAMAKHYA TEMPLE VISIT AND AIRPORT DROP",
      content: "Early morning after breakfast visit Kamakhya Temple. Afternoon transfer to Guwahati airport / Rly.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 11 — SIKKIM ITINERARY
// ============================================================
export const SIKKIM_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL – DARJEELING",
      content: "Assistance at the airport/railway station on arrival and drive to Darjeeling. Standing high in the Himalayas at an altitude of 2134m, 'Dorje Ling', or place of the Thunderbolt, offers breathtaking views of snow-capped mountain peaks, with the Kanchendzonga rising higher than all the others. Often referred to as the 'Queen of the Hills', it remains just as alluring with its tiny waterfalls, little villages and a narrow gauge railway track. Surrounded by World Famous Tea Gardens and snow capped mountains, Darjeeling remains one of the most exotic destinations. Overnight at hotel.",
    },
    {
      day: "Day 02",
      title: "DARJEELING",
      content: "Early morning visit Tiger Hill to see a beautiful sunrise and Himalayan Range like Kanchandzonga, Mount Everest etc. One can see the horizon changing colors just before sunrise and then the entire Himalayan range turn golden. Also visit Ghoom Monastery which is the oldest Monastery in the area built in 1875. Breakfast at the hotel and proceed for city tour visiting Himalayan Mountaineering Institute (closed on Thursday), Zoological Park (closed on Thursday), Tibetan Refugee Centre (closed on Sunday), Tenzing Rock, Gombu Rock and Happy Valley Tea Estate (from outside). Overnight at hotel.",
    },
    {
      day: "Day 03",
      title: "DARJEELING – GANGTOK (98 KMS / 4 HRS)",
      content: "Breakfast at the hotel and drive to Gangtok. At an altitude of 1750m, Gangtok became the state capital in the mid 19th century and has undergone rapid development since then. The downtown area is dominated by huge government buildings decorated with traditional Buddhist symbols. Gangtok is also a resting ground for people traveling to North Sikkim. Surrounded by Monasteries and Orchids, Gangtok is truly a travellers delight. Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "GANGTOK",
      content: "Breakfast at the hotel and full day excursion to Changu Lake which is 35 Kms from Gangtok at an altitude of 12,400 feet. The lake derives its waters from melting snows off the surrounding mountains. Legends say that lamas could forecast the future by studying the color of the lake's waters. Also visit Baba Mandir. Overnight at hotel.",
    },
    {
      day: "Day 05",
      title: "GANGTOK – KALIMPONG (83 KMS / 3 HRS)",
      content: "Breakfast at the hotel and drive to Kalimpong. At an altitude of 1250m, Kalimpong's location is ideal for a pleasant, relaxed getaway. Its clement weather has made Kalimpong's orchids and gladiole well renowned. Up to the early 1700s, the Kalimpong area was part of the Sikkim raja's domain. In 1865, after the Anglo-Bhutan War, it was annexed to Darjeeling. Today it's a quiet hill resort and a haven for retired people. Afternoon proceed for city tour visiting Zang Dog Palri Fo Brang Monastery, Tharpa Choling Monastery, Thongsa Gumpa and flower nurseries. Overnight at hotel.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "Breakfast at the hotel and drive to Bagdogra/NJP in time for flight/train to onward destination.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL – DARJEELING (93 KMS / 3 HRS)",
      content: "Assistance at the airport/railway station on arrival and drive to Darjeeling. Standing high in the Himalayas at an altitude of 2134m, 'Dorje Ling', or place of the Thunderbolt, offers breathtaking views of snow-capped mountain peaks, with the Kanchendzonga rising higher than all the others. Often referred to as the 'Queen of the Hills', it remains just as alluring with its tiny waterfalls, little villages and a narrow gauge railway track. Surrounded by World Famous Tea Gardens and snow capped mountains, Darjeeling remains one of the most exotic destinations. Overnight at hotel.",
    },
    {
      day: "Day 02",
      title: "DARJEELING",
      content: "Early morning visit Tiger Hill to see a beautiful sunrise and Himalayan Range like Kanchandzonga, Mount Everest etc. Also visit Ghoom Monastery built in 1875. Breakfast at the hotel and proceed for city tour visiting Himalayan Mountaineering Institute (closed on Thursday), Zoological Park (closed on Thursday), Tibetan Refugee Centre (closed on Sunday), Tenzing Rock, Gombu Rock and Happy Valley Tea Estate (from outside). Overnight at hotel.",
    },
    {
      day: "Day 03",
      title: "DARJEELING – GANGTOK (98 KMS / 4 HRS)",
      content: "Breakfast at the hotel and drive to Gangtok en route visiting Teesta Village. At an altitude of 1750m, Gangtok became the state capital in the mid 19th century. The downtown area is dominated by huge government buildings decorated with traditional Buddhist symbols. Surrounded by Monasteries and Orchids, Gangtok is truly a travellers delight. Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "GANGTOK",
      content: "Breakfast at the hotel and proceed for half day city tour visiting Rumtek Monastery, Do Drul Chorten, Namgyal Institute of Tibetology (closed on Sundays), Cottage Industry (closed on Sundays) and Flower Show Complex. Overnight at hotel.",
    },
    {
      day: "Day 05",
      title: "GANGTOK – CHANGU LAKE & BABA MANDIR",
      content: "Breakfast at the hotel and full day excursion to Changu Lake which is 35 Kms from Gangtok at an altitude of 12,400 feet. The lake derives its waters from melting snows off the surrounding mountains. Legends say that lamas could forecast the future by studying the color of the lake's waters. Also visit Baba Mandir. Overnight at hotel.",
    },
    {
      day: "Day 06",
      title: "GANGTOK – KALIMPONG (83 KMS / 3 HRS)",
      content: "Breakfast at the hotel and drive to Kalimpong. At an altitude of 1250m, Kalimpong's location is ideal for a pleasant, relaxed getaway. Its clement weather has made Kalimpong's orchids and gladiole well renowned. Today it's a quiet hill resort and a haven for retired people. Afternoon sightseeing in Kalimpong city tour visiting Zang Dog Palri Fo Brang Monastery, Tharpa Choling Monastery, Thongsa Gumpa and flower nurseries. Overnight at hotel.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Breakfast at the hotel and drive to Bagdogra/NJP in time for flight/train to onward destination.",
    },
  ],

  "7N8D": [
    {
      day: "Day 01",
      title: "ARRIVAL – DARJEELING (93 KMS / 3 HRS)",
      content: "Assistance at the airport/railway station on arrival and drive to Darjeeling. Standing high in the Himalayas at an altitude of 2134m, 'Dorje Ling', or place of the Thunderbolt, offers breathtaking views of snow-capped mountain peaks, with the Kanchendzonga rising higher than all the others. Often referred to as the 'Queen of the Hills', it remains just as alluring with its tiny waterfalls, little villages and a narrow gauge railway track. Overnight at hotel.",
    },
    {
      day: "Day 02",
      title: "DARJEELING",
      content: "Early morning visit Tiger Hill to see a beautiful sunrise and Himalayan Range like Kanchandzonga, Mount Everest etc. Also visit Ghoom Monastery built in 1875. Breakfast at the hotel and proceed for city tour visiting Himalayan Mountaineering Institute (closed on Thursday), Zoological Park (closed on Thursday), Tibetan Refugee Centre (closed on Sunday), Tenzing Rock, Gombu Rock and Happy Valley Tea Estate (from outside). Overnight at hotel.",
    },
    {
      day: "Day 03",
      title: "DARJEELING – PELLING (75 KMS / 3 HRS)",
      content: "Breakfast at the hotel and drive to Pelling. Located at a distance of 120 kms from Gangtok, Pelling is another serene mountain village which lies in the western districts of Sikkim. This village is situated at an altitude of 2000 mts (approx) and commands a spectacular view of Mt. Kanchenjunga. Overnight at hotel.",
    },
    {
      day: "Day 04",
      title: "PELLING",
      content: "Breakfast at the hotel and proceed for city tour visiting Pemayangste Monastery, Rabtense Ruins, Khechipalri Lake, Kanchenjunga Fall and Rambi Falls. Overnight at hotel.",
    },
    {
      day: "Day 05",
      title: "PELLING – GANGTOK (127 KMS / 5 HRS)",
      content: "Breakfast at the hotel and drive to Gangtok. At an altitude of 1750m, Gangtok became the state capital in the mid 19th century. The downtown area is dominated by huge government buildings decorated with traditional Buddhist symbols. Surrounded by Monasteries and Orchids, Gangtok is truly a travellers delight. Overnight at hotel.",
    },
    {
      day: "Day 06",
      title: "GANGTOK – CHANGU LAKE & BABA MANDIR",
      content: "Breakfast at the hotel and full day excursion to Changu Lake which is 35 Kms from Gangtok at an altitude of 12,400 feet. The lake derives its waters from melting snows off the surrounding mountains. Legends say that lamas could forecast the future by studying the color of the lake's waters. Also visit Baba Mandir. Overnight at hotel.",
    },
    {
      day: "Day 07",
      title: "GANGTOK – KALIMPONG (83 KMS / 3 HRS)",
      content: "Breakfast at the hotel and drive to Kalimpong. At an altitude of 1250m, Kalimpong's location is ideal for a pleasant, relaxed getaway. Its clement weather has made Kalimpong's orchids and gladiole well renowned. Today it's a quiet hill resort and a haven for retired people. Afternoon sightseeing in Kalimpong city tour visiting Zang Dog Palri Fo Brang Monastery, Tharpa Choling Monastery, Thongsa Gumpa and flower nurseries. Overnight at hotel.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE",
      content: "Breakfast at the hotel and drive to Bagdogra/NJP in time for flight/train to onward destination.",
    },
  ],

  "8N9D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT BAGDOGRA – GANGTOK (120 KMS / 5 HRS)",
      content: "Upon your arrival in Bagdogra Airport, you will be picked up and begin the 5-hour transfer to Gangtok, the modern capital of Sikkim and a cultural hub. On the way to your hotel, enjoy the heart-beating highland view along the Teesta River. After you check-in to your hotel, you have the rest of the day to spend at your leisure. Overnight stay at a hotel in Gangtok.",
    },
    {
      day: "Day 02",
      title: "EXCURSION TO TSOMGO LAKE & BABA MANDIR",
      content: "Enjoy breakfast at your hotel, and then make the 55 kilometers drive to Tsomgo Lake, a high altitude lake of Sikkim. Apart from sightseeing, here you can also indulge in yak riding. Further, you will visit Baba Mandir (13,200 feet). Spend some time at the temples and then return to the hotel in Gangtok for overnight stay.",
    },
    {
      day: "Day 03",
      title: "GANGTOK – LACHUNG (116 KMS / 6 HRS)",
      content: "Have a stomach-filling breakfast and start your day early by checking out from the hotel in Gangtok and proceeding towards Lachung. It is a mountain village perched at a height of 8800 feet and is close to the Tibetan border. It is also home to the 19th-century Buddhist Lachung Monastery. En-route, visit the Singhik View Point and Seven Sisters Waterfalls. The viewpoint offers a stunning view of Mt. Kanchenjunga and Mt Siniolchu. On arrival in Lachung, check in at the hotel. Enjoy a delicious dinner and spend the overnight stay at Lachung.",
    },
    {
      day: "Day 04",
      title: "LACHUNG – YUMTHANG VALLEY – GANGTOK (103 KMS / 6 HRS)",
      content: "Have a stomach-filling breakfast and start your day early by checking out from the hotel in Lachung and proceed towards the Yumthang Valley. Situated at a height of 11,800 feet, it is popularly known as 'Valley of Flowers'. You can also visit the hot springs that are considered to have medicinal curative properties. Enjoy a short stopover at the Bheema and Twin Falls. An optional tour to the Zero Point can be arranged at an additional cost. After sightseeing, continue your journey to Gangtok. On arrival, check in at the hotel.",
    },
    {
      day: "Day 05",
      title: "GANGTOK – PELLING (150 KMS / 5 HRS) VIA CHARDHAM",
      content: "From Gangtok, follow a hilly road surrounding the colourful houses, tiny hamlets, and lonely monasteries. In between, you will see the beautiful miniatures of Chardham and 12 jyotirlingas at the SiddheshwarDham (Chardham) and lay eyes on the 45 feet high copper statue of Guru Padmasambhava. After the sightseeing tour, continue your ride towards Pelling. Upon arrival at Pelling, you will be transferred to a hotel for overnight stay and dinner.",
    },
    {
      day: "Day 06",
      title: "PELLING SIGHTSEEING",
      content: "Today, in the first half, you will be visiting Darap village, Rimbi water Falls, Khecheopalri Lake and Khangchendzonga waterfalls. At the Darpa village, you will get a chance to explore local culture and meet people of Bhutias, Chettris, Tamangs, Rais, Gurungs and Lepchas communities. In the second half of the day, you will be visiting Pemayangtse Monastery, Rabdentse Ruins, and the New Helipad Ground. Get back to the hotel for overnight stay.",
    },
    {
      day: "Day 07",
      title: "PELLING – DARJEELING (80 KMS / 4 HRS)",
      content: "Done with your morning breakfast, check-out from the hotel and travel to Darjeeling. During the journey, you will come across Singhik viewpoint, from where you can enjoy the beautiful view of Mighty Khangchendzonga. The whiff of tea and sound of toy trains symbolises that you are somewhere in and around Darjeeling. Upon arrival at Darjeeling, you will be transferred to a hotel for overnight stay and dinner.",
    },
    {
      day: "Day 08",
      title: "DARJEELING SIGHTSEEING",
      content: "Get up at around 4 in the morning and get ready to chase the dawn over the Mt. Khangchendzongha (28,208 feet) at the Tiger Hill (8,400 feet). On your way back to the hotel, visit Ghoom Monastery, War Memorial and Batasia Loop. After breakfast, proceed for the city sightseeing tour visiting Himalayan Mountaineering Institute, P.N. Zoological Park (Thursday closed), Tenzing Rock, Tibetan Refugee self-help Centre (Sunday closed), Tea Garden (outer view), Ropeway and Japanese Temple. Overnight stay in the hotel.",
    },
    {
      day: "Day 09",
      title: "DARJEELING – BAGDOGRA AIRPORT (75 KMS / 3 HRS)",
      content: "After breakfast Check-out from the hotel on time & transfer to NJP Railway Station / IXB Airport for your onward journey.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 12 — ARUNACHAL PRADESH ITINERARY
// ============================================================
export const ARUNACHAL_ITINERARY: ProductItinerary = {

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT GUWAHATI & TRANSFER TO BHALUKPONG",
      content: "Upon your arrival at Guwahati airport, our representative will receive you and transfer you to Bhalukpong, a small town located on the border of Assam and Arunachal Pradesh. Bhalukpong is known for its scenic beauty and is the gateway to Arunachal Pradesh. After reaching Bhalukpong, check-in to your hotel and spend the rest of the day at leisure.",
    },
    {
      day: "Day 02",
      title: "BHALUKPONG TO DIRANG",
      content: "After breakfast, we will drive to Dirang, a picturesque town located at an altitude of 1,491 meters. On the way, we will stop at the Tipi Orchidarium, a research center and museum that houses a large variety of orchids. After reaching Dirang, check-in to your hotel and spend the rest of the day exploring the town.",
    },
    {
      day: "Day 03",
      title: "DIRANG TO TAWANG",
      content: "After breakfast, we will drive to Tawang, one of the most popular tourist destinations in Arunachal Pradesh. On the way, we will stop at the Sela Pass, a high-altitude mountain pass that offers breathtaking views of the surrounding landscape. After reaching Tawang, check-in to your hotel and spend the rest of the day at leisure.",
    },
    {
      day: "Day 04",
      title: "TAWANG SIGHTSEEING",
      content: "After breakfast, we will visit the Tawang Monastery, the largest monastery in India. We will also visit the Tawang War Memorial, which honors the soldiers who laid down their lives in the 1962 Sino-Indian War. The rest of the day is at leisure.",
    },
    {
      day: "Day 05",
      title: "TAWANG TO BOMDILA",
      content: "After breakfast, we will drive to Bomdila, a beautiful town located at an altitude of 2,410 meters. On the way, we will stop at the Jaswant Garh War Memorial. Later, visit the Buddhist monastery of Bomdila. Explore the town in the afternoon. Overnight in Bomdila.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE FROM GUWAHATI",
      content: "After breakfast, drive to Guwahati to board your flight/train to your hometown. Holiday Concludes.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT GUWAHATI & TRANSFER TO BHALUKPONG",
      content: "Upon your arrival at Guwahati airport, our representative will receive you and transfer you to Bhalukpong, a small town located on the border of Assam and Arunachal Pradesh. After reaching Bhalukpong, check-in to your hotel and spend the rest of the day at leisure.",
    },
    {
      day: "Day 02",
      title: "BHALUKPONG TO DIRANG",
      content: "After breakfast, we will drive to Dirang. On the way, we will stop at the Tipi Orchidarium, a research center and museum that houses a large variety of orchids. After reaching Dirang, check-in to your hotel and spend the rest of the day exploring the town.",
    },
    {
      day: "Day 03",
      title: "DIRANG TO TAWANG",
      content: "After breakfast, we will drive to Tawang. On the way, we will stop at the Sela Pass, a high-altitude mountain pass that offers breathtaking views of the surrounding landscape. After reaching Tawang, check-in to your hotel and spend the rest of the day at leisure.",
    },
    {
      day: "Day 04",
      title: "TAWANG SIGHTSEEING",
      content: "After breakfast, we will visit the Tawang Monastery, the largest monastery in India. We will also visit the Tawang War Memorial. Later, visit Shonga-tser Lake (Madhuri Lake) and Pangang Teng Tso Lake.",
    },
    {
      day: "Day 05",
      title: "TAWANG TO BOMDILA",
      content: "After breakfast, we will drive to Bomdila. On the way, we will stop at the Jaswant Garh War Memorial. Visit the Buddhist monastery of Bomdila. Explore the town in the afternoon. Overnight in Bomdila.",
    },
    {
      day: "Day 06",
      title: "BOMDILA – GUWAHATI",
      content: "After breakfast, drive to Guwahati. The gateway to the Northeast, Guwahati is the largest and most cosmopolitan city in the region. Overnight in Guwahati.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE FROM GUWAHATI",
      content: "After breakfast, visit Kamakhya Temple (Entry to Premises only), dedicated to goddess Kamakhya, an incarnation of Sati. Also visit Navagraha Temple and Umananda Temple (by Govt. ferry). Later drive to Guwahati Airport/Station to board your flight/train to your hometown. Holiday Concludes.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 13 — KARNATAKA (SOUTH INDIA) ITINERARY
// ============================================================
export const KARNATAKA_ITINERARY: ProductItinerary = {

  "5N6DA": [
    {
      day: "Day 01",
      title: "ARRIVAL BANGALORE & DRIVE TO MYSORE",
      content: "On arrival at Bangalore airport/railway station, you will meet your representative, then drive to Mysore (145 Kms / 3 hours). Check-in at your hotel and later, visit the beautiful Brindavan garden. Overnight stay in Mysore.",
    },
    {
      day: "Day 02",
      title: "MYSORE TO COORG",
      content: "After an early breakfast, visit Chamundi Hills and Bull Temple followed by a visit to the Mysore Palace. Next, proceed to Coorg and check into the hotel. Overnight stay in Coorg.",
    },
    {
      day: "Day 03",
      title: "COORG SIGHTSEEING",
      content: "After an early breakfast, proceed for sightseeing. Visit Dubare elephant camp (where you can see and feed elephants), Golden temple Monastery, Abbi falls, and Rajas seat. Return to the hotel in the evening. Overnight stay in Coorg.",
    },
    {
      day: "Day 04",
      title: "COORG TO OOTY",
      content: "After an early breakfast, check-out of the hotel and drive to Ooty, enjoying a scenic drive through lush forest routes. On arrival, check into the hotel. Overnight stay in Ooty.",
    },
    {
      day: "Day 05",
      title: "OOTY SIGHTSEEING",
      content: "After breakfast, take a sightseeing tour of Ooty. Visit Doddabetta peak, Botanical Garden, Rose Garden, and Charing Cross. Later, visit Sim's park, Lamb's rock, Dolphin's Nose, and Tea Museum, and enjoy boating at the Ooty Lake. Overnight stay in Ooty.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "After breakfast, proceed to Bangalore or Coimbatore airport/railway station for your next destination or hometown.",
    },
  ],

  "5N6DB": [
    {
      day: "Day 01",
      title: "ARRIVAL AND SIGHTSEEING AT COIMBATORE",
      content: "Upon arrival at Coimbatore Airport/Railway Stations, you will be driven to your hotel. Coimbatore is known for its industries, textiles, and institutions. After checking in, the evening will be at your leisure for personal activities or local shopping. Overnight stay at the hotel in Ooty.",
    },
    {
      day: "Day 02",
      title: "OOTY: ARRIVAL AND SIGHTSEEING",
      content: "After breakfast, travel to Ooty, the 'Queen of Hill stations,' on a 6-hour road trip. Ooty is located in the Nilgiri Hills at an altitude of 2,240 metres. You will visit Ooty lake, Wax World, Green valleys, beautiful mountains, and vast tea estates. Overnight stay will be at the hotel in Ooty.",
    },
    {
      day: "Day 03",
      title: "COONOOR SIGHTSEEING",
      content: "After breakfast, travel to Coonoor by Cab. Coonoor is the second most popular hill station in the Nilgiris, known for its tea gardens and factories. Today you will be visiting the famous Sim's Park, Lam's Rock, Dolphin Nose, Ketti Valley, Tea factory, and Doddabetta Peak. Return and stay overnight at the hotel in Ooty.",
    },
    {
      day: "Day 04",
      title: "KODAIKANAL: ARRIVAL AND BOATING",
      content: "Have breakfast and proceed to Kodaikanal (a 7-hour trip). Kodaikanal is known for its granite cliffs, forested valleys, and lakes. As the evening sets, visit Kodaikanal Lake where you can enjoy boating at your own cost. Overnight stay at the hotel.",
    },
    {
      day: "Day 05",
      title: "KODAIKANAL: SIGHTSEEING AND LEISURE TIME",
      content: "After breakfast, proceed for a day of sightseeing. You will visit the Coakers walk, Green Valley View, Vaigai Dam (the 'Suicide point'), Berijam Lake View, and Silver Cascade falls. The rest of your day will be at leisure. Overnight stay will be at Kodaikanal.",
    },
    {
      day: "Day 06",
      title: "SHOPPING AND DEPARTURE FROM COIMBATORE",
      content: "After breakfast, you will check out and travel to Coimbatore. The evening can be spent shopping at the Town market (Optional). You will be dropped at Coimbatore Airport/Railway Stations according to your departure timings.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL & DUBARE RESERVE FOREST AT COORG",
      content: "On arrival at Bangalore Airport/Railway Stations, you will be met by a representative and driven to Coorg. Coorg is rich with wildlife and has three wildlife sanctuaries and one national park. After checking in, you will go sightseeing at Dubare Reserve Forest. Overnight stay at the hotel in Coorg.",
    },
    {
      day: "Day 02",
      title: "EXPLORE COORG",
      content: "After breakfast, spend the day sightseeing in Coorg. You will visit Talakaveri, Bhagamandala, Abbi Falls, Raja's Seat (known for its spectacular sunset), and Omkareshwara. You can shop in the local town markets in the evening. Overnight stay at the hotel.",
    },
    {
      day: "Day 03",
      title: "COORG TO OOTY",
      content: "After breakfast, travel to Ooty, the 'Queen of Hill stations,' on a 6-hour road trip. Ooty is located in the Nilgiri Hills. You will visit Ooty lake, Wax World, Green valleys, beautiful mountains, and vast tea estates. Overnight stay at the hotel in Ooty.",
    },
    {
      day: "Day 04",
      title: "COONOOR SIGHTSEEING",
      content: "After breakfast, travel to Coonoor by Cab. Coonoor is the second most popular hill station in the Nilgiris. Today you will visit the famous Sim's Park, Lam's Rock, Dolphin Nose, Ketti Valley, Tea factory, and Doddabetta Peak. Return and stay overnight at the hotel in Ooty.",
    },
    {
      day: "Day 05",
      title: "OOTY TO KODAIKANAL & BOATING",
      content: "Have breakfast and proceed to Kodaikanal (a 7-hour trip). As the evening sets, visit Kodaikanal Lake where you can enjoy boating at your own cost. You will be transferred back to the hotel for your overnight stay.",
    },
    {
      day: "Day 06",
      title: "KODAIKANAL: SIGHTSEEING AND LEISURE TIME",
      content: "Have breakfast and proceed for a day of sightseeing. You will visit the Coakers walk, Green Valley View, Vaigai Dam, Berijam Lake View, and Silver Cascade falls. The rest of your day will be at leisure. Overnight stay will be at Kodaikanal.",
    },
    {
      day: "Day 07",
      title: "SHOPPING AND DEPARTURE FROM MADURAI",
      content: "After breakfast, you will check out and travel to Madurai. Your evening can be spent shopping at the Town market (Optional). You will be dropped at Madurai Airport/Railway Stations according to your departure timings.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 14 — GUJARAT ITINERARY
// ============================================================
export const GUJARAT_ITINERARY: ProductItinerary = {

  "4N5D-RANN": [
    {
      day: "Day 01",
      title: "AHMEDABAD – BHUJ",
      content: "Arrive at designated place at Ahmedabad and proceed to Bhuj.",
    },
    {
      day: "Day 02",
      title: "BHUJ – MANDVI",
      content: "Proceed to Mandavi. On arrival visit Vijay Villas palace & Shyamji Krishna Varma Memorial along with Mandvi Beach.",
    },
    {
      day: "Day 03",
      title: "MANDVI – RANN UTSAV",
      content: "Proceed to Rann Utsav. Experience drive through road to heaven. Visit Hadappa Site and discover its ancient stories. Enjoy cultural activities at Rann Utsav. In the evening we proceed to White Rann to witness the Grandeur of Sunset.",
    },
    {
      day: "Day 04",
      title: "RANN UTSAV – BHUJ",
      content: "Proceed to Bhuj. On arrival Visit to Vande Mataram Museum. Later Visit Smritivan Earthquake Memorial and Museum — a memorial park dedicated to the victims of 2001 Gujarat earthquake and museum on Bhujia Hill in Bhuj, Gujarat. Free time for shopping.",
    },
    {
      day: "Day 05",
      title: "BHUJ – DEPARTURE FROM AHMEDABAD",
      content: "Board the train/flight for your home town. Tour concludes.",
    },
  ],

  "7N8D-POLO": [
    {
      day: "Day 01",
      title: "ARRIVAL – VADODARA",
      content: "Arrive at designated reporting place, proceed to Vadodara. On arrival free time for relaxation.",
    },
    {
      day: "Day 02",
      title: "VADODARA LOCAL SIGHTSEEING",
      content: "Morning proceed to local sightseeing of Vadodara. Visit Vadodara Museum Picture Gallery followed by a visit to Laxmi Vilas Palace and Fateh Singh Palace where we get to see the paintings of Raja Ravi Varma. Evening photo-stop at Sursagar Lake and free time for shopping at the local Market.",
    },
    {
      day: "Day 03",
      title: "VADODARA – NARMADA TENT CITY",
      content: "Morning proceed to Narmada Tent City. En-route visit to Garudeshwar Temple — Temple of lord Datta. On arrival at Narmada Tent city, visit to Sardar Sarovar dam, selfie point & valley of flowers. Later visit The Statue of Unity dedicated to 'Iron Man of India' Sardar Vallabhbhai Patel. Experience stunning view from Observatory deck. Later enjoy Statue of Unity Laser show & Illumination Tour (Subject to Operation).",
    },
    {
      day: "Day 04",
      title: "NARMADA TENT CITY ECOTOURISM",
      content: "Today proceed to Ecotourism tour — visit Vishwa Van, Khalwani Eco Tourism Site, Aarogya Van, Ekta nursery, cactus garden, butterfly park and Dino Trail. Also visit Unity Glow Garden. Later enjoy some leisure time at tent city.",
    },
    {
      day: "Day 05",
      title: "NARMADA TENT CITY – AHMEDABAD",
      content: "Morning proceed to Ahmedabad. On arrival Visit Sabarmati Ashram — the home of Mahatma Gandhi. Later enjoy free time for shopping. Evening proceed to visit Akshardham. Evening free for relaxation.",
    },
    {
      day: "Day 06",
      title: "AHMEDABAD – RANI KI VAV – POLO FOREST",
      content: "Today proceed to visit the UNESCO site 'Rani ki Vav' (Queen of all step wells). Later visit the marvellous Modhera Sun Temple. Then we visit The iconic Atal Bridge and pass by Kankaria Lake. Later proceed to Polo Forest.",
    },
    {
      day: "Day 07",
      title: "POLO FOREST",
      content: "Today morning proceed to Polo Forest trek. Later we proceed to visit Lakhenana Jain Dera, Shiv Panchayatan Mandir, Lord Parshwanath Temple, Sun Temple. Evening free for leisure.",
    },
    {
      day: "Day 08",
      title: "DEPARTURE FROM AHMEDABAD",
      content: "Later proceed to Ahmedabad. Board the train / flight to your hometown. Tour Concludes.",
    },
  ],

  "4N5D-SOU": [
    {
      day: "Day 01",
      title: "AHMEDABAD ARRIVAL & LOCAL",
      content: "Arrive at designated reporting place, on arrival visit Sabarmati Ashram — the home of Mahatma Gandhi. Later enjoy free time for shopping at Teen Darwaja or Laal Darwaja. Then we visit The iconic Atal Bridge — to feel the joy of walking above the river, we also pass by Kankaria Lake.",
    },
    {
      day: "Day 02",
      title: "AHMEDABAD – SCIENCE CITY",
      content: "Visit Science City — an ambitious initiative of the government of Gujarat to trigger an inquiry of science in the mind of a common citizen. Visit The Aquatics gallery, India's largest public aquarium.",
    },
    {
      day: "Day 03",
      title: "AHMEDABAD – ISRO MUSEUM",
      content: "Visit ISRO Museum or Vikram Sarabhai Space Exhibition (VSSE). This museum features a selection of exhibits on space exploration, models, a gift shop, etc. Later visit Akshardham Temple.",
    },
    {
      day: "Day 04",
      title: "AHMEDABAD – NARMADA TENT CITY",
      content: "Proceed to Narmada Tent City. On arrival visit Sardar Sarovar dam, selfie point & valley of Flowers. Later visit The Statue of Unity dedicated to Sardar Vallabhbhai Patel. Experience a stunning view from the Observatory deck. Later enjoy the Statue of Unity Laser show & Illumination Tour (Subject to Operation).",
    },
    {
      day: "Day 05",
      title: "DEPARTURE FROM AHMEDABAD",
      content: "Later proceed to Ahmedabad. Board the train / flight to your hometown. Tour Concludes.",
    },
  ],
};

// ============================================================
// ✅ DOMESTIC CARD 15 — TAMIL NADU ITINERARY
// ============================================================
export const TAMILNADU_ITINERARY: ProductItinerary = {

  "3N4D": [
    {
      day: "Day 01",
      title: "ARRIVAL IN COIMBATORE",
      content: "After arrival in Coimbatore airport, you'll be greeted and transferred to the hotel. After refreshing, you can go shopping in Brookefields Mall.",
    },
    {
      day: "Day 02",
      title: "A SPIRITUAL SIGHTSEEING",
      content: "After breakfast, visit temples such as Arulmigu Murugan Temple in Marudhamalai, Eachanari Vinayagar Temple, and Sree Ayyappan Temple. In the evening, meditate in Dhyanalingam. Overnight stay in the hotel.",
    },
    {
      day: "Day 03",
      title: "A TRIP TO MARUDHAMALAI – ADIYOGI",
      content: "After a scrumptious breakfast, head to Marudhamalai Murugan temple to seek the blessings of Lord Murugan. Afterward, witness the majestic Adiyogi statue of Lord Shiva and indulge in a meditation. Return to the hotel for the overnight stay.",
    },
    {
      day: "Day 04",
      title: "DEPARTURE",
      content: "On the final leg of your trip, visit the local markets to get cheap cloth from top brands before catching your return flight.",
    },
  ],

  "5N6D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT MADURAI",
      content: "Arrive at Madurai Airport/Railway Station and transfer to Madurai. Do a VIP darshan at Meenakshi temple and at Sundareswaran temple with a pandit ji as a guide to explain the spiritual and historical aspects of both temples. Overnight Stay.",
    },
    {
      day: "Day 02",
      title: "MADURAI – RAMESHWARAM",
      content: "After breakfast, drive to Rameshwaram. On the way, stop at the Pamban Bridge. On arrival, check into the hotel. In the afternoon, proceed for sightseeing of Rameshwaram, including the Ramanathaswamy temple, Agnitheertham, Ramjharoka temple, Sri Panchmukhi Hanuman temple, and the floating stone. Overnight stay at the hotel in Rameshwaram.",
    },
    {
      day: "Day 03",
      title: "INN RAMESHWARAM",
      content: "After breakfast, proceed for Rameshwaram Darshan which includes Rudrabhishekam with 22 Kund snan (bathing in the 22 sacred kunds) with a guide, followed by a VIP darshan with Pandit ji. Also visit Dhanush Kodi, Ram Setu, and the Great Abdul Kalam memorial Tour. The Dr. A.P.J. Abdul Kalam's memorial is a must-visit attraction in Rameswaram, paying homage to the former president, scientist, and inspiring personality. Return for an overnight stay in Rameshwaram.",
    },
    {
      day: "Day 04",
      title: "RAMESHWARAM – KANYAKUMARI",
      content: "After breakfast, proceed to Kanyakumari. Visit Swami Vivekanandha rock, Temple, Gandhi Memorial, Triveni Sangam, and the local market. Overnight stay in Kanyakumari.",
    },
    {
      day: "Day 05",
      title: "KANYAKUMARI – TRIVANDRUM",
      content: "After breakfast, proceed to Trivandrum for sightseeing. Visit the Padmanabha Swami Temple, Museum, Zoo, and Art Gallery. Overnight at Trivandrum.",
    },
    {
      day: "Day 06",
      title: "DEPARTURE",
      content: "Enjoy a delicious breakfast and, if time allows, proceed to the Airport or Railway Station for your return journey home with sweet memories.",
    },
  ],

  "6N7D": [
    {
      day: "Day 01",
      title: "ARRIVAL AT MADURAI",
      content: "Arrive at Madurai Airport/Railway Station and transfer to Madurai. Have darshan at Meenakshi temple and at Sundareswaran temple, exploring the spiritual and historical aspects of both. Overnight Stay.",
    },
    {
      day: "Day 02",
      title: "MADURAI – RAMESHWARAM",
      content: "After breakfast, drive to Rameshwaram. Stop at the Pamban Bridge on the way. On arrival, check into the hotel. In the afternoon, proceed for sightseeing of Rameshwaram, including the Ramanathaswamy temple, Agnitheertham, Ramjharoka temple, Sri Panchmukhi Hanuman temple, and the floating stone. Overnight stay at the hotel in Rameshwaram.",
    },
    {
      day: "Day 03",
      title: "INN RAMESHWARAM",
      content: "After breakfast, proceed for Rameshwaram Darshan. This includes Rudrabhishekam with 22 Kund snan (bathing in the 22 kunds where Bhagwan Ram bathed to purify himself). You will also visit Dhanush Kodi, Ram Setu, and the Great Abdul Kalam memorial. Dr. A.P.J. Abdul Kalam's memorial is a must-visit attraction, paying homage to the former president, leader, and scientist. Return for an overnight stay in Rameshwaram.",
    },
    {
      day: "Day 04",
      title: "RAMESHWARAM – KANYAKUMARI",
      content: "After breakfast, proceed to Kanyakumari. Visit Swami Vivekanandha rock, Temple, Gandhi Memorial, Triveni Sangam, and the local market. Overnight stay in Kanyakumari.",
    },
    {
      day: "Day 05",
      title: "KANYAKUMARI – TRIVANDRUM/KOVALAM",
      content: "After breakfast, checkout from Kanyakumari and proceed to Trivandrum. You can spend the day exploring the beautiful beaches of Kovalam, such as Hawah beach, or indulge in Ayurvedic treatments. Visit Azhimala Shiva Temple, a popular pilgrim center, and explore the shopping spots. Overnight stay at Trivandrum.",
    },
    {
      day: "Day 06",
      title: "INN TRIVANDRUM",
      content: "In the morning, after breakfast, check out from Kovalam and proceed to Trivandrum for local sightseeing. Visit the Shree Padmanabhaswamy Temple. You can also visit the serene and picturesque Poovar island (taking a boat ride is an option). Other visits include the Napier Museum, Zoo, and Art gallery. Overnight stay at Trivandrum.",
    },
    {
      day: "Day 07",
      title: "DEPARTURE",
      content: "Enjoy a delicious breakfast and, if time allows, proceed to the Airport or Railway Station for your return journey home with sweet memories.",
    },
  ],
};
