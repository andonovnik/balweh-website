import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Balweh in Leverkusen für professionelle Gebäudereinigung und Garten- und Landschaftsbau. Telefonisch erreichbar Montag bis Freitag von 08:00–18:00 Uhr.",
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
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-brand-primary md:text-5xl">
          Kontakt – Wir freuen uns auf Ihre Anfrage
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Sie möchten ein unverbindliches Angebot für Gebäudereinigung oder
          Garten- und Landschaftsbau erhalten? Balweh ist Ihr zuverlässiger
          Ansprechpartner in Leverkusen und ganz Nordrhein-Westfalen. Nehmen Sie
          direkt Kontakt mit uns auf – persönlich, unkompliziert und schnell.
        </p>
        <Image
          src="/images/kontakt-hero.webp"
          alt="Kontaktaufnahme per Telefon und E-Mail"
          className="mt-8 h-72 w-full object-cover"
          width={1600}
          height={900}
          loading="eager"
        />
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-4">
          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Persönliche Beratung und unverbindliches Angebot
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
            <h2 className="text-lg font-semibold text-brand-primary">
              Unsere Kontaktdaten
            </h2>
            <div className="mt-3 space-y-4">
              <p className="text-sm font-medium text-zinc-900">
                Balweh Gebäudereinigung und Galabau
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
                    href="tel:+4915567200971"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    +49 155 - 67200971
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
            <h2 className="text-lg font-semibold text-brand-primary">
              <svg
                className="mb-1 mr-2 inline-block h-6 w-6"
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
              <a
                href="mailto:info@balweh.de"
                className="block font-medium text-blue-600 hover:underline"
              >
                info@balweh.de
              </a>
              <p className="text-sm leading-7 text-zinc-600">
                Senden Sie uns eine E-Mail mit Ihren Anfragen und Wünschen.
                Während unserer Geschäftszeiten sind wir telefonisch für Sie
                erreichbar. Außerhalb dieser Zeiten können Sie uns jederzeit
                eine E-Mail oder eine Nachricht über Instagram senden.
              </p>
            </div>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-lg font-semibold text-brand-primary">Social</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Folgen Sie uns auf Instagram und TikTok, um immer über unsere
              neuesten Projekte und Updates informiert zu bleiben.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/social/instagram_glyph_black.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                />
                <a
                  href="https://www.instagram.com/balweh_/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-blue-600 hover:underline"
                >
                  @balweh_
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/social/TIKTOK_SOCIAL_ICON_SOLO_BLACK.svg"
                  alt="TikTok"
                  width={28}
                  height={28}
                />
                <a
                  href="https://www.tiktok.com/@balweh10"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-blue-600 hover:underline"
                >
                  @balweh10
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
