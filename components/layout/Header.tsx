import ICONS from '@/assets/icons';
import { BOCAL_CATEGORIES } from '@/constants/categories';
import type { ApplicationFormInfo } from '@/interfaces/FormInfo';
import apiController from '@/utils/apiController';
import logout from '@/utils/logout';
import type { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface NoticeDTOList {
  category: number;
  formId: number;
  date: string;
  notice: boolean;
}

interface Data {
  noticeCount: number;
  noticeDTOList: NoticeDTOList[];
}

export default function Header(): ReactElement {
  const router = useRouter();
  const noticeIconRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const [showNotice, setShowNotice] = useState(0);
  const [noticeInfo, setNoticeInfo] = useState<Data>({ noticeCount: 0, noticeDTOList: [] });
  const theme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  function handleNoticeIconClick(): void {
    if (showNotice === 1) {
      setShowNotice(0);
      return;
    }
    setShowNotice(1);
    setNoticeInfo({ ...noticeInfo, noticeCount: 0 });
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

  const routeSelectForm = async ({ category, formId }: NoticeDTOList): Promise<void> => {
    const config: AxiosRequestConfig = {
      url: `/my-checkin/${BOCAL_CATEGORIES[category].name}/${formId}`,
    };
    const { data } = await apiController<ApplicationFormInfo>(config);
    const formInfo = JSON.stringify(data);
    await router.push({
      pathname: `/${BOCAL_CATEGORIES[category].name}/form`,
      query: { formInfo },
    });
  };

  return (
    <>
      <header className='fixed z-50 w-screen bg-[#4069FD] dark:bg-slate-700'>
        <nav className='flex items-center justify-between px-10'>
          <div className='flex items-center justify-center'>
            <Link href='/' className='flex w-12 py-2'>
              {ICONS.logo}
            </Link>
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
                <div className='absolute right-10 top-12 m-1 rounded-xl bg-[#e8e8e8] px-2 shadow-xl'>
                  <p className='mb-2 border-b-2 border-gray-400 pt-1 text-left text-sm font-semibold text-gray-500'>
                    NOTIFICATIONS
                  </p>
                  <div className='mb-4 max-h-[10vh] space-y-2 overflow-auto'>
                    {noticeInfo.noticeDTOList.map((noticeDTO: NoticeDTOList) => (
                      <div
                        key={noticeDTO.formId}
                        className='group flex h-12 w-[280px] items-center justify-between rounded-lg bg-[#C8DCFC] px-2 shadow-md transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                        onClick={() => {
                          void routeSelectForm(noticeDTO);
                        }}
                      >
                        <span className='text-sm font-semibold text-gray-700 group-hover:text-white'>
                          {BOCAL_CATEGORIES[noticeDTO.category].title} 신청이 수락되었습니다.
                        </span>
                        <span className='align-top text-[5px] text-gray-500 group-hover:text-white'>
                          {dayjs(noticeDTO.date).fromNow()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className='absolute right-[80px] top-2 flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-sm text-white transition dark:bg-violet-300'>
                {noticeInfo.noticeCount}
              </div>
            </div>
            <div ref={userIconRef} className='cursor-pointer' onClick={handleUserIconClick}>
              {ICONS.user}
              {showNotice === 2 && (
                <div className='absolute right-6 top-12 m-1 flex flex-col rounded-xl bg-[#e8e8e8] px-2 shadow-xl'>
                  <Link
                    href={{
                      pathname: '/my-checkin',
                      query: { category: 'conference-rooms' },
                    }}
                    className='mt-1 rounded-lg p-2 text-sm text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white dark:hover:bg-slate-700'
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
                    className='mb-1 rounded-lg p-2 text-sm text-gray-600 transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white dark:hover:bg-slate-700'
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
