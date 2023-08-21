import Loading from '@/components/Loading';
import useCallApi from '@/utils/useCallApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const callApi = useCallApi();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const config = {
        url: router.asPath,
      };
      await callApi(config);
      await router.push('/');
    };
    void fetchData();
  }, []);

  return <Loading />;
}
