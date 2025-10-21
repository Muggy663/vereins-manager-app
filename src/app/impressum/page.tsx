export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
          <p>Marcel Bünger<br />
          Privatperson<br />
          Deutschland</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
          <p>E-Mail: rwk-leiter-ksve@gmx.de</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Haftungsausschluss</h2>
          <p className="text-sm text-gray-600">
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. 
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
            kann jedoch keine Gewähr übernommen werden.
          </p>
        </div>
        
        <div className="border-t pt-4 mt-8">
          <p className="text-sm text-gray-500">
            © 2025 Marcel Bünger. Alle Rechte vorbehalten.<br />
            Für beste Kompatibilität empfehlen wir Chrome, Firefox oder Edge<br />
            Entwickelt mit ❤️ für den deutschen Schießsport
          </p>
        </div>
      </div>
    </div>
  );
}