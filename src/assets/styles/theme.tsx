import {createTheme} from '@mui/material';
import {DM_Sans} from '@next/font/google';

export const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const primaryColor = '#5d5a88';
const secondaryColor = '#473BF0';

export default createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
    fontSize: 18,
    h1: {
      color: primaryColor,
    },
    h2: {
      color: primaryColor,
    },
    h3: {
      color: primaryColor,
    },
    h4: {
      color: primaryColor,
    },
    h5: {
      color: primaryColor,
    },
    h6: {
      color: primaryColor,
    },
  },
});
