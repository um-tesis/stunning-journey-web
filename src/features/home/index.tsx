import {Box} from '@mui/material';
import Header from '../shared/components/header';

export default function Home() {
  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <Header />
      <h1>This is the home page</h1>
    </Box>
  );
}
