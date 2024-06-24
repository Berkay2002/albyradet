// app/ar-innovation/page.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../header';

const ArInnovation = () => {
  return (
    <>
      <Header title="AR INNOVATION" backgroundImage="/sektionen/sektionenImage.jpeg" />
      <Container>
        <Typography variant="h1" sx={{ color: 'black' }}>AR Innovation Page</Typography>
        <Typography variant="body1" sx={{ color: 'black' }}>Welcome to the AR Innovation section.</Typography>
      </Container>
    </>
  );
};

export default ArInnovation;
