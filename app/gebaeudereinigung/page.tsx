import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gebäudereinigung | Unterhalts- & Glasreinigung | Balweh Service",
  description:
    "Professionelle Gebäudereinigung in Leverkusen. Unterhaltsreinigung, Glas- & Fassadenreinigung, Büro- & Hotelreinigung, Winterdienst und mehr.",
  keywords: [
    "Gebäudereinigung Leverkusen",
    "Gebäudeservice Leverkusen",
    "Büroreinigung Leverkusen",
    "Glas- & Fassadenreinigung Leverkusen",
    "Unterhaltsreinigung Leverkusen",
    "Hotelreinigung Leverkusen",
    "Baustellenreinigung Leverkusen",
    "Dachreinigung Leverkusen",
    "Winterdienst Leverkusen",
  ],
};

export default function Gebaeudereinigung() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Gebäudereinigung
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Professionelle Gebäudereinigung
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Balweh Service ist Ihr zuverlässiger Partner für Gebäudereinigung und Gebäudeservice in Leverkusen und Umgebung. Wir sorgen für Sauberkeit, Werterhalt und einen gepflegten Eindruck – flexibel, gründlich und professionell.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Jetzt unverbindliches Angebot anfordern
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <article className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Unsere Leistungen im Bereich Gebäudeservice
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-zinc-600">
            <li>
              Unterhalts- & Grundreinigung: Regelmäßige Reinigung von Büros,
              Praxen, Treppenhäusern und Gewerbeflächen.
            </li>
            <li>
              Glas- & Fassadenreinigung: Professionelle Reinigung von Fenstern,
              Glasflächen und Fassaden.
            </li>
            <li>
              Hotelreinigung: Sauberkeit und Hygiene für Hotels und
              Beherbergungsbetriebe.
            </li>
            <li>
              Baustellenreinigung: Bauzwischen- und Bauendreinigung für Neubau
              und Renovierung.
            </li>
            <li>
              Büroreinigung: Gründliche Reinigung von Arbeitsplätzen und
              Geschäftsräumen.
            </li>
            <li>
              Steinreinigung: Reinigung von Außenflächen, Pflastersteinen und
              Terrassen.
            </li>
            <li>
              Dachreinigung: Schonende und effektive Reinigung von Dächern.
            </li>
            <li>
              Winterdienst: Zuverlässiger Räum- und Streudienst bei Schnee und
              Eis.
            </li>
            <li>
              Müll- & Entrümpelung: Fachgerechte Entsorgung und
              Entrümpelungsservice.
            </li>
          </ul>
        </article>

        <article className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Gebäudereinigung für Gewerbe & Privatkunden
          </h2>
          <p className="mt-4 leading-8 text-zinc-600">Wir betreuen:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 leading-8 text-zinc-600">
            <li>Bürogebäude</li>
            <li>Arztpraxen</li>
            <li>Mehrfamilienhäuser</li>
            <li>Gewerbeobjekte</li>
            <li>Privatimmobilien</li>
          </ul>
        </article>

        <article>
          <h2 className="text-2xl font-semibold tracking-tight">Kontakt</h2>
          <p className="mt-4 leading-8 text-zinc-600">
            📞 Oder direkt telefonisch kontaktieren
          </p>
        </article>
      </section>
    </main>
  );
}
