import Header from '@/features/shared/components/header';
import {CircularProgress, Container} from '@mui/material';
import styles from './styles.module.scss';
import {GetServerSidePropsContext} from 'next';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';
import {UserData} from '@/features/shared/types';
import ThankYou from '@/features/thank-you';
import {useQuery} from '@apollo/client';
import {GET_PROJECT} from '@/graphql/query/getProject';

export default function ThankYouPage({user, query, projectSlug}: any) {
  const {data, loading} = useQuery(GET_PROJECT, {
    variables: {slug: projectSlug},
  });

  return (
    <Container className={styles.pageContainer} sx={{background: 'white !important'}}>
      <Header user={user} />
      {loading ? (
        <CircularProgress />
      ) : (
        <ThankYou paymentId={query.payment_id} status={query.status} projectName={data.projectBySlug.name} />
      )}
    </Container>
  );
}

export const getServerSideProps = withIronSessionSsr(async function (ctx: GetServerSidePropsContext) {
  const userData = ctx.req.session.user as UserData;
  const projectSlug = ctx.query?.external_reference as string;

  return {
    props: {
      user: userData ?? null,
      query: ctx.query,
      projectSlug,
    },
  };
}, ironSessionOptions);
