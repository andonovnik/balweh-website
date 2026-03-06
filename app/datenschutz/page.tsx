export const metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklaerung von Balweh zur Verarbeitung personenbezogener Daten gemaess DSGVO.",
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
          <p>Balweh Gebäudereinigung und Galabau e.K.</p>
          <p>Inhaber: Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
          <p>Deutschland</p>
          <p>Telefon: +49 155 67200971</p>
          <p>E-Mail: info@balweh.de</p>
          <p>balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            3. Hosting und Server-Logfiles
          </h2>
          <p>
            Diese Website wird bei der Hostinger International Ltd gehostet. Der
            Hosting-Anbieter verarbeitet personenbezogene Daten in unserem
            Auftrag zur Bereitstellung und Absicherung der Website.
          </p>
          <p>
            Weitere Informationen zum Datenschutz bei Hostinger:
            https://www.hostinger.com/de/legal/datenschutz-bestimmungen
          </p>
          <p>
            Beim Aufruf der Website werden in Server-Logfiles typischerweise
            folgende Daten erfasst: IP-Adresse, Datum und Uhrzeit des Zugriffs,
            aufgerufene Seite/Datei, Referrer-URL, Browsertyp und
            Betriebssystem.
          </p>
          <p>
            Die Verarbeitung erfolgt zur technisch sicheren Bereitstellung der
            Website und zur Fehleranalyse.
          </p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
          <p>
            Die Speicherdauer der Logfiles richtet sich nach den Einstellungen
            des Hosting-Anbieters und erfolgt nur so lange, wie dies für den
            sicheren Betrieb erforderlich ist.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            4. Kontaktformular
          </h2>
          <p>
            Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen
            eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, gewünschte
            Dienstleistung und Nachricht), um Ihre Anfrage zu bearbeiten und mit
            Ihnen Kontakt aufzunehmen.
          </p>
          <p>
            <strong>Zusätzlich erfasste Daten:</strong>
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>IP-Adresse:</strong> Wird ausschließlich zur
              Missbrauchsprävention (Rate Limiting) erfasst und für maximal 1
              Stunde gespeichert. Zusätzlich wird die IP-Adresse für
              Sicherheitsprotokollierung (Abuse-Monitoring) erfasst und für
              maximal 30 Tage gespeichert. Die IP-Adresse wird NICHT im
              E-Mail-Versand und NICHT zur Bearbeitung Ihrer Anfrage verwendet.
            </li>
            <li>
              <strong>Zeitstempel:</strong> Datum und Uhrzeit der
              Formularübermittlung werden erfasst.
            </li>
            <li>
              <strong>Session-Cookie (PHPSESSID):</strong> Ein technisch
              notwendiges Cookie wird gesetzt, um CSRF-Angriffe zu verhindern
              (Schutz vor gefälschten Anfragen). Dieses Cookie enthält keine
              personenbezogenen Daten und wird automatisch gelöscht, wenn Sie
              Ihren Browser schließen.
            </li>
          </ul>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
            (Vertragsanbahnung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Verhinderung von Missbrauch und Sicherstellung der
            technischen Sicherheit).
          </p>
          <p>
            <strong>Verarbeitung und Übermittlung:</strong> Die eingegebenen
            Daten werden über unseren Server verarbeitet und per E-Mail an uns
            übermittelt. Eine Weitergabe an Dritte erfolgt nicht.
          </p>
          <p>
            <strong>Speicherdauer:</strong>
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Formulardaten:</strong> Werden gelöscht, sobald Ihre
              Anfrage abschließend bearbeitet wurde und keine gesetzlichen
              Aufbewahrungspflichten mehr bestehen (in der Regel nach 6
              Monaten).
            </li>
            <li>
              <strong>IP-Adressen und Rate-Limiting-Daten:</strong> Werden nach
              spätestens 1 Stunde automatisch gelöscht.
            </li>
            <li>
              <strong>Sicherheitsprotokolle (Logs):</strong> Werden nach 30
              Tagen automatisch gelöscht.
            </li>
            <li>
              <strong>Session-Cookie:</strong> Wird beim Schließen des Browsers
              automatisch gelöscht.
            </li>
          </ul>
          <p>
            Die Bereitstellung der Daten ist für die Bearbeitung Ihrer Anfrage
            erforderlich. Ohne diese Angaben können wir Ihre Anfrage nicht
            beantworten.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            5. Kontaktaufnahme per E-Mail oder Telefon
          </h2>
          <p>
            Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten
            wir Ihre Angaben zur Bearbeitung Ihrer Anfrage.
          </p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            6. Empfänger von Daten
          </h2>
          <p>
            Personenbezogene Daten werden innerhalb unseres Unternehmens nur an
            die Stellen weitergegeben, die sie zur Bearbeitung Ihrer Anfrage
            benötigen.
          </p>
          <p>
            <strong>Auftragsverarbeiter:</strong>
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Hostinger International Ltd</strong> - als
              Hosting-Anbieter für die technische Bereitstellung der Website und
              E-Mail-Infrastruktur
            </li>
          </ul>
          <p>
            Es erfolgt keine Weitergabe Ihrer Daten an Dritte zu Werbe- oder
            Marketingzwecken.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            7. Cookies, Tracking und Analyse
          </h2>
          <p>
            <strong>Technisch notwendige Cookies:</strong> Auf dieser Website
            wird ein technisch notwendiges Session-Cookie (PHPSESSID) verwendet,
            um das Kontaktformular vor CSRF-Angriffen zu schützen. Dieses Cookie
            ist für die sichere Funktion des Formulars erforderlich und enthält
            keine personenbezogenen Daten. Es wird automatisch beim Schließen
            des Browsers gelöscht.
          </p>
          <p>
            <strong>Marketing und Analyse:</strong> Wir setzen derzeit keine
            Analyse- oder Marketing-Tools ein, die eine Einwilligung erfordern.
            Es werden keine Cookies zu Tracking- oder Werbezwecken gesetzt.
          </p>
          <p>
            Rechtsgrundlage für technisch notwendige Cookies: Art. 6 Abs. 1 lit.
            f DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der
            Website).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            8. Datensicherheit und SSL-Verschlüsselung
          </h2>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein,
            um Ihre personenbezogenen Daten gegen zufällige oder vorsätzliche
            Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter
            Personen zu schützen.
          </p>
          <p>
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
            Übertragung personenbezogener Daten eine SSL- bzw.
            TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf
            &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer
            Browserzeile.
          </p>
          <p>
            Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die
            Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen
            werden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            9. Instagram
          </h2>
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
            10. Ihre Rechte
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
            11. Beschwerderecht bei Aufsichtsbehörde
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
          <p>Kavalleriestr. 2-4, 40213 Duesseldorf</p>
          <p>https://www.ldi.nrw.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            12. Stand der Datenschutzerklärung
          </h2>
          <p>Stand: 06.03.2026</p>
        </section>
      </div>
    </main>
  );
}
