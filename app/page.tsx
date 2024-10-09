// app/page.tsx
// The main file for the home page of the Kliv Idrottsförening website

'use client'; 
// Indicates that this file is client-side code, a Next.js directive

import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Box, Button, Link, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MobileStateContext } from './MobileContext';
import { styled } from '@mui/system';
import './globals.css';
import { calculateMinHeight } from './CalculateMinHeight';


// Import icons
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupIcon from '@mui/icons-material/Group';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SchoolIcon from '@mui/icons-material/School';
import GroupWorkIcon from '@mui/icons-material/GroupWork';




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


const HeaderText = styled(Typography)(({ theme }) => ({
  fontFamily: `"Oswald", "Arial Narrow", sans-serif`,
  fontWeight: 800,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  lineHeight: 1,
}));

const Home = () => {
  const theme = useTheme();
  const { isMobile, isIpad } = useContext(MobileStateContext);
  const [minHeight, setMinHeight] = useState<number>(0);


  useEffect(() => {
    if (!isMobile) {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }, [isMobile]);

  useEffect(() => {
    const imageSources = [
      '/lovaktiviteter/lovaktiviteter1.png',
      '/lovaktiviteter/lovaktiviteter2.png',
      '/lovaktiviteter/lovaktiviteter3.png',
    ];

    calculateMinHeight(imageSources).then((minHeight) => {
      setMinHeight(minHeight);
    });
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };

    // Helper function to apply margins consistently
    const getMarginStyle = () => ({
      marginLeft: isMobile ? 0 : '3%',
      marginRight: isMobile ? 0 : '3%',
  });

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Box Container with Margin */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            ...getMarginStyle(), // Apply margin to the box
            overflow: 'hidden',
          }}
        >
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <source src="/montage480.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Content with Yellow Overlay */}
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 165, 0, 0.3)', // Orange with 50% opacity
              zIndex: 1,
              padding: '3%',
            }}
          >
            {/* Logo Image Instead of ALBY RÅDET */}
            <Image
              src="/logo/Vit transparant-header.png" // Replace with the actual logo path
              alt="Alby Rådet Logo"
              width={isMobile ? 100 : 300} // Adjust width for mobile and desktop
              height={isMobile ? 100 : 300} // Adjust height for mobile and desktop
            />
            
            {/* Subheading Text */}
            <HeaderText variant={isMobile ? 'h3' : 'h2'} sx={{ color: '#ffffff', mt: 4 , fontSize: isMobile ? '2rem' : isIpad ? '3rem' : '4rem' }}>
              Av unga, för unga
            </HeaderText>
          </Box>
        </Box>
      </Box>


      <Box sx={{ backgroundColor: 'white' }}>
        {/* VEM ÄR VI section */}
        <Box py={isMobile ? 5 : 10} sx={{ backgroundColor: '#f0f0f0', ...getMarginStyle() }}>
          <Container maxWidth={isMobile ? 'xl' : 'lg'}>
            <Grid container spacing={5} direction={isMobile ? 'column' : 'row'}>
              <Grid item xs={12} md={6}>
                <HeaderText variant={isMobile ? "h3" : "h2"} gutterBottom sx={{ color: '#000000' }}>
                  VILKA VI ÄR
                </HeaderText>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                Albyrådet grundades för snart ett decennium sedan av ett tiotal ungdomar från Alby. Sedan dess har Albyrådet varit en plattform för ungdomar som engagerar sig i föreningen med ändåmålet att motverka, förebygga och stoppa all form av kriminalitet, mobbning samt diskriminering. För att uppnå våra mål har vi utvecklat olika projektkoncept som vi genomfört eller än idag fortsätter bedriva.                
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* VÅR VISION section */}
        <Box sx={{ backgroundColor: '#FFA500', py: isMobile ? 5 : 10, ...getMarginStyle() }}>
          <Container maxWidth={isMobile ? 'xl' : 'lg'}>
            <Grid container spacing={5} direction={isMobile ? 'column' : 'row'}>
              <Grid item xs={12} md={4}>
                <HeaderText variant={isMobile ? "h3" : "h2"} gutterBottom sx={{ color: 'white' }}>
                  VÅR VISION
                </HeaderText>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} md={3} textAlign="center">
                    <SecurityIcon sx={{ fontSize: '3rem', mb: 1, color: 'white' }} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Skapa en trygg och säker miljö för ungdomar
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} textAlign="center">
                    <GavelIcon sx={{ fontSize: '3rem', mb: 1, color: 'white' }} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Motverka kriminalitet, mobbning och diskriminering
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} textAlign="center">
                    <LightbulbIcon sx={{ fontSize: '3rem', mb: 1, color: 'white' }} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Stimulera kreativitet och ledarskap bland unga
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} textAlign="center">
                    <GroupIcon sx={{ fontSize: '3rem', mb: 1, color: 'white' }} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Främja inkludering och gemenskap
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* VÅR STRÄVAN section */}
        <Box py={isMobile ? 5 : 10} sx={{ backgroundColor: '#f0f0f0', ...getMarginStyle() }}>
          <Container maxWidth={isMobile ? 'xl' : 'lg'}>
            <Grid container spacing={5} direction={isMobile ? 'column' : 'row'}>
              <Grid item xs={12} md={6}>
                <HeaderText variant={isMobile ? "h3" : "h2"} gutterBottom sx={{ color: '#000000' }}>
                  VÅR STRÄVAN
                </HeaderText>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                Vi strävar efter att bedriva en oberoende plattform för ungdomar i Alby där det finns möjlighet för varje ungdom att engagera sig och göra skillnad. Detta med ändamålet att motverka, förebygga och stoppa all form av kriminalitet, mobbning samt diskriminering.                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Carousel Section */}
        <Box py={0} sx={{ backgroundColor: '#FFA500', ...getMarginStyle() }}>
          <Box sx={{ width: '100%', margin: '0 auto', height: 'auto' }}>
            <Slider {...settings}>
              <div
                className="carousel-image-wrapper"
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden', // Ensures no extra part of the image is visible
                }}
              >
                <img
                  src="/sektionen/sektionenImage.jpeg"
                  alt="Image 1"
                  className="carousel-image"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                className="carousel-image-wrapper"
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/lovaktiviteter/lovaktiviteter2.png"
                  alt="Image 2"
                  className="carousel-image"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                className="carousel-image-wrapper"
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/lovaktiviteter/lovaktiviteter3.png"
                  alt="Image 3"
                  className="carousel-image"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {/* Add more images as needed */}
            </Slider>
          </Box>
        </Box>



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

export default Home;
