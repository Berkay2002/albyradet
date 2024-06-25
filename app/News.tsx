// app/News.tsx
'use client';

import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

const newsItems = [
  {
    title: '1 WEEK TO GO',
    image: '/path/to/image1.jpg',
    description: 'Power to the People',
    link: 'https://www.facebook.com/link-to-post1',
  },
  {
    title: 'Stop Denying the Earth\'s Dying',
    image: '/path/to/image2.jpg',
    description: 'We can\'t drink oil',
    link: 'https://www.facebook.com/link-to-post2',
  },
  {
    title: 'England could produce 13 times more renewable energy',
    image: '/path/to/image3.jpg',
    description: 'Using less than 3% of land - analysis',
    link: 'https://www.facebook.com/link-to-post3',
  },
  // Add more news items here
];

const News = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        LIKE & FOLLOW US!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {newsItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ height: 140 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Button size="small" color="primary" href={item.link} target="_blank">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
