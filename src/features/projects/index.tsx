import {GET_PROJECTS} from '@/graphql/query/getProjects';
import {useQuery} from '@apollo/client';
import {Grid, Pagination} from '@mui/material';
import {useMemo, useState} from 'react';
import ProjectCard from '../shared/components/project-card';
import SearchInput from '../shared/components/search-input';
import styles from './styles.module.scss';

export default function Projects() {
  const [filter, setFilter] = useState('');
  const {data, loading} = useQuery(GET_PROJECTS, {
    variables: {page: 1, itemsPerPage: 9, filter},
  });

  const projects = data?.projects;

  const totalPages = Math.ceil(projects?.length / 9);

  const handleChange = (event: any) => {
    setFilter(event.target.value);
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
          <SearchInput searchTerm={filter} handleChange={handleChange} />
        </div>
      </div>
      <div className={styles.projects}>
        <Grid container spacing={2}>
          {projects.map((project: any, i: number) => (
            <Grid key={i} item xs={4}>
              <ProjectCard name={project.name} />
            </Grid>
          ))}
        </Grid>
        {totalPages > 0 && <Pagination className={styles.pagination} count={totalPages} color='primary' />}
      </div>
    </div>
  );
}
