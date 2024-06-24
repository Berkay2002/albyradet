// app/layout.tsx
import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './navbar';
import MuiProvider from './MuiProvider';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          <NavBar />
          {children}
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}