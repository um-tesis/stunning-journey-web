import {useState} from 'react';
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
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Logout, Person, Settings} from '@mui/icons-material';

type Props = {
  user: UserData | null;
};

type LogoProps = {
  sx?: SxProps<Theme>;
  onClick?: () => void;
};

const Logo: React.FC<LogoProps> = ({sx, onClick}) => (
  <Box sx={{...sx}}>
    <Image
      src='/Logo-libera.png'
      alt='logo'
      width={120}
      height={100}
      className={styles.logo}
      onClick={onClick}
    />
  </Box>
);

const drawerWidth = 360;

const Header = ({user}: Props) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = user
    ? [{text: 'Mis Proyectos', link: 'our-projects'}]
    : [
        {text: 'Proyectos', link: 'projects'},
        {text: 'Nosotros', link: 'about'},
        {text: '¿Cómo funciona?', link: 'our-work'},
        {text: 'Iniciar sesión', link: 'login'},
      ];

  const settings = [
    {text: 'Settings', link: 'account', icon: <Settings fontSize='small' />},
    {text: 'Logout', link: 'logout', icon: <Logout fontSize='small' />},
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Logo sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} onClick={() => router.push('/')} />
        <Typography
          variant='h6'
          component='a'
          onClick={() => router.push('/')}
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          LIBERA
        </Typography>
      </Box>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item.link} disablePadding>
            <ListItemButton sx={{textAlign: 'center'}} onClick={() => router.push(`/${item.link}`)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position='static'
        component='nav'
        className={styles.appBar}
        elevation={6}
        sx={{backgroundColor: 'white'}}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Logo sx={{display: {xs: 'none', md: 'block'}}} onClick={() => router.push('/')} />
            <Typography
              variant='h6'
              component='a'
              onClick={() => router.push('/')}
              sx={{
                flexGrow: 1,
                display: {xs: 'none', md: 'block'},
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              LIBERA
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size='large'
                color='primary'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Logo sx={{display: {xs: 'block', md: 'none'}, mr: 1}} onClick={() => router.push('/')} />
            <Typography
              variant='h6'
              component='a'
              onClick={() => router.push('/')}
              sx={{
                mr: 2,
                flexGrow: 1,
                display: {xs: 'block', md: 'none'},
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              LIBERA
            </Typography>

            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                <PrimaryButton
                  key={page.text}
                  inverted
                  hideOutlined
                  onClick={() => router.push(`/${page.link}`)}
                  auxClassNames={
                    router && router.pathname.replace(/\//g, '') === page.link ? styles.active : ''
                  }
                >
                  {page.text}
                </PrimaryButton>
              ))}
            </Box>

            {user && (
              <Box sx={{flexGrow: 0}}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0, m: 2}} size='large'>
                    <Avatar alt={user.name} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component='div' sx={{pointerEvents: 'none'}}>
                    <ListItemIcon>
                      <Person fontSize='small' />
                    </ListItemIcon>
                    {user.name}
                  </MenuItem>
                  <Divider />
                  {settings.map((setting) => {
                    const onClick =
                      setting.link === 'logout'
                        ? async () => {
                            await logOut();
                            router.push('/login');
                          }
                        : () => router.push(`/${setting.link}`);

                    return (
                      <MenuItem key={setting.link} onClick={onClick}>
                        <ListItemIcon>{setting.icon}</ListItemIcon>
                        {setting.text}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', md: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
