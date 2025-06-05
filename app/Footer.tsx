import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-alby-gray-darker text-alby-gray-light py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
          {/* Logo and Social Media Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-24">
              <div className="h-full w-full">
                <Image
                  src="/logo/Vit transparant.png"
                  alt="Albyrådet Logo"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 600px, 800px"
                  priority
                />
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 ml-1">
              <Link
                href="#"
                className="p-2 rounded-full bg-alby-gray-dark hover:bg-alby-orange transition-colors duration-200"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-alby-gray-dark hover:bg-alby-orange transition-colors duration-200"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-alby-gray-dark hover:bg-alby-orange transition-colors duration-200"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center text-center md:text-left text-sm md:text-base">
            <h3 className="text-xl font-medium mb-3 text-alby-orange">Kontakt</h3>
            <div className="space-y-1 text-alby-gray-light">
              <p>Org-nummer: 802513-0421</p>
              <p className="font-medium text-alby-gray-light">Albyrådet</p>
              <p>Alhagsvägen 42, tr 5</p>
              <p>145 59 Norsborg</p>
              <Link
                href="mailto:kontakt@albyradet.se"
                className="inline-block mt-2 text-alby-orange hover:text-alby-orange-light transition-colors duration-200 hover:underline"
              >
                kontakt@albyradet.se
              </Link>
            </div>
          </div>
        </div>

        {/* Optional bottom border or copyright section */}
        <div className="mt-8 pt-6 border-t border-alby-gray-dark text-center text-sm text-alby-gray-light">
          <p>&copy; 2024 Albyrådet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
