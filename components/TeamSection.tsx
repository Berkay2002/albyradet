'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  email?: string;
}

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
      staggerChildren: 0.1
    }
  }
};

interface TeamSectionProps {
  members: Member[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-alby-beige-soft dark:bg-muted/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-alby-orange-dark">
            Vårt Team
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Vi är styrelsen för Albyrådet. Om du har några frågor eller funderingar är du välkommen att{' '}
            <span className="text-alby-orange font-semibold">kontakta oss</span>!
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={fadeInUp}
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/20 transition-shadow group md:hover:scale-105 md:hover:shadow-lg md:transition-transform md:duration-300"
              style={{ boxShadow: '0 2px 8px 0 rgba(255, 107, 0, 0.08)' }}
            >
              <div className="aspect-[4/5] bg-alby-orange-muted/40 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-foreground group-hover:text-alby-orange-dark transition-colors">
                  {member.name}
                </h3>
                <span className="inline-block px-3 py-1 mb-2 rounded-full bg-alby-orange-muted text-alby-orange-dark text-xs sm:text-sm font-semibold">
                  {member.role}
                </span>
                <p className="text-muted-foreground mb-2 text-xs sm:text-sm">{member.description}</p>
                {member.email && (
                  <Link
                    href={`mailto:${member.email}`}
                    className="inline-block mt-1 text-sm text-alby-orange-dark hover:text-alby-orange-light transition-colors focus-visible:ring-2 focus-visible:ring-alby-orange focus-visible:ring-offset-2 rounded px-2 py-1"
                    aria-label={`Email ${member.name}`}
                  >
                    {member.email}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
