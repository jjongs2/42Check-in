import instance from '@/utils/instance';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

import CalendarRow from './CalendarRow';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKS = [0, 1, 2, 3, 4, 5];

export default function Calendar(): ReactElement {
  const prevMonth = useRef<number>();
  const { asPath } = useRouter();
  const [unavailableDates, setUnavailableDates] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [firstDays, setFirstDays] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const url = `/conference-rooms/calendar/${currentYear}/${currentMonth}`;
      const { data } = await instance.get(url);
      setUnavailableDates(data);
    }
    if (asPath.startsWith('/conference-rooms')) {
      void fetchData();
    }
    prevMonth.current = currentMonth;
  }, [currentMonth]);

  useEffect(() => {
    const days = [];
    for (let i = 1; i <= 12; i++) {
      days.push(new Date(`${currentYear}/${i}/1`).getDay());
    }
    setFirstDays(days);
  }, [currentYear]);

  return (
    <div className='m-16 rounded bg-white p-4 shadow-lg dark:bg-gray-700'>
      <div className='w-full rounded'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-left text-xl font-bold text-black dark:text-white'>
            {` ${currentYear}년 ${currentMonth + 1}월`}
          </div>
          <div className='flex space-x-4'>
            <button
              className='rounded bg-green-400 p-2 text-white'
              onClick={() => {
                if (prevMonth.current === 0) {
                  setCurrentYear(currentYear - 1);
                  setCurrentMonth(11);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
            >
              <svg width={15} height={15} fill='currentColor' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z'
                ></path>
              </svg>
            </button>
            <button
              className='rounded bg-green-400 p-2 text-white'
              onClick={() => {
                if (prevMonth.current === 11) {
                  setCurrentYear(currentYear + 1);
                  setCurrentMonth(0);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
            >
              <svg width={15} height={15} fill='currentColor' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z'
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className='-mx-2'>
          <table className='w-full dark:text-white'>
            <thead>
              <tr>
                {DAYS.map((day) => (
                  <th key={day} className='px-2 py-3 md:px-3'>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEEKS.map((week) => (
                <tr key={week}>
                  <CalendarRow
                    firstDay={firstDays[currentMonth]}
                    lastDay={new Date(currentYear, currentMonth + 1, 0).getDate()}
                    row={week}
                    month={currentMonth}
                    year={currentYear}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
