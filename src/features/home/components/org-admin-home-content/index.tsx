import {UserData} from '@/features/shared/types';
import ResultsSection from '../../components/results-section';
import styles from './styles.module.scss';
import OrganizationManagementCards from '../organization-management-cards';
import {Box} from '@mui/material';

type Props = {
  user: UserData | null;
};

export default function OrgAdminHomeContent({user}: Props) {
  const results = {
    annualDonations: 13213,
    raisedMoney: 12314,
    donators: 1546,
    activeProjects: 88,
    collaboratorsInvolved: 1220,
  };

  return (
    <Box className={styles.homeContentContainer}>
      <OrganizationManagementCards />
      <ResultsSection user={user} results={results} />
    </Box>
  );
}
