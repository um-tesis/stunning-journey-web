import {useQuery} from '@apollo/client';
import {Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {GET_OUR_PROJECTS} from '@/graphql/query/getOurProjects';
import {UserData} from '../shared/types';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';

type Props = {
  user: UserData;
};

export default function OurProjects({user}: Props) {
  const [page, setPage] = useState(1);
  const variables = useMemo(
    () => ({page, itemsPerPage: 5, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading} = useQuery(GET_OUR_PROJECTS, {
    variables,
  });

  const projects = data?.organizationProjects.projects;

  const totalPages = Math.ceil(data?.organizationProjects.total / 9);

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

  return (
    <div className={styles.ourProjectsContainer}>
      <div className={styles.title}>
        Projects <AddIcon className={styles.addButton} />
      </div>
      <CustomTable
        data={mappedProjects}
        columnLabels={['Name', 'Field', 'Start Date', 'End Date', 'Monetary Objective']}
      />
      {totalPages > 0 && (
        <Pagination
          className={styles.pagination}
          count={totalPages}
          onChange={onChangePage}
          color='primary'
        />
      )}
    </div>
  );
}
