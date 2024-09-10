// app/Footer.tsx
'use client';

import React, { useContext } from 'react';
import { Grid, IconButton, Typography, Link, Box } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';
import { MobileStateContext } from './MobileContext';

// Array containing link content for the footer
const linksContent = [
  { title: 'Link 1', path: '#' },
  { title: 'Link 2', path: '#' },
  { title: 'Link 3', path: '#' },
  { title: 'Link 4', path: '#' },
  { title: 'Link 5', path: '#' },
  { title: 'Link 6', path: '#' },
];

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
            <Image src="/logo/vit transparant.png" height={200} width={200} alt="Logo" />
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" color="white" align={isMobile ? 'center' : 'left'}>
            Kontakt
          </Typography>
          <Typography color="white" align={isMobile ? 'center' : 'left'}>
            Alby Rådet <br />
            +46 8 123 456 78 <br />
            info@albyradet.se
          </Typography>
          <br />
        </Grid>

        {/* Links Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" color="white" align={isMobile ? 'center' : 'left'}>
            Länkar
          </Typography>
          {linksContent.map((link, index) => (
            <Link target="_blank" rel="noopener" href={link.path} key={index}>
              <Typography color="white" align={isMobile ? 'center' : 'left'}>{link.title}</Typography>
            </Link>
          ))}
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
