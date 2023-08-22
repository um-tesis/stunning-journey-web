import {useLazyQuery, useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../../shared/types';
import CustomTable from '../../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_DONATIONS} from '@/graphql/query/getOrganizationDonations';
import CsvDownloader from '@/features/shared/components/csv-downloader';

type Props = {
  user: UserData;
};

export default function SingleDonationTable({user}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  const {data, loading} = useQuery(GET_ORGANIZATION_DONATIONS, {
    variables,
  });

  const donations = data?.donationsByOrganization.donations;

  const totalPages = Math.ceil(data?.donationsByOrganization.total / ITEMS_PER_PAGE);

  // useLazyQuery for all data
  const [getDonationsForCsv] = useLazyQuery(GET_ORGANIZATION_DONATIONS);

  const handleDownload = async () => {
    const res = await getDonationsForCsv({variables: {organizationId: user.organizationId}});
    const allDonations = res.data?.donationsByOrganization?.donations;
    const allMappedDonations = allDonations.map((donation: any) => {
      return {
        donator: donation.donor.email,
        project: donation.project.name,
        amount: donation.amount,
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
      donator: donation.donor.email,
      project: donation.project.name,
      amount: donation.amount,
      date: convertDateFromIso(donation.createdAt),
    };
    return mappedDonation;
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const columnLabels = [
    {label: 'Donador', key: 'donator'},
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
