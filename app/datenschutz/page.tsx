import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Balweh zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-brand-primary">
        Datenschutzerklärung
      </h1>
      <p className="mt-4 text-sm text-zinc-600">Stand: 08.03.2026</p>
      <div className="mt-8 space-y-6 text-zinc-700">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            1. Allgemeine Hinweise
          </h2>
          <p>
            Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz
            Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend
            informieren wir Sie darüber, welche personenbezogenen Daten wir bei
            der Nutzung dieser Website verarbeiten und zu welchen Zwecken dies
            geschieht. Die Verarbeitung erfolgt nach den Vorgaben der
            Datenschutz-Grundverordnung (DSGVO).
          </p>
          <p>
            Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
            identifiziert werden können.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            2. Verantwortlicher (Art. 13 Abs. 1 lit. a DSGVO)
          </h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className="font-medium">
            Balweh Gebäudereinigung und Galabau e.K.
          </p>
          <p>Inhaber: Abdula Balweh</p>
          <p>Baumberger Str. 54</p>
          <p>51373 Leverkusen</p>
          <p>Deutschland</p>
          <p>Telefon: +49 155 67200971</p>
          <p>E-Mail: info@balweh.de</p>
          <p>Website: balweh.de</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            3. Datenschutzbeauftragter (Art. 13 Abs. 1 lit. b DSGVO)
          </h2>
          <p>
            Ein Datenschutzbeauftragter ist für unser Unternehmen nicht
            bestellt.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-brand-primary">
            4. Hosting und Bereitstellung der Website (Art. 13 Abs. 1 lit. c, e,
            f DSGVO; Art. 28 DSGVO)
          </h2>
          <p>
            Unsere Website wird bei Hostinger International Ltd gehostet. Der
            Hosting-Anbieter verarbeitet personenbezogene Daten in unserem
            Auftrag zur technischen Bereitstellung und Absicherung der Website
            (Auftragsverarbeitung nach Art. 28 DSGVO).
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              4.1 Server-Logfiles
            </h3>
            <p>
              Beim Aufruf unserer Website werden in Server-Logfiles
              typischerweise folgende Daten verarbeitet:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>aufgerufene Seite/Datei</li>
              <li>Referrer-URL</li>
              <li>Browsertyp und Betriebssystem</li>
            </ul>
            <p>
              <strong>Zwecke:</strong> technisch sichere Bereitstellung der
              Website, Stabilität, IT-Sicherheit und Fehleranalyse.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der sicheren und stabilen
              Bereitstellung der Website).
            </p>
            <p>
              <strong>Speicherdauer:</strong> Die Speicherdauer richtet sich
              nach der serverseitigen Konfiguration und erfolgt nur so lange,
              wie dies für den sicheren Betrieb erforderlich ist.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              4.2 Lokale Bereitstellung von Webfonts
            </h3>
            <p>
              Zur einheitlichen und optisch ansprechenden Darstellung unserer
              Website nutzen wir die Schriftart &quot;Geist&quot;. Diese
              Schriftart haben wir heruntergeladen und lokal auf unserem
              Webserver installiert. Beim Aufruf unserer Website werden die
              Schriftdateien direkt von unserem Server (Hostinger) an Ihren
              Browser übertragen.
            </p>
            <p>
              Es findet keine Verbindung zu Servern von Drittanbietern (z. B.
              Google Fonts) statt. Daher wird Ihre IP-Adresse im Rahmen der
              Schriftdarstellung nicht an externe Dienstleister übermittelt.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an einer technisch sicheren und
              gestalterisch einheitlichen Darstellung unseres Online-Auftritts).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              4.3 Empfänger (Art. 13 Abs. 1 lit. e DSGVO)
            </h3>
            <p>
              Empfänger der Daten ist unser Hosting-Dienstleister Hostinger
              International Ltd (Hosting/technische Bereitstellung).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              4.4 Drittlandübermittlung (Art. 13 Abs. 1 lit. f DSGVO)
            </h3>
            <p>
              Nach Ihren Angaben erfolgt das Hosting ausschließlich innerhalb
              der EU/des EWR. Eine Übermittlung personenbezogener Daten in
              Staaten außerhalb der EU/des EWR findet im Rahmen des Hostings
              nicht statt.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-brand-primary">
            5. Kontaktformular (Art. 13 Abs. 1 lit. c DSGVO)
          </h2>
          <p>
            Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen
            eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, gewünschte
            Dienstleistung und Nachricht), um Ihre Anfrage zu bearbeiten und mit
            Ihnen Kontakt aufzunehmen.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              5.1 Zusätzlich verarbeitete technische Daten
            </h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>IP-Adresse:</strong>
                <ul className="ml-4 mt-1 list-disc space-y-1">
                  <li>
                    zur Missbrauchsprävention (Rate Limiting) für maximal 1
                    Stunde
                  </li>
                  <li>
                    zur Sicherheitsprotokollierung (Abuse-Monitoring) für
                    maximal 30 Tage
                  </li>
                </ul>
                <p className="ml-4 mt-1">
                  Die IP-Adresse wird nicht im E-Mail-Versand verwendet und
                  nicht zur inhaltlichen Bearbeitung Ihrer Anfrage genutzt.
                </p>
              </li>
              <li>
                <strong>Zeitstempel:</strong> Datum und Uhrzeit der
                Formularübermittlung
              </li>
              <li>
                <strong>Session-Cookie (PHPSESSID):</strong> technisch
                notwendiges Cookie zur Abwehr von CSRF-Angriffen (Schutz vor
                gefälschten Formularanfragen)
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">5.2 Zwecke</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>Bearbeitung und Beantwortung Ihrer Anfrage</li>
              <li>
                Schutz vor Missbrauch und Sicherstellung der technischen
                Sicherheit
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              5.3 Rechtsgrundlagen
            </h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung), soweit Ihre
                Anfrage auf einen Vertragsschluss oder die Anbahnung eines
                Vertrags gerichtet ist
              </li>
              <li>
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse), soweit die
                Verarbeitung zur IT-Sicherheit/Missbrauchsprävention
                erforderlich ist
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              5.4 Verarbeitung und Übermittlung
            </h3>
            <p>
              Die eingegebenen Daten werden über unseren Server verarbeitet und
              per E-Mail an uns übermittelt. Eine Weitergabe zu Werbe- oder
              Marketingzwecken erfolgt nicht. Eine Verarbeitung durch technische
              Auftragsverarbeiter (z. B. Hosting-Anbieter) kann stattfinden.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              5.5 Speicherdauer
            </h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Formulardaten:</strong> Löschung nach abschließender
                Bearbeitung und sofern keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen (in der Regel nach 6 Monaten). Erfolgt die
                Bearbeitung per E-Mail, richtet sich die tatsächliche Löschung
                nach den internen Postfachprozessen und gesetzlichen
                Aufbewahrungspflichten.
              </li>
              <li>
                <strong>Rate-Limiting-Daten:</strong> Speicherung für 1 Stunde,
                anschließende Löschung im Rahmen der automatischen
                Systemverarbeitung.
              </li>
              <li>
                <strong>Sicherheitsprotokolle:</strong> Löschung nach 30 Tagen.
              </li>
              <li>
                <strong>Session-Cookie:</strong> Löschung beim Schließen des
                Browsers.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-brand-primary">
              5.6 Erforderlichkeit der Bereitstellung (Art. 13 Abs. 2 lit. e
              DSGVO)
            </h3>
            <p>
              Die Bereitstellung der Daten ist für die Bearbeitung Ihrer Anfrage
              erforderlich. Ohne diese Angaben können wir Ihre Anfrage nicht
              beantworten.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            6. Kontaktaufnahme per E-Mail oder Telefon (Art. 13 Abs. 1 lit. c
            DSGVO)
          </h2>
          <p>
            Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten
            wir die von Ihnen mitgeteilten Daten (z. B. Name, Kontaktdaten,
            Inhalt der Anfrage) zur Bearbeitung Ihres Anliegens.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong>
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Art. 6 Abs. 1 lit. b DSGVO, soweit die Kontaktaufnahme der
              Vertragsanbahnung oder Vertragsdurchführung dient, und
            </li>
            <li>
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse), soweit es
              sich um allgemeine Anfragen handelt und wir ein berechtigtes
              Interesse an deren Bearbeitung haben.
            </li>
          </ul>
          <p>
            <strong>Speicherdauer:</strong> Wir löschen die
            Kommunikationsinhalte, sobald die Bearbeitung abgeschlossen ist und
            keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            7. Cookies / Endgerätezugriff (DSGVO und § 25 TDDDG)
          </h2>
          <p>
            Auf dieser Website wird ein technisch notwendiges Session-Cookie
            (PHPSESSID) verwendet, um das Kontaktformular vor CSRF-Angriffen zu
            schützen. Dieses Cookie wird beim Schließen des Browsers automatisch
            gelöscht.
          </p>
          <p>
            <strong>Rechtsgrundlagen:</strong>
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              § 25 Abs. 2 Nr. 2 TDDDG (Speicherung/Zugriff auf Informationen im
              Endgerät, soweit unbedingt erforderlich), und
            </li>
            <li>
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren
              und funktionsfähigen Bereitstellung der Website).
            </li>
          </ul>
          <p>
            <strong>Tracking/Analyse/Marketing:</strong> Nach Ihren Angaben
            setzen wir keine Analyse- oder Marketing-Tools ein und verwenden
            keine Cookies zu Tracking- oder Werbezwecken.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            8. Empfänger von Daten (Art. 13 Abs. 1 lit. e DSGVO)
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
              Hostinger International Ltd (Hosting/technische Bereitstellung
              innerhalb EU/EWR)
            </li>
          </ul>
          <p>
            Eine Weitergabe Ihrer Daten an Dritte zu Werbe- oder
            Marketingzwecken erfolgt nicht.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            9. Datensicherheit und Verschlüsselung
          </h2>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein,
            um Ihre personenbezogenen Daten vor Verlust, Missbrauch oder
            unberechtigtem Zugriff zu schützen. Diese Website nutzt eine SSL-
            bzw. TLS-Verschlüsselung, um übermittelte Daten zu schützen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            10. Social Media (Instagram/TikTok) – reine Links
          </h2>
          <p>
            Auf unserer Website befinden sich Icons/Links zu sozialen Netzwerken
            (z. B. Instagram, TikTok). Beim Anklicken eines solchen Links werden
            Sie auf die jeweilige Plattform weitergeleitet. Für die Verarbeitung
            personenbezogener Daten auf den Plattformen sind die jeweiligen
            Anbieter verantwortlich.
          </p>
          <p>
            Nach Ihren Angaben sind diese Plattformen auf unserer Website nicht
            über Plugins, Pixel oder eingebettete Inhalte integriert, sondern
            ausschließlich als normale Links.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            11. Automatisierte Entscheidungsfindung / Profiling (Art. 13 Abs. 2
            lit. f DSGVO)
          </h2>
          <p>
            Eine automatisierte Entscheidungsfindung einschließlich Profiling
            findet nicht statt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            12. Ihre Rechte (Art. 13 Abs. 2 lit. b DSGVO)
          </h2>
          <p>Sie haben nach der DSGVO insbesondere folgende Rechte:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Recht auf Auskunft</li>
            <li>Recht auf Berichtigung</li>
            <li>Recht auf Löschung</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Widerspruch</li>
            <li>Recht auf Datenübertragbarkeit</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte können Sie uns unter info@balweh.de
            kontaktieren.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            13. Widerspruchsrecht bei Verarbeitung auf Grundlage berechtigter
            Interessen (Art. 21 DSGVO)
          </h2>
          <p>
            Wenn wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs.
            1 lit. f DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die
            sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch
            gegen diese Verarbeitung einzulegen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-primary">
            14. Beschwerderecht bei der Aufsichtsbehörde (Art. 13 Abs. 2 lit. d
            DSGVO)
          </h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu
            beschweren. Für Nordrhein-Westfalen ist dies die Landesbeauftragte
            für Datenschutz und Informationsfreiheit Nordrhein-Westfalen,
            Kavalleriestr. 2–4, 40213 Düsseldorf.
          </p>
        </section>
      </div>
    </main>
  );
}
