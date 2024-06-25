// app/ar-innovation/page.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../header';

const ArInnovation = () => {
  return (
    <>
      <Header title="AR INNOVATION" backgroundImageDesktop='/sektionen/sektionenImage.jpeg' backgroundImageMobile='/sektionen/styrelsen-mobil.jpeg' />
      <Container>
        <Typography variant="h1" sx={{ color: 'black' }}>AR Innovation Page</Typography>
        <Typography variant="body1" sx={{ color: 'black' }}>Welcome to the AR Innovation section.</Typography>
      </Container>
    </>
  );
};

export default ArInnovation;
