"use client";

import React from 'react';
import { Container, Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Image from 'next/image'; // Assuming you are using Next.js for image optimization
import Header from '../header'; // Importing the Header component
import { useContext } from 'react';
import { MobileStateContext } from '../MobileContext'; // Assuming you are using MobileContext for device detection

const Projekt = () => {
  const { isMobile, isIpad } = useContext(MobileStateContext);

  // Define the getMarginStyle function based on the isMobile and isIpad values
  const getMarginStyle = () => ({
    marginLeft: isMobile || isIpad ? 0 : '3%',
    marginRight: isMobile || isIpad ? 0 : '3%',
  });

  return (
    <>
      {/* Use the Header component */}
      <Header
        title="VÅRA PROJEKT"
        description="Här kan du ta del av våra tidigare och pågående projekt!"
        imageUrl={isMobile ? '/sektionen/styrelsen-mobil.jpeg' : '/sektionen/styrelsen-mobil.jpeg'}
      />

      
      {/* Page content with the same background and structure as the home page */}
      <Box sx={{ backgroundColor: '#F0F0F0', py: 10, ...getMarginStyle() }}>  {/* Matching the home page background */}
        <Container maxWidth="lg">
          {/* BotkyrkaChill Project */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            BotkyrkaChill - Ett Projekt för Samhällsengagemang
          </Typography>

          {/* First Image */}
          <Card sx={{ mb: 5 }}>
            <CardMedia 
              component="img" 
              height="300"
              image="/path-to-first-image.jpg" // Replace with actual image paths
              alt="Botkyrka Chill Event 1"
            />
            <CardContent>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>Sommarlovsaktiviteter - Botkyrka Chill 2021 (Exempelbild)</Typography>
            </CardContent>
          </Card>

          {/* Introduction Paragraph */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Om BotkyrkaChill
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            BotkyrkaChill är ett etablerat koncept som har funnits ända sedan Albyrådet grundades. Projektet drivs av ungdomar från Albyrådet och syftar till att arrangera sommarlovsaktiviteter för barn och ungdomar i Botkyrka.
          </Typography>

        {/* Stretched Logo */}
          <Box sx={{ textAlign: 'center', my: 5 }}>
            <Image 
              src="/logo/BC.png" // Replace with the actual path to your logo
              alt="Botkyrka Chill Logo" 
              width={1000} // Stretching the logo to fit the width
              height={320} // Adjust height accordingly to maintain aspect ratio
              style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsive resizing
            />
          </Box>

          {/* Project Purpose and Goals */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Syfte och Mål
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Denna projektidé formades fram av Albyrådet då vi såg ett behov av aktiviteter för barn och ungdomar i våra kvartersområden. Vi har tre huvudsakliga mål som vi strävar efter att uppfylla med BotkyrkaChill:
          </Typography>
          <ol>
            <li>
              <Typography variant="body1">
                <strong>Kostnadsfria aktiviteter:</strong> Erbjuda barn och unga kostnadsfria ledarledda aktiviteter inom idrott och kultur.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Geografisk tillgänglighet:</strong> Tillse att aktiviteterna sker på olika kvartersområden för att underlätta tillgänglighet för barn och föräldrar.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Socialt fokus:</strong> Förlägga aktiviteterna i socioekonomiskt utsatta områden i Botkyrka.
              </Typography>
            </li>
          </ol>


          {/* Second Image */}
          <Card sx={{ mb: 5 }}>
            <CardMedia 
              component="img" 
              height="300"
              image="/path-to-second-image.jpg" // Replace with actual image paths
              alt="Botkyrka Chill Event 2"
            />
            <CardContent>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>Aktiviteter för ungdomar - Botkyrka Chill 2022 (Exempelbild)</Typography>
            </CardContent>
          </Card>

          {/* Ung Innovation Alby (UIA) Project */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 6, mb: 3 }}>
            Ung Innovation Alby (UIA) - Innovationstävling för Ungdomar
          </Typography>

          {/* UIA Description */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Om UIA
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Ung Innovation Alby är ett innovationsprojekt som utvecklades av ungdomar från Albyrådet under första kvartalet av 2024. UIA är en innovationstävling där ungdomar från hela Botkyrka kan tävla och presentera sina idéer.
          </Typography>

          {/* Purpose and Goals of UIA */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Syfte och Mål
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Syftet med Ung Innovation Alby är att främja kreativitet och innovativa idéer, samt att inspirera ungdomar till högre drömmar. Följande mål står i fokus för projektet:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                <strong>Främja kreativitet:</strong> Uppmuntra ungdomar att tänka innovativt och bidra med idéer som har samhällsnyttiga aspekter.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Introduktion till entreprenörskap:</strong> Ungdomar får stöd av en innovationscoach och lär sig grunderna i att utveckla sina idéer och ta nästa steg inom entreprenörskap.
              </Typography>
            </li>
          </ul>

        </Container>
      </Box>
    </>
  );
};

export default Projekt;
