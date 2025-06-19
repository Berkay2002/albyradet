import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Shield, Trash2, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Juridisk information",
  description: "Juridisk information för Albyrådet - våra användarvillkor, integritetspolicy och information om dataradering.",
  openGraph: {
    title: "Juridisk information - Albyrådet",
    description: "Juridisk information för Albyrådet - våra användarvillkor, integritetspolicy och information om dataradering.",
  },
};

export default function LegalPage() {
  return (
    <Container className="py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Juridisk information</h1>
          <p className="text-xl text-muted-foreground">
            Läs våra policyer och villkor för att förstå hur vi arbetar med din integritet och våra tjänster
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Terms of Service Card */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Användarvillkor</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <div>
                <p className="text-muted-foreground mb-4">
                  Våra regler och villkor för användning av Albyrådet plattform och tjänster. 
                  Läs igenom dessa för att förstå dina rättigheter och skyldigheter.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                  <li>• Användaransvar och rättigheter</li>
                  <li>• Tjänstebeskrivning</li>
                  <li>• Immateriella rättigheter</li>
                  <li>• Ansvarsbegränsningar</li>
                </ul>
              </div>
              <Link href="/terms-of-service">
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Läs användarvillkor
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Privacy Policy Card */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Integritetspolicy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <div>
                <p className="text-muted-foreground mb-4">
                  Detaljerad information om hur vi samlar in, använder, lagrar och skyddar 
                  dina personuppgifter enligt GDPR.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                  <li>• Vilka data vi samlar in</li>
                  <li>• Hur vi använder dina uppgifter</li>
                  <li>• Dina rättigheter enligt GDPR</li>
                  <li>• Säkerhet och skydd</li>
                </ul>
              </div>
              <Link href="/privacy-policy">
                <Button className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Läs integritetspolicy
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Data Deletion Card */}
          <Card className="h-full md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Trash2 className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">Radera dina data</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <div>
                <p className="text-muted-foreground mb-4">
                  Din rätt att bli glömd enligt GDPR. Begär radering av alla dina 
                  personuppgifter från våra system.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                  <li>• Permanent dataradering</li>
                  <li>• Vad som raderas</li>
                  <li>• Process och tidsramar</li>
                  <li>• Alternativ till fullständig radering</li>
                </ul>
              </div>
              <Link href="/data-deletion">
                <Button className="w-full" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Radera mina data
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>

        {/* Additional Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Kontakt för juridiska frågor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Allmänna frågor</h3>
                <p className="text-muted-foreground mb-2">
                  För frågor om våra tjänster, medlemskap eller verksamhet:
                </p>
                <p className="text-sm">
                  <strong>E-post:</strong> kontakt@albyradet.se<br />
                  <strong>Telefon:</strong> 072-310 99 58
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dataskydd och integritet</h3>
                <p className="text-muted-foreground mb-2">
                  För frågor om personuppgifter, GDPR eller dataradering:
                </p>
                <p className="text-sm">
                  <strong>E-post:</strong> kontakt@albyradet.se<br />
                  <strong>Ämne:</strong> "Dataskydd" eller "GDPR"
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Tillsynsmyndighet:</strong> Om du inte är nöjd med vår hantering av dina personuppgifter 
                kan du lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY) på 
                <a href="https://www.imy.se" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  www.imy.se
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </Container>
  );
}
