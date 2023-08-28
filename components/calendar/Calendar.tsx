import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

import CalendarRow from './CalendarRow';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKS = [0, 1, 2, 3, 4, 5];

export default function Calendar(): ReactElement {
  const prevMonth = useRef<number>();
  const { pathname } = useRouter();
  const [availableDates, setAvailableDates] = useState<boolean[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [firstDays, setFirstDays] = useState<number[]>([]);
  const [lastDate, setLastDate] = useState(0);

  function handlePrevMonthClick(): void {
    if (prevMonth.current === 0) {
      setCurrentMonth(11);
      return;
    }
    setCurrentMonth(currentMonth - 1);
  }

  function handleNextMonthClick(): void {
    if (prevMonth.current === 11) {
      setCurrentMonth(0);
      return;
    }
    setCurrentMonth(currentMonth + 1);
  }

  useEffect(() => {
    async function fetchData(): Promise<void> {
      function decodeDates(dates: number): boolean[] {
        return Array(lastDate).map((_, index) => Boolean(dates ^ (1 << index)));
      }
      const config = {
        url: `/conference-rooms/calendar/${currentYear}/${currentMonth + 1}`,
      };
      const { data } = await apiController(config);
      console.log(data);
      setAvailableDates(decodeDates(data));
    }
    async function handleCurrentYear(): Promise<void> {
      if (prevMonth.current === 0 && currentMonth === 11) {
        setCurrentYear((year) => year - 1);
      } else if (prevMonth.current === 11 && currentMonth === 0) {
        setCurrentYear((year) => year + 1);
      }
    }
    async function handleLastDate(): Promise<void> {
      setLastDate(new Date(currentYear, currentMonth + 1, 0).getDate());
    }
    async function handleCurrentMonth(): Promise<void> {
      await handleCurrentYear();
      await handleLastDate();
      if (pathname.startsWith('/conference-rooms')) {
        void fetchData();
      }
      prevMonth.current = currentMonth;
    }
    void handleCurrentMonth();
  }, [currentMonth]);

  useEffect(() => {
    const days = [];
    for (let i = 1; i <= 12; i++) {
      days.push(new Date(`${currentYear}/${i}/1`).getDay());
    }
    setFirstDays(days);
  }, [currentYear]);

  return (
    <div className='m-16 rounded bg-white p-4 shadow-lg transition dark:bg-gray-700'>
      <div className='w-full rounded'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-left text-xl font-bold text-black dark:text-white'>
            {` ${currentYear}년 ${currentMonth + 1}월`}
          </div>
          <div className='flex space-x-4'>
            <button
              className='rounded bg-green-400 p-2 text-white dark:bg-gray-400'
              onClick={handlePrevMonthClick}
            >
              <svg width={15} height={15} fill='currentColor' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z'
                ></path>
              </svg>
            </button>
            <button
              className='rounded bg-green-400 p-2 text-white dark:bg-gray-400'
              onClick={handleNextMonthClick}
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
                    lastDate={lastDate}
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
