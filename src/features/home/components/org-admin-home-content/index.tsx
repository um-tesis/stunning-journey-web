import {UserData} from '@/features/shared/types';
import ResultsSection from '../../components/results-section';
import OrganizationManagementCards from '../organization-management-cards';
import {Box} from '@mui/material';

type Props = {
  user: UserData | null;
};

export default function OrgAdminHomeContent({user}: Props) {
  return (
    <>
      <OrganizationManagementCards />
      <Box sx={{backgroundColor: '#9795B5'}} my={2} height={20} />
      <ResultsSection user={user} />
    </>
  );
}
