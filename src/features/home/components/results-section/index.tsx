import {Box} from '@mui/system';
import styles from './styles.module.scss';
import {Container, Grid, Typography} from '@mui/material';
import {UserData} from '@/features/shared/types';
import ResultCard from '../result-card';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import {SYSTEM_ROLES} from '@/lib/utils/constants';

type Props = {
  user: UserData | null;
  results: {
    annualDonations: number;
    raisedMoney: number;
    donators: number;
    activeProjects: number;
    collaboratorsInvolved: number;
  };
};

export default function ResultsSection({user, results}: Props) {
  const sectionTitle =
    user && user.role !== SYSTEM_ROLES.USER ? `Your results in numbers` : 'Our results in numbers';
  const sectionDescription =
    user && user.role !== SYSTEM_ROLES.USER
      ? `Your organization has achieved the following results:`
      : 'Thanks to YOUR help, we have achieved the following results:';

  return (
    <Container className={styles.sectionContent}>
      <Box>
        <Typography className={styles.sectionTitle}>{sectionTitle}</Typography>
      </Box>
      <Box className={styles.sectionDescription}>
        <Typography variant='body2'>{sectionDescription}</Typography>
      </Box>
      <Box className={styles.resultsContainer}>
        <Grid container>
          <Grid item xs={6}>
            <div className={styles.anualDonations}>
              <Typography variant='h4' className={styles.description}>
                Annual Donations
              </Typography>
              <Typography variant='h2' className={styles.number}>
                {results.annualDonations}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={results.raisedMoney}
                  resultDescription='Raised USD'
                  Icon={<PaidIcon className={styles.cardIcon} />}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={results.donators}
                  resultDescription='Donators'
                  Icon={<VolunteerActivismIcon className={styles.cardIcon} />}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={results.activeProjects}
                  resultDescription='Active Projects'
                  Icon={<CorporateFareIcon className={styles.cardIcon} />}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={results.collaboratorsInvolved}
                  resultDescription='Collaborators Involved'
                  Icon={<PeopleIcon className={styles.cardIcon} />}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
