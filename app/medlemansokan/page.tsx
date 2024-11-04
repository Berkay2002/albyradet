'use client';

import React from 'react';
import { Container, Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import Header from '../header'; // Importing the Header component
import { useContext } from 'react';
import { MobileStateContext } from '../MobileContext'; // Assuming you are using MobileContext for device detection

const Medlemsansokan = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isMobile, isIpad } = useContext(MobileStateContext);

  // Define the getMarginStyle function based on the isMobile and isIpad values
  const getMarginStyle = () => ({
    marginLeft: isMobile || isIpad ? 0 : '3%',
    marginRight: isMobile || isIpad ? 0 : '3%',
  });


  const onSubmit = async (data: Record<string, any>) => {
    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert('Tack för din ansökan! Vi kommer att kontakta dig snart.');
      } else {
        const result = await response.json();
        alert(`Något gick fel: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting the application:', error);
      alert('Ett fel inträffade när ansökan skulle skickas. Försök igen senare.');
    }
  };

  return (
    
    <>
      {/* Use the Header component */}
      <Header
        title="MEDLEMSANSÖKAN" 
        description=""
        imageUrl={isMobile ? '/sektionen/styrelsen-mobil.jpeg' : '/sektionen/styrelsen-mobil.jpeg'}
      />


    
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Medlemsansökan
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="För- och efternamn"
          {...register('name', { required: 'För- och efternamn är obligatoriskt' })}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name ? String(errors.name.message) : ''}
        />
        <TextField
          fullWidth
          label="Personnummer"
          {...register('personalNumber', { required: 'Personnummer är obligatoriskt' })}
          margin="normal"
          error={!!errors.personalNumber}
          helperText={errors.personalNumber ? String(errors.personalNumber.message) : ''}
        />
        <TextField
          fullWidth
          label="Adress"
          {...register('address', { required: 'Adress är obligatoriskt' })}
          margin="normal"
          error={!!errors.address}
          helperText={errors.address ? String(errors.address.message) : ''}
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
          label="E-postadress"
          type="email"
          {...register('email', { required: 'E-post är obligatoriskt', pattern: { value: /^\S+@\S+$/i, message: 'Ogiltig e-postadress' } })}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email ? String(errors.email.message) : ''}
        />
        <TextField
          fullWidth
          label="Vad är din sysselsättning just nu?"
          {...register('occupation', { required: 'Sysselsättning är obligatoriskt' })}
          margin="normal"
          error={!!errors.occupation}
          helperText={errors.occupation ? String(errors.occupation.message) : ''}
        />
        <TextField
          fullWidth
          label="Hur hittade du till oss?"
          {...register('howFound', { required: 'Detta fält är obligatoriskt' })}
          margin="normal"
          error={!!errors.howFound}
          helperText={errors.howFound ? String(errors.howFound.message) : ''}
        />
        <TextField
          fullWidth
          label="Här kan du skicka med en hälsning till oss (valfritt)"
          {...register('greeting')}
          margin="normal"
          multiline
          rows={4}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 3, 
            backgroundColor: '#FFA500', 
            '&:hover': { backgroundColor: '#e59400' } 
          }}
        >
          Skicka ansökan
        </Button>
      </form>
    </Container>
    </>
  );
};

export default Medlemsansokan;
