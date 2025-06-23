"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

const sponsors = [  {
    name: "Botkyrka Kommun",
    description: "Botkyrka Kommun är vår huvudpartner som stödjer vårt arbete för ungdomarna i kommunen.",
    logo: {
      light: "/sponsor-logo/botkyrka-kommun-logo-original.png",
      dark: "/sponsor-logo/botkyrka-kommun-logo-original-white.png"
    },
    website: "https://www.botkyrka.se",
    category: "Kommunal partner"
  },
  {
    name: "Svenska Postkodlotteriet Stiftelse",
    description: "Svenska Postkodlotteriet stödjer ideella organisationer som arbetar för en bättre värld.",
    logo: {
      light: "/sponsor-logo/svenska-postkod-lotteriet-logo.png",
      dark: "/sponsor-logo/svenska-postkod-lotteriet-logo.png"
    },
    website: "https://www.postkodlotteriet.se",
    category: "Nationell stiftelse"
  },
  {
    name: "Gålöstiftelsen",
    description: "Gålöstiftelsen stödjer ungdomsverksamhet och sociala projekt i Sverige.",
    logo: {
      light: "/sponsor-logo/gålöstiftelsen-black-logo.png",
      dark: "/sponsor-logo/galostiftelsen-logo-vit.png"
    },
    website: "https://www.galostiftelsen.se",
    category: "Privat stiftelse"
  },
  {
    name: "Stiftelsen Mitt Alby",
    description: "Mitt Alby är en stiftelse som är verksam i Botkyrka med fokus för personer i Botkyrka. Vi arbetar för att främja och bidra till en positiv hållbar utveckling i Botkyrka kommun och i Alby i synnerhet.",
    logo: {
      light: "/sponsor-logo/mittalby-svart.png",
      dark: "/sponsor-logo/mittalby.png"
    },
    website: "https://www.stiftelsenmittalby.se/",
    category: "Lokal stiftelse"
  }
]

export default function Sponsorer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getLogoSrc = (sponsor: typeof sponsors[0]) => {
    if (!sponsor.logo) return null
    if (!mounted) return sponsor.logo.light // Default to light during SSR
    return theme === 'dark' ? sponsor.logo.dark : sponsor.logo.light
  }

  return (
    <div className="min-h-screen bg-background">      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/sektionen/sektionenImage.jpeg"
          alt="Albyrådet - Våra Sponsorer"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 dark:from-black/60 dark:via-black/70 dark:to-black/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white drop-shadow-2xl tracking-tight">
            Våra Sponsorer
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-12 drop-shadow-lg font-light leading-relaxed">
            Tack för ert stöd som gör vårt arbete möjligt
          </p>
          <div className="animate-bounce">
            <div className="w-8 h-8 border-2 border-white rounded-full mx-auto opacity-70"></div>
          </div>
        </div>
      </section>      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Introduction */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              Våra Partners för Förändring
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Albyrådet är stolt över att samarbeta med fantastiska organisationer som delar vår vision 
              om en tryggare och mer inkluderande framtid för Alby och hela Botkyrka kommun.
            </p>
          </div>          {/* Sponsors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {sponsors.map((sponsor, index) => (
              <Card key={sponsor.name} className="group hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm hover:bg-card/95 transform hover:-translate-y-2 hover:scale-[1.02]">
                <CardHeader className="text-center p-8">
                  <div className="flex justify-center mb-6">
                    <div className="relative w-64 h-32 flex items-center justify-center bg-transparent rounded-2xl p-6 group-hover:scale-110 transition-transform duration-500">
                      {sponsor.logo ? (
                        <Image
                          src={getLogoSrc(sponsor)!}
                          alt={`${sponsor.name} logotyp`}
                          fill
                          className="object-contain p-2 filter group-hover:brightness-110 transition-all duration-300"
                        />
                      ) : (
                        <div className="text-3xl font-bold text-gray-400 text-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 w-full h-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-300">
                          {sponsor.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-4 px-4 py-2 text-sm font-medium group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300">
                    {sponsor.category}
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                    {sponsor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6 px-8 pb-8">
                  <CardDescription className="text-lg md:text-xl leading-relaxed font-light text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                    {sponsor.description}
                  </CardDescription>
                  
                  {sponsor.website !== "#" && (
                    <Link 
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-lg text-primary hover:text-primary/80 transition-all duration-300 font-medium group/link bg-primary/10 hover:bg-primary/20 px-6 py-3 rounded-full border border-primary/20 hover:border-primary/40 hover:shadow-lg transform hover:scale-105"
                    >
                      Besök webbplats
                      <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>          {/* Partnership Section */}
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/15 to-primary/5 border-primary/30 shadow-2xl backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            <CardContent className="relative text-center py-16 px-8 space-y-8">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
                Vill du stödja vårt arbete?
              </h3>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Albyrådet söker alltid efter nya partners som vill vara med och göra skillnad. 
                Tillsammans kan vi skapa positiv förändring för ungdomarna i Alby och hela Botkyrka kommun.
              </p>              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link 
                  href="/kontakta-oss"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                >
                  Kontakta oss
                </Link>
                <Link 
                  href="/projekt"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-2xl hover:bg-primary/10 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                >
                  Se våra projekt
                </Link>
                {/* Commented out until om-oss page is ready for production */}
                {/* <Link 
                  href="/om-oss"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-2xl hover:bg-primary/10 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                >
                  Läs mer om oss
                </Link> */}
              </div>
            </CardContent>
          </Card>          {/* Thank You Section */}
          <div className="text-center space-y-6 py-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Ett stort tack!
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Utan våra sponsorers stöd skulle Albyrådet inte kunna genomföra alla de fantastiska 
              projekt som gör skillnad för ungdomarna i vår kommun. Tack för att ni tror på vår vision!
            </p>
            <div className="flex justify-center pt-6">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
