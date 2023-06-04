import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PrimaryButton from '../primary-button';
import {useRouter} from 'next/router';
import styles from './styles.module.scss';
import {UserData} from '../../types';
import {logOut} from '@/features/auth/service';
import Image from 'next/image';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

type Props = {
  user: UserData | null;
};

function Header({user}: Props) {
  const router = useRouter();

  const pages = user
    ? [
        {text: 'Inicio', link: 'home'},
        {text: 'Proyectos', link: 'projects'},
        {text: 'Sus Proyectos', link: 'our-projects'},
        {text: 'Miembros del Equipo', link: 'team-members'},
        {text: 'Donaciones', link: 'donations'},
      ]
    : [
        {text: 'Inicio', link: 'home'},
        {text: 'Acerca de Nosotros', link: 'about'},
        {text: 'Proyectos', link: 'projects'},
        {text: 'Nuestro Trabajo', link: 'our-work'},
      ];

  const handleAuthToggle = async () => {
    if (user) {
      await logOut();
      router.push('/login');
    } else {
      router.push('/login');
    }
  };

  return (
    <AppBar position='static' className={styles.appBar} elevation={6}>
      <Container maxWidth={false} sx={{backgroundColor: 'white'}}>
        <Toolbar disableGutters sx={{height: '118px'}}>
          <Image
            src='/Logo-libera.png'
            alt='logo'
            width={120}
            height={100}
            className={styles.logo}
            onClick={() => router.push('/')}
          />

          {user && (
            <Chip
              icon={<FaceIcon />}
              className={styles.avatar}
              label={user.name}
              onClick={() => router.push('/account')}
            />
          )}

          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LIBERA
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {mr: 1},
            }}
          >
            {pages.map((page) => (
              <PrimaryButton
                key={page.text}
                inverted
                hideOutlined
                onClick={() => {
                  router.push(`/${page.link}`);
                }}
                auxClassNames={
                  router && router.pathname.replace(/\//g, '') === page.link ? styles.active : ''
                }
              >
                {page.text}
              </PrimaryButton>
            ))}
            <PrimaryButton onClick={handleAuthToggle} inverted>
              {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </PrimaryButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
