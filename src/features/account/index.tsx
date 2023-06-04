import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import {Typography, Box, Grid, IconButton} from '@mui/material';
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
      <Grid container paddingX={10} paddingY={5} spacing={5} className={styles.accountContainer}>
        <Grid container item alignItems='center' spacing={3}>
          <Grid item>
            <Typography variant='h3'>Configuración de la Cuenta</Typography>
          </Grid>
          <Grid item spacing={2}>
            <IconButton onClick={handleOpenBasicInfoDrawer}>
              <EditIcon color='primary' className={styles.editIcon} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography className={styles.label} variant='h6'>
            Nombre
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography className={styles.value} variant='body1'>
            {userData.name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={styles.label} variant='h6'>
            Correo electrónico
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography className={styles.value} variant='body1'>
            {userData.email}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={styles.label} variant='h6'>
            Rol
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography className={styles.value} variant='body1'>
            {userData.role}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={styles.label} variant='h6'>
            Teléfono
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography className={styles.value} variant='body1'>
            {userData.phone || '-'}
          </Typography>
        </Grid>
        <Grid item>
          <PrimaryButton onClick={handleOpenChangePasswordDrawer}>Cambiar Contraseña</PrimaryButton>
        </Grid>
      </Grid>
      {showBasicInfoDrawer && (
        <UpdateBasicInfoDrawer onClose={handleCloseBasicInfoDrawer} user={userData} setUser={setUserData} />
      )}
      {showChangePasswordDrawer && <ChangePasswordDrawer onClose={handleCloseChangePasswordDrawer} />}
    </>
  );
}
