"use client";

import { useState, useEffect, useRef } from "react";
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
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const openMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasMenuOpenRef = useRef(false);
  const pathname = usePathname();
  // Normalize pathname by removing trailing slash for matching (/kontakt/ -> /kontakt), fallback to '/' for root
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  const openMobileMenu = () => {
    setMobileMenuMounted(true);
    window.requestAnimationFrame(() => {
      setMobileMenuOpen(true);
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || !mobileMenuMounted) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMobileMenuMounted(false);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [mobileMenuMounted, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const container = mobileMenuRef.current;
      if (!container) {
        return;
      }

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (!activeElement || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      closeMenuButtonRef.current?.focus();
    } else if (wasMenuOpenRef.current) {
      openMenuButtonRef.current?.focus();
    }

    wasMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

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
                className={desktopNavClass(normalizedPath === item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {mobileMenuOpen ? (
            <button
              ref={openMenuButtonRef}
              onClick={closeMobileMenu}
              className="flex flex-col gap-1.5 p-2 md:hidden"
              aria-label="Close menu"
              aria-expanded="true"
              aria-controls="mobile-navigation"
            >
              <span className="h-0.5 w-6 bg-brand-primary"></span>
              <span className="h-0.5 w-6 bg-brand-primary"></span>
              <span className="h-0.5 w-6 bg-brand-primary"></span>
            </button>
          ) : (
            <button
              ref={openMenuButtonRef}
              onClick={openMobileMenu}
              className="flex flex-col gap-1.5 p-2 md:hidden"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-navigation"
            >
              <span className="h-0.5 w-6 bg-brand-primary"></span>
              <span className="h-0.5 w-6 bg-brand-primary"></span>
              <span className="h-0.5 w-6 bg-brand-primary"></span>
            </button>
          )}
        </div>
      </header>
      {mobileMenuMounted && (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className={`fixed inset-0 z-50 h-dvh bg-white transition-opacity duration-300 md:hidden ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className={`flex h-full flex-col transition-all duration-300 ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-2">
              <Link href="/" onClick={closeMobileMenu}>
                <Image
                  src={logoWithText}
                  alt="BALWEH Logo"
                  className="h-20 w-auto"
                />
              </Link>
              <button
                ref={closeMenuButtonRef}
                onClick={closeMobileMenu}
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
                    className={mobileNavClass(normalizedPath === item.href)}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
