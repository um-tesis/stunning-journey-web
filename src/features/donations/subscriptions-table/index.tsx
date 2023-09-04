import {useLazyQuery, useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import CustomTable from '../../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_SUBSCRIPTIONS} from '@/graphql/query/getOrganizationSubscriptions';
import CsvDownloader from '@/features/shared/components/csv-downloader';
import {GET_PROJECT_SUBSCRIPTIONS} from '@/graphql/query/getProjectSubscriptions';

type Props = {
  entityId: number;
  isProjectData?: boolean;
};

export default function SubscriptionsTable({entityId, isProjectData}: Props) {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [csvData, setCsvData] = useState([]);

  const tableQuery = isProjectData ? GET_PROJECT_SUBSCRIPTIONS : GET_ORGANIZATION_SUBSCRIPTIONS;

  const variables = useMemo(
    () => ({
      page,
      itemsPerPage: ITEMS_PER_PAGE,
      filter: '',
      projectId: isProjectData ? entityId : undefined,
      organizationId: !isProjectData ? entityId : undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading} = useQuery(tableQuery, {
    variables,
  });

  // useLazyQuery for all data
  const [getSubscriptionsForCsv] = useLazyQuery(GET_ORGANIZATION_SUBSCRIPTIONS);

  const handleDownload = async () => {
    const res = await getSubscriptionsForCsv({
      variables: {
        projectId: isProjectData ? entityId : undefined,
        organizationId: !isProjectData ? entityId : undefined,
      },
    });
    const allSubscriptions = isProjectData
      ? res.data?.subscriptionsByProject?.subscriptions
      : res.data?.subscriptionsByOrganization?.subscriptions;
    const allMappedSubscriptions = allSubscriptions.map((subscription: any) => {
      return {
        payerEmail: subscription.payerEmail,
        project: subscription.project.name,
        amount: subscription.amount,
        frequencyInterval: subscription.frequencyInterval,
        status: subscription.status,
        date: convertDateFromIso(subscription.createdAt),
      };
    });
    setCsvData(allMappedSubscriptions);
  };

  if (loading) {
    return null;
  }

  const subscriptions = isProjectData
    ? data?.subscriptionsByProject.subscriptions
    : data?.subscriptionsByOrganization.subscriptions;

  const totalPages = Math.ceil(
    isProjectData
      ? data?.subscriptionsByProject.total / ITEMS_PER_PAGE
      : data?.subscriptionsByOrganization.total / ITEMS_PER_PAGE
  );
  const mappedSubscriptions = subscriptions.map((subscription: any) => {
    return {
      payerEmail: subscription.payerEmail,
      project: subscription.project.name,
      amount: subscription.amount,
      frequencyInterval: subscription.frequencyInterval,
      status: subscription.status,
      date: convertDateFromIso(subscription.createdAt),
    };
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const columnLabels = [
    {label: 'Email Donante', key: 'payerEmail'},
    {label: 'Proyecto', key: 'project'},
    {label: 'Monto', key: 'amount'},
    {label: 'Frecuencia', key: 'frequencyInterval'},
    {label: 'Estado', key: 'status'},
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
