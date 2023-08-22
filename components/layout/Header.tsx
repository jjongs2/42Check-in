import { darkModeIcon, noticeIcon, userIcon } from '@/assets/icons';
import { Logo } from '@/assets/images';
import apiController from '@/utils/apiController';
import axios from 'axios';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

interface Data {
  category: number;
  formId: number;
  date: string;
  checkNotice: boolean;
}

interface PageProps {
  data: Data[];
}

export default function Header(): ReactElement {
  const router = useRouter();
  const noticeRef = useRef<HTMLDivElement>(null);
  const [showNotice, setShowNotice] = useState(0);

  useEffect(() => {
    setShowNotice(0);
  }, [router.asPath]);

  useEffect(() => {
    function handleOutsideClick(event: any): void {
      if (showNotice > 0 && noticeRef.current?.contains(event.target as Node) === false) {
        setShowNotice(0);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showNotice]);

  return (
    <>
      <header className='fixed z-50 w-screen bg-[#4069FD]'>
        <nav className='flex items-center justify-between px-10'>
          <button
            className='flex pb-3'
            onClick={() => {
              router.push('/');
            }}
          >
            {Logo}
          </button>
          <div className='flex items-center justify-center space-x-4'>
            <button>{darkModeIcon}</button>
            <button
              onClick={() => {
                showNotice === 2 ? setShowNotice(1) : setShowNotice(showNotice ^ 1);
                const config = {
                  url: `${process.env.NEXT_PUBLIC_IP as string}/notice`,
                  method: 'POST',
                };
                void apiController(config);
              }}
            >
              {noticeIcon}
              {showNotice === 1 && (
                <div
                  ref={noticeRef}
                  className='absolute right-10 top-16 m-2 rounded-xl bg-[#e8e8e8] px-4 shadow-xl'
                >
                  <p className='mb-2 border-b-2 border-gray-400 pt-2 text-left font-semibold text-gray-500'>
                    NOTIFICATIONS
                  </p>
                  <div className='mb-4 space-y-2'>
                    {/* {data.map((item: Data) => (
                      <div
                        key={item.formId}
                        className='group flex h-16 w-[280px] items-center justify-between rounded-lg bg-[#C8DCFC] px-2 shadow-md transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                      >
                        <span className=' text-base font-semibold text-gray-700 group-hover:text-white'>
                          {item.category} 신청이 수락되었습니다.
                        </span>
                        <span className=' align-top text-sm text-gray-500  group-hover:text-white'>
                          {item.date}
                        </span>
                      </div>
                    ))} */}
                  </div>
                </div>
              )}
              <div className=' absolute right-[102px] top-2 flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-white'>
                {/* {Object.keys(data).length} */}
              </div>
            </button>
            <button
              onClick={() => {
                showNotice === 1 ? setShowNotice(2) : setShowNotice(showNotice ^ 2);
                const config = {
                  url: `${process.env.NEXT_PUBLIC_IP as string}/logout`,
                  method: `POST`,
                };
                async function fetch(): Promise<void> {
                  await apiController(config);
                  await router.push('/login');
                }
                void fetch();
              }}
            >
              {userIcon}
              {showNotice === 2 && (
                <div
                  ref={noticeRef}
                  className='absolute right-6 top-16 m-2 flex flex-col rounded-xl bg-[#e8e8e8] px-4 shadow-xl'
                >
                  <Link
                    href={'/my-check-in'}
                    className='mt-2 rounded-lg p-4 font-semibold text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                  >
                    My Check - in
                  </Link>
                  <Link
                    href={'/login'}
                    className='mb-2 rounded-lg p-4 font-semibold text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{ props: PageProps }> {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_IP as string}/notice`);
  return {
    props: {
      data,
    },
  };
}
