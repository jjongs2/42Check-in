import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function start(): void {
      setIsLoading(true);
    }
    function end(): void {
      setIsLoading(false);
    }
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
    if (!router.isReady) return;
    if (router.pathname.includes('/login')) {
      setHasAccess(true);
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === null) {
      void router.push('/login');
      return;
    }
    setHasAccess(true);
  }, [router]);

  if (!hasAccess || (isLoading && localStorage.getItem('accessToken') === null)) return <Loading />;

  return (
    <ErrorBoundary>
      <Head>
        <title>42Check-in</title>
        <meta charSet='utf-8' />
        <meta name='description' content='모든 예약을 한 곳에' />
      </Head>
      <Layout>
        <Component pageProps={pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
