import {useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../../shared/types';
import CustomTable from '../../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_SUBSCRIPTIONS} from '@/graphql/query/getOrganizationSubscriptions';

type Props = {
  user: UserData;
};

export default function SubscriptionsTable({user}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading} = useQuery(GET_ORGANIZATION_SUBSCRIPTIONS, {
    variables,
  });

  if (loading) {
    return null;
  }

  const subscriptions = data?.subscriptionsByOrganization.subscriptions;

  const totalPages = Math.ceil(data?.subscriptionsByOrganization.total / ITEMS_PER_PAGE);

  const mappedSubscriptions = subscriptions.map((subscription: any) => {
    const mappedSubscription = {
      donator: subscription.donor.email,
      project: subscription.project.name,
      amount: subscription.amount,
      frequencyInterval: subscription.frequencyInterval,
      status: subscription.status,
      billingDayOfMonth: subscription.billingDayOfMonth,
      date: convertDateFromIso(subscription.createdAt),
    };
    return mappedSubscription;
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Grid item xs={12}>
      <CustomTable
        data={mappedSubscriptions}
        columnLabels={[
          'Donador',
          'Proyecto',
          'Monto',
          'Frecuencia',
          'Estado',
          'Día de facturación',
          'Fecha de Inicio',
        ]}
      />
      {totalPages > 0 && (
        <Pagination
          page={page}
          className={styles.pagination}
          count={totalPages}
          onChange={onChangePage}
          color='primary'
        />
      )}
    </Grid>
  );
}
