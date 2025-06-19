import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Radera dina data",
  description: "Begär radering av dina personuppgifter från Albyrådet. Vi respekterar din rätt att bli glömd enligt GDPR.",
  openGraph: {
    title: "Radera dina data - Albyrådet",
    description: "Begär radering av dina personuppgifter från Albyrådet. Vi respekterar din rätt att bli glömd enligt GDPR.",
  },
};

export default function DataDeletion() {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              Radera dina personuppgifter
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Vi respekterar din rätt till integritet och dataradering enligt GDPR
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      <strong>Din rätt till radering:</strong> Enligt GDPR (artikel 17) har du rätt att begära 
                      radering av dina personuppgifter under vissa omständigheter. Vi tar denna rätt på allvar 
                      och kommer att behandla din begäran inom 30 dagar.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Trash2 className="h-6 w-6 mr-2" />
                Vad betyder dataradering?
              </h2>
              <p className="text-muted-foreground mb-4">
                När du begär dataradering kommer vi att permanent ta bort dina personuppgifter från våra system, 
                inklusive:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kontaktinformation (namn, e-post, telefon)</li>
                <li>Medlemsuppgifter och profil</li>
                <li>Kommunikationshistorik</li>
                <li>Event-anmälningar och deltagande</li>
                <li>Nyhetsbrevsprenumerationer</li>
                <li>Cookies och spårningsdata</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Viktigt att veta innan du raderar
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">⚠️ Denna åtgärd kan inte ångras</h3>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Du kommer att förlora åtkomst till ditt medlemskap</li>
                  <li>Du kommer inte längre att få våra nyhetsbrev eller uppdateringar</li>
                  <li>Historik från events och aktiviteter kommer att raderas</li>
                  <li>Du måste registrera dig igen om du vill använda våra tjänster i framtiden</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Undantag från radering</h2>
              <p className="text-muted-foreground mb-4">
                Vi kan behöva behålla vissa uppgifter av rättsliga skäl:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Bokföringslagen:</strong> Ekonomiska transaktioner (7 år)</li>
                <li><strong>Rättsliga anspråk:</strong> Om det pågår en juridisk process</li>
                <li><strong>Säkerhet:</strong> Information som behövs för att förhindra missbruk</li>
                <li><strong>Arkivändamål:</strong> Anonymiserad statistik för vårt samhällsuppdrag</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2" />
                Så begär du radering
              </h2>
              <div className="bg-muted p-6 rounded-lg space-y-4">
                <h3 className="font-semibold">Skicka en e-post med följande information:</h3>
                <div className="bg-background p-4 rounded border">
                  <p><strong>Till:</strong> kontakt@albyradet.se</p>
                  <p><strong>Ämne:</strong> Begäran om dataradering - GDPR Artikel 17</p>
                  <p><strong>Innehåll:</strong></p>
                  <div className="mt-2 text-sm bg-muted p-3 rounded">
                    <p>Hej,</p>
                    <br />
                    <p>Jag begär härmed radering av alla mina personuppgifter enligt GDPR artikel 17 (rätten att bli glömd).</p>
                    <br />
                    <p><strong>Mina uppgifter:</strong></p>
                    <p>• Namn: [Ditt fullständiga namn]</p>
                    <p>• E-postadress: [Den e-post som är kopplad till ditt konto]</p>
                    <p>• Telefonnummer: [Om tillgängligt]</p>
                    <p>• Medlemsnummer: [Om du vet det]</p>
                    <br />
                    <p>Jag bekräftar att jag förstår att denna åtgärd är permanent och inte kan ångras.</p>
                    <br />
                    <p>Med vänliga hälsningar,<br />[Ditt namn]</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Vad händer efter din begäran?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold">Bekräftelse (inom 1-2 arbetsdagar)</h3>
                    <p className="text-sm text-muted-foreground">Vi skickar en bekräftelse på att vi mottagit din begäran</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold">Identitetsverifiering (inom 5 arbetsdagar)</h3>
                    <p className="text-sm text-muted-foreground">Vi kan behöva verifiera din identitet för säkerhets skull</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold">Genomförande (inom 30 dagar)</h3>
                    <p className="text-sm text-muted-foreground">Vi raderar dina data från alla våra system och bekräftar när det är klart</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Alternativ till fullständig radering</h2>
              <p className="text-muted-foreground mb-4">
                Om du inte vill radera alla dina data kan du istället:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Avsluta medlemskap:</strong> Behåll grundläggande kontaktinfo men avsluta aktivt medlemskap</li>
                <li><strong>Begränsa behandling:</strong> Vi "fryser" dina data men raderar dem inte</li>
                <li><strong>Uppdatera samtycken:</strong> Välj vilka typer av kommunikation du vill få</li>
                <li><strong>Exportera data:</strong> Få en kopia av dina data innan radering</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Kontakta oss på kontakt@albyradet.se för att diskutera dessa alternativ.
              </p>
            </section>

            <section className="text-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => window.location.href = 'mailto:kontakt@albyradet.se?subject=Begäran om dataradering - GDPR Artikel 17&body=Hej,%0A%0AJag begär härmed radering av alla mina personuppgifter enligt GDPR artikel 17 (rätten att bli glömd).%0A%0AMina uppgifter:%0A• Namn: [Ditt fullständiga namn]%0A• E-postadress: [Den e-post som är kopplad till ditt konto]%0A• Telefonnummer: [Om tillgängligt]%0A• Medlemsnummer: [Om du vet det]%0A%0AJag bekräftar att jag förstår att denna åtgärd är permanent och inte kan ångras.%0A%0AMed vänliga hälsningar,%0A[Ditt namn]'}
              >
                <Mail className="h-4 w-4 mr-2" />
                Skicka raderingsförfrågan
              </Button>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Har du frågor?</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="mb-2">
                  Om du har frågor om dataradering eller vill diskutera alternativ, kontakta vårt dataskyddsteam:
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>E-post:</strong> kontakt@albyradet.se</p>
                  <p><strong>Telefon:</strong> 072-310 99 58</p>
                  <p><strong>Adress:</strong> Alhagsvägen 42, tr 5, 145 59 Norsborg</p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Du har även rätt att klaga till Integritetsskyddsmyndigheten (IMY) om du inte är nöjd med vår hantering.
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
