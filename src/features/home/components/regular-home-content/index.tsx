import {UserData} from '@/features/shared/types';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import ResultsSection from '../../components/results-section';
import PrimaryButton from '../../../shared/components/primary-button';
import GetInTouchSection from '../../components/get-in-touch-section';
import Footer from '../../../shared/components/footer';
import {classNamesFilter} from '@/lib/utils/ui-helper';

type Props = {
  user: UserData | null;
};

export default function RegularHomeContent({user}: Props) {
  const router = useRouter();

  const results = {
    annualDonations: 13213,
    raisedMoney: 12314,
    donators: 1546,
    activeProjects: 88,
    collaboratorsInvolved: 1220,
  };

  return (
    <>
      <Box className={styles.homeSection}>
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
      </Box>
      <ResultsSection user={user} results={results} />
      {user && user.role === 'USER' && (
        <>
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
        </>
      )}
    </>
  );
}
