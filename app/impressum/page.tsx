import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Impressum",
  description:
    "Impressum von Balweh Gebäudereinigung und Galabau mit Pflichtangaben gemäß § 5 DDG.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-brand-primary">
        Impressum
      </h1>
      <div className="mt-8 space-y-6 text-zinc-700">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            Angaben gemäß § 5 DDG
          </h2>
          <p>Balweh Gebäudereinigung und Galabau e.K.</p>
          <p>Inhaber: Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
          <p>Deutschland</p>
          <p>Telefon: +49 155 67200971</p>
          <p>E-Mail: info@balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            Registereintrag
          </h2>
          <p>Handelsregister: Amtsgericht [eintragen]</p>
          <p>Registernummer: HRA [eintragen]</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            Umsatzsteuer-ID
          </h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [eintragen]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            Verbraucherstreitbeilegung (VSBG)
          </h2>
          <p>
            Wir sind nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            Bildnachweise
          </h2>
          <p>
            Die auf dieser Website verwendeten Bilder stammen von{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Pexels
            </a>{" "}
            und{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Unsplash
            </a>
            . Alle Bilder stehen unter freien Lizenzen zur kommerziellen Nutzung
            und erfordern keine Namensnennung. Wir danken den Fotografen für die
            Bereitstellung ihrer Werke.
          </p>
        </section>
      </div>
    </main>
  );
}
