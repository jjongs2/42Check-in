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
  const date = dayjs(status.date).format('YY.MM.DD');

  const onChange = (e) => {
    const { id, value } = e.target;

    const newStatus = { ...changePresentations };

    if (value === '0') {
      delete newStatus[id];
    } else {
      newStatus[id] = value;
    }
    setChangePresentations(newStatus);
  };
  return (
    <div className='flex h-full w-full flex-col items-end justify-center'>
      <div className='mt-6 flex w-full items-center justify-between text-sm'>
        <div className='ml-1 flex w-[18%] justify-center whitespace-nowrap text-center dark:text-white '>
          {date}
        </div>
        <div className='h-3 border-[1px] border-gray-300 dark:border-white' />
        <div className='w-[10%] text-center dark:text-white'>{SPEECHTIME[status.time]}</div>
        <div className='h-3 border-[1px] border-gray-300 dark:border-white' />
        <div className='w-[51%] whitespace-nowrap text-center dark:text-gray-300'>
          {status.subject}
        </div>
        <select
          name='statusBox'
          id={status.formId.toString()}
          onChange={onChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
          defaultValue={status.status}
          className={cls(
            status.status !== 4 ? 'visible' : 'invisible',
            'w-[21%] text-xs transition group-hover:bg-[#6AA6FF] group-hover:transition group-hover:duration-300 group-hover:ease-in-out dark:bg-slate-800 dark:group-hover:bg-gray-700 sm:text-sm',
          )}
        >
          <option value='0'>선택해주세요.</option>
          <option value='1'>{STATUS[1]}</option>
          <option value='2'>{STATUS[2]}</option>
          <option value='3'>{STATUS[3]}</option>
        </select>
      </div>
      <div
        className={cls(
          status.status !== 0
            ? 'bg-green-400 dark:bg-green-800'
            : 'bg-yellow-300 dark:bg-yellow-700',
          'relative -top-12 right-3 h-[24px] w-max whitespace-nowrap rounded-xl px-2 text-sm text-gray-700 dark:text-gray-300',
        )}
      >
        {STATUS[status.status]}
      </div>
    </div>
  );
}
