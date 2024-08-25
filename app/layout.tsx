"use client";

import * as React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './navbar';
import MuiProvider from './MuiProvider';
import Footer from './Footer';
import { MobileStateProvider } from './MobileContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <MuiProvider>
            <MobileStateProvider> 
              <>
                <NavBar />
                {children}
                <Footer />
              </>
            </MobileStateProvider>
          </MuiProvider>
        </UserProvider>
      </body>
    </html>
  );
}
