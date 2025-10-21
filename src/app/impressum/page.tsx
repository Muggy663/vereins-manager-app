export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">Impressum</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-1">
                <p><strong>Marcel Bünger</strong></p>
                <p>Luisenstr. 10</p>
                <p>37574 Einbeck</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
              <div className="space-y-1">
                <p><strong>E-Mail:</strong> marcel.buenger@gmx.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Haftungsausschluss</h2>
              
              <h3 className="font-semibold mt-4 mb-2">Haftung für Inhalte</h3>
              <p className="text-sm text-gray-700">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="font-semibold mt-4 mb-2">Haftung für Links</h3>
              <p className="text-sm text-gray-700">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Urheberrecht</h2>
              <p className="text-sm text-gray-700">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Datenschutz</h2>
              <p className="text-sm text-gray-700">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. 
                Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies stets auf freiwilliger Basis. 
                Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Detaillierte Informationen finden Sie in unserer <a href="/datenschutz" className="text-blue-600 hover:underline">Datenschutzerklärung</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}