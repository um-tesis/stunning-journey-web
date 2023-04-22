import About from '@/features/about';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';
import GetInTouchSection from '@/features/home/components/get-in-touch-section';

export default function AboutPage() {
  return (
    <Container className={styles.pageContainer}>
      <Header />
      <About />
      <GetInTouchSection />
      <Footer />
    </Container>
  );
}
