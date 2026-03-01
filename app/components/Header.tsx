"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            BALWEH
          </Link>
          <nav className="hidden gap-6 text-sm text-zinc-600 md:flex">
            <Link href="/#leistungen" className="hover:text-zinc-900">
              Leistungen
            </Link>
            <Link href="/#unternehmen" className="hover:text-zinc-900">
              Unternehmen
            </Link>
            <Link href="/#kontakt" className="hover:text-zinc-900">
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
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                BALWEH
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
            <nav className="flex flex-1 flex-col items-center justify-center gap-8 text-2xl">
              <Link
                href="/#leistungen"
                className="text-zinc-900 hover:text-zinc-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leistungen
              </Link>
              <Link
                href="/#unternehmen"
                className="text-zinc-900 hover:text-zinc-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Unternehmen
              </Link>
              <Link
                href="/#kontakt"
                className="text-zinc-900 hover:text-zinc-600"
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
