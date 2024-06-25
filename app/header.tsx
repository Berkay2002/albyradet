// app/header.tsx
'use client';

import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CustomWavyBackground from './CustomWavyBackground';
import { MobileStateContext } from './MobileContext';

const Header = ({ title, backgroundImageMobile, backgroundImageDesktop, backgroundPattern }: { title: string; backgroundImageMobile: string; backgroundImageDesktop: string; backgroundPattern?: string }) => {
  const { isMobile, isDesktop } = useContext(MobileStateContext);
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Image
          src={isMobile ? backgroundImageMobile : backgroundImageDesktop}
          alt="background"    
          quality={100}
          priority
          layout="fill"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the overlay color
        }}
      />
      <Typography variant="h1" sx={{ position: 'relative', zIndex: 1, color: 'white', fontSize: isMobile ? '3rem' : '4rem' }}>
        {title}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <CustomWavyBackground />
      </Box>
    </Box>
  );
};

export default Header;
