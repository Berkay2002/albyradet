// app/Footer.tsx
'use client';

import React, { useContext } from 'react';
import { Grid, IconButton, Typography, Link, Box } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn'; 
import { MobileStateContext } from './MobileContext';



const Footer = () => {
  const { isMobile, isIpad, isDesktop } = useContext(MobileStateContext);

  // Helper function to apply margins consistently
  const getMarginStyle = () => ({
    marginLeft: isMobile ? 0 : '3%',
    marginRight: isMobile ? 0 : '3%',
  });

  return (
    <Box sx={{ ...getMarginStyle() }}>
      <Grid
        container
        sx={{
          backgroundColor: 'black',
          p: 3,
          paddingTop: '60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Logo Section */}
        <Grid item xs={12} md={4}>
          <Grid container justifyContent="center" alignItems="center">
              <Image src="/logo/Vit transparant.png" height={200} width={200} alt="Logo" />
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
              {/* Facebook Link */}
              <Link
                target="_blank"
                rel="noopener"
                href="https://sv-se.facebook.com/"
              >
                <IconButton color="secondary" aria-label="Facebook">
                  <FacebookRoundedIcon />
                </IconButton>
              </Link>
              {/* Instagram Link */}
              <Link
                target="_blank"
                rel="noopener"
                href="https://www.instagram.com/"
              >
                <IconButton color="secondary" aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
              </Link>
              {/* LinkedIn Link */}
              <Link
                target="_blank"
                rel="noopener"
                href="https://www.linkedin.com/"
              >
                <IconButton color="secondary" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={4} sx={{mt:3}}>
          <Typography color="white" align={isMobile ? 'center' : 'left'}>
            Org-nummer: 802513-0421 <br />
            Albyrådet <br />
            Alhagsvägen 42, tr 5 <br />
            145 59 Norsborg <br />
            kontakt@albyradet.se
          </Typography>
          <br />
        </Grid>


        {/* Social Media Section */}
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            padding: 1,
            m: 2,
          }}
        >
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
