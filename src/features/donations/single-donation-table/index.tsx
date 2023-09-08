import {useLazyQuery, useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import CustomTable from '../../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_DONATIONS} from '@/graphql/query/getOrganizationDonations';
import CsvDownloader from '@/features/shared/components/csv-downloader';
import {GET_PROJECT_DONATIONS} from '@/graphql/query/getProjectDonations';

type Props = {
  entityId: number;
  isProjectData?: boolean;
};

export default function SingleDonationTable({entityId, isProjectData}: Props) {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [csvData, setCsvData] = useState([]);

  const tableQuery = isProjectData ? GET_PROJECT_DONATIONS : GET_ORGANIZATION_DONATIONS;
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

  const donations = isProjectData
    ? data?.donationsByProject.donations
    : data?.donationsByOrganization.donations;

  const totalPages = Math.ceil(
    isProjectData
      ? data?.donationsByProject.total / ITEMS_PER_PAGE
      : data?.donationsByOrganization.total / ITEMS_PER_PAGE
  );

  // useLazyQuery for all data
  const [getDonationsForCsv] = useLazyQuery(tableQuery);

  const handleDownload = async () => {
    const res = await getDonationsForCsv({
      variables: {
        projectId: isProjectData ? entityId : undefined,
        organizationId: !isProjectData ? entityId : undefined,
      },
    });
    const allDonations = isProjectData
      ? res.data?.donationsByProject?.donations
      : res.data?.donationsByOrganization?.donations;
    const allMappedDonations = allDonations.map((donation: any) => {
      return {
        donator: donation.donor.email,
        project: donation.project.name,
        amount: donation.amount / 100,
        date: convertDateFromIso(donation.createdAt),
      };
    });
    setCsvData(allMappedDonations);
  };

  if (loading || !donations) {
    return null;
  }

  const mappedDonations = donations.map((donation: any) => {
    const mappedDonation = {
      donator: donation?.donor.email,
      donatorName: donation?.donor.firstName,
      donatorId: donation?.donor.identification,
      project: donation.project.name,
      amount: donation.amount / 100,
      date: convertDateFromIso(donation.createdAt),
    };
    return mappedDonation;
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const columnLabels = [
    {label: 'Correo electrónico', key: 'donator'},
    {label: 'Nombre', key: 'donatorName'},
    {label: 'CI', key: 'donatorId'},
    {label: 'Proyecto', key: 'project'},
    {label: 'Monto', key: 'amount'},
    {label: 'Fecha', key: 'date'},
  ];

  return (
    <Grid container spacing={5} justifyContent='space-between' alignItems='center'>
      <Grid item>
        <CsvDownloader
          data={csvData}
          columnLabels={columnLabels}
          handleDownload={handleDownload}
          filename={'Donaciones-puntuales.csv'}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTable data={mappedDonations} columnLabels={columnLabels} />
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
