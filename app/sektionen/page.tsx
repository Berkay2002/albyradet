// app/sektionen/page.tsx
'use client';

import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, useMediaQuery, useTheme, Box } from '@mui/material';
import Image from 'next/image';
import Header from '../header';

const members = [
  {
    name: 'Muhammet Tozak',
    title: 'Ordförande',
    email: 'ordforande@albyradet.nu',
    image: '/sektionen/tozak.jpg',
  },
  {
    name: 'Johannes Almaaijan',
    title: 'Kassör',
    email: 'kassor@albyradet.nu',
    image: '/sektionen/johannes.jpg',
  },
  // Add more members here
];

const Sektionen = () => {
  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <>
      <Header title="SEKTIONEN" backgroundImage="/sektionen/sektionenImage.jpeg" />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          STYRELSEN
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Hej! Här är styrelsen för Albyrådet. Om du har några frågor eller funderingar är du välkommen att kontakta oss.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {members.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={312} // For 4:5 aspect ratio
                    layout="responsive"
                    objectFit="cover"
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" align="center" color="textSecondary">
                    {member.title}
                  </Typography>
                  <Typography variant="body2" align="center" color="textSecondary">
                    {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Sektionen;