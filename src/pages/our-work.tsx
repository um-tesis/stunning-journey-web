import OurWork from '@/features/our-work';
import Footer from '@/features/shared/components/footer';
import Header from '@/features/shared/components/header';
import {Container} from '@mui/material';
import styles from './styles.module.scss';
import GetInTouchSection from '@/features/home/components/get-in-touch-section';
import {GetServerSidePropsContext} from 'next';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {UserData} from '@/features/shared/types';

type Props = {
  user: UserData | null;
};

export default function OurWorkPage({user}: Props) {
  return (
    <Container className={styles.pageContainer}>
      <Header user={user} />
      <OurWork />
      <GetInTouchSection />
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
