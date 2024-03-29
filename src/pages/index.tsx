import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Libera</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/Logo-libera.png' />
      </Head>
      <main></main>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/home',
      permanent: false,
    },
  };
};
