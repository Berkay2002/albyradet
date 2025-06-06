"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import React from "react";

const navItems = [
  { name: "Hem", href: "/" },
  { name: "Våra Projekt", href: "/projekt" },
  { name: "Kontakta Oss", href: "/kontakta-oss" },
  { name: "Bli Medlem", href: "/bli-medlem" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSheet = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm border-border/10" 
          : "bg-background/80"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center h-full py-2" onClick={closeSheet}>
          <Image
            src="/logo/Albyradet-vit-text.png"
            alt="Albyrådet"
            width={180}
            height={50}
            className="h-full w-auto max-h-10 object-contain transition-transform hover:scale-105"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center space-x-1"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "text-sm font-medium transition-all duration-200 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                pathname === item.href 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/80 hover:text-primary hover:bg-accent/50"
              )}
            >
              <Link href={item.href} tabIndex={0} aria-current={pathname === item.href ? "page" : undefined}>
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile & Tablet Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" aria-label="Open menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-xs sm:max-w-sm p-0 focus:outline-none" aria-label="Mobile navigation menu">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center space-x-2" onClick={closeSheet} tabIndex={0} aria-label="Go to homepage">
                    <Image
                      src="/logo.png"
                      alt="Alby Rådet"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
                <div className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      asChild
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-base h-14 px-4 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                      )}
                      onClick={closeSheet}
                    >
                      <Link href={item.href} tabIndex={0} aria-current={pathname === item.href ? "page" : undefined}>
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
