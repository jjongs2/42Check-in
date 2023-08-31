import ICONS from '@/assets/icons';
import apiController from '@/utils/apiController';
import logout from '@/utils/logout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

interface Data {
  category: number;
  formId: number;
  date: string;
  notice: boolean;
}

const CATEGORY = {
  0: { category: '외부인 초대', url: 'visitors' },
  1: { category: '기자재 대여', url: 'equipments' },
  2: { category: '수요지식회', url: 'presentations' },
};

export default function Header({ setShowSideBar, showSidebar }): ReactElement {
  const router = useRouter();
  const noticeIconRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const [showNotice, setShowNotice] = useState(0);
  const [noticeInfo, setNoticeInfo] = useState<Data[]>([]);
  const theme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  function handleNoticeIconClick(): void {
    if (showNotice === 1) {
      setShowNotice(0);
      return;
    }
    setShowNotice(1);
    const config = {
      url: '/notice',
      method: 'POST',
    };
    void apiController(config);
  }

  function handleThemeToggleClick(): void {
    setIsDarkMode((prev) => {
      const curr = !prev;
      document.documentElement.classList.toggle('dark', curr);
      localStorage.setItem('theme', curr ? 'dark' : 'light');
      return curr;
    });
  }

  function handleUserIconClick(): void {
    if (showNotice === 2) {
      setShowNotice(0);
      return;
    }
    setShowNotice(2);
  }

  useEffect(() => {
    if (theme === null) {
      localStorage.setItem('theme', 'light');
    } else if (theme === 'dark') {
      document.documentElement.classList.toggle('dark', true);
    }
  }, []);

  useEffect(() => {
    setShowNotice(0);
    const config = {
      url: '/notice',
    };
    async function fetchData(): Promise<void> {
      const { data } = await apiController(config);
      setNoticeInfo(data);
    }
    void fetchData();
  }, [router]);

  useEffect(() => {
    function handleOutsideClick(event: any): void {
      if (showNotice === 0) return;
      const currentRef = showNotice === 1 ? noticeIconRef : userIconRef;
      if (!currentRef.current.contains(event.target as Node)) {
        setShowNotice(0);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showNotice]);

  const routeSelectForm = async (item: Data): Promise<void> => {
    const config = {
      url: `my-checkin/${CATEGORY[item.category].url}/${item.formId}`,
    };
    const { data } = await apiController(config);
    console.log(data);
    const pathUrl = {
      pathname: `/my-checkin/${CATEGORY[item.category].category}`,
      query: { formDetail: JSON.stringify(data) },
    };
    await router.push(pathUrl);
  };

  return (
    <>
      <header className='fixed z-50 w-screen bg-[#4069FD] dark:bg-slate-700'>
        <nav className='flex items-center justify-between px-10'>
          <div className='flex items-center justify-center'>
            <Link href='/' className='flex w-12 py-2'>
              {ICONS.logo}
            </Link>
            <button
              onClick={() => {
                setShowSideBar(!showSidebar);
              }}
              className='full-sidebar ml-2 mt-2 h-[50px] w-[50px] dark:text-white'
            >
              {ICONS.threeBars}
            </button>
          </div>
          <div className='flex items-center justify-center space-x-4'>
            <div className='col-span-full flex space-x-2'>
              <div className='flex h-6 items-center'>
                <button
                  type='button'
                  className={`flex w-8 flex-none cursor-pointer rounded-full p-px transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    isDarkMode ? 'bg-gray-200' : 'bg-gray-700'
                  }`}
                  role='switch'
                  aria-checked={isDarkMode}
                  aria-labelledby='switch-1-label'
                  onClick={handleThemeToggleClick}
                >
                  <span
                    aria-hidden='true'
                    className={`h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${
                      isDarkMode ? 'translate-x-3.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div ref={noticeIconRef} className='cursor-pointer' onClick={handleNoticeIconClick}>
              {ICONS.notice}
              {showNotice === 1 && (
                <div className='absolute right-10 top-12 m-2 rounded-xl bg-[#e8e8e8] px-4 shadow-xl'>
                  <p className='mb-2 border-b-2 border-gray-400 pt-2 text-left font-semibold text-gray-500'>
                    NOTIFICATIONS
                  </p>
                  <div className='mb-4 space-y-2'>
                    {noticeInfo.map((item: Data) => (
                      <div
                        key={item.formId}
                        className='group flex h-16 w-[280px] items-center justify-between rounded-lg bg-[#C8DCFC] px-2 shadow-md transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                        onClick={() => {
                          routeSelectForm(item);
                        }}
                      >
                        <span className=' text-base font-semibold text-gray-700 group-hover:text-white'>
                          {CATEGORY[item.category].category} 신청이 수락되었습니다.
                        </span>
                        <span className=' align-top text-sm text-gray-500  group-hover:text-white'>
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className='absolute right-[80px] top-2 flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-sm text-white transition dark:bg-violet-300'>
                {noticeInfo.length}
              </div>
            </div>
            <div ref={userIconRef} className='cursor-pointer' onClick={handleUserIconClick}>
              {ICONS.user}
              {showNotice === 2 && (
                <div className='absolute right-6 top-12 m-1 flex flex-col rounded-xl bg-[#e8e8e8] px-2 shadow-xl'>
                  <Link
                    href={'/my-checkin'}
                    className='mt-2 rounded-lg p-4 text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white dark:hover:bg-slate-700'
                  >
                    My Check - in
                  </Link>
                  <button
                    onClick={() => {
                      const config = {
                        url: '/logout',
                        method: 'POST',
                      };
                      async function fetch(): Promise<void> {
                        await apiController(config);
                        logout();
                        await router.push('/login');
                      }
                      void fetch();
                    }}
                    className='mb-2 rounded-lg p-4 text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white dark:hover:bg-slate-700'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
