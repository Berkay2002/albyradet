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
    email: 'Muhammet@albyradet.se',
    image: '/sektionen/tozak.jpg',
  },
  {
    name: 'Anahit Tovmasyan',
    title: 'Vice ordförande',
    email: 'Anahit@albyradet.se',
    image: '/sektionen/nr4.jpg',
  },
  {
    name: 'Jessica Mwaura',
    title: 'PR-ansvarig',
    email: 'Jessica@albyradet.se',
    image: '/sektionen/nr3.jpg',
  },
  {
    name: 'Sara Dhahri',
    title: 'Styrelseledamot',
    email: 'Sara@albyradet.se',
    image: '/sektionen/nr2.jpg',
  },
  {
    name: 'Jalil Saleem',
    title: 'PR-ansvarig',
    email: 'Jalil@albyradet.se',
    image: '/sektionen/nr5.jpg',
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
      <Header
        title="KONTAKTA OSS"
        description="Har du några frågor eller funderingar? Kontakta oss här!"
        imageUrl={isMobile ? '/sektionen/styrelsen-mobil.jpeg' : '/sektionen/styrelsen-mobil.jpeg'}
      />
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
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                      mt: 3, 
                      backgroundColor: '#FFA500', 
                      '&:hover': {
                        backgroundColor: '#e59400',  // Optional: Darker shade on hover
                      } 
                    }}
                  >
                    Skicka meddelande
                  </Button>

                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ backgroundColor: '#FFA500', py: isMobile ? 1 : 13, ...getMarginStyle() }}></Box>

{/* VÅRT FANTASTISKA STYRELSE section */}
{isMobile || isIpad ? (
          <Box sx={{ position: 'relative', backgroundColor: '#f0f0f0', ...getMarginStyle() }}>
            <Box 
              sx={{ 
                backgroundColor: '#FFA500',
                height: isMobile ? '150px' : '200px',
                width: '100%'
              }} 
            />
            
            <Container maxWidth={isMobile ? 'xl' : 'lg'} sx={{ position: 'relative' }}>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid item xs={12}>
                  <Box>
                    <HeaderText 
                      variant={isMobile ? "h3" : "h2"} 
                      sx={{ 
                        fontWeight: 'bold', 
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        color: 'black',
                        mb: 1
                      }}
                    >
                      VÅR
                    </HeaderText>
                    <HeaderText 
                      variant={isMobile ? "h3" : "h2"} 
                      sx={{ 
                        fontWeight: 'bold', 
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        color: '#FFA500',
                        mb: 1
                      }}
                    >
                      STYRELSE
                    </HeaderText>
                  </Box>
                </Grid>

                {/* Description for mobile and iPad */}
                <Grid item xs={12}>
                  <Typography variant={isMobile ? "body1" : "h6"}>
                  Vi är styrelsen för Albyrådet. Om du har några frågor eller funderingar är du välkommen att <Link href="/kontakta-oss"><span style={{ color: 'black', fontWeight: 'bold' }}>kontakta oss</span></Link>!
                  </Typography>
                </Grid>
              </Grid>

              {/* Member cards for mobile and iPad */}
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                {members.map((member, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <Card>
                      <CardMedia>
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={250}
                          height={312}
                          layout="responsive"
                          style={{ objectFit: 'cover' }}
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
            </Container>
          </Box>
        ) : (
          // Desktop version 
          <Box py={13} sx={{ backgroundColor: '#f0f0f0', marginLeft: '3%', marginRight: '3%', position: 'relative' }}>
            <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box sx={{ position: 'relative', top: '-2rem' }}>
                <HeaderText variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', color: 'black' }}>
                  VÅR
                </HeaderText>
                <HeaderText variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', color: '#FFA500' }}>
                STYRELSE
                </HeaderText>
              </Box>
              <Box sx={{ maxWidth: '50%' }}>
                <Typography variant="h5">
                  Vi är styrelsen för Albyrådet. Om du har några frågor eller funderingar är du välkommen att <Link href="/kontakta-oss"><span style={{ color: 'black', fontWeight: 'bold' }}>kontakta oss</span></Link>!
                </Typography>
              </Box>
            </Container>

            <Container>
              <Grid container spacing={2} justifyContent="center">
              {members.map((member, index) => (
                <Grid 
                  item 
                  key={index} 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={2.4}
                  sx={{
                    mb: isMobile && index === members.length - 1 ? 5 : 0, // Add margin bottom for the last card on mobile
                  }}
                >
                    <Card>
                      <CardMedia>
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={250}
                          height={312}
                          layout="responsive"
                          style={{ objectFit: 'cover' }}
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
            </Container>
            
          </Box>
        )}


      </Box>
    </>
  );
};

export default Kontakt;
