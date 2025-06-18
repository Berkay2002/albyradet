import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"
import Navigation from "./navigationbar"
import Footer from "./Footer"
import BackToTop from "@/components/BackToTop"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: {
    default: "Albyrådet - Av unga, för unga i Botkyrka",
    template: "%s | Albyrådet"
  },
  description: "Albyrådet - Av unga, för unga i Botkyrka. Vi arbetar för trygghet, gemenskap och positiv utveckling i din ort. Gör skillnad i Botkyrka - bli medlem idag!",
  keywords: ["Albyrådet", "Botkyrka", "ungdomar", "Alby", "Fittja", "Norsborg", "Hallunda", "Tumba", "ungdomsorganisation", "förebyggande", "trygghet", "gemenskap", "Stockholm", "Södertälje"],
  authors: [{ name: "Albyrådet" }],
  creator: "Albyrådet",
  publisher: "Albyrådet",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.albyradet.se'),  alternates: {
    canonical: '/',
  },  icons: {
    icon: '/favicon.ico',
    apple: [
      {
        url: '/logo/Svart transparant.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },  openGraph: {
    title: "Albyrådet - Av unga, för unga i Botkyrka",
    description: "Albyrådet - Av unga, för unga i Botkyrka. Vi arbetar för trygghet, gemenskap och positiv utveckling i din ort. Gör skillnad i Botkyrka!",
    url: '/',
    siteName: 'Albyrådet',
    images: [
      {
        url: '/logo/Albyradet-svart-text.png',
        width: 1200,
        height: 630,
        alt: 'Albyrådet Logo',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },  twitter: {
    card: 'summary_large_image',
    title: "Albyrådet - Av unga, för unga i Botkyrka",
    description: "Vi arbetar för trygghet, gemenskap och positiv utveckling i Botkyrka. Gör skillnad i din ort!",
    images: ['/logo/Albyradet-svart-text.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (    <html lang="sv" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://www.albyradet.se'} />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>        <Providers>
          <Navigation />
          <main className="flex-1 pt-16">{/* pt-16 for fixed Navigation height */}
            {children}
          </main>
          <div className="h-12 md:h-16 w-full bg-gradient-to-b from-alby-beige-subtle/70 via-alby-beige-soft/50 to-alby-beige/30 dark:from-muted/50 dark:via-muted/30 dark:to-muted/30" />

          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}
