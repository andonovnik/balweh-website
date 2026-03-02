import type { Metadata } from "next";

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
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Unsere Kontaktdaten</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Balweh Gebäudereinigung & Garten- und Landschaftsbau
              <br />
              <br />
              📞 Telefon:
              <br />
              <a
                href="tel:+4921423086869"
                className="mt-4 font-medium text-zinc-900 hover:text-blue-600"
              >
                0214 – 23 08 68 69
              </a>
              <br />
              <br />
              🕒 Erreichbarkeit:
              <br />
              Montag – Freitag
              <br />
              08:00 – 18:00 Uhr
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">✉ E-Mail</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Senden Sie uns eine E-Mail mit Ihren Anfragen und Wünschen.
              Während unserer Geschäftszeiten sind wir telefonisch für Sie
              erreichbar. Außerhalb dieser Zeiten können Sie uns jederzeit eine
              E-Mail oder eine Nachricht über Instagram senden.
            </p>
            <a
              href="mailto:info@balweh.de"
              className="mt-4 font-medium text-zinc-900 hover:text-blue-600"
            >
              info@balweh.de
            </a>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">📲 Instagram</h2>
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

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <article>
          <h2 className="text-2xl font-semibold tracking-tight">
            Persönliche Beratung & unverbindliches Angebot
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Wir beraten Sie individuell und erstellen Ihnen ein
            maßgeschneidertes Angebot für Ihr Projekt – transparent, fair und
            ohne Verpflichtungen.
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@balweh.de"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Jetzt unverbindlich anfragen
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
