// app/pages/kontakta-oss.tsx
'use client';

import React from 'react';
import { Container, Grid, Typography, Box, Button, TextField, Divider } from '@mui/material';
import { useFormik } from 'formik';
import GoogleMapReact from 'google-map-react';
import Header from '../header';
import MapMarker from '../MapMarker';



const Kontakt = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Header title="KONTAKTA OSS" backgroundImage="/sektionen/sektionenImage.jpeg" />

      <Divider sx={{ my: 6 }} />  

      <Container className="kontakta-oss" sx={{ backgroundColor: '#ffffff', py: 8, maxWidth: 'lg' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '20px' }}>
          Kontakta oss
        </Typography>

        <Grid container spacing={4} justifyContent="center">

          <Grid item xs={12} md={5}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Namn"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Mail Address"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Mobil Nummer"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Meddelande"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Skicka meddelande
              </Button>
            </form>
          </Grid>
        </Grid>
        
      </Container>
    </>
  );
};

export default Kontakt;
