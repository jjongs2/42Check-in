import type PresentationsFormInfo from '@/interfaces/PresentationsFormInfo';
import { cls } from '@/styles/cls';
import { preventDefault } from '@fullcalendar/core/internal';
import dayjs from 'dayjs';
import { Dispatch, ReactElement } from 'react';

interface PresentationsStatus {
  status: PresentationsFormInfo;
  setChangePresentations: Dispatch<React.SetStateAction<{}>>;
  changePresentations: {};
}

const STATUS = ['신청 중', '스케줄 등록 완료', '아젠다 등록', '강의 완료', '차례 대기 중'];
const SPEECHTIME = ['15분', '30분', '45분', '1시간', '1시간 이상'];

export default function PresentationsStatus({
  status,
  setChangePresentations,
  changePresentations,
}: PresentationsStatus): ReactElement {
  const date = dayjs(status.date).format('YYYY년 MM월 DD일');

  const onChange = (e) => {
    const { id, value } = e.target;

    const newStatus = { ...changePresentations };

    if (value === '') {
      delete newStatus[id];
    } else {
      newStatus[id] = value;
    }
    setChangePresentations(newStatus);
  };
  return (
    <div className='flex w-full items-center justify-evenly text-sm'>
      <div className='w-22 ml-1 whitespace-pre-line text-center dark:text-white sm:w-max'>
        {date}
      </div>
      <div className='ml-2 h-3 border-[1px] border-gray-300 dark:border-white' />
      <div className='w-20 text-center dark:text-white sm:w-max'>{SPEECHTIME[status.time]}</div>
      <div className='h-3 border-[1px] border-gray-300 dark:border-white' />
      <div className='w-20 text-center dark:text-gray-300 sm:w-max'>{status.subject}</div>
      <div
        className={cls(
          status.status !== 0
            ? 'bg-green-400 dark:bg-green-800'
            : 'bg-yellow-300 dark:bg-yellow-700',
          'relative -right-[30%] -top-7 w-max whitespace-nowrap rounded-xl px-2 text-gray-700 dark:text-gray-300',
        )}
      >
        {STATUS[status.status]}
      </div>
      {status.status !== 4 && (
        <select
          name='statusBox'
          id={status.formId.toString()}
          onChange={onChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
          defaultValue={status.status}
          className='w-max px-2 transition group-hover:bg-[#6AA6FF] group-hover:transition group-hover:duration-300 group-hover:ease-in-out dark:bg-slate-800 dark:group-hover:bg-gray-700'
        >
          <option value='0'>상태를 선택해주세요.</option>
          <option value='1'>{STATUS[1]}</option>
          <option value='2'>{STATUS[2]}</option>
          <option value='3'>{STATUS[3]}</option>
        </select>
      )}
    </div>
  );
}
