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
          Únete a la comunidad Libera
        </Typography>

        <Typography variant='body1' className={styles.heroText}>
          Con Libera, puedes donar de forma segura y eficaz a organizaciones benéficas que están marcando una
          diferencia real en el mundo.
        </Typography>
        <div className={styles.buttonsContainer}>
          <PrimaryButton inverted onClick={() => router.push('/projects')}>
            Proyectos
          </PrimaryButton>
          <PrimaryButton onClick={() => router.push('/about')}>Más Info</PrimaryButton>
        </div>
      </Box>
      <ResultsSection user={user} results={results} />
      {user && user.role === 'USER' && (
        <>
          <div className={classNamesFilter(styles.homeSection, styles.homeSecondSection)}>
            <Image src='/collaboration.jpeg' width={500} height={350} alt='image' />
            <div className={styles.sectionRightContent}>
              <Typography variant='h5'>Crea tu cuenta hoy mismo y empieza a colaborar gratis!</Typography>
              <Typography variant='subtitle2'>
                Juntos podemos liberar el potencial de las organizaciones benéficas con Libera.
              </Typography>
              <div className={styles.buttonsContainer}>
                <PrimaryButton inverted onClick={() => router.push('/our-work')}>
                  Comenzar
                </PrimaryButton>
                <PrimaryButton onClick={() => router.push('/about')}>Quiénes somos</PrimaryButton>
              </div>
            </div>
          </div>
          <GetInTouchSection />
        </>
      )}
      <Box sx={{height: 20}} />
      <Footer />
    </>
  );
}
