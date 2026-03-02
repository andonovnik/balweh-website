export const metadata = {
  title: "Impressum",
  description:
    "Impressum von Balweh Gebäudereinigung & Garten- und Landschaftsbau mit allen Pflichtangaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
        Impressum
      </h1>
      <div className="mt-8 space-y-6 text-zinc-700">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            Angaben gemäß § 5 TMG
          </h2>
          <p>Balweh Gebäudereinigung & Garten- und Landschaftsbau</p>
          <p>Inhaber: Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
          <p>Deutschland</p>
          <p>Telefon: 0214 – 23 08 68 69</p>
          <p>E-Mail: info@balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">Bildnachweise</h2>
          <p>
            Die auf dieser Website verwendeten Bilder stammen von{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Pexels
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
