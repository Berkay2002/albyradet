import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Integritetspolicy för Albyrådet - läs om hur vi samlar in, använder och skyddar dina personuppgifter.",
  openGraph: {
    title: "Integritetspolicy - Albyrådet",
    description: "Integritetspolicy för Albyrådet - läs om hur vi samlar in, använder och skyddar dina personuppgifter.",
  },
};

export default function PrivacyPolicy() {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Integritetspolicy
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Senast uppdaterad: 19 juni 2025
            </p>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Inledning</h2>              <p>
                Albyrådet (&quot;vi&quot;, &quot;oss&quot;, &quot;vår&quot;) respekterar din integritet och är engagerade i att skydda 
                dina personuppgifter. Denna integritetspolicy förklarar hur vi som ideell ungdomsorganisation 
                samlar in, använder, lagrar och delar dina personuppgifter när du använder vår webbplats, 
                app och relaterade tjänster.
              </p>
              <p>
                Denna policy följer EU:s allmänna dataskyddsförordning (GDPR) och svensk dataskyddslagstiftning.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Personuppgiftsansvarig</h2>              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Albyrådet</strong></p>
                <p>Ideell ungdomsorganisation</p>
                <p>Alhagsvägen 42, tr 5</p>
                <p>145 59 Norsborg, Sverige</p>
                <p>E-post: kontakt@albyradet.se</p>
                <p>Telefon: 072-310 99 58</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Vilka personuppgifter samlar vi in?</h2>
              
              <h3 className="text-xl font-medium mb-3">3.1 Information du ger oss direkt:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kontaktinformation:</strong> Namn, e-postadress, telefonnummer</li>
                <li><strong>Medlemsinformation:</strong> Ålder, adress, intressen, bakgrundsinformation</li>
                <li><strong>Kommunikation:</strong> Meddelanden via kontaktformulär eller e-post</li>
                <li><strong>Event-deltagande:</strong> Anmälningar till aktiviteter och evenemang</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">3.2 Information vi samlar in automatiskt:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Teknisk information:</strong> IP-adress, webbläsartyp, enhetstyp</li>
                <li><strong>Användningsdata:</strong> Sidor du besöker, tid på webbplatsen, klickmönster</li>
                <li><strong>Cookies:</strong> Se vår cookiepolicy nedan</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">3.3 Information från tredje part:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sociala medier:</strong> Om du interagerar med oss via Facebook, Instagram</li>
                <li><strong>Offentliga källor:</strong> Information från offentliga register vid behov</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Hur använder vi dina personuppgifter?</h2>
              <p>Vi använder dina personuppgifter för följande ändamål:</p>
              
              <h3 className="text-xl font-medium mb-3">4.1 Rättslig grund: Samtycke</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Skicka nyhetsbrev och uppdateringar</li>
                <li>Marknadsföring av våra aktiviteter</li>
                <li>Sociala mediaintegrationer</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">4.2 Rättslig grund: Berättigat intresse</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Administrera medlemskap och deltagande</li>
                <li>Kommunicera om våra tjänster</li>
                <li>Förbättra vår webbplats och tjänster</li>
                <li>Säkerhet och säkerställa regelefterlevnad</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">4.3 Rättslig grund: Fullgörande av avtal</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Leverera medlemstjänster</li>
                <li>Hantera event-anmälningar</li>
                <li>Kundservice och support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Delning av personuppgifter</h2>
              <p>Vi delar dina personuppgifter endast i följande situationer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Tjänsteleverantörer:</strong> För hosting, e-posttjänster, analys (med dataskyddsavtal)</li>
                <li><strong>Sociala medier:</strong> När du använder våra sociala mediefunktioner</li>
                <li><strong>Rättsliga krav:</strong> Om det krävs enligt lag eller myndighetsförordning</li>
                <li><strong>Partnere:</strong> Med ditt uttryckliga samtycke för specifika projekt</li>
              </ul>
              <p><strong>Vi säljer aldrig dina personuppgifter till tredje part.</strong></p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Internationella överföringar</h2>
              <p>
                Vissa av våra tjänsteleverantörer kan vara baserade utanför EU/EES. I sådana fall 
                säkerställer vi att överföringarna sker enligt GDPR:s krav, genom:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>EU-kommissionens beslut om adekvat skyddsnivå</li>
                <li>Standardkontraktsklausuler</li>
                <li>Certifieringsmekanismer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Lagring av personuppgifter</h2>
              <p>Vi lagrar dina personuppgifter så länge som:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Medlemsuppgifter:</strong> Under medlemsperioden + 3 år</li>
                <li><strong>Kontaktformulär:</strong> 2 år från sista kontakt</li>
                <li><strong>Nyhetsbrev:</strong> Tills du avregistrerar dig</li>
                <li><strong>Webbanalys:</strong> 26 månader</li>
                <li><strong>Bokföringsunderlag:</strong> 7 år (enligt bokföringslagen)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Dina rättigheter</h2>
              <p>Enligt GDPR har du följande rättigheter:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Rätt till information:</strong> Om hur vi behandlar dina uppgifter</li>
                <li><strong>Rätt till tillgång:</strong> Få en kopia av dina lagrade uppgifter</li>
                <li><strong>Rätt till rättelse:</strong> Korrigera felaktiga uppgifter</li>
                <li><strong>Rätt till radering:</strong> &quot;Rätten att bli glömd&quot;</li>
                <li><strong>Rätt till begränsning:</strong> Begränsa behandlingen</li>
                <li><strong>Rätt till dataportabilitet:</strong> Få dina uppgifter i strukturerat format</li>
                <li><strong>Rätt att invända:</strong> Mot behandling baserad på berättigat intresse</li>
                <li><strong>Rätt att återkalla samtycke:</strong> När som helst</li>
              </ul>
              <p>
                För att utöva dina rättigheter, kontakta oss på kontakt@albyradet.se. 
                Vi svarar inom 30 dagar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Cookies och spårningsteknologier</h2>
              <p>Vi använder cookies för att:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Nödvändiga cookies:</strong> För webbplatsens grundfunktioner</li>
                <li><strong>Analytiska cookies:</strong> För att förstå hur webbplatsen används</li>
                <li><strong>Funktionella cookies:</strong> För att komma ihåg dina preferenser</li>
                <li><strong>Marknadsföringscookies:</strong> Med ditt samtycke</li>
              </ul>
              <p>Du kan hantera cookies i din webbläsares inställningar.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Säkerhet</h2>
              <p>Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL-kryptering för dataöverföring</li>
                <li>Säker lagring med åtkomstkontroll</li>
                <li>Regelbundna säkerhetsuppdateringar</li>
                <li>Personalutbildning i dataskydd</li>
                <li>Incidenthanteringsprocesser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Barn och ungdomar</h2>
              <p>
                Vi behandlar särskilt försiktigt personuppgifter från personer under 18 år. 
                För vissa behandlingar kan vi kräva vårdnadshavares samtycke enligt svensk lag.
              </p>
              <p>
                Vi samlar aldrig medvetet in personuppgifter från barn under 13 år utan 
                föräldrarnas uttryckliga samtycke.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Ändringar av integritetspolicyn</h2>
              <p>
                Vi kan uppdatera denna integritetspolicy från tid till annan. Väsentliga ändringar 
                kommer att meddelas via e-post eller på vår webbplats minst 30 dagar innan de träder i kraft.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Klagomål</h2>
              <p>
                Om du har klagomål om vår behandling av dina personuppgifter kan du kontakta:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Integritetsskyddsmyndigheten (IMY)</strong></p>
                <p>Box 8114, 104 20 Stockholm</p>
                <p>Telefon: 08-657 61 00</p>
                <p>E-post: imy@imy.se</p>
                <p>Webbplats: www.imy.se</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Kontakt</h2>
              <p>
                Om du har frågor om denna integritetspolicy eller vår behandling av personuppgifter:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Albyrådet - Dataskyddsombud</strong></p>
                <p>E-post: kontakt@albyradet.se</p>
                <p>Telefon: 072-310 99 58</p>
                <p>Adress: Alhagsvägen 42, tr 5, 145 59 Norsborg</p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
