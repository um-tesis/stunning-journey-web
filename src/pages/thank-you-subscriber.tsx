import Header from '@/features/shared/components/header';
import {GET_PROJECT} from '@/graphql/query/getProject';
import {GET_SUBSCRIPTION} from '@/graphql/query/getSubscription';
import {useQuery} from '@apollo/client';
import {Alert, AlertTitle, Box, CircularProgress, Container} from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';
import ThankYou from '@/features/thank-you';
import {withIronSessionSsr} from 'iron-session/next';
import {ironSessionOptions} from '@/lib/utils/iron-session';

type ThankYouSubscriberPageProps = {
  user: any;
  preapprovalId: string;
};

export default function ThankYouSubscriberPage({user, preapprovalId}: ThankYouSubscriberPageProps) {
  const {data, error, loading} = useQuery(GET_SUBSCRIPTION, {
    variables: {mpSubscriptionId: preapprovalId},
  });

  const slug = data?.subscriptionByMpId?.project?.slug;

  const {
    data: projectData,
    error: projectError,
    loading: projectLoading,
  } = useQuery(GET_PROJECT, {
    variables: {slug},
    skip: !slug, // Important: we skip the query if we don't have the slug.
  });

  if (loading || projectLoading) return <CircularProgressComponent />;
  if (error || projectError) return <ErrorComponent error={error} projectError={projectError} />;

  return (
    <Container className={styles.pageContainer} sx={{background: 'white !important'}}>
      <Header user={user} />
      <ThankYouComponent
        preapprovalId={preapprovalId}
        status={data?.subscriptionByMpId?.status}
        projectData={projectData}
      />
    </Container>
  );
}

const CircularProgressComponent = () => (
  <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m: 3}}>
    <CircularProgress />
  </Box>
);

const ErrorComponent = ({error, projectError}: any) => (
  <Box sx={{display: 'flex', alignItems: 'center', m: 3}}>
    <Alert severity='error'>
      <AlertTitle>Unexpected error</AlertTitle>
      {error?.message || projectError?.message}
    </Alert>
  </Box>
);

const ThankYouComponent = ({preapprovalId, status, projectData}: any) => (
  <ThankYou paymentId={preapprovalId} status={status} projectName={projectData?.projectBySlug?.name} />
);

export const getServerSideProps = withIronSessionSsr(async function (ctx) {
  const userData = ctx.req.session.user;
  const preapprovalId = ctx.query?.preapproval_id as string;

  return {
    props: {
      user: userData ?? null,
      preapprovalId,
    },
  };
}, ironSessionOptions);
