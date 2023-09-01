import { cls } from '@/styles/cls';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ReactElement } from 'react';

interface CalendarDateProps {
  date: number;
  month: number;
  year: number;
}

interface CalendarRowProps {
  firstDay: number;
  lastDate: number;
  row: number;
  month: number;
  year: number;
}

function CalendarDate({ date, month, year }: CalendarDateProps): ReactElement {
  const router = useRouter();

  const today = dayjs();
  const currentDate = today.year(year).month(month).date(date);
  const isToday = currentDate.isSame(today, 'date');

  function handleDateClick(): void {
    const href = {
      pathname: `${router.asPath}/form`,
      query: {
        date: `${year}-${month + 1}-${date}`,
      },
    };
    void router.push(href);
  }

  return (
    <td onClick={handleDateClick} className='group relative cursor-pointer px-2 py-7 md:px-3'>
      <p
        className={cls(
          isToday
            ? 'border-2 border-[#4069FD] dark:border-white dark:group-hover:border-blue-500'
            : '',
          'mx-auto h-7 w-7 rounded-full text-center text-gray-800 group-hover:text-blue-500 dark:text-gray-100',
        )}
      >
        {date}
      </p>
    </td>
  );
}

export default function CalendarRow({
  firstDay,
  lastDate,
  row,
  month,
  year,
}: CalendarRowProps): ReactElement {
  const contents = [];
  if (row === 0) {
    for (let i = 0; i < firstDay; ++i) {
      contents.push(<td key={-i}></td>);
    }
    contents.push(<CalendarDate key={1} date={1} month={month} year={year} />);
    const len = 7 - contents.length;
    for (let i = 1; i <= len; ++i) {
      const date = i + 1;
      contents.push(<CalendarDate key={date} date={date} month={month} year={year} />);
    }
    return <>{contents}</>;
  }
  for (let i = 1; i <= 7; ++i) {
    const date = i + (7 * row - firstDay);
    if (date <= lastDate) {
      contents.push(<CalendarDate key={date} date={date} month={month} year={year} />);
    }
  }
  return <>{contents}</>;
}
