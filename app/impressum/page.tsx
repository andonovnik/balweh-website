export const metadata = {
  title: "Impressum",
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
          <p>Balweh GmbH</p>
          <p>Musterstraße 1</p>
          <p>00000 Musterstadt</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            Vertreten durch
          </h2>
          <p>Abdula Balweh - Geschäftsführer</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">Kontakt</h2>
          <p>Telefon: +49 0000 000000</p>
          <p>E-Mail: info@balweh.de</p>
        </section>
      </div>
    </main>
  );
}
