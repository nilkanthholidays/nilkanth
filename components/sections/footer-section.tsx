"use client";

import Link from "next/link";

const footerLinks = {
  about: [
    { label: "Domestic", href: "#accessories" },
    { label: "International", href: "#technology" },
    { label: "Gallery", href: "#gallery" },
    { label: "Review", href: "#footer" },
  ],
};

export function FooterSection() {
  return (
    <footer id="footer" className="bg-background">
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        {/* Main Row: Brand | About | Reviews */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12 lg:grid-cols-12">
          {/* Left Spacer */}
          <div className="col-span-0 md:col-span-1 lg:col-span-1"></div>

          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <Link href="/" className="text-lg font-medium text-foreground">
              NILKANTH HOLIDAYS
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover world-class tours across India and internationally. We craft unforgettable journeys with expert local knowledge and personalized service.
            </p>
          </div>

          {/* Mid Spacer */}
          <div className="col-span-0 md:col-span-1 lg:col-span-1"></div>

          {/* About */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="mb-4 text-sm font-medium text-foreground">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mid Spacer 2 */}
          <div className="col-span-0 md:col-span-1 lg:col-span-1"></div>

          {/* Reviews */}
          <div className="col-span-2 md:col-span-5 lg:col-span-5">
            <h4 className="mb-4 text-sm font-medium text-foreground">Recent Reviews</h4>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {/* Review 1 */}
              <div className="flex-shrink-0 w-[280px] snap-center rounded-lg border border-border bg-muted p-4">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="mb-3 text-xs leading-relaxed text-foreground line-clamp-3">
                  Very nice service and very good experience. Nilkanth holiday service very excellent 😃
                </p>
                <p className="text-xs font-semibold text-foreground">Dhaval Karkar</p>
              </div>

              {/* Review 2 */}
              <div className="flex-shrink-0 w-[280px] snap-center rounded-lg border border-border bg-muted p-4">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="mb-3 text-xs leading-relaxed text-foreground line-clamp-3">
                  One of the best travel experiences! Everything was smooth and stress-free. Highly recommended!
                </p>
                <p className="text-xs font-semibold text-foreground">Deep Dafda</p>
              </div>

              {/* Review 3 */}
              <div className="flex-shrink-0 w-[280px] snap-center rounded-lg border border-border bg-muted p-4">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="mb-3 text-xs leading-relaxed text-foreground line-clamp-3">
                  Amazing Manali tour! Everything perfectly planned. Staff was cooperative and driver was polite.
                </p>
                <p className="text-xs font-semibold text-foreground">Jeetenendra Panchal</p>
              </div>

              {/* Review 4 */}
              <div className="flex-shrink-0 w-[280px] snap-center rounded-lg border border-border bg-muted p-4">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="mb-3 text-xs leading-relaxed text-foreground line-clamp-3">
                  All services are very excellent. Highly recommended for all travelers!
                </p>
                <p className="text-xs font-semibold text-foreground">Dhruvil Chovatiya</p>
              </div>

              {/* Review 5 */}
              <div className="flex-shrink-0 w-[280px] snap-center rounded-lg border border-border bg-muted p-4">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="mb-3 text-xs leading-relaxed text-foreground line-clamp-3">
                  Wonderful experience on our trip to Shimla and Manali. Driver was polite and knowledgeable!
                </p>
                <p className="text-xs font-semibold text-foreground">Jenish Patel</p>
              </div>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="col-span-0 md:col-span-1 lg:col-span-1"></div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 NILKANTH HOLIDAYS. 
          </p>

          

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/nilkanthholidays.in?igsh=MXhxMWdxNzhodWZjNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
