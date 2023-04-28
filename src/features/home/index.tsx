import {classNamesFilter} from '@/lib/utils/ui-helper';
import {Box} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import Footer from '../shared/components/footer';
import Header from '../shared/components/header';
import PrimaryButton from '../shared/components/primary-button';
import GetInTouchSection from './components/get-in-touch-section';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';

type Props = {
  user: UserData | null;
};

export default function Home({user}: Props) {
  const router = useRouter();

  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <div className={styles.mainHomeContainer}>
        <Header user={user} />
        <div className={styles.homeSection}>
          <h1>Join the Libera community</h1>
          <p>
            With Libera, you can donate safely and effectively to charitable organizations that are making a
            real difference in the world
          </p>
          <div className={styles.buttonsContainer}>
            <PrimaryButton inverted onClick={() => router.push('/projects')}>
              Projects
            </PrimaryButton>
            <PrimaryButton onClick={() => router.push('/about')}>More Info</PrimaryButton>
          </div>
        </div>
        <div className={classNamesFilter(styles.homeSection, styles.homeSecondSection)}>
          <Image src='/collaboration.jpeg' width={500} height={350} alt='image' />
          <div className={styles.sectionRightContent}>
            <h1>Create your account today and get started for free!</h1>
            <p>Together we can unleash the potential of charitable organizations with Libera.</p>
            <div className={styles.buttonsContainer}>
              <PrimaryButton inverted onClick={() => {}}>
                Get Started
              </PrimaryButton>
              <PrimaryButton onClick={() => {}}>About Us</PrimaryButton>
            </div>
          </div>
        </div>
        <GetInTouchSection />
        <Footer />
      </div>
    </Box>
  );
}
