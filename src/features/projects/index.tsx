import {classNamesFilter} from '@/lib/utils/ui-helper';
import {useState} from 'react';
import SearchInput from '../shared/components/search-input';
import styles from './styles.module.scss';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.browseSection}>
        <div className={styles.title}>Browse projects & organizations</div>
        <div className={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus
          libero accumsan.
        </div>
        <div className={styles.searchBox}>
          <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
        </div>
      </div>
      <div className={styles.projectsContainer}></div>
    </div>
  );
}
