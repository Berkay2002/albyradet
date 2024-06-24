// app/header.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CustomWavyBackground from './CustomWavyBackground';

const Header = ({ title, backgroundImage }: { title: string; backgroundImage: string }) => {
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
          src={backgroundImage}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
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
      <Typography variant="h1" sx={{ position: 'relative', zIndex: 1, color: 'white' }}>
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
