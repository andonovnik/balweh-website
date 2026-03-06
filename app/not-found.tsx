import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Seite nicht gefunden",
  description: "Die angeforderte Seite wurde nicht gefunden.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-16">
      <div className="text-center">
        <h1 className="mb-2 text-8xl font-bold text-brand-primary">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-zinc-900">
          Seite nicht gefunden
        </h2>
        <p className="mb-8 text-lg text-zinc-600">
          Die angeforderte Seite existiert leider nicht.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-brand-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/90"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
