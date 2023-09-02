import {useLazyQuery, useQuery} from '@apollo/client';
import {Grid, IconButton, Pagination, Typography} from '@mui/material';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';
import {GET_OUR_PROJECTS} from '@/graphql/query/getOurProjects';
import {UserData} from '../shared/types';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../shared/components/custom-table';
import {convertDateFromIso} from '@/lib/utils/ui-helper';
import AddProjectDrawer from './components/add-project-drawer';
import {useRouter} from 'next/router';
import CsvDownloader from '../shared/components/csv-downloader';

type Props = {
  user: UserData;
};

export default function OurProjects({user}: Props) {
  const router = useRouter();
  const ITEMS_PER_PAGE = 10;
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const variables = useMemo(
    () => ({page, itemsPerPage: ITEMS_PER_PAGE, filter: '', organizationId: user.organizationId}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );
  const {data, loading, refetch} = useQuery(GET_OUR_PROJECTS, {
    variables,
  });

  // useLazyQuery for all data
  const [getProjectsForCSV] = useLazyQuery(GET_OUR_PROJECTS);

  const handleDownload = async () => {
    const res = await getProjectsForCSV({variables: {organizationId: user.organizationId}});
    const allProjects = res.data?.organizationProjects?.projects;
    const allMappedProjects = allProjects.map((project: any) => {
      return {
        ...project,
        startDate: project.startDate ? convertDateFromIso(project.startDate) : undefined,
      };
    });
    setCsvData(allMappedProjects);
  };

  if (loading) {
    return null;
  }

  const projects = data?.organizationProjects.projects;

  const totalPages = Math.ceil(data?.organizationProjects.total / ITEMS_PER_PAGE);

  const mappedProjects = projects.map((project: any) => {
    return {
      ...project,
      startDate: project.startDate ? convertDateFromIso(project.startDate) : undefined,
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
    router.push(`/projects/${row.slug}`);
  };

  const columnLabels = [
    {label: 'Nombre', key: 'name'},
    {label: 'Campo', key: 'field'},
    {label: 'Fecha de Inicio', key: 'startDate'},
  ];

  return (
    <div className={styles.ourProjectsContainer}>
      <Grid container spacing={5} justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h3' fontWeight='bold' color='primary' className={styles.title}>
            Mis Proyectos
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setIsAddProjectOpen(true)}>
            <AddIcon className={styles.addButton} />
          </IconButton>
          <CsvDownloader
            data={csvData}
            columnLabels={columnLabels}
            handleDownload={handleDownload}
            filename={'Mis-Proyectos.csv'}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTable data={mappedProjects} columnLabels={columnLabels} onClickRow={goToProject} />
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

      {isAddProjectOpen && (
        <AddProjectDrawer onClose={closeAddProjectDrawer} organizationId={user.organizationId} />
      )}
    </div>
  );
}
