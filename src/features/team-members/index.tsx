import {useLazyQuery, useQuery} from '@apollo/client';
import {Grid, IconButton, Pagination, Typography} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import {GET_ORGANIZATION_ADMINS} from '@/graphql/query/getOrganizationAdmins';
import AddTeamMemberDrawer from './add-team-member-drawer';
import CsvDownloader from '../shared/components/csv-downloader';

type Props = {
  user: UserData;
};

export default function TeamMembers({user}: Props) {
  const ITEMS_PER_PAGE = 10;
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading, refetch} = useQuery(GET_ORGANIZATION_ADMINS, {
    variables,
  });

  // useLazyQuery for all data
  const [getTeamMembersForCsv] = useLazyQuery(GET_ORGANIZATION_ADMINS);

  const handleDownload = async () => {
    const res = await getTeamMembersForCsv({variables: {organizationId: user.organizationId}});
    const allTeamMembers = res.data?.adminsByOrganizationId?.admins;
    const allMappedTeamMembers = allTeamMembers.map((member: any) => {
      return {
        ...member,
        createdAt: member.createdAt ? convertDateFromIso(member.createdAt) : undefined,
      };
    });
    setCsvData(allMappedTeamMembers);
  };

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

  const columnLabels = [
    {label: 'Nombre', key: 'name'},
    {label: 'Email', key: 'email'},
    {label: 'Teléfono', key: 'phone'},
    {label: 'Fecha de Creación', key: 'createdAt'},
  ];

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
          <CsvDownloader
            data={csvData}
            columnLabels={columnLabels}
            handleDownload={handleDownload}
            filename={'Miembros-del-Equipo.csv'}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTable data={mappedMembers} columnLabels={columnLabels} />
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
