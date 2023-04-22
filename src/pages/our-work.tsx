import OurWork from '@/features/our-work';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';

export default function OurWorkPage() {
  return (
    <Container className={styles.pageContainer}>
      <Header />
      <OurWork />
      <Footer />
    </Container>
  );
}
