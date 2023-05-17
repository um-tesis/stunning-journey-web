import {useQuery} from '@apollo/client';
import {Pagination, Typography} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {GET_OUR_PROJECTS} from '@/graphql/query/getOurProjects';
import {UserData} from '../shared/types';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import AddProjectDrawer from './components/add-project-drawer';
import {useRouter} from 'next/router';

type Props = {
  user: UserData;
};

export default function OurProjects({user}: Props) {
  const router = useRouter();
  const ITEMS_PER_PAGE = 5;
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading, refetch} = useQuery(GET_OUR_PROJECTS, {
    variables,
  });

  const projects = data?.organizationProjects.projects;

  const totalPages = Math.ceil(data?.organizationProjects.total / ITEMS_PER_PAGE);

  if (loading) {
    return null;
  }

  const mappedProjects = projects.map((project: any) => {
    return {
      ...project,
      startDate: project.startDate ? convertDateFromIso(project.startDate) : undefined,
      endDate: project.endDate ? convertDateFromIso(project.endDate) : undefined,
    };
  });

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const closeAddProjectDrawer = () => {
    setIsAddProjectOpen(false);
    refetch();
  };

  const goToProject = (row: any) => {
    router.push(`/projects/${row.id}`);
  };

  return (
    <div className={styles.ourProjectsContainer}>
      <Typography variant='h1' className={styles.title}>
        Our Projects <AddIcon className={styles.addButton} onClick={() => setIsAddProjectOpen(true)} />
      </Typography>
      <CustomTable
        data={mappedProjects}
        columnLabels={['Name', 'Field', 'Start Date', 'End Date', 'Monetary Objective']}
        onClickRow={goToProject}
      />
      {totalPages > 0 && (
        <Pagination
          className={styles.pagination}
          count={totalPages}
          onChange={onChangePage}
          color='primary'
        />
      )}
      {isAddProjectOpen && (
        <AddProjectDrawer onClose={closeAddProjectDrawer} organizationId={user.organizationId} />
      )}
    </div>
  );
}