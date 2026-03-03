export const metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Balweh Service zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-brand-primary">
        Datenschutzerklärung
      </h1>
      <div className="mt-8 space-y-6 text-zinc-700">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            1. Allgemeine Hinweise
          </h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
            Nachfolgend informieren wir Sie über die Verarbeitung
            personenbezogener Daten auf dieser Website gemäß der
            Datenschutz-Grundverordnung (DSGVO).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            2. Verantwortlicher
          </h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p>Balweh Service</p>
          <p>Inhaber: Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
          <p>Deutschland</p>
          <p>Telefon: 0214 – 23 08 68 69</p>
          <p>E-Mail: info@balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            3. Hosting & Server-Logfiles
          </h2>
          <p>
            Beim Besuch dieser Website werden durch den Hosting-Anbieter
            automatisch Informationen erfasst (z. B. IP-Adresse, Browsertyp,
            Datum und Uhrzeit des Zugriffs).
          </p>
          <p>
            Diese Daten dienen ausschließlich der technischen Bereitstellung und
            Sicherheit der Website.
          </p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            4. Kontaktaufnahme per E-Mail oder Telefon
          </h2>
          <p>
            Wenn Sie uns per E-Mail oder telefonisch kontaktieren, werden Ihre
            Angaben zur Bearbeitung der Anfrage gespeichert.
          </p>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
            DSGVO (vorvertragliche Maßnahmen).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">5. Instagram</h2>
          <p>
            Auf unserer Website befindet sich ein Link zum sozialen Netzwerk
            Instagram.
          </p>
          <p>
            Beim Anklicken des Links werden Sie auf die Seite von Instagram
            weitergeleitet.
          </p>
          <p>
            Für die Datenverarbeitung auf Instagram ist ausschließlich der
            jeweilige Anbieter verantwortlich.
          </p>
          <p>
            Weitere Informationen finden Sie in der Datenschutzerklärung von
            Instagram:
          </p>
          <p>https://help.instagram.com/519522125107875</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            6. Ihre Rechte
          </h2>
          <p>Sie haben das Recht auf:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Widerspruch gegen die Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
          </ul>
          <p>Bitte wenden Sie sich hierzu an:</p>
          <p>info@balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            7. Beschwerderecht
          </h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu
            beschweren.
          </p>
          <p>Zuständig für Nordrhein-Westfalen ist:</p>
          <p>
            Landesbeauftragte für Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen
          </p>
        </section>
      </div>
    </main>
  );
}
