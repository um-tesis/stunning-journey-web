import Projects from '@/features/projects';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';
import {GetServerSidePropsContext} from 'next';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {UserData} from '@/features/shared/types';
import Head from 'next/head';
import {useRouter} from 'next/router';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: {processEnv},
} = getConfig();

type Props = {
  user: UserData | null;
};

export default function ProjectsPage({user}: Props) {
  const router = useRouter();

  return (
    <Container className={styles.pageContainer}>
      <Head>
        <title>Libera</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content='Libera' />
        <meta property='og:description' content='Navege los proyectos de Libera!' />
        <meta property='og:image' content={'/collaboration.jpeg'} />
        <meta property='og:url' content={processEnv.NEXT_PUBLIC_APP_BASE_URL + router.asPath} />
      </Head>

      <Header user={user} />
      <Projects />
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
