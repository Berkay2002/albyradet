// app/Footer.tsx
'use client';

import React from 'react';
import { Grid, IconButton, Typography, Link, Box } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Image from 'next/image';

const linksContent = [
  { title: 'Link 1', path: '#' },
  { title: 'Link 2', path: '#' },
  { title: 'Link 3', path: '#' },
  { title: 'Link 4', path: '#' },
  { title: 'Link 5', path: '#' },
  { title: 'Link 6', path: '#' },
];

const Footer = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: 'black',
        p: 3,
        paddingTop: '60px',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={12} md={4}>
        <Grid container justifyContent="center" alignItems="center">
            <Image src="/logo/Vit transparant.png" height={200} width={200} alt="Logo" />
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              target="_blank"
              rel="noopener"
              href="https://sv-se.facebook.com/mtsektionen/"
            >
              <IconButton color="secondary" aria-label="Facebook">
                <FacebookRoundedIcon />
              </IconButton>
            </Link>
            <Link
              target="_blank"
              rel="noopener"
              href="https://www.instagram.com/mtsektionen/?hl=en"
            >
              <IconButton color="secondary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" color="white">
          Kontakt
        </Typography>
        <Typography color="white">
          Alby Rådet <br />
          Norra Botkyrka <br />
            145 57 Norsborg
        </Typography>
        <br />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="body2" color="#Ffff00" display="inline">
            info@albyradet.se
          </Typography>
          <IconButton
            onClick={() => copyToClipboard('info@medieteknik.nu')}
            size="small"
          >
            <FileCopyIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" color="white">
          Länkar
        </Typography>
        {linksContent.map((link, index) => (
          <Link target="_blank" rel="noopener" href={link.path} key={index}>
            <Typography color="white">{link.title}</Typography>
          </Link>
        ))}
      </Grid>
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
  );
};

export default Footer;
