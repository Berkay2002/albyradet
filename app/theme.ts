// app/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFEB3B', // Yellow
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#FFFFFF', // White
    },
    text: {
      primary: '#000000', // Black
      secondary: '#FFFFFF', // White
    },
  },
  typography: {
    h1: {
      color: '#000000', // Black
    },
    body1: {
      color: '#000000', // Black
    },
  },
});

export default theme;
