"use client";

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Corrected import

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
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFEB3B' }}>
          Association Name
        </Typography>
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
