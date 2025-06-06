'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TeamSection from '@/components/TeamSection';

// Import icons
import { 
  Shield as SecurityIcon,
  Gavel as GavelIcon,
  Lightbulb as LightbulbIcon,
  Users as GroupIcon,
  Mail as MailIcon,
  ArrowRight as ArrowRightIcon,
  Play as PlayIcon
} from 'lucide-react';

// Custom hook for responsive design
const useResponsive = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width < 1024);
        setIsDesktop(width >= 1024);
      };

      // Initial check
      checkScreenSize();

      // Add event listener for window resize
      window.addEventListener('resize', checkScreenSize);

      // Clean up
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  return { isMobile, isTablet, isDesktop };
};

// Type definitions
interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  email?: string;
}

interface FeatureCardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

// FeatureCard component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  // Create a properly typed icon element with the correct props
  const IconWithProps = React.cloneElement(icon, { 
    className: 'w-10 h-10 text-primary',
    'aria-hidden': true
  });
  
  return (
    <Card className="h-full transition-transform duration-300 md:hover:scale-105 md:hover:shadow-md md:focus-within:scale-105 md:focus-within:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-center">
          {IconWithProps}
        </div>
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-foreground text-center">{title}</h3>
        <p className="text-muted-foreground text-center text-sm sm:text-base">{description}</p>
      </CardContent>
    </Card>
  );
};

// MemberCard component props
interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  description: string;
  email?: string;
}

// MemberCard component
const MemberCard: React.FC<MemberCardProps> = ({ name, role, image, description, email }) => (
  <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg border-border">
    <div className="relative h-64 overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
    <CardHeader className="border-t border-border">
      <CardTitle className="text-xl text-foreground">{name}</CardTitle>
      <CardDescription className="text-primary">{role}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{description}</p>
      {email && (
        <a 
          href={`mailto:${email}`} 
          className="text-primary hover:underline flex items-center transition-colors"
        >
          Kontakta mig <MailIcon className="ml-2 h-4 w-4" />
        </a>
      )}
    </CardContent>
  </Card>
);

const members: Member[] = [
  {
    id: 1,
    name: 'Muhammet Tozak',
    role: 'Ordförande',
    image: '/sektionen/tozak.jpg',
    description: 'Ordförande',
  },
  {
    id: 2,
    name: 'Anahit Tovmasyan',
    role: 'Vice ordförande',
    image: '/sektionen/nr4.jpg',
    description: 'Vice ordförande',
  },
  {
    id: 3,
    name: 'Jessica Mwaura',
    role: 'PR-ansvarig',
    image: '/sektionen/nr3.jpg',
    description: 'PR-ansvarig',
  },
  {
    id: 4,
    name: 'Sara Dhahri',
    role: 'Styrelseledamot',
    image: '/sektionen/nr2.jpg',
    description: 'Styrelseledamot',
  },
  {
    id: 5,
    name: 'Jalil Saleem',
    role: 'Styrelseledamot',
    image: '/sektionen/nr5.jpg',
    description: 'Styrelseledamot',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function HomePage() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const features = [
    {
      icon: <SecurityIcon aria-hidden="true" />,
      title: 'Säkerhet',
      description: 'Skapa en trygg och säker miljö för ungdomar'
    },
    {
      icon: <GavelIcon aria-hidden="true" />,
      title: 'Rättssäkerhet',
      description: 'Motverka kriminalitet, mobbning och diskriminering'
    },
    {
      icon: <LightbulbIcon aria-hidden="true" />,
      title: 'Innovation',
      description: 'Stimulera kreativitet och ledarskap bland unga'
    },
    {
      icon: <GroupIcon aria-hidden="true" />,
      title: 'Samarbete',
      description: 'Främja inkludering och gemenskap'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-foreground overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/montage480.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-full">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/logo/Vit transparant-header.png"
                alt="Alby Rådet Logo"
                width={isMobile ? 120 : 300}
                height={isMobile ? 120 : 300}
                className="w-auto h-auto"
                priority
              />
            </div>
            {/* Tagline */}
            <motion.h1 
              className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 ${isMobile ? 'text-4xl' : 'text-6xl'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Av unga, för unga
            </motion.h1>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-xs sm:max-w-none mx-auto justify-center items-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" aria-label="Kontakta oss">
                <Link href="/contact" className="flex items-center justify-center">
                  Kontakta oss <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-foreground border-foreground hover:bg-foreground/10 text-lg w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" aria-label="Läs mer om oss">
                <Link href="/about" className="flex items-center justify-center">
                  Läs mer om oss
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 md:h-8 w-full bg-gradient-to-b from-background via-alby-gray-darker to-muted/50" />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Vilka vi är</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Albyrådet grundades för snart ett decennium sedan av ett tiotal ungdomar från Alby. Sedan dess har Albyrådet varit en plattform för ungdomar som engagerar sig i föreningen med ändamålet att motverka, förebygga och stoppa all form av kriminalitet, mobbning samt diskriminering.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              För att uppnå våra mål har vi utvecklat olika projektkoncept som vi genomfört eller än idag fortsätter bedriva.
            </p>
          </div>
        </div>
      </section>

      <div className="h-8 md:h-16 w-full bg-gradient-to-b from-muted/50 via-alby-gray-darker to-background" />



      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-foreground">Våra fokusområden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard 
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-8 md:h-16 w-full bg-gradient-to-b from-background via-alby-gray-darker to-muted/50" />

      {/* Team Section */}
      <TeamSection members={members} />

    </div>
  );
}

export default function Home() {
  return (
    <HomePage />
  );
}
