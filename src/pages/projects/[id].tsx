import ProjectSummary from '@/features/projects/components/project-summary';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import {useQuery} from '@apollo/client';
import {GET_PROJECT} from '@/graphql/query/getProject';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import {GetServerSidePropsContext} from 'next';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {UserData} from '@/features/shared/types';

type Props = {
  user: UserData | null;
};

export default function ProjectPage({user}: Props) {
  const router = useRouter();
  const id = +router.query.id!;

  const {data, loading} = useQuery(GET_PROJECT, {
    variables: {id},
  });

  if (loading) return null;

  return (
    <Container className={styles.pageContainer}>
      <Header user={user} />
      <ProjectSummary project={data.project} />
      <Footer />
    </Container>
  );
}

export const getServerSideProps = withIronSessionSsr(async function (ctx: GetServerSidePropsContext) {
  const userData = ctx.req.session.user as UserData;

  return {
    props: {
      user: userData ?? null,
    },
  };
}, ironSessionOptions);
