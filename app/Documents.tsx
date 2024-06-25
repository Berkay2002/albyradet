// app/sektionen/Documents.tsx
'use client';

import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const documents = [
  {
    title: 'Protokoll 1',
    date: '2023-01-01',
    content: 'Here is the detailed content of Protokoll 1.',
    link: '/path/to/protokoll1.pdf'
  },
  {
    title: 'Protokoll 2',
    date: '2023-02-01',
    content: 'Here is the detailed content of Protokoll 2.',
    link: '/path/to/protokoll2.pdf'
  },
  {
    title: 'Stadgar 1',
    date: '2023-01-01',
    content: 'Here is the detailed content of Stadgar 1.',
    link: '/path/to/stadgar1.pdf'
  },
  // Add more documents here
];

const Documents = () => {
  return (
    <div>
      {documents.map((doc, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{doc.title} - {doc.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              {doc.content}
            </Typography>
            <Typography variant="body2" color="primary">
              <a href={doc.link} target="_blank" rel="noopener noreferrer">Läs mer</a>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Documents;
