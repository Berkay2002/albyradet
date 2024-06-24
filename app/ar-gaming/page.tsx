// app/ar-gaming/page.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../header';

const ArGaming = () => {
  return (
    <>
      <Header title="AR GAMING" backgroundImage="/sektionen/sektionenImage.jpeg" />
      <Container>
        <Typography variant="h1" sx={{ color: 'black' }}>AR Gaming Page</Typography>
        <Typography variant="body1" sx={{ color: 'black' }}>Welcome to the AR Gaming section.</Typography>
      </Container>
    </>
  );
};

export default ArGaming;
