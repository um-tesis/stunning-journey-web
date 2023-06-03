import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';
import {GetServerSidePropsContext} from 'next';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {UserData} from '@/features/shared/types';
import OurProjects from '@/features/our-projects';

type Props = {
  user: UserData;
};

export default function OurProjectsPage({user}: Props) {
  return (
    <Container className={styles.pageContainer}>
      <Header user={user} />
      <OurProjects user={user} />
    </Container>
  );
}

export const getServerSideProps = withIronSessionSsr(async function (ctx: GetServerSidePropsContext) {
  const userData = ctx.req.session.user as UserData;

  if (!userData || userData.role !== 'ORGADMIN') {
    return {
      redirect: {
        destination: '/login',
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
