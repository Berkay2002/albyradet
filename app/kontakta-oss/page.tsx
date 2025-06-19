"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Send, CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import Head from 'next/head';
import TeamSection from '@/components/TeamSection';

interface Member {
  id: number;
  name: string;
  role: string;
  email: string;
  image: string;
  description: string;
}

const members: Member[] = [
  {
    id: 1,
    name: 'Muhammet Tozak',
    role: 'Ordförande',
    email: 'Muhammet@albyradet.se',
    image: '/sektionen/tozak.jpg',
    description: 'Ordförande',
  },
  {
    id: 2,
    name: 'Anahit Tovmasyan',
    role: 'Vice ordförande',
    email: 'Anahit@albyradet.se',
    image: '/sektionen/nr4.jpg',
    description: 'Vice ordförande',
  },
  {
    id: 3,
    name: 'Jessica Mwaura',
    role: 'PR-ansvarig',
    email: 'Jessica@albyradet.se',
    image: '/sektionen/nr3.jpg',
    description: 'PR-ansvarig',
  },
  {
    id: 4,
    name: 'Sara Dhahri',
    role: 'Styrelseledamot',
    email: 'Sara@albyradet.se',
    image: '/sektionen/nr2.jpg',
    description: 'Styrelseledamot',
  },
  {
    id: 5,
    name: 'Jalil Saleem',
    role: 'Styrelseledamot',
    email: 'Jalil@albyradet.se',
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [lastSubmission, setLastSubmission] = useState<number>(0);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Namn är obligatoriskt';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-post är obligatoriskt';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer är obligatoriskt';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Meddelande är obligatoriskt';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Prevent submissions within 3 seconds of each other
    const now = Date.now();
    if (now - lastSubmission < 3000) {
      return;
    }
    
    setIsSubmitting(true);
    setLastSubmission(now);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ett oväntat fel uppstod. Vänligen försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (    <div className="min-h-screen bg-background flex flex-col">
      <Head>
        <title>Kontakta Oss - Albyrådet</title>
        <meta name="description" content="Har du frågor eller vill komma i kontakt med Albyrådet? Kontakta oss här eller träffa vårt team." />
      </Head>
        <main className="flex-1 relative">
        <div className="relative h-auto md:h-auto">
          {/* Orange to black gradient for mobile, image for md+ */}
          <div className="block md:hidden absolute inset-0 -z-10 bg-gradient-to-b from-orange-400 via-orange-700 to-black" />
          <div className="hidden md:block absolute inset-0 -z-10">
            <Image
              src="/sektionen/styrelsen-16to9-ratio.jpeg"
              alt="Albyrådet team"
              fill
              priority
              quality={100}
              className="object-cover object-top"
              style={{ objectPosition: '0 15%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />
          </div>
        </div>
        {/* Hero Section */}
        <div className="relative">
          <div className="container mx-auto px-4 py-8 md:py-24 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground [text-shadow:_0_2px_8px_rgba(0,0,0,0.3)]">
                Kontakta Oss
              </h1>
              <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto [text-shadow:_0_1px_4px_rgba(0,0,0,0.2)]">
                Har du några frågor eller funderingar? Vi är här för att hjälpa dig. Kontakta oss genom formuläret nedan eller direkt via våra kontaktuppgifter.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Form and Info Section */}
        <section className="relative py-16 md:py-24 bg-transparent z-10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-alby-gray-dark/90 rounded-2xl shadow-md p-6 sm:p-8 border border-alby-orange-muted/10 w-full lg:w-1/2 flex-1"
              >
                <h2 className="text-2xl font-bold mb-2 text-foreground">Skicka oss ett meddelande</h2>
                <p className="text-muted-foreground mb-8">
                  Fyll i formuläret nedan så hör vi av oss så snart som möjligt.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Tack för ditt meddelande!</h3>
                    <p className="text-muted-foreground">Vi kommer att kontakta dig snart.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Namn *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={cn(
                            "w-full",
                            errors.name && "border-alby-red focus:border-alby-red"
                          )}
                          placeholder="Ditt fullständiga namn"
                        />
                        {errors.name && (
                          <p className="text-alby-red text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Telefonnummer *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={cn(
                            "w-full",
                            errors.phone && "border-alby-red focus:border-alby-red"
                          )}
                          placeholder="Ditt telefonnummer"
                        />
                        {errors.phone && (
                          <p className="text-alby-red text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        E-postadress *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={cn(
                          "w-full",
                          errors.email && "border-alby-red focus:border-alby-red"
                        )}
                        placeholder="din.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-alby-red text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Meddelande *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={cn(
                          "w-full min-h-[120px] resize-none",
                          errors.message && "border-alby-red focus:border-alby-red"
                        )}
                        placeholder="Skriv ditt meddelande här..."
                      />
                      {errors.message && (
                        <p className="text-alby-red text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Skickar...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Skicka meddelande
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
 
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex-1"
              >
                <div className="bg-alby-gray-dark/90 rounded-2xl shadow-md p-6 sm:p-8 border border-alby-orange-muted/10 h-full">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Kontaktinformation</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">E-post</h3>
                        <Link 
                          href="mailto:kontakt@albyradet.se"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          kontakt@albyradet.se
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Adress</h3>
                        <div className="text-muted-foreground">
                          <p>Albyrådet</p>
                          <p>Alhagsvägen 42, tr 5</p>
                          <p>145 59 Norsborg</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Organisationsnummer</h3>
                        <p className="text-muted-foreground">802513-0421</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-8 pt-6 border-t border-border/20">
                    <h3 className="font-semibold text-foreground mb-4">Följ oss</h3>                    <div className="flex gap-4">
                      <Link
                        href="https://www.facebook.com/people/Albyr%C3%A5det/100081907873482/"
                        className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/albyradet/"
                        className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/company/albyr%C3%A5det/"
                        className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Gradient overlay for smooth transition to TeamSection */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-b from-transparent to-alby-beige-subtle/50 dark:to-muted/50 z-20" />
        </section>

      </main>
      <TeamSection members={members} />
      
    </div>
  );
}

export default ContactPage;