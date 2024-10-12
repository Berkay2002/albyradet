"use client";

import React, { useEffect, useRef } from 'react';
import { Container, Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Image from 'next/image';
import Header from '../header'; // Importing the Header component
import { useContext } from 'react';
import { MobileStateContext } from '../MobileContext'; 
import Carousel from 'react-material-ui-carousel';

const botkyrkachill_media = [
  { type: 'image', src: "/botkyrkachill/IMG_1027_2.jpg" },
  { type: 'video', src: "/botkyrkachill/vid1.mp4" }, 
];
const innovation_images = [
  "/ar-innovation/IMG_8652.jpg",
  "/ar-innovation/IMG_8642.jpg",
  "/ar-innovation/image00006.jpeg",
];

const Projekt = () => {
  const { isMobile, isIpad } = useContext(MobileStateContext);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Store refs for each video element

  // Handle the slide change and play video if it's in the active slide
  const handleSlideChange = (now?: number, previous?: number) => {
    if (now !== undefined && videoRefs.current[now] && botkyrkachill_media[now].type === 'video') {
      videoRefs.current[now]?.play(); // Play the video when its slide is shown
    }

    // Pause the previous video if there was a previous slide with a video
    if (previous !== undefined && videoRefs.current[previous] && botkyrkachill_media[previous].type === 'video') {
      videoRefs.current[previous]?.pause();
    }
  };

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
        imageUrl={isMobile ? '/botkyrkachill/IMG_1027_2.jpg' : '/botkyrkachill/IMG_1027_2.jpg'}
      />

      
      <Box sx={{ backgroundColor: '#F0F0F0', py: 10, ...getMarginStyle() }}>  {/* Matching the home page background */}
        <Container maxWidth="lg">
          {/* BotkyrkaChill Project */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            BotkyrkaChill - Ett Projekt för Samhällsengagemang
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

          

          {/* Introduction Paragraph */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Om BotkyrkaChill
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
          BotkyrkaChill är ett etablerat koncept som funnits ända sedan Albyrådet grundades. Projektet planeras och genomförs av ungdomar från Albyrådet.           </Typography>

          {/* First Carousel */}
          <Carousel
            navButtonsAlwaysVisible={false}
            indicators={true}
            autoPlay={true}
            interval={5000} // Set the interval between slides in milliseconds
            onChange={handleSlideChange} // Trigger slide change and handle video playback
            >
            {botkyrkachill_media.map((media, index) => (
              <Card key={index} sx={{ mb: 5 }}>
                {media.type === 'image' ? (
                  <CardMedia
                    component="img"
                    sx={{
                      height: { xs: 400, sm: 500, md: 600 },
                      objectFit: 'cover',
                    }}
                    image={media.src}
                    alt={`Albyrådet BotkyrkaChill ${index + 1}`}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    playsInline
                    sx={{
                      height: { xs: 400, sm: 500, md: 600 },
                      objectFit: 'cover',
                    }}
                    ref={(el: HTMLVideoElement | null) => { videoRefs.current[index] = el; }} // Correctly typing the ref
                    src={media.src}
                    // alt={`Albyrådet BotkyrkaChill video ${index + 1}`}
                  />
                )}
              </Card>
            ))}
          </Carousel>

          {/* Project Purpose and Goals */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Syfte och Mål
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Syftet med BotkyrkaChill är att arrangera sommarlovsaktiviteter för framför allt barn, men även ungdomar i Botkyrka.  
            Denna projektidé bildades av Albyrådet då vi såg ett behov av aktiviteter för barn och ungdomar i våra kvartersområden. 
            Följande tre mål eftersträvar vi att uppfylla under BotkyrkaChill:
          </Typography>
          <ol>
            <li>
              <Typography variant="body1">
                <strong>Kostnadsfria aktiviteter:</strong> Erbjuda barn och unga kostnadsfria ledarledda aktiviteter inom idrott och kultur.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Geografisk tillgänglighet:</strong> Tillse att dessa aktiviteter sker på olika kvartersområden. Detta i syfte att det blir lättillgängligt för barnen, men även för föräldrar att bevaka aktiviteterna.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Socialt fokus:</strong> Tillse att aktiviteterna för och främst sker på socioekonomiskt utsatta områden i Botkyrka.
              </Typography>
            </li>
          </ol>


          {/* Ung Innovation Alby (UIA) Project */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 6, mb: 3 }}>
            Ung Innovation Alby (UIA) - Innovationstävling för Ungdomar
          </Typography>

          <Carousel
            navButtonsAlwaysVisible={false} // Set to true if you want the navigation buttons to always be visible
            indicators={true} // Set to true if you want dots indicating the current slide
            autoPlay={true} // Set to true if you want the slides to auto-rotate
          >
            {innovation_images.map((image, index) => (
              <Card key={index} sx={{ mb: 5 }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 300, sm: 400, md: 600 }, // Adjust heights for different screen sizes
                    objectFit: 'cover', // Ensures the image covers the available space without stretching
                  }}
                  image={image}
                  alt={`Albyrådet Innovation ${index + 1}`}
                />
              </Card>
            ))}
          </Carousel>

          {/* UIA Description */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Om UIA
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
          Ung Innovation Alby är ett innovationsprojekt vars koncept arbetats fram av Albyrådets ungdomar under första kvartalet av 2024. UIA är en innovationstävling där ungdomar från hela Botkyrka kan tävla. 
          </Typography>

          {/* Purpose and Goals of UIA */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Syfte och Mål
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Syftet med Ung Innovation Alby är att främja kreativitet och innovativa idéer, samt inspirera till högre drömmar. Under projektet får ungdomar från Botkyrka utveckla och presentera egna innovations idéer. Enda kravet är att innovationsidéerna som ungdomarna framför måste ha samhällsnyttiga aspekter eller bidra till ett mer hållbar Botkyrka/samhälle. 
            Ungdomar från socioekonomiskt utsatta områden introduceras sällan till innovativt tänkande och skapande. Projektet UIA finns i syfte att öppna en dörr för alla de ungdomar som brinner för att skapa, utveckla och förändra. Ungdomar får under projektet en plattform för att utveckla sina idéer med hjälp av en erfaren innovationscoach som därefter även stöttar ungdomar som vill ta nästa steg inom entreprenörskap.
          </Typography>

          
        </Container>
      </Box>
    </>
  );
};

export default Projekt;
