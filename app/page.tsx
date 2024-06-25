// app/page.tsx
'use client';

import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, useMediaQuery, useTheme, Box, Divider, Button, TextField } from '@mui/material';
import Header from './header';
import News from './News';

const Home = () => {
  return (
    <>
      <Header title="HEM" backgroundImage='/sektionen/sektionenImage.jpeg' />
      
      <Divider sx={{ my: 6 }} />

      <Container>
        


        {/* News */}
        
        <News />

        {/* Other sections of the homepage */}
      </Container>
    </>
  );
};

export default Home;
