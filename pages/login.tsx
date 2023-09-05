import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      void router.push('/');
    }
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center space-x-10 space-y-10 lg:flex-row'>
      <div className=' absolute left-40 top-40 -z-10 aspect-square h-60 w-60 rounded-full bg-yellow-400 bg-opacity-70 blur-[80px]' />
      <div className=' absolute left-80 top-80 -z-10 aspect-square h-80 w-80 rounded-full bg-blue-800 bg-opacity-70 blur-[80px]' />
      <div className='flex flex-col'>
        <h1 className=' font min-w-max font-sans text-4xl text-slate-800 dark:text-white'>
          42 Check - in <br></br>모든 예약을 한 곳에
        </h1>
        <div className='mt-20 text-slate-800 dark:text-white'>
          you <span className=' text-red-500'>don’t</span> have to find
          <br /> another web site anymore. 😎
        </div>
      </div>
      <Image
        src={'https://i.imgur.com/K4Su74g.png'}
        width={500}
        height={500}
        unoptimized={true}
        alt='login'
        className='lg:animate-bounce'
      />
      <div className='flex w-full min-w-max flex-col items-center justify-center space-y-10 lg:w-1/3'>
        <Link
          href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-f90f9eeac95b368279b59a8f0eb2e43a8b348db52752754f2aa249ded96390aa&redirect_uri=http%3A%2F%2Flocalhost:3000%2Foauth%2Flogin&response_type=code'
          className='button px-44 py-2'
        >
          <p className='text-xl'>Sign in</p>
        </Link>
        <div className='h-[1px] w-[400px] bg-[#DFDFDF]' />
        <span className='relative -top-[51px] bg-white px-10 text-[#ACADAC] dark:bg-slate-900 dark:text-white'>
          42 Check - in
        </span>
      </div>
    </div>
  );
}
