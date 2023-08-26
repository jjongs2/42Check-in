import type FormInfo from '@/interfaces/FormInfo';
import type { ReactElement } from 'react';

interface StatusProps {
  status: FormInfo;
}

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

  return (
    <>
      <div className=''>{date}</div>
      <div className=' border-2 border-gray-300' />
      <div className=''>{time}</div>
      <div className=' border-2 border-gray-300' />
      <div className=' w-56 overflow-hidden text-ellipsis whitespace-nowrap'>{details}</div>
    </>
  );
}
