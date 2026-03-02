import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balweh Gebäudereinigung und Galabau Leverkusen & NRW",
  description:
    "Ihr Partner für glänzende Gebäude und gepflegte Gärten. Erleben Sie Qualität, die man sieht, und einen Service, den man spürt.",
  keywords: [
    "Gebäudereinigung",
    "Galabau",
    "Reinigungsservice",
    "Gartenpflege Leverkusen NRW",
  ],
};

export default function Home() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Home / Startseite
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Balweh Gebäudereinigung und Galabau: Qualität, die man sieht. Service,
          den man spürt.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Willkommen bei Ihrem Experten für professionelle Gebäudereinigung und
          leidenschaftlichen Galabau. Wir sorgen für Werterhalt und Wohlbefinden
          in und um Ihr Objekt.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Jetzt unverbindliches Angebot sichern!
          </a>
          <a
            href="/gebaeudereinigung"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            Unsere Services
          </a>
        </div>
      </section>

      <section id="leistungen" className="mx-auto w-full max-w-6xl px-6 py-16">
        <article className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Qualität, die man sieht – Unsere Kernkompetenzen
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Wir sorgen für erstklassige Ergebnisse in der Gebäudereinigung und
            im Galabau. Unser Anspruch ist höchste Sorgfalt bei jedem Projekt.
          </p>
        </article>

        <article className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Service, den man spürt – Unser Versprechen
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Bei uns stehen Sie im Mittelpunkt. Wir bieten Ihnen eine persönliche
            Beratung, Pünktlichkeit und eine Betreuung, auf die Sie sich
            verlassen können.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold tracking-tight">
            Alles aus einer Hand
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Sparen Sie Zeit und Aufwand, indem Sie die Pflege Ihrer Immobilie
            und Ihrer Außenanlagen einem eingespielten Team anvertrauen.
          </p>
        </article>
      </section>
    </main>
  );
}
