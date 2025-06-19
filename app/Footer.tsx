"use client";

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);
  // Get the appropriate logo based on theme with fallback
  const logoSrc = !mounted 
    ? "/logo/Vit transparant.png" // Default to dark theme logo during SSR
    : theme === 'dark' 
    ? "/logo/Vit transparant.png" 
    : "/logo/Svart transparant.png";

  return (
    <footer className="bg-muted/30 border-border py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-12 lg:gap-20">
          {/* Logo and Social Media Section */}          <div className="flex flex-col items-center justify-center mb-8 md:mb-0">
            <div className="relative w-56 h-20 sm:w-64 sm:h-24">
              <div className="h-full w-full">
                <Image
                  src={logoSrc}
                  alt="Albyrådet Logo"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, 600px"
                  priority
                />
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 ml-1">
              <Link
                href="https://www.facebook.com/people/Albyr%C3%A5det/100081907873482/"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={24} aria-hidden="true" />
              </Link>
              <Link
                href="https://www.instagram.com/albyradet/"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={24} aria-hidden="true" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/albyr%C3%A5det/"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} aria-hidden="true" />
              </Link>            </div>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col justify-center text-center md:text-left text-sm md:text-base">
            <h3 className="text-xl font-semibold mb-4 text-primary">Kontakt</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column - Organization & Address */}
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-base text-foreground mb-1">Albyrådet</p>
                  <p className="text-xs text-muted-foreground">Ideell förening</p>
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-foreground text-sm">Besöksadress:</p>
                  <div className="text-muted-foreground text-sm">
                    <p>Alhagsvägen 42, tr 5</p>
                    <p>145 59 Norsborg</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Details */}
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">E-post:</p>
                  <Link
                    href="mailto:kontakt@albyradet.se"
                    className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded text-sm"
                    aria-label="Email kontakt@albyradet.se"
                  >
                    kontakt@albyradet.se
                  </Link>
                </div>                <div>
                  <p className="font-medium text-foreground text-sm mb-1">Organisationsnummer:</p>
                  <p className="text-muted-foreground text-sm">802513-0421</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
