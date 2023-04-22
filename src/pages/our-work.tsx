import OurWork from '@/features/our-work';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';
import GetInTouchSection from '@/features/home/components/get-in-touch-section';

export default function OurWorkPage() {
  return (
    <Container className={styles.pageContainer}>
      <Header />
      <OurWork />
      <GetInTouchSection />
      <Footer />
    </Container>
  );
}
