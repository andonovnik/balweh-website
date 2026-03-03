"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/balweh_logo.svg";
import logoWithText from "@/app/balweh_logo_with_text.svg";

const NAV_ITEMS = [
  { href: "/", label: "Startseite" },
  { href: "/gebaeudereinigung", label: "Gebäudereinigung" },
  { href: "/garten-landschaftsbau", label: "Garten- & Landschaftsbau" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

function desktopNavClass(isActive: boolean) {
  return isActive
    ? "inline-flex items-center font-semibold text-brand-header-button"
    : "inline-flex items-center hover:text-brand-header-button";
}

function mobileNavClass(isActive: boolean) {
  return isActive
    ? "font-semibold text-brand-header-button"
    : "text-zinc-900 hover:text-brand-header-button";
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-zinc-200 bg-white"
            : "border-transparent bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
          <Link href="/">
            <Image src={logo} alt="BALWEH Logo" className="h-14 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 text-base text-zinc-600 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={desktopNavClass(pathname === item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-brand-primary"></span>
            <span className="h-0.5 w-6 bg-brand-primary"></span>
            <span className="h-0.5 w-6 bg-brand-primary"></span>
          </button>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-50 h-dvh bg-white transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`flex h-full flex-col transition-all duration-300 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src={logoWithText}
                alt="BALWEH Logo"
                className="h-20 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-brand-primary"
              aria-label="Close menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center px-6 text-lg">
            <div className="flex flex-col items-start gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mobileNavClass(pathname === item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
