"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Play } from 'lucide-react';
import { cn } from "@/lib/utils";
import { getCombinedBotkyrkachillMedia } from "@/lib/media-utils";
import Head from 'next/head';

// Hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Custom Carousel Component
const Carousel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = React.Children.toArray(children).filter(Boolean); // Filter out any null/undefined items
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isMobile = useIsMobile();
  
  const nextSlide = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setHasInteracted(true);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setHasInteracted(true);
  }, [items.length]);

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50; // Minimum drag distance to trigger slide change
    setHasInteracted(true);
    
    if (info.offset.x > threshold) {
      // Swiped right, go to previous slide
      prevSlide();
    } else if (info.offset.x < -threshold) {
      // Swiped left, go to next slide
      nextSlide();
    }
  };

  // Hide swipe hint after interaction or timeout
  useEffect(() => {
    if (hasInteracted) {
      setShowSwipeHint(false);
    } else {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);
  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0
    })
  };  return (
    <div className={cn("relative overflow-hidden rounded-none md:rounded-lg", className)}>
      <div className="relative aspect-[2/3] md:aspect-video">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 180, damping: 24 }
            }}
            className="absolute inset-0 h-full cursor-grab active:cursor-grabbing"
            style={{ zIndex: 1 }}
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.95 }}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
        {/* Hide arrows on mobile using Tailwind */}
        <button 
          onClick={prevSlide}
          className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-foreground p-2 rounded-full shadow-md transition-all hover:scale-110"
          aria-label="Föregående bild"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-foreground p-2 rounded-full shadow-md transition-all hover:scale-110"
          aria-label="Nästa bild"
        >
          <ArrowRight className="h-5 w-5" />
        </button>          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {items.length <= 10 && (
            // Show individual dots for small carousels only
            items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setHasInteracted(true);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === index ? 'w-6 bg-primary' : 'w-4 bg-foreground/20'
                }`}
                aria-label={`Gå till bild ${index + 1}`}
              />
            ))
          )}
        </div>
        
        {/* Swipe hint for mobile users */}
        {isMobile && showSwipeHint && items.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2 pointer-events-none"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-lg"
            >
              👈👉
            </motion.div>
            <span>Swipa för att bläddra</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  deviceType?: 'mobile' | 'desktop';
  rotation?: number; // For rotating images (0, 90, 180, 270 degrees)
};

interface ProjectCardProps {
  title: string;
  description: string;
  media: MediaItem[];
  goals: Array<{ title: string; description: string }>;
  className?: string;
  isMobile: boolean;
}

interface InnovationItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const arInnovation_media: MediaItem[] = [
  { 
    type: 'image', 
    src: "/ar-innovation/IMG_8642.jpg",
    alt: "Deltagare diskuterar innovationer"
  },
  { 
    type: 'image', 
    src: "/ar-innovation/IMG_8654.jpg",
    alt: "Workshop för unga innovatörer"
  },
  { 
    type: 'image', 
    src: "/ar-innovation/IMG_8660.jpg",
    alt: "Presentation av projektidéer"
  },
  { 
    type: 'video', 
    src: "/ar-innovation/Min film.mov",
    alt: "Inspelning från AR Innovation workshop"
  },
];

const innovationItems = [
  {
    src: "/ar-innovation/IMG_8642.jpg",
    alt: "Unga Innovatörer Alby tävling",
    title: "Unga Innovatörer Alby",
    description: "En årlig tävling där unga får chansen att utveckla och presentera sina innovativa idéer."
  },
  {
    src: "/ar-innovation/IMG_8654.jpg",
    alt: "Workshop vid UIA",
    title: "Kreativt samarbete",
    description: "Deltagare arbetar tillsammans för att utveckla sina idéer under handledning."
  },
  {
    src: "/ar-innovation/IMG_8660.jpg",
    alt: "Prisutdelning UIA",
    title: "Firande av framgång",
    description: "Vinnarna hyllas för sina innovativa bidrag under den stora finalen."
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

const ProjectMedia = ({ media, index, isMobile }: { media: MediaItem, index: number, isMobile: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Handle undefined media gracefully
    if (!media || !media.type) {
      return;
    }
    
    const video = videoRef.current;
    if (media.type === 'video' && video) {
      video.currentTime = 0;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error: any) => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
    
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [media.type, media]);

  // Handle undefined media gracefully
  if (!media || !media.type) {
    console.warn(`Media item at index ${index} is undefined or missing type`);
    return null;
  }  if (media.type === 'image') {
    return (
      <div className="relative overflow-hidden rounded-none md:rounded-lg w-full aspect-[2/3] md:aspect-video">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          className="object-cover"
          priority={index < 6} // Prioritize first few images
          loading={index < 6 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
    );
  }return (
    <div className="relative w-full aspect-square md:aspect-video group">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover rounded-none md:rounded-lg"
      >
        <source src={media.src} type="video/mp4" />
        Din webbläsare stödjer inte video-taggen.
      </video>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/50 rounded-full p-3 text-white">
          <Play className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  media, 
  goals,
  className = '',
  isMobile
}) => (
  <motion.div 
    variants={fadeInUp}
    className={cn("bg-card text-card-foreground rounded-2xl shadow-md overflow-hidden border border-border transition-shadow", className)}
  >
    <div className="p-6 md:p-8">
      <Typography variant="h3" className="text-3xl font-bold mb-6 text-primary">
        {title}
      </Typography>
      
      <Typography variant="p" className="text-lg mb-8 text-muted-foreground">
        {description}
      </Typography>
      
      <div className="space-y 6">
        <Typography variant="h4" className="text-xl font-semibold mb-4">
          Våra mål
        </Typography>
        <ul className="space-y-4">
          {goals.map((goal, index) => (
            <motion.li 
              key={index}
              variants={fadeInUp}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">{goal.title}</h4>
                <p className="text-muted-foreground">{goal.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>      <Carousel className="h-full w-full">
        {media.map((item, index) => (
          <ProjectMedia key={`${item.src}-${index}`} media={item} index={index} isMobile={isMobile} />
        ))}
      </Carousel>
  </motion.div>
);

const InnovationShowcase: React.FC<{ items: InnovationItem[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item, index) => (
      <motion.div
        key={index}
        variants={fadeInUp}
        className="bg-foreground/5 rounded-xl overflow-hidden shadow-md border border-alby-orange-muted/10 transition-shadow"
      >
        <div className="aspect-video bg-muted/40 relative">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3} // Only preload first 3 images
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

function Projekt() {  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Store refs for each video element
  const isMobile = useIsMobile(); // Use the custom hook for device detection
  
  // Get media based on device type using the hook
  const botkyrkachill_media: MediaItem[] = getCombinedBotkyrkachillMedia().filter(item => {
    // Filter images based on device type
    if (isMobile) {
      return item.deviceType === 'mobile';
    } else {
      return item.deviceType === 'desktop';
    }
  });

  // Handle the slide change and play video if it's in the active slide
  const handleSlideChange = (now?: number, previous?: number) => {
    if (now !== undefined && videoRefs.current[now] && botkyrkachill_media[now].type === 'video') {
      videoRefs.current[now]?.play(); // Play the video when its slide is shown
    }

    // Pause the previous video if there was a previous slide with a video
    if (previous !== undefined && videoRefs.current[previous] && botkyrkachill_media[previous].type === 'video') {
      videoRefs.current[previous]?.pause();
    }
  };

  return (    <div className="min-h-screen bg-background flex flex-col">
      <Head>
        <title>Projekt - Albyrådet</title>
        <meta name="description" content="Upptäck våra projekt och initiativ i Alby, Botkyrka. Vi arbetar för en bättre framtid för ungdomar i vårt samhälle." />
      </Head>
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-primary/5 to-background/50">
          {/* Orange to black gradient for mobile, image for md+ */}
          <div className="block md:hidden absolute inset-0 -z-10 bg-gradient-to-b from-orange-400 via-orange-700 to-black" />
            <div className="hidden md:block absolute inset-0 -z-10">
              <Image
                src="/ar-innovation/IMG_8645.jpg"
                alt="Unga deltagare vid UIA tävlingen"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Våra Projekt
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Upptäck våra pågående och tidigare projekt som skapats för att stärka och inspirera vår gemenskap.
              </p>
            </motion.div>
          </div>
        </div>

      {/* BotkyrkaChill Project */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">          <ProjectCard
            title="BotkyrkaChill - Ett Projekt för Samhällsengagemang"
            description="BotkyrkaChill är ett etablerat koncept som funnits ända sedan Albyrådet grundades. Projektet planeras och genomförs av ungdomar från Albyrådet med fokus på att skapa meningsfulla aktiviteter för barn och unga i Botkyrka."
            media={botkyrkachill_media}
            isMobile={isMobile}
            goals={[
              {
                title: "Kostnadsfria aktiviteter",
                description: "Erbjuda barn och unga kostnadsfria ledarledda aktiviteter inom idrott och kultur."
              },
              {
                title: "Geografisk tillgänglighet",
                description: "Tillse att aktiviteterna sker på olika kvartersområden för att vara lättillgängliga för alla."
              },
              {
                title: "Socialt fokus",
                description: "Fokusera på att nå ut till socioekonomiskt utsatta områden i Botkyrka."
              }
            ]}
          />
        </div>
      </section>

      {/* Gradient transition from dark to gray using theme colors */}
      <div className="h-4 md:h-8 w-full bg-gradient-to-b from-background via-alby-beige-soft to-alby-beige-light dark:from-background dark:via-alby-gray-darker dark:to-muted/50" />      {/* UIA Project */}
      <section className="py-16 md:py-24 bg-alby-beige-light dark:bg-muted/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Ung Innovation Alby (UIA)
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              En innovationstävling där ungdomar från hela Botkyrka får chansen att utveckla och presentera sina idéer.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 items-center md:bg-foreground/5 md:rounded-2xl md:shadow-xl md:p-8 md:relative">
              {/* Text Section */}
              <div className="md:pr-8 md:border-r md:border-border/20">
                <h3 className="text-2xl font-bold mb-4">Om UIA</h3>
                <p className="text-muted-foreground mb-6">
                  Ung Innovation Alby är ett innovationsprojekt vars koncept arbetats fram av Albyrådets ungdomar under första kvartalet av 2024. UIA är en innovationstävling där ungdomar från hela Botkyrka kan tävla.
                </p>
                <h4 className="text-xl font-semibold mb-3">Vår vision</h4>
                <p className="text-muted-foreground">
                  Att skapa en plattform där unga innovatörer får möjlighet att utveckla sina idéer, träffa likasinnade och få stöd för att förverkliga sina drömmar.
                </p>
              </div>
              {/* Image Section (hidden on mobile) */}
              <div className="hidden md:block relative aspect-video rounded-2xl overflow-hidden shadow-xl md:ml-8">
                <Image
                  src="/ar-innovation/IMG_8645.jpg"
                  alt="Unga deltagare vid UIA tävlingen"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-16">
              <InnovationShowcase items={innovationItems} />
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-foreground/5 p-8 rounded-2xl shadow-lg mt-12">
              <h3 className="text-2xl font-bold mb-4">Vill du delta?</h3>
              <p className="text-muted-foreground mb-6">
                Är du mellan 13-25 år och har en innovativ idé som kan göra skillnad i samhället? Anmäl dig till nästa tävling och få chansen att vinna priser och handledning för att förverkliga din idé.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/kontakta-oss">
                    Anmäl intresse
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projekt/ung-innovation-alby">
                    Läs mer om tävlingen
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  );
}

export default Projekt;
