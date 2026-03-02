import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garten- & Landschaftsbau Leverkusen | Galabau | Balweh Service",
  description:
    "Professioneller Garten- & Landschaftsbau in Leverkusen. Pflasterarbeiten, Terrassenbau, Zaunanlagen, Rollrasen und Gartenpflege. Jetzt unverbindlich beraten lassen!",
  keywords: [
    "Gartenbau Leverkusen",
    "Landschaftsbau Leverkusen",
    "Galabau Leverkusen",
    "Pflasterarbeiten Leverkusen",
    "Terrassenbau Leverkusen",
    "Zaunbau Leverkusen",
    "Gartenpflege Leverkusen",
    "Rollrasen verlegen Leverkusen",
  ],
};

export default function GartenLandschaftsbau() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Garten- und Landschaftsbau (GaLabau)
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Professioneller Garten- & Landschaftsbau in Leverkusen
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Balweh Service ist Ihr zuverlässiger Partner für professionellen Garten- und Landschaftsbau in Leverkusen und Umgebung. Wir gestalten, pflegen und erneuern Außenanlagen individuell, fachgerecht und termintreu.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Jetzt unverbindlich beraten lassen
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <article className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Unsere Leistungen im Galabau
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-zinc-600">
            <li>Gestaltung & Pflege von Grünanlagen</li>
            <li>Pflasterarbeiten</li>
            <li>Baum- & Heckenschnitt</li>
            <li>Rasenpflege</li>
            <li>Rollrasen verlegen</li>
            <li>Neu- & Umgestaltung von Außenanlagen</li>
            <li>Terrassenbau (Holz & WPC)</li>
            <li>Zaun- & Toranlagen</li>
            <li>Teich- & Wasserlaufbau</li>
          </ul>
        </article>

        <article className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Individuelle Außenanlagen nach Maß
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Wir planen und realisieren Außenbereiche nach Ihren Wünschen – von
            der kleinen Gartenpflege bis zur kompletten Neugestaltung Ihrer
            Außenanlage. Dabei legen wir großen Wert auf Qualität, saubere
            Ausführung und langlebige Materialien.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold tracking-tight">
            Gartenbau für Privat- und Gewerbekunden in Leverkusen
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">
            Ob privater Garten, Mehrfamilienhaus oder gewerbliche Außenanlage –
            wir bieten maßgeschneiderte Lösungen für jedes Projekt.
          </p>
        </article>
      </section>
    </main>
  );
}
