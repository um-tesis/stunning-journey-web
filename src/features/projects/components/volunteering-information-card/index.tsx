import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import styles from './styles.module.scss';
import {useQuery} from '@apollo/client';
import {GET_PROJECT_VOLUNTEERS} from '@/graphql/query/volunteersByProject';
import {Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import CustomTable from '@/features/shared/components/custom-table';

type Props = {
  projectId: number;
};

export default function VolunteeringInformationCard({projectId}: Props) {
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', projectId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading} = useQuery(GET_PROJECT_VOLUNTEERS, {
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

  return (
    <Card className={styles.volunteeringData}>
      <CardContent>
        <Typography variant='h5' component='h2' className={styles.title}>
          Project Volunteers
          <EditIcon className={styles.editIcon} />
        </Typography>
        <CustomTable data={mappedVolunteers} columnLabels={['Name', 'Email', 'Phone', 'Hours']} />
        {totalPages > 0 && (
          <Pagination
            className={styles.pagination}
            count={totalPages}
            onChange={onChangePage}
            color='primary'
          />
        )}
      </CardContent>
    </Card>
  );
}
