"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { MobileStateContext } from './MobileContext';
import './globals.css';

const HeaderText = styled(Typography)(({ theme }) => ({
  fontFamily: `"Oswald", "Arial Narrow", sans-serif`,
  fontWeight: 800,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  lineHeight: 1,
}));

interface HeaderProps {
  title: string;
  description: string;
  imageUrl: string; 
}

const Header: React.FC<HeaderProps> = ({ title, description, imageUrl }) => {
  const { isMobile, isIpad } = useContext(MobileStateContext);
  const [orangeBoxWidth, setOrangeBoxWidth] = useState(65);
  const headerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getMarginStyle = () => ({
    marginLeft: isMobile ? 0 : '3%',
    marginRight: isMobile ? 0 : '3%',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile && !isIpad && headerRef.current) {
        const scrollTop = window.scrollY;
        const headerHeight = headerRef.current.offsetHeight;
        const startScroll = headerHeight / 2;
        if (scrollTop > startScroll) {
          const newWidth = Math.max(30, 65 - (scrollTop - startScroll) / 15);
          setOrangeBoxWidth(newWidth);
        } else {
          setOrangeBoxWidth(65);
        }
      }
    };

    if (!isMobile && !isIpad) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (!isMobile && !isIpad) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile, isIpad]);

  if (isMobile || isIpad) {
    // Mobile and iPad layout
    return (
      <Box
        sx={{
          minHeight: isMobile ? '50vh' : '70vh',
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none', // Dynamic image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isMobile ? '1.5rem' : '2.5rem',
          textAlign: 'center',
          position: 'relative',
          ...getMarginStyle(),
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Darker overlay for better text contrast
            zIndex: 1, 
          },
        }}
      >
        <HeaderText 
          variant={isMobile ? "h3" : "h2"} 
          sx={{ 
            color: '#00000', 
            fontSize: isSmallMobile ? '2rem' : isMobile ? '2.5rem' : '3.5rem',
            marginBottom: isMobile ? 1.5 : 2,
          }}
        >
          {title}
        </HeaderText>
        {description && (
          <HeaderText 
            variant="body1"
            sx={{ 
              color: '#00000', 
              fontSize: isSmallMobile ? '1rem' : isMobile ? '1rem' : '1.2rem',
              maxWidth: '90%',
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            {description}
          </HeaderText>
        )}
      </Box>
    );
  }


  // Desktop layout (with background image and gray overlay)
  return (
    <Box
      ref={headerRef}
      sx={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...getMarginStyle(),
      }}
    >
      {/* Background image with gray overlay */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${100 - orangeBoxWidth}%`,
          height: '100%',
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none', // Dynamic image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'width 0.2s ease-out',
          zIndex: 0, // Ensures the image is behind content
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(240, 240, 240, 0.8)', // Gray overlay with 80% opacity
          },
        }}
      />

      {/* Orange background (moving box) */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: `${orangeBoxWidth}%`,
          height: '100%',
          backgroundColor: '#FFA500', // Orange background
          transition: 'width 0.2s ease-out',
        }}
      />
      
      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1, // Make sure the content stays above the background image and overlay
          maxWidth: '80%',
          padding: '3rem',
          paddingLeft: '5%',
        }}
      >
        <HeaderText 
          variant="h1"
          sx={{ 
            color: '#000000', 
            fontSize: '5rem',
            marginBottom: 3,
            paddingRight: '20%',
          }}
        >
          {title}
        </HeaderText>
        {description && (
          <HeaderText 
            variant="h6"
            sx={{ 
              color: '#000000', 
              fontSize: '1.5rem',
              maxWidth: '80%',
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            {description}
          </HeaderText>
        )}
      </Box>
    </Box>
  );

};

export default Header;
