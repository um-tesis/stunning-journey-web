import {useQuery} from '@apollo/client';
import {Grid, Pagination, Typography} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import CustomTable from '../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {useRouter} from 'next/router';
import {GET_ORGANIZATION_DONORS} from '@/graphql/query/getOrganizationDonors';

type Props = {
  user: UserData;
};

export default function Donors({user}: Props) {
  const router = useRouter();
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading, refetch} = useQuery(GET_ORGANIZATION_DONORS, {
    variables,
  });

  if (loading) {
    return null;
  }

  const donors = data?.donorsByOrganization.donors;

  const totalPages = Math.ceil(data?.donorsByOrganization.total / ITEMS_PER_PAGE);

  const mappedDonors = donors.map((donor: any) => {
    const mappedDonor = {
      ...donor,
      createdAt: convertDateFromIso(donor.createdAt),
    };
    return mappedDonor;
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const goToProject = (row: any) => {
    router.push(`/projects/${row.slug}`);
  };

  return (
    <div className={styles.donorsContainer}>
      <Grid container spacing={5} justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h3' fontWeight='bold' color='primary' className={styles.title}>
            Donadores
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            data={mappedDonors}
            columnLabels={[
              'Correo electrónico',
              'Identificación',
              'Tipo de Identificación',
              'Medio de Pago',
              'Tarjeta',
              'Fecha de registro',
            ]}
            onClickRow={goToProject}
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
      </Grid>
    </div>
  );
}
