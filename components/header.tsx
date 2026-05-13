"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#accessories", label: "Domestic" },
  { href: "#technology", label: "International" },
  { href: "#gallery", label: "Gallery" },
  { href: "#footer", label: "Review" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Always-visible header — no scroll condition for visibility */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md rounded-full shadow-sm"
            : "bg-white/10 backdrop-blur-sm rounded-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 gap-2 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <Image
              src="/images/okk.png"
              alt="Nilkanth Holidays Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className={`text-sm font-bold tracking-wider hidden sm:inline flex-shrink-0 transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              NILKANTH HOLIDAYS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="#get-in-touch"
              className={`hidden sm:block px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                isScrolled ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"
              }`}
            >
              Contact Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden flex-shrink-0 p-1 transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-background/95 backdrop-blur-md px-6 py-6 rounded-b-2xl">
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#get-in-touch"
                className="mt-2 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
