import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Användarvillkor",
  description: "Användarvillkor för Albyrådet - läs våra regler och villkor för användning av vår plattform och tjänster.",
  openGraph: {
    title: "Användarvillkor - Albyrådet",
    description: "Användarvillkor för Albyrådet - läs våra regler och villkor för användning av vår plattform och tjänster.",
  },
};

export default function TermsOfService() {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Användarvillkor
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Senast uppdaterad: 19 juni 2025
            </p>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Allmänna villkor</h2>              <p>
                Välkommen till Albyrådet! Dessa användarvillkor (&quot;Villkor&quot;) reglerar din användning av 
                vår webbplats, app och relaterade tjänster (&quot;Tjänsterna&quot;) som tillhandahålls av Albyrådet, 
                en ideell ungdomsorganisation registrerad i Sverige.
              </p>
              <p>
                Genom att använda våra Tjänster accepterar du att vara bunden av dessa Villkor. 
                Om du inte godkänner dessa Villkor, vänligen använd inte våra Tjänster.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Beskrivning av tjänsten</h2>              <p>
                Albyrådet är en ideell ungdomsorganisation i Botkyrka som arbetar för att 
                motverka kriminalitet, mobbning och diskriminering. Våra Tjänster inkluderar:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Information om våra projekt och initiativ</li>
                <li>Medlemskap och engagemang möjligheter</li>
                <li>Kontaktformulär och kommunikation</li>
                <li>Event och aktivitetsuppdateringar</li>
                <li>Sociala mediaintegrationer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Användaransvar</h2>
              <p>Som användare av våra Tjänster åtar du dig att:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Använda Tjänsterna endast för lagliga ändamål</li>
                <li>Inte störa eller skada Tjänsterna</li>
                <li>Inte försöka få obehörig åtkomst till våra system</li>
                <li>Respektera andra användares rättigheter och integritet</li>
                <li>Följa alla tillämpliga lagar och förordningar</li>
                <li>Inte sprida skadligt eller olagligt innehåll</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Personuppgifter och integritet</h2>              <p>
                Din integritet är viktig för oss. Vår hantering av personuppgifter regleras av vår 
                integritetspolicy, som är en del av dessa Villkor.
              </p>
              <p>
                För användare under 18 år krävs vårdnadshavares samtycke för vissa funktioner 
                och databehandling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Innehåll och immateriella rättigheter</h2>
              <p>
                Allt innehåll på våra Tjänster, inklusive text, bilder, logotyper, och design, 
                ägs av Albyrådet eller våra licensgivare och skyddas av upphovsrättslagar.
              </p>
              <p>
                Du får använda vårt innehåll för personliga, icke-kommersiella ändamål. 
                All annan användning kräver skriftligt tillstånd från oss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Ansvarsbegränsning</h2>              <p>
                Albyrådet tillhandahåller Tjänsterna &quot;som de är&quot; utan garantier av något slag. 
                Vi ansvarar inte för:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Avbrott eller fel i Tjänsterna</li>
                <li>Förlust av data eller information</li>
                <li>Indirekta eller följdskador</li>
                <li>Innehåll från tredje part</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Uppsägning</h2>
              <p>
                Vi förbehåller oss rätten att när som helst avbryta eller begränsa din åtkomst 
                till våra Tjänster om du bryter mot dessa Villkor.
              </p>              <p>
                Du kan när som helst sluta använda våra Tjänster. Om du vill radera dina personuppgifter, 
                kontakta oss på kontakt@albyradet.se.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Ändringar av villkoren</h2>
              <p>
                Vi kan uppdatera dessa Villkor från tid till annan. Väsentliga ändringar kommer 
                att meddelas via vår webbplats eller e-post. Fortsatt användning av Tjänsterna 
                efter ändringar innebär att du accepterar de nya Villkoren.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Tillämplig lag</h2>
              <p>
                Dessa Villkor regleras av svensk lag. Eventuella tvister ska avgöras av svensk domstol.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Kontaktinformation</h2>
              <p>
                Om du har frågor om dessa Användarvillkor, kontakta oss:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Albyrådet</strong></p>
                <p>Alhagsvägen 42, tr 5</p>
                <p>145 59 Norsborg, Sverige</p>
                <p>E-post: kontakt@albyradet.se</p>
                <p>Telefon: 072-310 99 58</p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
