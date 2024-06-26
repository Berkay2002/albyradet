// app/navbar.tsx
"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Button, Box, Drawer, IconButton, List, ListItem, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MobileStateContext } from './MobileContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SocialMediaIcons from './SocialMediaIcons';

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
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
    { name: 'OM OSS', path: '/sektionen' },
    { name: 'AR INNOVATION', path: '/ar-innovation' },
    { name: 'AR SPORTS', path: '/ar-sports' },
    { name: 'AR GAMING', path: '/ar-gaming' },
    { name: 'BLI MEDLEM', path: '/bli-medlem' },
    { name: 'KONTAKTA OSS', path: '/kontakta-oss' },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };


  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      sx={{ 
        backgroundColor: scroll ? 'rgba(0, 0, 0, 0.8)' : 'transparent', 
        transition: 'background-color 0.3s',
        width: '100%' // Ensure the AppBar covers the full width
      }}
    >      
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image 
                src="/logo/vit-transparant.svg" 
                alt="Alby Rådet" 
                width={isMobile || isDesktop ? 75 : 75} // Increase size on mobile
                height={isMobile || isDesktop ? 75 : 75} 
              />
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
              onClick={toggleDrawer(!isOpen)}
              sx={{
                transition: 'transform 0.3s',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'white',
                fontSize: '2.5rem', // Increase the size of the icon
              }}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Drawer
              anchor="right"
              sx={{ zIndex: 101 }}
              open={isOpen}
              onClose={toggleDrawer(false)}
              transitionDuration={600}
              PaperProps={{
                sx: isMobile
                  ? { width: "100%", backgroundColor: "black" }
                  : { width: "50%", backgroundColor: "black" },
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center" // Changed to center content vertically
                alignItems="center" // Keeps content centered horizontally
                sx={{ height: '100%', p: 3 }}
              >
                {/* Pages List */}
                <Box
                  sx={{ width: isMobile ? '100%' : 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {pages.map((page, index) => (
                      <ListItem key={index} sx={{ justifyContent: 'center' }}> {/* Centers each ListItem */}
                        <Link href={page.path} passHref>
                          <Button
                            color="inherit"
                            sx={{
                              borderBottom: pathname === page.path ? '2px solid #FFEB3B' : 'none',
                              color: '#FFFFFF',
                              fontSize: '1.25rem', // Increase font size here
                            }}
                          >
                            {page.name}
                          </Button>
                        </Link>
                      </ListItem>
                    ))}
                  </List>

                  

                  {/* Logo and Social Media Icons */}
                  <Box sx={{ textAlign: 'center', mt: "0.5rem" }}> {/* Centers the logo and icons */}
                    <Image
                      alt="Kliv Idrottsförening"
                      src="/logo/vit-transparant.svg"
                      width={150}
                      height={150}
                    />

                    <SocialMediaIcons />
                  </Box>
                </Box>
              </Grid>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;