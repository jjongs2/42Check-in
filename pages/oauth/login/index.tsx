import Loading from '@/components/Loading';
import instance from '@/utils/instance';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = `${process.env.NEXT_PUBLIC_IP as string}/oauth/login`;
      const { code } = router.query;
      console.log('query', router.query)
      const { data } = await instance.post(url, { code });
      console.log('data', data);
      await router.push('/');
    };
    void fetchData();
  }, []);

  return <Loading />;
}
