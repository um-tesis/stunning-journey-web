import Projects from '@/features/projects';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';

export default function ProjectsPage() {
  return (
    <Container className={styles.pageContainer}>
      <Header />
      <Projects />
      <Footer />
    </Container>
  );
}
