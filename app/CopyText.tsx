// app/components/CopyText.tsx
import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const CopyText = ({ text, color, align }: { text: string, color: string, align: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <Box sx={{ textAlign: align }}>
      <Typography variant="body2" color={color} display="inline">
        {text}
      </Typography>
      <IconButton onClick={copyToClipboard} size="small">
        <FileCopyIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CopyText;
