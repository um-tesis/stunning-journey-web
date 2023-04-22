import ProjectSummary from '@/features/projects/components/project-summary';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import {useQuery} from '@apollo/client';
import {GET_PROJECT} from '@/graphql/query/getProject';
import styles from './styles.module.scss';

export default function ProjectPage() {
  const {data, loading} = useQuery(GET_PROJECT, {
    variables: {id: 1},
  });

  if (loading) return null;

  return (
    <Container className={styles.pageContainer}>
      <Header />
      <ProjectSummary project={data.project} />
      <Footer />
    </Container>
  );
}
