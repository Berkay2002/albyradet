// app/navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NavBar = () => {
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pages = [
    { name: 'HEM', path: '/' },
    { name: 'AR INNOVATION', path: '/ar-innovation' },
    { name: 'AR GAMING', path: '/ar-gaming' },
    { name: 'AR SPORTS', path: '/ar-sports' },
    { name: 'BLI MEDLEM', path: '/bli-medlem' },
    { name: 'KONTAKTA OSS', path: '/kontakta-oss' },
    { name: 'SEKTIONEN', path: '/sektionen' },
  ];

  return (
    <AppBar position="fixed" color="transparent" sx={{ backgroundColor: scroll ? 'rgba(0, 0, 0, 0.8)' : 'transparent', transition: 'background-color 0.3s' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image src="/logo/Vit transparant.png" alt="Alby Rådet Logo" width={75} height={75} />
            </a>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {pages.map((page) => (
            <Link href={page.path} key={page.name} passHref legacyBehavior>
              <Button
                color="inherit"
                sx={{ borderBottom: pathname === page.path ? '2px solid #FFEB3B' : 'none', color: '#FFFFFF' }}
              >
                {page.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
