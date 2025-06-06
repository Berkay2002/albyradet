'use client';

import { ReactNode } from 'react';
import Navigation from './navigationbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
