import About from '@/features/about';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';

export default function AboutPage() {
  return (
    <Container
      sx={{
        backgroundColor: '#9795B5',
        minWidth: '100%',
        margin: 0,
        padding: '0 !important',
        height: '100%',
        overflowY: 'auto !important',
      }}
    >
      <Header />
      <About />
      <Footer />
    </Container>
  );
}
