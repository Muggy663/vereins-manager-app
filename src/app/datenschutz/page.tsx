export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="font-semibold mt-4 mb-2">Allgemeine Hinweise</h3>
              <p className="text-sm text-gray-700">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>

              <h3 className="font-semibold mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-sm text-gray-700">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Impressum dieser Website entnehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Hosting und Content Delivery Networks (CDN)</h2>
              
              <h3 className="font-semibold mt-4 mb-2">Vercel</h3>
              <p className="text-sm text-gray-700">
                Diese Website wird bei Vercel gehostet. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, 
                Walnut, CA 91789, USA. Vercel erfasst in sog. Logfiles folgende Daten: IP-Adresse, Referrer URL, 
                Browser-Informationen und Zeitstempel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Firebase / Google Cloud</h2>
              <p className="text-sm text-gray-700">
                Wir nutzen Firebase von Google für die Datenspeicherung und Authentifizierung. Anbieter ist 
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              
              <h3 className="font-semibold mt-4 mb-2">Welche Daten werden gespeichert?</h3>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Benutzerdaten (E-Mail, Name) für die Anmeldung</li>
                <li>Vereinsdaten (Mitgliederdaten, Beiträge, Termine)</li>
                <li>Technische Daten (IP-Adresse, Browser-Informationen)</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">Rechtsgrundlage</h3>
              <p className="text-sm text-gray-700">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) 
                und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Vereinsdaten</h2>
              
              <h3 className="font-semibold mt-4 mb-2">Mitgliederverwaltung</h3>
              <p className="text-sm text-gray-700">
                Zur Verwaltung der Vereinsmitglieder speichern wir folgende Daten:
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Name, Vorname, Adresse</li>
                <li>Geburtsdatum, Geschlecht</li>
                <li>Kontaktdaten (E-Mail, Telefon)</li>
                <li>Vereinsdaten (Eintritt, Mitgliedsnummer)</li>
                <li>Beitragsdaten und SEPA-Mandate</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-2">Zweck der Verarbeitung</h3>
              <p className="text-sm text-gray-700">
                Die Daten werden ausschließlich für die Vereinsverwaltung verwendet: Mitgliederverwaltung, 
                Beitragsabrechnung, Kommunikation und gesetzliche Aufbewahrungspflichten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Ihre Rechte</h2>
              <p className="text-sm text-gray-700">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Datensicherheit</h2>
              <p className="text-sm text-gray-700">
                Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten 
                gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder Zugriff unberechtigter 
                Personen zu schützen.
              </p>
              
              <h3 className="font-semibold mt-4 mb-2">Technische Maßnahmen</h3>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>SSL/TLS-Verschlüsselung</li>
                <li>Firebase Security Rules</li>
                <li>Rollenbasierte Zugriffskontrolle</li>
                <li>Regelmäßige Sicherheitsupdates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Kontakt</h2>
              <p className="text-sm text-gray-700">
                Bei Fragen zum Datenschutz wenden Sie sich an:
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm"><strong>Marcel Bünger</strong></p>
                <p className="text-sm"><strong>E-Mail:</strong> marcel.buenger@gmx.de</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}