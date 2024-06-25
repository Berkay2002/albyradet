// app/sektionen/page.tsx
'use client';

import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, useMediaQuery, useTheme, Box, Divider, Button, TextField } from '@mui/material';
import Image from 'next/image';
import Header from '../header';
import Documents from '../Documents';
import { useFormik } from 'formik';

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

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Header title="SEKTIONEN" backgroundImage="/sektionen/sektionenImage.jpeg"/>

      <Divider sx={{ my: 6 }} />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          STYRELSEN
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Hej! Här är styrelsen för Albyrådet. Om du har några frågor eller funderingar är du välkommen att kontakta oss.
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
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
                    style={{ objectFit: 'cover'}}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {member.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Vill du veta mer?
          </Typography>
          <Button variant="contained" color="primary" href="/kontakta-oss">
            Kontakta oss
          </Button>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
          Protokoll & Stadgar
        </Typography>
        <Documents />

        <Divider sx={{ my: 6 }} />

        
      </Container>
    </>
  );
};

export default Sektionen;
