import {useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../../shared/types';
import CustomTable from '../../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_DONATIONS} from '@/graphql/query/getOrganizationDonations';

type Props = {
  user: UserData;
};

export default function SingleDonationTable({user}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading} = useQuery(GET_ORGANIZATION_DONATIONS, {
    variables,
  });

  if (loading) {
    return null;
  }

  const donations = data?.donationsByOrganization.donations;

  const totalPages = Math.ceil(data?.donationsByOrganization.total / ITEMS_PER_PAGE);

  const mappedDonations = donations.map((donation: any) => {
    const mappedDonation = {
      donator: donation.donor.email,
      project: donation.project.name,
      amount: donation.amount,
      date: convertDateFromIso(donation.createdAt),
      mpPreferenceId: donation.mpPreferenceId,
    };
    return mappedDonation;
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Grid item xs={12}>
      <CustomTable
        data={mappedDonations}
        columnLabels={['Donador', 'Proyecto', 'Monto', 'Fecha', 'ID de pago']}
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
