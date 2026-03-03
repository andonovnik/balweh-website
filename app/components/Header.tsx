"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/balweh_logo.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open (iOS fix)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
          <Link href="/">
            <Image src={logo} alt="BALWEH Logo" className="h-16 w-auto" />
          </Link>
          <nav className="hidden gap-6 text-base text-zinc-600 md:flex">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "font-semibold text-zinc-900"
                  : "hover:text-zinc-900"
              }
            >
              Startseite
            </Link>
            <Link
              href="/gebaeudereinigung"
              className={
                pathname === "/gebaeudereinigung"
                  ? "font-semibold text-zinc-900"
                  : "hover:text-zinc-900"
              }
            >
              Gebäudereinigung
            </Link>
            <Link
              href="/garten-landschaftsbau"
              className={
                pathname === "/garten-landschaftsbau"
                  ? "font-semibold text-zinc-900"
                  : "hover:text-zinc-900"
              }
            >
              Garten- & Landschaftsbau
            </Link>
            <Link
              href="/ueber-uns"
              className={
                pathname === "/ueber-uns"
                  ? "font-semibold text-zinc-900"
                  : "hover:text-zinc-900"
              }
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className={
                pathname === "/kontakt"
                  ? "font-semibold text-zinc-900"
                  : "hover:text-zinc-900"
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
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-white md:hidden"
          style={{
            height: "100dvh",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div className="flex h-full flex-col">
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
            <nav className="flex flex-1 flex-col items-center justify-center gap-8 text-base">
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
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
