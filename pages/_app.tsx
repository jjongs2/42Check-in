import Loading from '@/components/Loading';
import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = (): void => {
      setIsLoading(true);
    };
    const end = (): void => {
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === null) {
      setHasToken(false);
    } else {
      setHasToken(true);
    }
  }, []);

  useEffect(() => {
    if (router.pathname.includes('/login')) return;
    if (!hasToken) {
      void router.push('/login');
    }
  }, [hasToken]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>42Check-in</title>
        <meta charSet='utf-8' />
        <meta name='description' content='모든 예약을 한 곳에' />
      </Head>
      <Layout>
        <Component pageProps={pageProps} />
      </Layout>
    </>
  );
}
