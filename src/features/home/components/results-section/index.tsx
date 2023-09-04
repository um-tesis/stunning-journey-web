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
import {useQuery} from '@apollo/client';
import {GET_ORGANIZATION_METRICS} from '@/graphql/query/getOrganizationMetrics';
import {GET_ALL_ORGANIZATIONS_METRICS} from '@/graphql/query/getAllOrganizationsMetrics';

type Props = {
  user: UserData | null;
};

export default function ResultsSection({user}: Props) {
  const isOrganizationData = user && user.role !== SYSTEM_ROLES.USER;

  const sectionTitle = isOrganizationData ? `Sus resultados en cifras` : `Nuestros resultados en cifras`;
  const sectionDescription = isOrganizationData
    ? `Su organización ha logrado los siguientes resultados:`
    : 'Gracias a SU ayuda, hemos conseguido los siguientes resultados:';

  const {data} = useQuery(isOrganizationData ? GET_ORGANIZATION_METRICS : GET_ALL_ORGANIZATIONS_METRICS, {
    variables: {organizationId: isOrganizationData ? user.organizationId : undefined},
  });

  if (!data) {
    return null;
  }

  const organizationMetrics = isOrganizationData ? data?.organizationMetrics : data?.allOrganizationsMetrics;

  const {totalDonations, totalDonors, totalProjects, totalEarnings, totalVolunteers} = organizationMetrics;

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
                Donaciones anuales
              </Typography>
              <Typography variant='h2' className={styles.number}>
                {totalEarnings}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={totalDonations}
                  resultDescription='USD recaudados'
                  Icon={<PaidIcon className={styles.cardIcon} />}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={totalDonors}
                  resultDescription='Donantes'
                  Icon={<VolunteerActivismIcon className={styles.cardIcon} />}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={totalProjects}
                  resultDescription='Proyectos Activos'
                  Icon={<CorporateFareIcon className={styles.cardIcon} />}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultCard
                  resultNumber={totalVolunteers}
                  resultDescription='Colaboradores involucrados'
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
