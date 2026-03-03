"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/balweh_logo.svg";

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
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "inline-flex items-center font-semibold text-zinc-900"
                  : "inline-flex items-center hover:text-zinc-900"
              }
            >
              Startseite
            </Link>
            <Link
              href="/gebaeudereinigung"
              className={
                pathname === "/gebaeudereinigung"
                  ? "inline-flex items-center font-semibold text-zinc-900"
                  : "inline-flex items-center hover:text-zinc-900"
              }
            >
              Gebäudereinigung
            </Link>
            <Link
              href="/garten-landschaftsbau"
              className={
                pathname === "/garten-landschaftsbau"
                  ? "inline-flex items-center font-semibold text-zinc-900"
                  : "inline-flex items-center hover:text-zinc-900"
              }
            >
              Garten- & Landschaftsbau
            </Link>
            <Link
              href="/ueber-uns"
              className={
                pathname === "/ueber-uns"
                  ? "inline-flex items-center font-semibold text-zinc-900"
                  : "inline-flex items-center hover:text-zinc-900"
              }
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className={
                pathname === "/kontakt"
                  ? "inline-flex items-center font-semibold text-zinc-900"
                  : "inline-flex items-center hover:text-zinc-900"
              }
            >
              Kontakt
            </Link>
          </nav>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-zinc-900"></span>
            <span className="h-0.5 w-6 bg-zinc-900"></span>
            <span className="h-0.5 w-6 bg-zinc-900"></span>
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
              <Image src={logo} alt="BALWEH Logo" className="h-16 w-auto" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
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
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? "font-semibold text-zinc-900"
                    : "text-zinc-900 hover:text-zinc-600"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Startseite
              </Link>
              <Link
                href="/gebaeudereinigung"
                className={
                  pathname === "/gebaeudereinigung"
                    ? "font-semibold text-zinc-900"
                    : "text-zinc-900 hover:text-zinc-600"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Gebäudereinigung
              </Link>
              <Link
                href="/garten-landschaftsbau"
                className={
                  pathname === "/garten-landschaftsbau"
                    ? "font-semibold text-zinc-900"
                    : "text-zinc-900 hover:text-zinc-600"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Garten- & Landschaftsbau
              </Link>
              <Link
                href="/ueber-uns"
                className={
                  pathname === "/ueber-uns"
                    ? "font-semibold text-zinc-900"
                    : "text-zinc-900 hover:text-zinc-600"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Über uns
              </Link>
              <Link
                href="/kontakt"
                className={
                  pathname === "/kontakt"
                    ? "font-semibold text-zinc-900"
                    : "text-zinc-900 hover:text-zinc-600"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
