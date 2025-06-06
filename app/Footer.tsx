import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-alby-gray-darker text-alby-gray-light py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-12 lg:gap-20">
          {/* Logo and Social Media Section */}
          <div className="flex flex-col items-center justify-center mb-8 md:mb-0">
            <div className="relative w-48 h-16 sm:w-64 sm:h-24">
              <div className="h-full w-full">
                <Image
                  src="/logo/Vit transparant.png"
                  alt="Albyrådet Logo"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 300px, 600px"
                  priority
                />
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 ml-1">
              <Link
                href="#"
                className="p-2 rounded-full bg-alby-gray-dark hover:bg-alby-orange transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-alby-orange focus-visible:ring-offset-2"
                aria-label="Facebook"
              >
                <Facebook size={24} aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-alby-gray-dark hover:bg-alby-orange transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-alby-orange focus-visible:ring-offset-2"
                aria-label="Instagram"
              >
                <Instagram size={24} aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-alby-gray-dark hover:bg-alby-orange transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-alby-orange focus-visible:ring-offset-2"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center text-center md:text-left text-sm md:text-base gap-2">
            <h3 className="text-xl font-medium mb-3 text-alby-orange">Kontakt</h3>
            <div className="space-y-1 text-alby-gray-light">
              <p>Org-nummer: 802513-0421</p>
              <p className="font-medium text-alby-gray-light">Albyrådet</p>
              <p>Alhagsvägen 42, tr 5</p>
              <p>145 59 Norsborg</p>
              <Link
                href="mailto:kontakt@albyradet.se"
                className="inline-block mt-2 text-alby-orange hover:text-alby-orange-light transition-colors duration-200 hover:underline focus-visible:ring-2 focus-visible:ring-alby-orange focus-visible:ring-offset-2"
                aria-label="Email kontakt@albyradet.se"
              >
                kontakt@albyradet.se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
