import { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Om Albyrådet - Albys ungdomsorganisation",
  description: "Lär dig mer om Albyrådet, Albys ledande ungdomsorganisation. Vi arbetar för trygghet, gemenskap och positiv utveckling i Alby, Botkyrka.",
  keywords: ["Alby", "Albyrådet", "om oss", "Alby ungdomar", "Alby historia", "Alby community", "Botkyrka", "ungdomsorganisation"],
}

export default function OmOss() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/sektionen/sektionenImage.jpeg"
          alt="Albyrådet - Om oss"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Om Albyrådet
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
            Albys röst för förändring sedan 2015
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Vår Historia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">Vår Historia i Alby</CardTitle>
              <CardDescription className="text-lg">
                Från Alby till hela Botkyrka - en resa som började för snart ett decennium sedan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Albyrådet grundades 2015 av ett tiotal engagerade ungdomar från Alby som ville göra skillnad i sin hemort. 
                Vi såg behoven i vårt område och bestämde oss för att vara en del av lösningen. Sedan dess har vi vuxit till 
                att bli Albys ledande ungdomsorganisation.
              </p>
              <p className="text-lg leading-relaxed">
                Vårt arbete fokuserar på att skapa trygghet och gemenskap i Alby och omgivande områden i Botkyrka kommun. 
                Vi tror på kraften hos unga människor att förändra sin egen framtid och sin omgivning.
              </p>
            </CardContent>
          </Card>

          {/* Vad vi gör */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">Vårt Arbete i Alby</CardTitle>
              <CardDescription className="text-lg">
                Konkreta insatser för en tryggare och bättre Alby
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Förebyggande arbete</h3>
                  <p>Vi arbetar aktivt för att förebygga kriminalitet, mobbning och diskriminering i Alby genom olika projekt och aktiviteter.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Workshops</Badge>
                    <Badge variant="secondary">Mentorskap</Badge>
                    <Badge variant="secondary">Utbildning</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Community building</h3>
                  <p>Vi skapar mötesplatser och aktiviteter som stärker gemenskapen mellan Albys invånare och bygger broar mellan olika grupper.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Events</Badge>
                    <Badge variant="secondary">Sportaktiviteter</Badge>
                    <Badge variant="secondary">Kulturella aktiviteter</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vår Vision för Alby */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">Vår Vision för Alby</CardTitle>
              <CardDescription className="text-lg">
                Ett Alby där alla ungdomar kan växa och blomstra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Vi ser ett Alby där varje ung person har möjlighet att nå sin fulla potential. Ett område där trygghet, 
                respekt och gemenskap är grundpelarna. Vi arbetar för att Alby ska vara en plats som invånarna är stolta över 
                och där nästa generation kan bygga sina drömmar.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Trygghet</h4>
                  <p className="text-sm">Ett Alby där alla känner sig säkra</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Gemenskap</h4>
                  <p className="text-sm">Starka band mellan Albys invånare</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Utveckling</h4>
                  <p className="text-sm">Möjligheter för alla att växa</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kontakt */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">Gör Skillnad i Alby</CardTitle>
              <CardDescription className="text-lg">
                Bli en del av förändringen i Alby
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">
                Vill du vara med och skapa positiv förändring i Alby? Vi söker alltid engagerade ungdomar som vill göra skillnad 
                i sin hemort. Tillsammans kan vi bygga det Alby vi alla vill se.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/bli-medlem" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Bli medlem
                </a>
                <a 
                  href="/kontakta-oss" 
                  className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  Kontakta oss
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
