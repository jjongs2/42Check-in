import type FormInfo from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import type { ReactElement } from 'react';

interface StatusProps {
  status: FormInfo;
}

const STATUS = ['승인 대기', '승인', '아젠다 등록', '강의 완료', '대기 중'];
export default function Status({ status }: StatusProps): ReactElement {
  let date, time, details;

  if (status.equipment !== undefined) {
    date = status.date;
    time = status.period;
    details = status.equipment;
  } else if (status.subject !== undefined) {
    date = status.date;
    time = status.time;
    details = status.subject;
  } else if (status.visitorsName !== undefined) {
    date = status.visitDate;
    time = status.visitTime;
    details = status.visitorsName;
  }

  console.log(status);
  return (
    <>
      <div className='dark:text-white'>{date}</div>
      <div className='border-2 border-gray-300 dark:border-white' />
      <div className='dark:text-white'>{time}</div>
      <div className='border-2 border-gray-300 dark:border-white' />
      <div className='w-56 overflow-hidden text-ellipsis whitespace-nowrap dark:text-white'>
        {details}
      </div>
      <div
        className={cls(
          status.status !== 0
            ? 'bg-green-400 dark:bg-green-900'
            : 'bg-yellow-300 dark:bg-yellow-500',
          'relative -top-10 rounded-xl px-4 text-gray-700',
        )}
      >
        {STATUS[status.status]}
      </div>
    </>
  );
}
