"use client";
import Link from 'next/link';


import React from 'react';
import { Container, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import Image from 'next/image'; // Assuming you are using Next.js for image optimization
import Header from '../header'; // Importing the Header component
import { useContext } from 'react';
import { MobileStateContext } from '../MobileContext'; // Assuming you are using MobileContext for device detection
import Carousel from 'react-material-ui-carousel';

const images = [
  "/sektionen/sektionenImage.jpeg",
  "/sektionen/sektionenImage.jpeg",
  "/sektionen/sektionenImage.jpeg",
];

const BliMedlem = () => {
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
        title="BLI MEDLEM" 
        description="Är du ung och bor i Botkyrka? Engagera dig idag!"
        imageUrl={isMobile ? '/sektionen/styrelsen-mobil.jpeg' : '/sektionen/styrelsen-mobil.jpeg'}
      />


      {/* Page content with same background and structure as the home page */}
      <Box sx={{ backgroundColor: '#F0F0F0', py: 10, ...getMarginStyle() }}>  {/* Matching the home page background */}
        <Container maxWidth="lg">
          
          {/* Introduction Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Engagera dig i Albyrådet
          </Typography>

          {/* Main Text Section */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Varför bli medlem?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Är du ung och bor i Botkyrka? Är du engagerad och brinner för att förvandla Botkyrka till en bättre plats? Vill du hitta gemenskap med andra som brinner för samma sak som du? Bli medlem i Albyrådet! Hos oss får du möjligheten att engagera dig i frågor som du brinner för i Alby och Norra Botkyrka.
          </Typography>

          
          {/* Last Image */}
          <Carousel
            navButtonsAlwaysVisible={false} // Set to true if you want the navigation buttons to always be visible
            indicators={true} // Set to true if you want dots indicating the current slide
            autoPlay={true} // Set to true if you want the slides to auto-rotate
          >
            {images.map((image, index) => (
              <Card key={index} sx={{ mb: 5 }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 200, sm: 400, md: 500 }, // Adjust heights for different screen sizes
                    objectFit: 'cover', // Ensures the image covers the available space without stretching
                  }}
                  image={image}
                  alt={`Albyrådet medlemmar ${index + 1}`}
                />
              </Card>
            ))}
          </Carousel>


          {/* Membership Benefits */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Vad får du som medlem?
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                <strong>Gemenskap:</strong> Hitta andra ungdomar som delar dina intressen och engagemang för lokalsamhället.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Påverka din ort:</strong> Du får en möjlighet att påverka och förbättra Alby och Norra Botkyrka genom projekt och aktiviteter.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Ledarskap och erfarenhet:</strong> Engagera dig i projekt och evenemang där du får ledarskapserfarenhet och utvecklar dina kunskaper.
              </Typography>
            </li>
          </ul>

          {/* Call to Action Button */}
          <Box sx={{ textAlign: 'center', my: 5 }}>
            <Link href="/medlemansokan" passHref>
              <Button 
                variant="contained" 
                sx={{ backgroundColor: '#FFA500', '&:hover': { backgroundColor: '#e59400' } }} 
                size="large"
              >
                Bli Medlem Nu!
              </Button>
            </Link>
          </Box>



        </Container>
      </Box>
    </>
  );
};

export default BliMedlem;
