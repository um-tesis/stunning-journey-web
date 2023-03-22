import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import VerifiedIcon from '@mui/icons-material/Verified';
import {serverHealthCheck} from '@/lib/utils/api-settings';
import PrimaryButton from '../primary-button';
import {useRouter} from 'next/router';
import styles from './styles.module.scss';

const pages = ['Home', 'About', 'Projects', 'Our-Work'];
const projects = ['Tacuru', 'Teleton', 'UM'];

function Header() {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const healthCheck = async () => {
    await serverHealthCheck();
  };

  const toogleProjectsMenuOpen = () => {
    setIsProjectsMenuOpen(!isProjectsMenuOpen);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth={false} sx={{backgroundColor: 'white'}}>
        <Toolbar disableGutters sx={{height: '118px'}}>
          <VerifiedIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1, color: '#5d5a88'}} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#5d5a88',
              textDecoration: 'none',
            }}
          >
            LIBERA
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <VerifiedIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
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
              flexGrow: 0,
              display: 'flex',
              '& > *': {
                mr: 1.6,
                mt: 1,
              },
            }}
          >
            {pages.map((page) => (
              <PrimaryButton
                key={page}
                inverted
                hideOutlined
                onClick={() => {
                  if (page !== 'Projects') router.push(`/${page.toLowerCase()}`);
                }}
                auxClassNames={router && router.pathname.includes(page.toLowerCase()) ? styles.active : ''}
              >
                {page.split('-').join(' ')}
                {page === 'Projects' && (
                  <Menu
                    sx={{mt: '55px', ml: '-320px'}}
                    id='menu-appbar'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={isProjectsMenuOpen}
                    onClose={handleCloseUserMenu}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>{project}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </PrimaryButton>
            ))}
            <PrimaryButton onClick={healthCheck} inverted>
              Login
            </PrimaryButton>
            <PrimaryButton onClick={() => console.log('clicked')}>Get Started</PrimaryButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;