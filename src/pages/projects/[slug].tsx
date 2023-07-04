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
import {SYSTEM_ROLES} from '@/lib/utils/constants';
import {useState} from 'react';
import UpdateProjectDrawer from '@/features/our-projects/components/update-project-drawer';
import ProjectOverview from '@/features/projects/components/project-overview';
import Head from 'next/head';

type Props = {
  user: UserData | null;
};

export default function ProjectPage({user}: Props) {
  const router = useRouter();
  const slug = router.query.slug!;

  const [isUpdateProjectDrawerOpen, setIsUpdateProjectDrawerOpen] = useState<boolean>(false);

  const handleCloseUpdateProjectDrawer = () => {
    setIsUpdateProjectDrawerOpen(false);
    refetch();
  };

  const handleOpenUpdateProjectDrawer = () => {
    setIsUpdateProjectDrawerOpen(true);
  };

  const {data, loading, refetch} = useQuery(GET_PROJECT, {
    variables: {slug},
  });

  if (loading) return null;

  if (!data) {
    router.push('/404');
    return null;
  }

  const project = data.projectBySlug;

  return (
    <Container className={styles.pageContainer}>
      <Head>
        <title>{project.name}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content={project.name} />
        <meta property='og:description' content={project.description} />
        <meta property='og:image' content={project.coverPhoto} />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_APP_BASE_URL + router.asPath} />
      </Head>
      <Header user={user} />

      {user?.role === SYSTEM_ROLES.ORGADMIN && project.organizationId === user?.organizationId ? (
        <>
          <ProjectSummary project={project} handleOpenUpdateProjectDrawer={handleOpenUpdateProjectDrawer} />
          {isUpdateProjectDrawerOpen && (
            <UpdateProjectDrawer project={project} onClose={handleCloseUpdateProjectDrawer} />
          )}
        </>
      ) : (
        <ProjectOverview project={project} />
      )}

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
