import {Box} from '@mui/system';
import styles from './styles.module.scss';
import {Grid, Typography} from '@mui/material';
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
    <Box className={styles.sectionContent} p={3} pt={5}>
      <Box>
        <Typography variant='h5' fontWeight='bold' textAlign='center'>
          {sectionTitle}
        </Typography>
        <Typography variant='subtitle2' color='gray' textAlign='center'>
          {sectionDescription}
        </Typography>
      </Box>
      <Box className={styles.resultsContainer} mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Box className={styles.anualDonations} borderRadius={5}>
              <Typography variant='h4' className={styles.description}>
                Donaciones anuales
              </Typography>
              <Typography variant='h2' className={styles.number}>
                $ {Math.round(totalEarnings / 100)}
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} lg={6} spacing={4}>
            <Grid item xs={12} sm={6} md={3} lg={6}>
              <ResultCard
                result={`$ ${Math.round(totalDonations / 100)}`}
                resultDescription='Dinero recaudado'
                Icon={<PaidIcon className={styles.cardIcon} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={6}>
              <ResultCard
                result={totalDonors}
                resultDescription='Donantes'
                Icon={<VolunteerActivismIcon className={styles.cardIcon} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={6}>
              <ResultCard
                result={totalProjects}
                resultDescription='Proyectos Activos'
                Icon={<CorporateFareIcon className={styles.cardIcon} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={6}>
              <ResultCard
                result={totalVolunteers}
                resultDescription='Colaboradores'
                Icon={<PeopleIcon className={styles.cardIcon} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
