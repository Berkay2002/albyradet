"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ArrowLeft, ArrowRight, Users, Star, Heart, CheckCircle, Send } from 'lucide-react';

const images = [
  '/sektionen/sektionenImage.jpeg',
  '/sektionen/sektionenImage.jpeg',
  '/sektionen/sektionenImage.jpeg',
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function BliMedlem() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const nextSlide = () => { setDirection('right'); setCurrent((prev) => (prev + 1) % images.length); };
  const prevSlide = () => { setDirection('left'); setCurrent((prev) => (prev - 1 + images.length) % images.length); };
  const variants = {
    enter: (direction: 'left' | 'right') => ({ x: direction === 'right' ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: 'left' | 'right') => ({ x: direction === 'right' ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-primary/5 to-background/50">
        <Image
          src="/sektionen/styrelsen1-16to9-ratio.jpeg"
          alt="Bli medlem hero"
          fill
          priority
          className="object-cover object-center"
        />        <div className="absolute inset-0 bg-white/10 dark:bg-black/70" />
        {/* Strong gradient overlay for smooth transition to next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 sm:h-48 bg-gradient-to-b from-transparent via-white/70 to-white dark:from-transparent dark:to-muted/50 z-20" />
        {/* Additional very strong gradient for light theme */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-b from-transparent via-background/80 to-background dark:from-transparent dark:to-transparent z-21" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-primary-foreground drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Bli medlem i Albyrådet!
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-primary-foreground/90 font-medium mb-8 max-w-2xl mx-auto drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Gör skillnad i Botkyrka – engagera dig idag!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >            <Link href="/medlemansokan">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-lg shadow flex items-center gap-2">
                Bli medlem nu <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>      {/* Gradient transition from dark to gray */}
      <div className="h-4 md:h-8 w-full bg-gradient-to-b from-background via-alby-beige-soft to-alby-beige-warm dark:from-background dark:via-alby-gray-darker dark:to-muted/50" />      {/* Why Join Section */}
      <section className="bg-alby-beige-warm dark:bg-muted/50 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
              Varför bli medlem?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="bg-card rounded-xl shadow p-8 flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Gemenskap</h3>
                <p className="text-muted-foreground">Hitta vänner och en trygg gemenskap med andra unga som vill göra skillnad.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-card rounded-xl shadow p-8 flex flex-col items-center text-center">
                <Star className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Påverka</h3>
                <p className="text-muted-foreground">Var med och påverka din ort och skapa positiva förändringar i Botkyrka.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-card rounded-xl shadow p-8 flex flex-col items-center text-center">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">Utvecklas</h3>
                <p className="text-muted-foreground">Få nya erfarenheter, väx som ledare och utveckla dina talanger.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>      {/* Gradient transition from gray to white */}
      <div className="h-8 md:h-16 w-full bg-gradient-to-b from-alby-beige-warm via-alby-beige-soft to-background dark:from-muted/50 dark:via-alby-gray-darker dark:to-background" />


      {/* Gallery/Carousel Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">
            Våra medlemmar!
          </motion.h2>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full max-w-2xl mx-auto mb-8">
            <Card className="overflow-hidden rounded-2xl shadow-lg bg-card">
              <div className="relative w-full h-64 sm:h-96">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="w-full h-full absolute inset-0"
                  >
                    <Image
                      src={images[current]}
                      alt={`Albyrådet medlemmar ${current + 1}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>
            {/* Carousel Controls */}
            <button
              aria-label="Föregående bild"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-md transition-all hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Nästa bild"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-md transition-all hover:scale-110"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Gå till bild ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    current === idx ? 'w-6 bg-primary' : 'w-4 bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient transition from dark to gray */}
      <div className="h-8 md:h-16 w-full bg-gradient-to-b from-background via-alby-beige-soft to-alby-beige-warm dark:from-background dark:via-alby-gray-darker dark:to-muted/50" />


      {/* How to Join Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">
            Så här blir du medlem
          </motion.h2>
          <ol className="space-y-8 max-w-xl mx-auto mb-8">
            <motion.li variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-1">Fyll i ansökan</h4>
                <p className="text-muted-foreground">Klicka på knappen nedan och fyll i dina uppgifter i vårt enkla formulär.</p>
              </div>
            </motion.li>
            <motion.li variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-1">Vi kontaktar dig</h4>
                <p className="text-muted-foreground">Vi hör av oss till dig så snart vi kan och berättar mer om nästa steg.</p>
              </div>
            </motion.li>
            <motion.li variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-1">Välkommen!</h4>
                <p className="text-muted-foreground">Du är nu en del av Albyrådet – vi ser fram emot att träffa dig!</p>
              </div>
            </motion.li>
          </ol>
          <div className="flex justify-center items-center">
            <Link href="/medlemansokan" passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-lg shadow flex items-center gap-2">
                Bli medlem nu <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
