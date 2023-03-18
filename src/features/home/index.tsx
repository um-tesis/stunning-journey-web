import {classNamesFilter} from '@/lib/utils/ui-helper';
import {Box, Button} from '@mui/material';
import Image from 'next/image';
import Header from '../shared/components/header';
import PrimaryButton from '../shared/components/primary-button';
import GetInTouchSection from './components/get-in-touch-section';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <div className={styles.mainHomeContainer}>
        <Header />
        <div className={styles.homeSection}>
          <h1>A dedicated team to help organizations grow</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit
            nullam neque ultrices.
          </p>
          <div className={styles.buttonsContainer}>
            <PrimaryButton inverted onClick={() => {}}>
              Projects
            </PrimaryButton>
            <PrimaryButton onClick={() => {}}>More Info</PrimaryButton>
          </div>
        </div>
        <div className={classNamesFilter(styles.homeSection, styles.homeSecondSection)}>
          <Image src='/collaboration.jpeg' width={500} height={350} alt='image' />
          <div className={styles.sectionRightContent}>
            <h1>Create your account today and get started for free!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit dolor semper at ac tempus enim laoreet
              massa non.
            </p>
            <div className={styles.buttonsContainer}>
              <PrimaryButton inverted onClick={() => {}}>
                Get Started
              </PrimaryButton>
              <PrimaryButton onClick={() => {}}>About Us</PrimaryButton>
            </div>
          </div>
        </div>
        <GetInTouchSection />
      </div>
    </Box>
  );
}
