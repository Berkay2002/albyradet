import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"
import NavBar from "./NavBar"
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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
          <NavBar />
          <main className="flex-1 pt-16">{/* pt-16 for fixed NavBar height */}
            {children}
          </main>
          <div className="h-12 md:h-16 w-full bg-gradient-to-b from-muted/50 via-background to-alby-gray-darker" />

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
