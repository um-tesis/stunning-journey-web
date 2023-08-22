import {useLazyQuery, useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../../shared/types';
import CustomTable from '../../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_SUBSCRIPTIONS} from '@/graphql/query/getOrganizationSubscriptions';
import CsvDownloader from '@/features/shared/components/csv-downloader';

type Props = {
  user: UserData;
};

export default function SubscriptionsTable({user}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading} = useQuery(GET_ORGANIZATION_SUBSCRIPTIONS, {
    variables,
  });

  // useLazyQuery for all data
  const [getSubscriptionsForCsv] = useLazyQuery(GET_ORGANIZATION_SUBSCRIPTIONS);

  const handleDownload = async () => {
    const res = await getSubscriptionsForCsv({variables: {organizationId: user.organizationId}});
    const allSubscriptions = res.data?.subscriptionsByOrganization?.subscriptions;
    const allMappedSubscriptions = allSubscriptions.map((subscription: any) => {
      return {
        donator: subscription.donor.email,
        project: subscription.project.name,
        amount: subscription.amount,
        frequencyInterval: subscription.frequencyInterval,
        status: subscription.status,
        billingDayOfMonth: subscription.billingDayOfMonth,
        date: convertDateFromIso(subscription.createdAt),
      };
    });
    setCsvData(allMappedSubscriptions);
  };

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

  const columnLabels = [
    {label: 'Donante', key: 'donator'},
    {label: 'Proyecto', key: 'project'},
    {label: 'Monto', key: 'amount'},
    {label: 'Frecuencia', key: 'frequencyInterval'},
    {label: 'Estado', key: 'status'},
    {label: 'Día de facturación', key: 'billingDayOfMonth'},
    {label: 'Fecha de Inicio', key: 'date'},
  ];

  return (
    <Grid container spacing={5} justifyContent='space-between' alignItems='center'>
      <Grid item>
        <CsvDownloader
          data={csvData}
          columnLabels={columnLabels}
          handleDownload={handleDownload}
          filename={'Suscripciones.csv'}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTable data={mappedSubscriptions} columnLabels={columnLabels} />
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
    </Grid>
  );
}
