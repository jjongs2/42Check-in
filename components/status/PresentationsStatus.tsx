import type PresentationsFormInfo from '@/interfaces/PresentationsFormInfo';
import { cls } from '@/styles/cls';
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
    <div className='flex w-full space-x-2'>
      <div className='dark:text-white'>{status.date}</div>
      <div className='border-2 border-gray-300 dark:border-white' />
      <div className='dark:text-white'>{SPEECHTIME[status.time]}</div>
      <div className='border-2 border-gray-300 dark:border-white' />
      <div className='w-56 overflow-hidden text-ellipsis whitespace-nowrap dark:text-gray-300'>
        {status.subject}
      </div>
      <div
        className={cls(
          status.status !== 0
            ? 'bg-green-400 dark:bg-green-800'
            : 'bg-yellow-300 dark:bg-yellow-700',
          'relative -right-[14%] -top-10 rounded-xl px-4 text-gray-700 dark:text-gray-300',
        )}
      >
        {STATUS[status.status]}
      </div>
      {status.status !== 4 && (
        <select
          name='statusBox'
          id={status.formId.toString()}
          onChange={onChange}
          defaultValue={status.status}
        >
          <option value='' selected>
            상태를 선택해주세요.
          </option>
          <option value='1'>{STATUS[1]}</option>
          <option value='2'>{STATUS[2]}</option>
          <option value='3'>{STATUS[3]}</option>
        </select>
      )}
    </div>
  );
}
