import {Container} from '@mui/material';
import styles from './styles.module.scss';
import Auth from '@/features/auth';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {UserData} from '@/features/shared/types';
import {GetServerSidePropsContext} from 'next';

export default function LoginPage() {
  return (
    <Container className={styles.pageContainer}>
      <Auth />
    </Container>
  );
}

export const getServerSideProps = withIronSessionSsr(async function (ctx: GetServerSidePropsContext) {
  const userData = ctx.req.session.user as UserData;

  if (userData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: userData ?? null,
    },
  };
}, ironSessionOptions);
