import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Våra Sponsorer - Albyrådet",
  description: "Lär dig mer om Albyrådets fantastiska sponsorer som stödjer vårt arbete för trygghet, gemenskap och positiv utveckling i Alby, Botkyrka.",
  keywords: ["Alby", "Albyrådet", "sponsorer", "Botkyrka Kommun", "Stiftelsen Mitt Alby", "Svenska Postkodlotteriet", "Gålöstiftelsen", "partners"],
}

export default function SponsorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
