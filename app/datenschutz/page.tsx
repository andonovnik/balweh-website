export const metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
        Datenschutz
      </h1>
      <div className="mt-8 space-y-6 text-zinc-700">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            1. Allgemeine Hinweise
          </h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Seite
            informiert in Grundzügen über die Verarbeitung personenbezogener
            Daten auf dieser Website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            2. Verantwortliche Stelle
          </h2>
          <p>Balweh GmbH, Musterstraße 1, 00000 Musterstadt</p>
          <p>E-Mail: info@balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            3. Ihre Rechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung sowie Widerspruch gegen die
            Verarbeitung Ihrer Daten im Rahmen der gesetzlichen Vorgaben.
          </p>
        </section>
      </div>
    </main>
  );
}
