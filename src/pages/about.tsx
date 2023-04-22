import About from '@/features/about';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';

export default function AboutPage() {
  return (
    <Container className={styles.pageContainer}>
      <Header />
      <About />
      <Footer />
    </Container>
  );
}
