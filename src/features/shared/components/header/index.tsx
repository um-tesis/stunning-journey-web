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
    ? ['Home', 'Projects', 'Our-Projects', 'Donators', 'Donations']
    : ['Home', 'About', 'Projects', 'Our-Work'];

  const handleAuthToggle = async () => {
    if (user) {
      await logOut();
      router.push('/login');
    } else {
      router.push('/login');
    }
  };

  return (
    <AppBar position='static'>
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
                key={page}
                inverted
                hideOutlined
                onClick={() => {
                  router.push(`/${page.toLowerCase()}`);
                }}
                auxClassNames={
                  router && router.pathname.replace(/\//g, '') === page.toLowerCase().replace(/ /g, '-')
                    ? styles.active
                    : ''
                }
              >
                {page.split('-').join(' ')}
              </PrimaryButton>
            ))}
            <PrimaryButton onClick={handleAuthToggle} inverted>
              {user ? 'Logout' : 'Login'}
            </PrimaryButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
