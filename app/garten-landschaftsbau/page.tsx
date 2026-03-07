import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Garten- und Landschaftsbau",
  description:
    "Professioneller Garten- und Landschaftsbau in Leverkusen. Pflasterarbeiten, Terrassenbau, Zaunanlagen, Rollrasen und Gartenpflege. Jetzt unverbindlich beraten lassen!",
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
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-brand-primary md:text-5xl">
          Professioneller Garten- und Landschaftsbau in Leverkusen
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Balweh ist Ihr zuverlässiger Partner für professionellen Garten- und
          Landschaftsbau in Leverkusen und Umgebung. Wir gestalten, pflegen und
          erneuern Außenanlagen individuell, fachgerecht und termintreu.
        </p>
        <Image
          src="/images/garten-hero.webp"
          alt="Gepflegte Grünanlage mit Rasenpflege"
          className="mt-8 h-72 w-full object-cover"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-brand-secondary px-5 py-3 text-sm font-medium text-white hover:bg-brand-secondary/90"
          >
            Jetzt unverbindlich beraten lassen
          </a>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/garten-background.webp"
          alt="Gartenarbeit und Steinverlegung in Arbeit"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/94" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <article className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Unsere Leistungen im Galabau
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-zinc-600">
              <li>Gestaltung und Pflege von Grünanlagen</li>
              <li>Pflasterarbeiten</li>
              <li>Baum- und Heckenschnitt</li>
              <li>Rasenpflege</li>
              <li>Rollrasen verlegen</li>
              <li>Neu- und Umgestaltung von Außenanlagen</li>
              <li>Terrassenbau (Holz und WPC)</li>
              <li>Zaun- und Toranlagen</li>
              <li>Teich- und Wasserlaufbau</li>
            </ul>
          </article>

          <article className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
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
            <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
              Gartenbau für Privat- und Gewerbekunden in Leverkusen
            </h2>
            <p className="mt-4 leading-8 text-zinc-600">
              Ob privater Garten, Mehrfamilienhaus oder gewerbliche Außenanlage
              – wir bieten maßgeschneiderte Lösungen für jedes Projekt.
            </p>
          </article>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="group relative isolate overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/garten-card-pflaster.webp"
                  alt="Pflasterarbeiten mit Naturstein"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Pflasterarbeiten
                  </h3>
                  <p className="mt-1 text-sm text-zinc-200">
                    Hochwertige Steinverlegung
                  </p>
                </div>
              </div>
            </article>
            <article className="group relative isolate overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/garten-card-terrasse.webp"
                  alt="Gemütliche Terrasse mit rustikalen Holzmöbeln"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Terrassenbau
                  </h3>
                  <p className="mt-1 text-sm text-zinc-200">
                    Holz und WPC-Terrassen
                  </p>
                </div>
              </div>
            </article>
            <article className="group relative isolate overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/garten-card-rasen.webp"
                  alt="Gepflegter grüner Rasen"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    Grünflächenpflege
                  </h3>
                  <p className="mt-1 text-sm text-zinc-200">
                    Rasen und Gartenpflege
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
