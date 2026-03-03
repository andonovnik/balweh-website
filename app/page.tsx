import type { Metadata } from "next";
import Image from "next/image";
import BalwehLogo from "./balweh_logo_with_text.svg";

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
      <section className="relative isolate min-h-[72vh] overflow-hidden">
        <Image
          src="/images/homepage-hero.webp"
          alt="Moderne Gebäudereinigung in einem professionellen Arbeitsumfeld"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-zinc-950/55" />
        <div className="relative mx-auto flex min-h-[72vh] w-full max-w-6xl items-center px-6 py-20 md:py-28">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Balweh Gebäudereinigung und Galabau: Qualität, die man sieht.
              Service, den man spürt.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100">
              Willkommen bei Ihrem Experten für professionelle Gebäudereinigung
              und leidenschaftlichen Galabau. Wir sorgen für Werterhalt und
              Wohlbefinden in und um Ihr Objekt.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
              >
                Jetzt unverbindliches Angebot sichern!
              </a>
              <a
                href="/gebaeudereinigung"
                className="inline-flex items-center justify-center rounded-lg border border-white/60 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Unsere Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="relative isolate overflow-hidden">
        <Image
          src="/images/homepage-background.webp"
          alt="Professionelles Team bei Gebäudeservice und Planung"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/92" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex justify-center mb-8">
            <Image
              src={BalwehLogo}
              alt="Balweh Logo"
              width={400}
              height={120}
              style={{ height: "auto" }}
            />
          </div>

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
              Bei uns stehen Sie im Mittelpunkt. Wir bieten Ihnen eine
              persönliche Beratung, Pünktlichkeit und eine Betreuung, auf die
              Sie sich verlassen können.
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/gebaeudereinigung"
              className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/homepage-card-gebaeudereinigung.webp"
                  alt="Modernes Bürogebäude mit Glasfassade"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-zinc-900">
                  Gebäudereinigung
                </h3>
              </div>
            </a>

            <a
              href="/garten-landschaftsbau"
              className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/homepage-card-galabau.webp"
                  alt="Haus mit Blumen und Pflanzen"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-zinc-900">
                  Garten- & Landschaftsbau
                </h3>
              </div>
            </a>

            <a
              href="/kontakt"
              className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/homepage-card-kontakt.webp"
                  alt="Persönliche Beratung für Gebäudeservice und Galabau"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-zinc-900">
                  Beratung & Service
                </h3>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
