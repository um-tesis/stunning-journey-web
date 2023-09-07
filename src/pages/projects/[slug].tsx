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
import getConfig from 'next/config';
import client from '@/apollo-client';

const {
  publicRuntimeConfig: {processEnv},
} = getConfig();

type Props = {
  user: UserData | null;
  project: any;
};

export default function ProjectPage({user, project}: Props) {
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

  return (
    <Container className={styles.pageContainer}>
      <Head>
        <title>{project.name}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content={project.name} />
        <meta property='og:description' content={project.description} />
        <meta property='og:image' content={project.coverPhoto} />
        <meta property='og:url' content={processEnv.NEXT_PUBLIC_APP_BASE_URL + router.asPath} />
        <link rel='icon' href={project.coverPhoto} />
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

  const apolloClient = client;
  const slug = ctx.query.slug; // Make sure to get the slug similarly as you do in the component

  try {
    const {data} = await apolloClient.query({
      query: GET_PROJECT,
      variables: {slug},
    });
    const project = data?.projectBySlug;

    return {
      props: {
        user: userData ?? null,
        project, // pass the project data as a prop
      },
    };
  } catch (error) {
    // Handle error
    return {
      notFound: true, // This redirects to the 404 page
    };
  }
}, ironSessionOptions);
