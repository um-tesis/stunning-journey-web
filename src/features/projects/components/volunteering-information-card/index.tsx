import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles.module.scss';
import {useQuery} from '@apollo/client';
import {GET_PROJECT_VOLUNTEERS} from '@/graphql/query/volunteersByProject';
import {Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import CustomTable from '@/features/shared/components/custom-table';
import PrimaryButton from '@/features/shared/components/primary-button';
import EmailVolunteersDrawer from '../email-volunteers-drawer';
import LoadHoursDrawer from '../load-hours-drawer';
import AddVolunteerDrawer from '../add-volunteer-drawer';

type Props = {
  projectId: number;
  organizationId: number;
};

export default function VolunteeringInformationCard({projectId, organizationId}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [showEmailVolunteersDrawer, setShowEmailVolunteersDrawer] = useState(false);
  const [showLoadHoursDrawer, setShowLoadHoursDrawer] = useState(false);
  const [showAddVolunteerDrawer, setShowAddVolunteerDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', projectId: +projectId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading, refetch} = useQuery(GET_PROJECT_VOLUNTEERS, {
    variables,
  });

  if (loading) return null;

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(data?.volunteersByProjectId.total / ITEMS_PER_PAGE);

  const volunteers = data?.volunteersByProjectId.volunteers;

  const mappedVolunteers = volunteers.map((volunteer: any) => {
    return {
      ...volunteer.user,
      hours: volunteer.hours ? volunteer.hours : 0,
    };
  });

  const handleOpenEmailVolunteersDrawer = () => {
    setShowEmailVolunteersDrawer(true);
  };

  const handleCloseEmailVolunteersDrawer = () => {
    setShowEmailVolunteersDrawer(false);
  };

  const handleOpenLoadHoursDrawer = () => {
    setShowLoadHoursDrawer(true);
  };

  const handleCloseLoadHoursDrawer = () => {
    setShowLoadHoursDrawer(false);
    refetch();
  };

  const handleOpenAddVolunteerDrawer = () => {
    setShowAddVolunteerDrawer(true);
  };

  const handleCloseAddVolunteerDrawer = () => {
    setShowAddVolunteerDrawer(false);
    refetch();
  };

  return (
    <>
      <Card className={styles.volunteeringData}>
        <CardContent>
          <Typography variant='h5' component='h2' className={styles.title}>
            <div>Voluntarios del Proyecto</div>
            <div className={styles.buttonsContainer}>
              <AddIcon className={styles.addButton} onClick={handleOpenAddVolunteerDrawer} />
              <PrimaryButton inverted onClick={handleOpenEmailVolunteersDrawer}>
                Contactar Voluntarios
              </PrimaryButton>
              <PrimaryButton inverted onClick={handleOpenLoadHoursDrawer}>
                Cargar Horas
              </PrimaryButton>
            </div>
          </Typography>
          <CustomTable
            data={mappedVolunteers}
            columnLabels={['Nombre', 'Correo Electrónico', 'Teléfono', 'Horas']}
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
        </CardContent>
      </Card>
      {showEmailVolunteersDrawer && (
        <EmailVolunteersDrawer projectId={projectId} onClose={handleCloseEmailVolunteersDrawer} />
      )}
      {showLoadHoursDrawer && (
        <LoadHoursDrawer
          projectId={projectId}
          onClose={handleCloseLoadHoursDrawer}
          volunteers={mappedVolunteers}
        />
      )}
      {showAddVolunteerDrawer && (
        <AddVolunteerDrawer
          organizationId={organizationId}
          onClose={handleCloseAddVolunteerDrawer}
          projectId={projectId}
        />
      )}
    </>
  );
}
