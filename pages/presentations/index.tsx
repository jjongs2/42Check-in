import type PresentationsFormInfo from '@/interfaces/PresentationsFormInfo';
import apiController from '@/utils/apiController';
import type { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import type { ParsedUrlQueryInput } from 'querystring';
import { useEffect, useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';

export default function Presentations(): ReactElement {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const [formInfos, setFormInfos] = useState<PresentationsFormInfo[]>();

  useEffect(() => {
    const getFormInfos = async (): Promise<void> => {
      const config: AxiosRequestConfig = {
        url: '/presentations',
        params: { month: date.format('YYYY-MM-DD') },
      };
      const { data } = await apiController<PresentationsFormInfo[]>(config);
      setFormInfos(data);
    };
    void getFormInfos();
  }, [date]);

  if (formInfos === undefined) return;

  const handleMonthChange = debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
    const year = dayjs(target.value).get('year');
    if (year > 2042) {
      target.value = today.format('YYYY-MM');
    }
    setDate(dayjs(target.value));
  }, 420);

  return (
    <div className='m-8 min-w-[300px] rounded-2xl border-2 border-[#6A70FF] bg-slate-100 p-4 shadow-xl dark:border-gray-300 dark:bg-gray-500'>
      <div className='flex items-center justify-between border-b-2 dark:text-gray-300'>
        <p className='text-xl font-semibold text-gray-600 dark:text-gray-300'>{date.get('year')}</p>
        <p className='text-xl font-semibold text-gray-600 dark:text-gray-300'>
          {date.get('month') + 1} 월
        </p>
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
        {formInfos.map((formInfo, index) => {
          const { date: formDateString, formId, intraId, subject } = formInfo;
          const formDate = dayjs(formDateString);
          const date = formDate.format('YYYY-M-D');
          const isBlank = formId === null;
          const query: ParsedUrlQueryInput = {};
          if (isBlank) {
            query.date = date;
          } else {
            query.formInfo = JSON.stringify(formInfo);
          }
          return (
            <Link
              key={index}
              href={{
                pathname: '/presentations/form',
                query,
              }}
              className='group flex items-center justify-between rounded-md bg-white shadow-xl transition hover:bg-[#6AA6FF] dark:bg-gray-700 dark:hover:bg-gray-300'
            >
              <div className='flex items-center space-x-2'>
                <button className='h-16 w-14 rounded-md text-2xl font-semibold text-gray-600 transition group-hover:text-white dark:text-white dark:group-hover:text-gray-700'>
                  {formDate.get('date')}
                </button>
                <div className='overflow-hidden'>
                  <p className='animate-slide whitespace-nowrap text-sm font-semibold text-gray-800 transition dark:text-white dark:group-hover:text-gray-800'>
                    {subject ?? '신청을 기다리고 있습니다. 🤔'}
                  </p>
                  <p className='text-gray-500 dark:text-white dark:group-hover:text-gray-800'>
                    {!isBlank && `${intraId} 😎`}
                  </p>
                </div>
              </div>
              <Link
                href={{
                  pathname: '/presentations/form',
                  query: { date },
                }}
                className={`mr-4 rounded-xl px-3 py-0.5 text-[#FEFFFF] hover:text-black dark:text-[#EEEFEF] ${
                  isBlank ? 'bg-indigo-200 dark:bg-indigo-800' : 'bg-violet-300 dark:bg-violet-900'
                }
                `}
              >
                {isBlank ? '신청' : '대기'}
              </Link>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
