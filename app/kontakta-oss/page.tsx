'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/ui/container";
import { Box } from "@/components/ui/box";
import { Grid } from "@/components/ui/grid";
import { HeaderText } from "@/components/ui/header-text";
import { Header } from '../header';

const members = [
  {
    name: 'Muhammet Tozak',
    title: 'Ordförande',
    email: 'Muhammet@albyradet.se',
    image: '/sektionen/tozak.jpg',
  },
  {
    name: 'Anahit Tovmasyan',
    title: 'Vice ordförande',
    email: 'Anahit@albyradet.se',
    image: '/sektionen/nr4.jpg',
  },
  {
    name: 'Jessica Mwaura',
    title: 'PR-ansvarig',
    email: 'Jessica@albyradet.se',
    image: '/sektionen/nr3.jpg',
  },
  {
    name: 'Sara Dhahri',
    title: 'Styrelseledamot',
    email: 'Sara@albyradet.se',
    image: '/sektionen/nr2.jpg',
  },
  {
    name: 'Jalil Saleem',
    title: 'Styrelseledamot',
    email: 'Jalil@albyradet.se',
    image: '/sektionen/nr5.jpg',
  },
];



interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Kontakt = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
  // Remove unused variables and functions
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const isIpad = typeof window !== 'undefined' ? window.innerWidth >= 640 && window.innerWidth <= 1024 : false;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Tack för ditt meddelande! Vi kommer att kontakta dig snart.');
      } else {
        console.error('Error submitting form:', result);
        alert('Något gick fel när meddelandet skulle skickas. Försök igen senare.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ett oväntat fel uppstod. Vänligen försök igen senare.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="KONTAKTA OSS"
        description="Har du frågor eller funderingar? Vi finns här för dig!"
        imageUrl="/sektionen/styrelsen2.jpeg"
      />

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container className="px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <HeaderText className="text-3xl md:text-4xl font-bold text-center mb-12">
              Skicka oss ett meddelande
            </HeaderText>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Namn</label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Namn är obligatoriskt' })}
                    className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">E-postadress</label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'E-post är obligatoriskt', 
                      pattern: { 
                        value: /^\S+@\S+\.\S+$/, 
                        message: 'Ange en giltig e-postadress' 
                      } 
                    })}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefonnummer (valfritt)</label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Meddelande</label>
                <Textarea
                  id="message"
                  rows={5}
                  {...register('message', { required: 'Meddelande är obligatoriskt' })}
                  className={`w-full ${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-alby-orange hover:bg-alby-orange/90 text-white px-8 py-6 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Skicka meddelande
                </Button>
              </div>
            </form>
          </motion.div>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-alby-gray-light/30">
        <Container className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-alby-orange/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-7 w-7 text-alby-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">E-post</h3>
                <p className="text-alby-gray-dark">
                  <a href="mailto:kontakt@albyradet.se" className="hover:text-alby-orange transition-colors">
                    kontakt@albyradet.se
                  </a>
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-alby-orange/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-7 w-7 text-alby-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                <p className="text-alby-gray-dark">
                  <a href="tel:+46701234567" className="hover:text-alby-orange transition-colors">
                    +46 70 123 45 67
                  </a>
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-alby-orange/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-alby-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Besöksadress</h3>
                <p className="text-alby-gray-dark">
                  Alby Allé 1<br />
                  146 46 Tumba
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Board Members Section */}
      <section className="py-16 bg-white">
        <Container className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="block">VÅR</span>
                  <span className="text-alby-orange">STYRELSE</span>
                </h2>
                <p className="mt-4 text-lg text-alby-gray-dark max-w-2xl mx-auto">
                  Vi är styrelsen för Albyrådet. Om du har några frågor eller funderingar är du välkommen att kontakta oss!
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="relative pt-[125%] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-alby-orange font-medium mb-2">{member.title}</p>
                      <a 
                        href={`mailto:${member.email}`}
                        className="mt-auto text-alby-gray-dark hover:text-alby-orange transition-colors text-sm"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Kontakt;
