import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import {Typography, Box} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from 'react';
import UpdateBasicInfoDrawer from './update-basic-info-drawer';
import PrimaryButton from '../shared/components/primary-button';
import ChangePasswordDrawer from './change-password-drawer';

type Props = {
  user: UserData;
};

export default function Account({user}: Props) {
  const [userData, setUserData] = useState<UserData>(user);
  const [showBasicInfoDrawer, setShowBasicInfoDrawer] = useState(false);
  const [showChangePasswordDrawer, setShowChangePasswordDrawer] = useState(false);

  const handleOpenBasicInfoDrawer = () => {
    setShowBasicInfoDrawer(true);
  };

  const handleCloseBasicInfoDrawer = () => {
    setShowBasicInfoDrawer(false);
  };

  const handleOpenChangePasswordDrawer = () => {
    setShowChangePasswordDrawer(true);
  };

  const handleCloseChangePasswordDrawer = () => {
    setShowChangePasswordDrawer(false);
  };

  return (
    <>
      <div className={styles.accountContainer}>
        <Typography variant='h3'>
          Account Settings <EditIcon className={styles.editIcon} onClick={handleOpenBasicInfoDrawer} />
        </Typography>
        <Box mt={4} mb={2}>
          <Box className={styles.setting}>
            <Typography className={styles.label} variant='body1'>
              Name
            </Typography>
            <Typography className={styles.value} variant='h6'>
              {userData.name}
            </Typography>
          </Box>
          <Box className={styles.setting}>
            <Typography className={styles.label} variant='body1'>
              Email
            </Typography>
            <Typography className={styles.value} variant='h6'>
              {userData.email}
            </Typography>
          </Box>

          <Box className={styles.setting}>
            <Typography className={styles.label} variant='body1'>
              Role
            </Typography>
            <Typography className={styles.value} variant='h6'>
              {userData.role}
            </Typography>
          </Box>
          <Box className={styles.setting}>
            <Typography className={styles.label} variant='body1' component='span'>
              Phone
            </Typography>
            <Typography className={styles.value} variant='h6' component='span'>
              {userData.phone || '-'}
            </Typography>
          </Box>
          <PrimaryButton auxClassNames={styles.changePassword} onClick={handleOpenChangePasswordDrawer}>
            Change Password
          </PrimaryButton>
        </Box>
      </div>
      {showBasicInfoDrawer && (
        <UpdateBasicInfoDrawer onClose={handleCloseBasicInfoDrawer} user={userData} setUser={setUserData} />
      )}
      {showChangePasswordDrawer && <ChangePasswordDrawer onClose={handleCloseChangePasswordDrawer} />}
    </>
  );
}
