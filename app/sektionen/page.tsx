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
    name: '',
    title: '',
    email: '',
    image: '/sektionen/profile.jpg',
  },
  {
    name: '',
    title: '',
    email: '',
    image: '/sektionen/profile.jpg',
  },
  {
    name: '',
    title: '',
    email: '',
    image: '/sektionen/profile.jpg',
  },
  {
    name: '',
    title: '',
    email: '',
    image: '/sektionen/profile.jpg',
  },
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Sektionen = () => {
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
      <Header title='SEKTIONEN' description="" />
      <Box sx={{ backgroundColor: '#FFFFFF' }}>
        <Box py={isMobile ? 5 : 10} sx={{ backgroundColor: '#f0f0f0', ...(isMobile || isIpad ? {} : getMarginStyle()) }}>

          
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
            
            <Container maxWidth={isMobile ? 'xl' : 'lg'} sx={{ position: 'relative', mt: isMobile ? '-50px' : '-150px' }}>
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
                      VÅRT
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
                      FANTASTISKA
                    </HeaderText>
                    <HeaderText 
                      variant={isMobile ? "h3" : "h2"} 
                      sx={{ 
                        fontWeight: 'bold', 
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        color: 'black',
                        mb: 2
                      }}
                    >
                      STYRELSE
                    </HeaderText>
                  </Box>
                </Grid>

                {/* Description for mobile and iPad */}
                <Grid item xs={12}>
                  <Typography variant={isMobile ? "body1" : "h6"}>
                    Hej! Här är styrelsen för Kliv Idrottsförening. Om du har några frågor eller funderingar är du välkommen att <Link href="/kontakta-oss"><span style={{ color: '#FFA500', fontWeight: 'bold' }}>kontakta oss</span></Link>.
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
              <Box sx={{ position: 'relative', top: '-8rem' }}>
                <HeaderText variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', color: 'black' }}>
                  VÅRT
                </HeaderText>
                <HeaderText variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', color: '#FFA500' }}>
                  FANTASTISKA
                </HeaderText>
                <HeaderText variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', color: 'black' }}>
                  STYRELSE
                </HeaderText>
              </Box>
              <Box sx={{ maxWidth: '50%' }}>
                <Typography variant="h5">
                  Hej! Här är styrelsen för Kliv Idrottsförening. Om du har några frågor eller funderingar är du välkommen att <Link href="/kontakta-oss"><span style={{ color: 'black', fontWeight: 'bold' }}>kontakta oss</span></Link>.
                </Typography>
              </Box>
            </Container>

            <Container>
              <Grid container spacing={2} justifyContent="center">
                {members.map((member, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
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

export default Sektionen;
