import {classNamesFilter} from '@/lib/utils/ui-helper';
import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import Footer from '../shared/components/footer';
import Header from '../shared/components/header';
import PrimaryButton from '../shared/components/primary-button';
import GetInTouchSection from './components/get-in-touch-section';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import ResultsSection from './components/results-section';

type Props = {
  user: UserData | null;
};

export default function Home({user}: Props) {
  const router = useRouter();

  const results = {
    anualDonations: 11111,
    raisedMoney: 11111,
    donators: 123,
    activeProjects: 123,
    collaboratorsInvolved: 123,
  };

  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <div className={styles.mainHomeContainer}>
        <Header user={user} />
        <div className={styles.homeSection}>
          <Typography variant='h1' className={styles.heroTitle}>
            Join the Libera community
          </Typography>

          <Typography variant='body1' className={styles.heroText}>
            With Libera, you can donate safely and effectively to charitable organizations that are making a
            real difference in the world
          </Typography>
          <div className={styles.buttonsContainer}>
            <PrimaryButton inverted onClick={() => router.push('/projects')}>
              Projects
            </PrimaryButton>
            <PrimaryButton onClick={() => router.push('/about')}>More Info</PrimaryButton>
          </div>
        </div>
        <ResultsSection user={user} results={results} />
        <div className={classNamesFilter(styles.homeSection, styles.homeSecondSection)}>
          <Image src='/collaboration.jpeg' width={500} height={350} alt='image' />
          <div className={styles.sectionRightContent}>
            <Typography variant='h5'>Create your account today and get started for free!</Typography>
            <Typography variant='subtitle2'>
              Together we can unleash the potential of charitable organizations with Libera.
            </Typography>
            <div className={styles.buttonsContainer}>
              <PrimaryButton inverted onClick={() => router.push('/our-work')}>
                Get Started
              </PrimaryButton>
              <PrimaryButton onClick={() => router.push('/about')}>About Us</PrimaryButton>
            </div>
          </div>
        </div>
        <GetInTouchSection />
        <Footer />
      </div>
    </Box>
  );
}
