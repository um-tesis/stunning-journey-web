import {Box, Button} from '@mui/material';
import Image from 'next/image';
import Header from '../shared/components/header';
import PrimaryButton from '../shared/components/primary-button';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <Header />
      <div className={styles.mainHomeContainer}>
        <div className={styles.homeFirstSection}>
          <div className={styles.homeFirstSectionContent}>
            <h1>A dedicated team to help organizations grow</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam
              sit nullam neque ultrices.
            </p>
            <div className={styles.buttonsContainer}>
              <PrimaryButton inverted onClick={() => {}}>
                Projects
              </PrimaryButton>
              <PrimaryButton onClick={() => {}}>More Info</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
