import Loading from '@/components/Loading';
import apiController from '@/utils/apiController';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

interface JwtPayload {
  exp: number;
  iat: number;
  intraId: string;
  sub: string;
}

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async (): Promise<void> => {
      const { code } = router.query;
      const config = {
        url: '/oauth/login',
        method: 'post',
        data: { code },
      };
      const { data } = await apiController(config);
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      await router.push('/');
    };
    void fetchData();
  }, [router, router.isReady]);

  return <Loading />;
}
