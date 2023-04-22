import {GET_PROJECTS} from '@/graphql/query/getProjects';
import {useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import ProjectCard from '../shared/components/project-card';
import SearchInput from '../shared/components/search-input';
import styles from './styles.module.scss';

export default function Projects() {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const variables = useMemo(() => ({page: 1, itemsPerPage: 9, filter}), [filter]);
  const {data, loading, refetch} = useQuery(GET_PROJECTS, {
    variables,
  });

  const projects = data?.projects.projects;

  const totalPages = Math.ceil(data?.projects.total / 9);

  const handleFilterChange = (event: any) => {
    setSearchTerm(event.target.value);

    console.log(event);

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

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.browseSection}>
        <div className={styles.title}>Browse Libera&apos;s projects</div>
        <div className={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus
          libero accumsan.
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
              <Grid key={project.project_id} item xs={4}>
                <ProjectCard projectId={project.project_id} name={project.name} />
              </Grid>
            ))}
        </Grid>
        {totalPages > 0 && <Pagination className={styles.pagination} count={totalPages} color='primary' />}
      </div>
    </div>
  );
}
