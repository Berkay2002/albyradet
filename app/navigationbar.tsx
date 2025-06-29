"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, ChevronDown } from "lucide-react";
import React from "react";

const navItems = [
  { name: "Hem", href: "/" },
  { name: "Våra Projekt", href: "/projekt" },
  { name: "Sponsorer", href: "/sponsorer" },
  { name: "Kontakta Oss", href: "/kontakta-oss" },
  { name: "Bli Medlem", href: "/bli-medlem" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const pathname = usePathname();
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeSheet = () => setIsOpen(false);
  // Get the appropriate logo based on theme with fallback
  const logoSrc = !mounted 
    ? "/logo/Albyradet-vit-text.png" // Default to dark theme logo during SSR
    : theme === 'dark' 
    ? "/logo/Albyradet-vit-text.png" 
    : "/logo/Albyradet-svart-text.png";
  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm border-border/10" 
          : "bg-background/80",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">        
        <Link href="/" className="flex items-center h-full py-2" onClick={closeSheet}>
          <Image
            src={logoSrc}
            alt="Albyrådet"
            width={180}
            height={50}
            className="h-full w-auto max-h-10 object-contain transition-transform hover:scale-105"
            priority
          />
        </Link>
          {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          <nav
            className="flex items-center space-x-1"
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
          <ThemeToggle />
        </div>        {/* Mobile & Tablet Navigation */}
        <div className="lg:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" aria-label="Open menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-xs sm:max-w-sm p-0 focus:outline-none" aria-label="Mobile navigation menu">
              <div className="flex flex-col h-full">                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center space-x-2" onClick={closeSheet} tabIndex={0} aria-label="Go to homepage">
                    <Image
                      src={logoSrc}
                      alt="Albyrådet"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div><div className="flex-1 p-4 space-y-1">
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
                
                {/* Theme toggle at bottom of mobile menu */}
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Tema</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
