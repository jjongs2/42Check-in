import Loading from '@/components/Loading';
import instance from '@/utils/instance';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data } = await instance.get(`${process.env.BASE_URL as string}/oauth/login`);
      console.log('data', data);
      await router.push('/');
    };
    void fetchData();
  }, []);

  return <Loading />;
}
