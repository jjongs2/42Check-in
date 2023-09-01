import apiController from '@/utils/apiController';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';

interface Data {
  formId: number;
  status: number;
  date: string;
  subject: string; // 발표 제목
  contents: string; // 발표 내용
  detail: string; // 상세 내용
  time: number; // (enum) 15, 30, 45, 1시간
  type: number; // 유형 겁나 많음 enum
  screen: boolean;
  intraId: string;
}

export default function Presentations(): ReactElement {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const [presentationsInfo, setPresentationsInfo] = useState<Data[]>();

  const handleMonthChange = debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
    const year = dayjs(target.value).get('year');
    if (year > 2042) {
      target.value = today.format('YYYY-MM');
    }
    setDate(dayjs(target.value));
  }, 420);

  useEffect(() => {
    async function getMonthData(): Promise<void> {
      const config = {
        url: '/presentations',
        params: { month: date.format('YYYY-MM-DD') },
      };
      const { data } = await apiController(config);
      setPresentationsInfo(data);
    }
    void getMonthData();
  }, [date]);

  if (presentationsInfo === undefined) return;

  return (
    <div className='m-8 rounded-2xl border-2 border-[#6A70FF] bg-slate-100 p-8 shadow-xl dark:border-green-800 dark:bg-gray-500'>
      <div className='flex items-center justify-between border-b-2 dark:text-gray-300'>
        <h1 className='text-xl font-semibold text-gray-600 dark:text-gray-300'>
          {date.get('year')}
        </h1>
        <div>
          <h3 className='text-xl font-semibold text-gray-600 dark:text-gray-300'>
            {date.get('month') + 1} 월
          </h3>
        </div>
        <input
          type='month'
          className='bg-slate-100 dark:bg-gray-500'
          defaultValue={date.format('YYYY-MM')}
          min='2022-01'
          max='2042-12'
          onChange={handleMonthChange}
        />
      </div>
      <div className='mt-2 space-y-2'>
        {presentationsInfo.map((item, i: number) => (
          <Link
            key={i}
            href={{
              pathname: '/presentations/form',
              query: {
                date: dayjs(item.date).format('YYYY-M-D'),
              },
            }}
            className='group flex items-center justify-between rounded-md bg-white shadow-xl transition hover:bg-[#6AA6FF] dark:bg-gray-700 dark:hover:bg-gray-300'
          >
            <div className='justify-left flex items-center space-x-2'>
              <button className='h-16 w-16 rounded-md text-2xl font-semibold text-gray-600 transition group-hover:text-white dark:text-white dark:group-hover:text-gray-700'>
                {item.date.split('-')[2]}
              </button>
              <div className='overflow-hidden'>
                <h1 className='animate-slide whitespace-nowrap font-semibold text-gray-800 transition dark:text-white dark:group-hover:text-gray-800'>
                  {item.subject !== null
                    ? `제목 : ${item.subject}`
                    : '신청을 기다리고 있습니다. 🤔'}
                </h1>
                <h5 className='text-gray-500 dark:text-white dark:group-hover:text-gray-800'>
                  {item.intraId !== null && `${item.intraId} 😎`}
                </h5>
              </div>
            </div>
            <button className='mr-4 rounded-xl px-3 text-black group-hover:bg-white dark:text-white dark:group-hover:bg-gray-500'>
              {item.formId !== null ? '대기 ' : '신청'}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
