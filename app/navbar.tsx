// app/navbar.tsx
"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Button, Box, Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MobileStateContext } from './MobileContext';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const [scroll, setScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isMobile, isIpad, isDesktop } = useContext(MobileStateContext);
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

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: isMobile ? '100%' : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((page, index) => (
          <ListItem button key={index}>
            <Link href={page.path} passHref>
              <Button
                color="inherit"
                sx={{ borderBottom: pathname === page.path ? '2px solid #FFEB3B' : 'none', color: '#FFFFFF' }}
              >
                {page.name}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" color="transparent" sx={{ backgroundColor: scroll ? 'rgba(0, 0, 0, 0.8)' : 'transparent', transition: 'background-color 0.3s' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image src="/logo/Vit transparant.png" alt="Alby Rådet Logo" width={75} height={75} />
            </a>
          </Link>
        </Box>
        {isDesktop ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {pages.map((page) => (
              <Link href={page.path} key={page.name} passHref legacyBehavior>
                <a>
                  <Button
                    color="inherit"
                    sx={{ borderBottom: pathname === page.path ? '2px solid #FFEB3B' : 'none', color: '#FFFFFF' }}
                  >
                    {page.name}
                  </Button>
                </a>
              </Link>
            ))}
          </Box>
        ) : (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList()}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
