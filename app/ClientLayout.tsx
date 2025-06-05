'use client';

import { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
