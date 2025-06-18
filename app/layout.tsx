import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"
import Navigation from "./navigationbar"
import Footer from "./Footer"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: "Alby Rådet",
  description: "Alby Rådets officiella webbplats",
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
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
        <Providers>
          <Navigation />
          <main className="flex-1 pt-16">{/* pt-16 for fixed Navigation height */}
            {children}
          </main>
          <div className="h-12 md:h-16 w-full bg-gradient-to-b from-alby-beige-subtle/70 via-alby-beige-soft/50 to-alby-beige/30 dark:from-muted/50 dark:via-muted/30 dark:to-muted/30" />

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
