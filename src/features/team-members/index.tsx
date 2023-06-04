import {useQuery} from '@apollo/client';
import {Grid, IconButton, Pagination, Typography} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_ADMINS} from '@/graphql/query/getOrganizationAdmins';
import AddTeamMemberDrawer from './add-team-member-drawer';

type Props = {
  user: UserData;
};

export default function TeamMembers({user}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading, refetch} = useQuery(GET_ORGANIZATION_ADMINS, {
    variables,
  });

  if (loading) {
    return null;
  }

  const members = data?.adminsByOrganizationId.admins;

  const totalPages = Math.ceil(data?.adminsByOrganizationId.total / ITEMS_PER_PAGE);

  const mappedMembers = members.map((member: any) => {
    return {
      ...member,
      createdAt: member.createdAt ? convertDateFromIso(member.createdAt) : undefined,
    };
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const closeAddMemberDrawer = () => {
    setIsAddMemberOpen(false);
    refetch();
  };

  return (
    <div className={styles.teamMembersContainer}>
      <Grid container spacing={5} justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h3' fontWeight='bold' color='primary' className={styles.title}>
            Miembros del Equipo
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setIsAddMemberOpen(true)}>
            <AddIcon className={styles.addButton} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            data={mappedMembers}
            columnLabels={['Nombre', 'Email', 'Teléfono', 'Fecha de Creación']}
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

      {isAddMemberOpen && (
        <AddTeamMemberDrawer onClose={closeAddMemberDrawer} organizationId={user.organizationId} />
      )}
    </div>
  );
}
