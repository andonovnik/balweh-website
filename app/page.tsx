export default function Home() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Unternehmenswebseite
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          laborum, maiores ullam quibusdam itaque temporibus accusantium sequi
          debitis, quos culpa, expedita est omnis nisi dolor eum tenetur
          mollitia corporis minima!
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Kontakt
          </a>
          <a
            href="#leistungen"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            Leistungen
          </a>
        </div>
      </section>

      <section id="leistungen" className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Leistung 1</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Leistung 2</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Leistung 3</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </article>
        </div>
      </section>

      <section id="unternehmen" className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Über uns</h2>
        <p className="mt-4 max-w-3xl leading-8 text-zinc-600">
          BALWEH GmbH unterstützt Unternehmen dabei.. lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quos possimus perferendis aliquam
          suscipit debitis? Nostrum fugit reiciendis, hic eligendi cumque
          repudiandae quo sed neque? Magni libero similique consectetur dolorem
          reiciendis?
        </p>
      </section>

      <section id="kontakt" className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Kontakt</h2>
          <p className="text-zinc-600">E-Mail: kontakt@balweh.de</p>
          <p className="text-zinc-600">Telefon: +49 0000 000000</p>
          <p className="text-zinc-600">
            Adresse: Musterstraße 1, 00000 Musterstadt
          </p>
        </div>
      </section>
    </main>
  );
}
