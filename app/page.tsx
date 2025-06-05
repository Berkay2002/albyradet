'use client';

import React from 'react';
import ClientLayout from './ClientLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">
          {IconWithProps}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
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
      description: 'Vi prioriterar din säkerhet och integritet genom avancerade skyddsåtgärder och kontinuerlig övervakning.'
    },
    {
      icon: <GavelIcon aria-hidden="true" />,
      title: 'Rättssäkerhet',
      description: 'Våra lösningar bygger på en solid juridisk grund för att säkerställa långsiktig hållbarhet.'
    },
    {
      icon: <LightbulbIcon aria-hidden="true" />,
      title: 'Innovation',
      description: 'Vi kombinerar branschkunskap med ny teknik för att skapa banbrytande lösningar.'
    },
    {
      icon: <GroupIcon aria-hidden="true" />,
      title: 'Samarbete',
      description: 'Tillsammans med våra kunder utvecklar vi skräddarsydda lösningar som verkligen gör skillnad.'
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
                width={isMobile ? 150 : 300}
                height={isMobile ? 150 : 300}
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
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
                <Link href="/contact" className="flex items-center">
                  Kontakta oss <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-foreground border-foreground hover:bg-foreground/10 text-lg">
                <Link href="/about">
                  Läs mer om oss
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Våra fokusområden</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">Vårt Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <MemberCard 
                key={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
                description={member.description}
                email={member.email}
              />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Vill du vara med och göra skillnad?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/90">
            Gå med i vår förening och var en del av en positiv förändring i samhället.
          </p>
          <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg">
            <Link href="/join">
              Gå med nu <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <ClientLayout>
      <HomePage />
    </ClientLayout>
  );
}
