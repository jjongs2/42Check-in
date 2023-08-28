import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ReactElement } from 'react';

interface CalendarDateProps {
  date: number;
  month: number;
  year: number;
  isToday?: boolean;
}

interface CalendarRowProps {
  firstDay: number;
  lastDate: number;
  row: number;
  month: number;
  year: number;
}

function CalendarDate({ date, month, year, isToday = false }: CalendarDateProps): ReactElement {
  const { asPath } = useRouter();
  return (
    <td className='relative px-2 py-3 text-center text-gray-800 hover:text-blue-500 dark:text-gray-100 md:px-3'>
      <Link
        href={`${asPath}/${year}-${month}-${date}`}
        className={isToday ? 'rounded-full border-2 border-green-400 p-1 dark:border-white' : ''}
      >
        {date}
      </Link>
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
  const today = useState(new Date().getDate())[0];

  const contents = [];
  if (row === 0) {
    for (let i = 0; i < firstDay; ++i) {
      contents.push(<td></td>);
    }
    contents.push(<CalendarDate date={1} month={month} year={year} />);
    const len = 7 - contents.length;
    for (let i = 1; i <= len; ++i) {
      contents.push(
        <CalendarDate
          date={i + 1}
          month={month}
          year={year}
          isToday={
            today === i + 1 && new Date().getMonth() === month && new Date().getFullYear() === year
          }
        />,
      );
    }
    return <>{contents}</>;
  }
  for (let i = 1; i <= 7; ++i) {
    if (i + (7 * row - firstDay) <= lastDate) {
      contents.push(
        <CalendarDate
          date={i + (7 * row - firstDay)}
          month={month}
          year={year}
          isToday={
            today === i + (7 * row - firstDay) &&
            new Date().getMonth() === month &&
            new Date().getFullYear() === year
          }
        />,
      );
    }
  }
  return <>{contents}</>;
}
