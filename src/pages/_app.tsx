/* eslint-disable @next/next/no-css-tags */
import './styles.scss';
import Head from 'next/head';
import type {AppProps} from 'next/app';
import ErrorBoundary from '@/lib/utils/error-boundary';
import theme from '@styles/theme';
import {ThemeProvider} from '@mui/material';
import {ApolloProvider} from '@apollo/client';
import client from '../apollo-client';
import {Toaster} from 'react-hot-toast';
import {toastOptions} from '@utils/ui-helper';

export default function MyApp({Component, pageProps}: AppProps) {
  const Main = () => (
    <div id='portal'>
      <Head>
        <title>Libera</title>
        <link rel='stylesheet' href='/css/video-react.css' />
      </Head>

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );

  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Main />
        <Toaster position='bottom-right' toastOptions={toastOptions} />
      </ErrorBoundary>
    </ApolloProvider>
  );
}
