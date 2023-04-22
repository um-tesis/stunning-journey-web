import ProjectSummary from '@/features/projects/components/project-summary';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import {useQuery} from '@apollo/client';
import {GET_PROJECT} from '@/graphql/query/getProject';
import {useRouter} from 'next/router';

export default function ProjectPage() {
  const router = useRouter();
  const {data, loading} = useQuery(GET_PROJECT, {
    variables: {id: 1},
  });

  console.log(data);

  if (loading) return null;

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
      <ProjectSummary project={data.project} />
      <Footer />
    </Container>
  );
}
