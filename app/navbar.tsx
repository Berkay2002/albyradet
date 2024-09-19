import React, { useState, useEffect, useContext, useRef } from 'react';
import { ListItem, List, Grid, Drawer, AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MobileStateContext } from './MobileContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SocialMediaIcons from './SocialMediaIcons';
import MenuOutlined from '@mui/icons-material/MenuOutlined';


const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [visible, setVisible] = useState(true);
  const { isMobile, isIpad, isDesktop } = useContext(MobileStateContext);
  const pathname = usePathname();
  const underlineRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
      
      if (isMobile) {
        if (currentScrollY > lastScrollY.current) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isDesktop && underlineRef.current) {
      const activeButton = document.querySelector(`a[href="${pathname}"] button`);
      if (activeButton) {
        const { offsetWidth, offsetLeft } = activeButton as HTMLElement;
        setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
      }
    }
  }, [pathname, isDesktop]);

  const pages = [
    { name: 'HEM', path: '/' },
    { name: 'VÅRA PROJEKT', path: '/projekt' },
    { name: 'KONTAKTA OSS', path: '/kontakta-oss' },
    { name: 'BLI MEDLEM', path: '/bli-medlem' },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      {isMobile ? (
        // Mobile Navbar
        <>
          {/* Fixed Logo */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 1100,
            }}
          >
            <Link href="/" passHref legacyBehavior>
              <a>
                <Image
                  src="/logo/Vit.png" // Always use the black variant of the logo
                  alt="Alby Rådet"
                  width={75}
                  height={75}
                />
              </a>
            </Link>
          </Box>
          
          {/* Menu Icon */}
          <Box
            sx={{
              position: 'fixed',
              top: '20px',
              right: '10px',
              zIndex: 1200,
              display: 'flex',
              justifyContent: 'flex-start',
              width: '50px',
            }}
          >
            <MenuOutlined 
              onClick={toggleDrawer(!isOpen)}
              style={{
                fontSize: '50px',
                color: 'black', // Set color to black at all times
                transition: 'transform 0.3s',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                cursor: 'pointer',
              }}
            />
          </Box>
        </>
      ) : (
        // Desktop Navbar
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: scroll ? 'rgba(0, 0, 0, 0.8)' : 'white',
            transition: 'background-color 0.3s',
            width: isDesktop ? '94%' : '100%',
            ...(isDesktop && {
              left: '50%',
              transform: 'translateX(-50%)',
            }),
            boxShadow: 'none',
          }}
        >
          <Toolbar sx={{ padding: '0', width: '100%', margin: '0 auto' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Link href="/" passHref legacyBehavior>
                <a>
                  <Image
                    src={scroll ? "/logo/vit.svg" : "/logo/svart.svg"}
                    alt="Alby Rådet"
                    width={100}
                    height={100}
                  />
                </a>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', position: 'relative' }}>
              {pages.map((page) => (
                <Link href={page.path} key={page.name} passHref legacyBehavior>
                  <a>
                    <Button
                      color="inherit"
                      sx={{
                        color: scroll ? 'white' : 'black',
                        fontSize: '1.1rem',
                      }}
                    >
                      {page.name}
                    </Button>
                  </a>
                </Link>
              ))}
              <Box
                ref={underlineRef}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  height: '2px',
                  backgroundColor: scroll ? 'white' : 'black',
                  transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                  ...underlineStyle,
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer for mobile menu */}
      <Drawer
        anchor="right"
        sx={{ zIndex: 101 }}
        open={isOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={600}
        PaperProps={{
          sx: isMobile
            ? { width: "100%", backgroundColor: "white" }
            : { width: "50%", backgroundColor: "white" },
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%', p: 3 }}
        >
          <Box
            sx={{ width: isMobile ? '100%' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {pages.map((page, index) => (
                <ListItem key={index} sx={{ justifyContent: 'center' }}>
                  <Link href={page.path} passHref>
                    <Button
                      color="inherit"
                      sx={{
                        borderBottom: pathname === page.path ? '2px solid black' : 'none',
                        color: 'black',
                        fontSize: '1.25rem',
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Box sx={{ textAlign: 'center', mt: "0.5rem" }}>
              <Image
                alt="Alby Rådet"
                src="/logo/white.svg"
                width={150}
                height={150}
              />
              <SocialMediaIcons />
            </Box>
          </Box>
        </Grid>
      </Drawer>
    </>
  );
};

export default NavBar;
