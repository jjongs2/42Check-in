import ICONS from '@/assets/icons';
import apiController from '@/utils/apiController';
import logout from '@/utils/logout';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

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

interface HeaderProps {
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
}

const CATEGORY = {
  0: { category: '외부인 초대', url: 'visitors' },
  1: { category: '기자재 대여', url: 'equipments' },
  2: { category: '수요지식회', url: 'presentations' },
};

export default function Header({ setShowSideBar, showSidebar }: HeaderProps): ReactElement {
  const router = useRouter();
  const [showNotice, setShowNotice] = useState(false);
  const [noticeInfo, setNoticeInfo] = useState<Data>(0);
  const [apiOnce, setApiOnce] = useState(false);
  const toggleRef = useRef(null);

  const today = dayjs();

  function handleNoticeIconClick(): void {
    setShowNotice(!showNotice);
    if (!apiOnce) {
      const config = {
        url: '/notice',
        method: 'POST',
      };
      void apiController(config);
      setApiOnce(true);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setShowNotice(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const config = {
      url: '/notice',
    };
    async function fetchData(): Promise<void> {
      const { data } = await apiController(config);
      setNoticeInfo(data);
    }
    void fetchData();
  }, [router]);

  const routeSelectForm = async (item: NoticeDTOList): Promise<void> => {
    const config = {
      url: `my-checkin/${CATEGORY[item.category].url}/${item.formId}`,
    };
    const { data } = await apiController(config);
    const pathUrl = {
      pathname: `/my-checkin/${CATEGORY[item.category].url}`,
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
            <div ref={toggleRef} className='cursor-pointer' onClick={handleNoticeIconClick}>
              {ICONS.notice}
              {showNotice && (
                <div className='absolute right-10 top-12 m-2 rounded-xl bg-[#e8e8e8] px-4 shadow-xl'>
                  <p className='mb-2 border-b-2 border-gray-400 pt-2 text-left font-semibold text-gray-500'>
                    NOTIFICATIONS
                  </p>
                  <div className='mb-4 max-h-[10vh] space-y-2 overflow-y-scroll'>
                    {noticeInfo.noticeDTOList.map((item: NoticeDTOList) => {
                      const date = dayjs(item.date);
                      const relativeDate = date.isSame(today, 'date') ? '오늘' : date.fromNow();
                      return (
                        <div
                          key={item.formId}
                          className='group flex h-14 w-[280px] items-center justify-between rounded-lg bg-[#C8DCFC] px-2 shadow-md transition hover:bg-[#4069FD] hover:bg-opacity-60 hover:text-white'
                          onClick={() => {
                            void routeSelectForm(item);
                          }}
                        >
                          <span className='text-sm font-semibold text-gray-700 group-hover:text-white'>
                            {CATEGORY[item.category].category} 신청이 수락되었습니다.
                          </span>
                          <span className='align-top text-sm text-gray-500 group-hover:text-white'>
                            {relativeDate}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className='absolute right-[80px] top-2 flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-sm text-white transition dark:bg-violet-300'>
                {noticeInfo.noticeCount}
              </div>
            </div>
            <Link href={'/my-checkin'}>{ICONS.user}</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
