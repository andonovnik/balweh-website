import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Balweh in Leverkusen für professionelle Gebäudereinigung und Garten- & Landschaftsbau. Telefonisch erreichbar Montag bis Freitag von 08:00–18:00 Uhr.",
  keywords: [
    "Kontakt Gebäudereinigung Leverkusen",
    "Kontakt Galabau Leverkusen",
    "Reinigungsservice Leverkusen Kontakt",
    "Gartenbau Leverkusen Anfrage",
  ],
};

export default function Kontakt() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          In Verbindung bleiben
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Kontakt – Wir freuen uns auf Ihre Anfrage
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Sie möchten ein unverbindliches Angebot für Gebäudereinigung oder
          Garten- & Landschaftsbau erhalten? Balweh ist Ihr zuverlässiger
          Ansprechpartner in Leverkusen und ganz Nordrhein-Westfalen. Nehmen Sie
          direkt Kontakt mit uns auf – persönlich, unkompliziert und schnell.
        </p>
        <Image
          src="/images/kontakt-hero.webp"
          alt="Kontaktaufnahme per Telefon und E-Mail"
          className="mt-8 h-72 w-full rounded-2xl object-cover"
          width={1600}
          height={900}
          loading="eager"
        />
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-4">
          <article>
            <h2 className="text-2xl font-semibold tracking-tight">
              Persönliche Beratung & unverbindliches Angebot
            </h2>
            <p className="mt-4 leading-8 text-zinc-600">
              Wir beraten Sie individuell und erstellen Ihnen ein
              maßgeschneidertes Angebot für Ihr Projekt – transparent, fair und
              ohne Verpflichtungen.
            </p>
          </article>
        </section>
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-lg font-semibold">Unsere Kontaktdaten</h2>
            <div className="mt-3 space-y-4">
              <p className="text-sm font-medium text-zinc-900">
                Balweh Gebäudereinigung & Garten- und Landschaftsbau
              </p>
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="text-sm leading-7 text-zinc-600">
                  <p className="font-medium text-zinc-900">Telefon:</p>
                  <a
                    href="tel:+4921423086869"
                    className="font-medium text-zinc-900 hover:text-blue-600"
                  >
                    0214 – 23 08 68 69
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm leading-7 text-zinc-600">
                  <p className="font-medium text-zinc-900">Erreichbarkeit:</p>
                  <p>Montag – Freitag</p>
                  <p>08:00 – 18:00 Uhr</p>
                </div>
              </div>
            </div>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-lg font-semibold">
              <svg
                className="mb-1 mr-2 inline-block h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              E-Mail
            </h2>
            <div className="mt-3 space-y-4">
              <p className="text-sm leading-7 text-zinc-600">
                Senden Sie uns eine E-Mail mit Ihren Anfragen und Wünschen.
                Während unserer Geschäftszeiten sind wir telefonisch für Sie
                erreichbar. Außerhalb dieser Zeiten können Sie uns jederzeit
                eine E-Mail oder eine Nachricht über Instagram senden.
              </p>
              <a
                href="mailto:info@balweh.de"
                className="font-medium text-zinc-900 hover:text-blue-600"
              >
                info@balweh.de
              </a>
            </div>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-lg font-semibold">
              <svg
                className="mb-1 mr-2 inline-block h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 100-8 4 4 0 000 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z" />
              </svg>
              Instagram
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Folgen Sie uns auf Instagram und schreiben Sie uns direkt:
            </p>
            <a
              href="https://www.instagram.com/balweh_/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-block font-medium text-zinc-900 hover:text-blue-600"
            >
              instagram.com/balweh_/
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
