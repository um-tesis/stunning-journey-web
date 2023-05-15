import {GET_PROJECTS} from '@/graphql/query/getProjects';
import {useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import ProjectCard from '../shared/components/project-card';
import SearchInput from '../shared/components/search-input';
import styles from './styles.module.scss';

export default function Projects() {
  const ITEMS_PER_PAGE = 9;
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const variables = useMemo(() => ({page, itemsPerPage: ITEMS_PER_PAGE, filter}), [filter, page]);
  const {data, loading} = useQuery(GET_PROJECTS, {
    variables,
  });

  const projects = data?.projects.projects;

  const totalPages = Math.ceil(data?.projects.total / ITEMS_PER_PAGE);

  const handleFilterChange = (event: any) => {
    setSearchTerm(event.target.value);

    if (event.key === 'Enter') {
      setFilter(event.target.value);
    }
  };

  const handleRefetch = () => {
    setFilter(searchTerm);
  };

  if (loading) {
    return null;
  }

  const onChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.browseSection}>
        <div className={styles.title}>Browse Libera&apos;s projects</div>
        <div className={styles.subtitle}>
          Find the project that suits you best and start making a difference today!
        </div>
        <div className={styles.searchBox}>
          <SearchInput
            searchTerm={searchTerm}
            handleChange={handleFilterChange}
            handleSearch={handleRefetch}
          />
        </div>
      </div>
      <div className={styles.projects}>
        <Grid container spacing={2}>
          {projects &&
            projects.map((project: any) => (
              <Grid key={project.id} item xs={4}>
                <ProjectCard
                  projectId={project.id}
                  name={project.name}
                  description={project.description}
                  coverPhoto={project.coverPhoto}
                />
              </Grid>
            ))}
        </Grid>
        {totalPages > 0 && (
          <Pagination
            className={styles.pagination}
            count={totalPages}
            onChange={onChangePage}
            color='primary'
          />
        )}
      </div>
    </div>
  );
}
