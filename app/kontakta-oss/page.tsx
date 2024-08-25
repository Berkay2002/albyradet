'use client';

import React, { useContext } from 'react';
import { Container, Grid, Typography, Button, TextField, Card, CardMedia, CardContent, Box, Link, useTheme, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import Header from '../header';
import Image from 'next/image';
import { MobileStateContext } from '../MobileContext';
import { styled } from '@mui/system';
import '../globals.css';

const HeaderText = styled(Typography)(({ theme }) => ({
  fontFamily: `"Oswald", "Arial Narrow", sans-serif`,
  fontWeight: 800,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  lineHeight: 1,
}));

const members = [
  {
    name: 'Muhammet Tozak',
    title: 'Ordförande',
    email: 'muhammet@klivif.se',
    image: '/sektionen/profile.jpg',
  },
  {
    name: 'Maria Rafaelius',
    title: 'Medlemsansvarig',
    email: 'Maria@klivif.se',
    image: '/sektionen/profile.jpg',
  },
  {
    name: 'Eldar Ljuca',
    title: 'Aktivitetsansvarig',
    email: 'Eldar@klivif.se',
    image: '/sektionen/profile.jpg',
  },
  {
    name: 'Binel Elias',
    title: 'PR-ansvarig',
    email: 'Binel@klivif.se',
    image: '/sektionen/profile.jpg',
  },
  {
    name: 'Leah Aybar',
    title: 'PR-ansvarig',
    email: 'Leah@klivif.se',
    image: '/sektionen/profile.jpg',
  },
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Kontakt = () => {
  const { isMobile, isIpad } = useContext(MobileStateContext);
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const getMarginStyle = () => ({
    marginLeft: isMobile || isIpad ? 0 : '3%',
    marginRight: isMobile || isIpad ? 0 : '3%',
  });

  const onSubmit = async (data: FormValues) => {
    // Handle form submission
    console.log(data);
    alert('Tack för ditt meddelande! Vi kommer att kontakta dig snart.');
  };

  return (
    <>
      <Header title='KONTAKTA OSS' description="" />
      <Box sx={{ backgroundColor: '#FFFFFF' }}>
        <Box py={isMobile ? 5 : 10} sx={{ backgroundColor: '#f0f0f0', ...(isMobile || isIpad ? {} : getMarginStyle()) }}>
          <Container maxWidth={isMobile ? 'sm' : 'lg'}>
            <HeaderText variant={isMobile ? "h4" : "h3"} align="center" gutterBottom>
              Kontakta oss
            </HeaderText>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label="Namn"
                    {...register('name', { required: 'Namn är obligatoriskt' })}
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name ? String(errors.name.message) : ''}
                  />
                  <TextField
                    fullWidth
                    label="E-postadress"
                    type="email"
                    {...register('email', { required: 'E-post är obligatoriskt', pattern: { value: /^\S+@\S+$/i, message: 'Ogiltig e-postadress' } })}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email ? String(errors.email.message) : ''}
                  />
                  <TextField
                    fullWidth
                    label="Telefonnummer"
                    {...register('phone', { required: 'Telefonnummer är obligatoriskt' })}
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone ? String(errors.phone.message) : ''}
                  />
                  <TextField
                    fullWidth
                    label="Meddelande"
                    {...register('message', { required: 'Meddelande är obligatoriskt' })}
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!errors.message}
                    helperText={errors.message ? String(errors.message.message) : ''}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Skicka meddelande
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>


      </Box>
    </>
  );
};

export default Kontakt;
