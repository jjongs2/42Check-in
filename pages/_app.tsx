import Loading from '@/components/Loading';
import Layout from '@/components/layout/Layout';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 쿠키 또는 세션 검사하고

  // useEffect(() => {
  //   const start = (): void => {
  //     setLoading(true);
  //   };
  //   const end = (): void => {
  //     setLoading(false);
  //   };

  //   Router.events.on('routeChangeStart', start);
  //   Router.events.on('routeChangeComplete', end);
  //   Router.events.on('routeChangeError', end);

  //   return () => {
  //     Router.events.off('routeChangeStart', start);
  //     Router.events.off('routeChangeComplete', end);
  //     Router.events.off('routeChangeError', end);
  //   };
  // }, []);

  const login = false;
  return (
    <>
      <Head>
        <title>42Check-in</title>
        <meta charSet='utf-8' />
        <meta name='description' content='모든 예약을 한 곳에' />
      </Head>
      {loading ? (
        <Loading />
      ) : login ? (
        <Component pageProps={pageProps} />
      ) : (
        <Layout>
          <Component pageProps={pageProps} />
        </Layout>
      )}
    </>
  );
}
