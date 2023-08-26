import Loading from '@/components/Loading';
import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async (): Promise<void> => {
      const { code } = router.query;
      const config = {
        url: '/oauth/login',
        method: 'post',
        data: code,
        headers: { 'Content-Type': 'text/plain' },
      };
      const { data } = await apiController(config);
      const { accessToken, refreshToken, staff } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('staff', staff);
      await router.push('/');
    };
    void fetchData();
  }, [router, router.isReady]);

  return <Loading />;
}
