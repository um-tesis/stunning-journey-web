import {Box} from '@mui/material';
import Header from '../shared/components/header';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import OrgAdminHomeContent from './components/org-admin-home-content';
import RegularHomeContent from './components/regular-home-content';

type Props = {
  user: UserData | null;
};

export default function Home({user}: Props) {
  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <div className={styles.mainHomeContainer}>
        <Header user={user} />
        {user && user.role === 'ORGADMIN' ? (
          <OrgAdminHomeContent user={user} />
        ) : (
          <RegularHomeContent user={user} />
        )}
      </div>
    </Box>
  );
}
