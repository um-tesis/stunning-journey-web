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

type Props = {
  user: UserData | null;
};

export default function ProjectsPage({user}: Props) {
  return (
    <Container className={styles.pageContainer}>
      <Head>
        <title>Libera</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content='Libera' />
        <meta property='og:description' content='Navege los proyectos de Libera!' />
        <meta property='og:image' content={'/collaboration.jpeg'} />
        <meta property='og:url' content={window.location.href} />
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
