import './styles.scss';
import Head from 'next/head';
import type {AppProps} from 'next/app';
import ErrorBoundary from '@/lib/utils/error-boundary';
import theme from '@styles/theme';
import {ThemeProvider} from '@mui/material';

export default function MyApp({Component, pageProps}: AppProps) {
  const Main = () => (
    <div id='portal'>
      <Head>
        <title>Libera</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );

  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}
