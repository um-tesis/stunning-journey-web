import {Box} from '@mui/material';
import Header from '../shared/components/header';
import styles from './styles.module.scss';
import {UserData} from '../shared/types';
import OrgAdminHomeContent from './components/org-admin-home-content';
import RegularHomeContent from './components/regular-home-content';
import Head from 'next/head';

type Props = {
  user: UserData | null;
};

export default function Home({user}: Props) {
  return (
    <Box sx={{backgroundColor: '#9795B5', height: '100%'}}>
      <div className={styles.mainHomeContainer}>
        <Head>
          <title>Libera</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta property='og:title' content='Libera' />
          <meta property='og:description' content='Navege los proyectos de Libera!' />
          <meta property='og:image' content={'/collaboration.jpeg'} />
          {/* TODO: CHANGE THIS URL WHEN DEPLOYED TO PRODUCTION or NGROK URL FOR TESTING */}
          <meta property='og:url' content={`http://www.libera.com`} />
          <link rel='icon' href='/Logo-libera.png' />
        </Head>
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
