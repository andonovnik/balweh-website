import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Über Balweh Service | Gebäudereinigung & Galabau in Leverkusen&Nrw",
  description:
    "Mit Sitz in Leverkusen betreuen wir Kunden in ganz Nordrhein-Westfalen – von privaten Haushalten bis hin zu großen Gewerbeobjekten.",
  keywords: [
    "Gebäudereinigung Leverkusen",
    "Galabau Leverkusen",
    "Gebäudeservice NRW",
    "Gartenbau Nordrhein-Westfalen",
  ],
};

export default function ÜberUns() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Wer wir sind
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-brand-primary md:text-5xl">
          Balweh – Qualität, die man sieht. Service, den man spürt.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Balweh Service steht für professionelle Gebäudereinigung und
          hochwertigen Garten- & Landschaftsbau mit Sitz in Leverkusen. Von hier
          aus betreuen wir Privat- und Gewerbekunden in ganz
          Nordrhein-Westfalen. Unser Slogan ist dabei nicht nur ein Versprechen
          – sondern unsere tägliche Arbeitsweise: Qualität, die man sieht.
          Service, den man spürt.
        </p>
        <Image
          src="/images/ueber-uns-hero.webp"
          alt="Teammeeting für professionelle Serviceplanung"
          className="mt-8 h-72 w-full rounded-2xl object-cover"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-brand-secondary px-5 py-3 text-sm font-medium text-white hover:bg-brand-secondary/90"
          >
            Lassen Sie uns Ihr Projekt gemeinsam umsetzen
          </a>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/ueber-uns-background.webp"
          alt="Arbeiter bei Gartenarbeit und Landschaftsbau"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/98" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <article className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Was &quot;Qualität, die man sieht&quot; für uns bedeutet
            </h2>
            <p className="mt-4 leading-8 text-zinc-600">
              Für uns beginnt Qualität bei der sorgfältigen Planung und endet
              erst mit einem Ergebnis, das langfristig überzeugt.
            </p>
            <p className="mt-4 leading-8 text-zinc-600">
              Ob streifenfreie Glasflächen, gründlich gereinigte Innenräume oder
              präzise ausgeführte Pflasterarbeiten – unsere Arbeit soll sichtbar
              überzeugen.
            </p>
            <p className="mt-4 leading-8 text-zinc-600">
              Wir legen großen Wert auf:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-8 text-zinc-600">
              <li>Fachgerechte Ausführung</li>
              <li>Hochwertige Materialien</li>
              <li>Moderne Technik</li>
              <li>Nachhaltige Reinigungsmittel</li>
              <li>Saubere und strukturierte Abläufe</li>
            </ul>
            <p className="mt-4 leading-8 text-zinc-600">
              Denn echte Qualität zeigt sich im Detail.
            </p>
          </article>

          <article className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Was &quot;Service, den man spürt&quot; für unsere Kunden heißt
            </h2>
            <p className="mt-4 leading-8 text-zinc-600">
              Service bedeutet für uns mehr als nur die Ausführung eines
              Auftrags. Es bedeutet:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-8 text-zinc-600">
              <li>Persönliche Beratung</li>
              <li>Ehrliche Kommunikation</li>
              <li>Transparente Angebote</li>
              <li>Termintreue</li>
              <li>Schnelle Erreichbarkeit</li>
            </ul>
            <p className="mt-4 leading-8 text-zinc-600">
              Unsere Kunden sollen sich gut betreut fühlen – vom ersten Gespräch
              bis zum erfolgreichen Abschluss des Projekts.
            </p>
          </article>

          <article className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Regional verwurzelt – In ganz NRW im Einsatz
            </h2>
            <p className="mt-4 leading-8 text-zinc-600">
              Mit unserem Standort in Leverkusen sind wir regional stark
              aufgestellt und schnell einsatzbereit. Gleichzeitig realisieren
              wir Projekte im gesamten Nordrhein-Westfalen – flexibel,
              zuverlässig und professionell organisiert.
            </p>
            <p className="mt-4 leading-8 text-zinc-600">
              Wir betreuen unter anderem:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-8 text-zinc-600">
              <li>Bürogebäude</li>
              <li>Gewerbeobjekte</li>
              <li>Praxen & Hotels</li>
              <li>Mehrfamilienhäuser</li>
              <li>Private Gärten und Außenanlagen</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Unser Anspruch
            </h2>
            <p className="mt-4 leading-8 text-zinc-600">
              Wir verstehen unsere Arbeit als Verantwortung gegenüber unseren
              Kunden und ihren Immobilien. Jedes Projekt behandeln wir mit
              Sorgfalt, Respekt und dem Anspruch, nachhaltige Ergebnisse zu
              schaffen.
            </p>
            <p className="mt-4 leading-8 text-zinc-600">
              Denn am Ende soll nicht nur das Ergebnis stimmen – sondern auch
              das Gefühl dabei.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
