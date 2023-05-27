import {createTheme} from '@mui/material';
import {DM_Sans} from '@next/font/google';

export const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export default createTheme({
  palette: {
    primary: {
      main: '#5d5a88', // Set your primary color
    },
    secondary: {
      main: '#473BF0', // Set your secondary color
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily, // Set your default font family
    fontSize: 18,
  },
  // Add more properties as desired
});
