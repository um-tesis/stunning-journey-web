import './styles.scss';
import Head from 'next/head';
import type {AppProps} from 'next/app';
import ErrorBoundary from '@/lib/utils/error-boundary';

export default function MyApp({Component, pageProps}: AppProps) {
  const Main = () => (
    <div id='portal'>
      <Head>
        <title>Libera</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );

  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}
