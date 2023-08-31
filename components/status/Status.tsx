import type FormInfo from '@/interfaces/FormInfo';
import { ROOM_INFOS } from '@/pages/conference-rooms/form';
import { cls } from '@/styles/cls';
import getDurations from '@/utils/getDurations';
import dayjs from 'dayjs';
import { type ReactElement } from 'react';

interface StatusProps {
  status: FormInfo;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectForm?: React.Dispatch<React.SetStateAction<FormInfo | undefined>>;
  mouseOnIndex?: number;
  vocal?: boolean;
}

const SPEECHTIME = ['15분', '30분', '45분', '1시간', '1시간 이상'];
const STATUS = ['신청 중', '승인', '스케줄 등록 완료', '아젠다 등록', '강의 완료', '차례 대기 중'];

export default function Status({
  status,
  setShowModal,
  setSelectForm,
  mouseOnIndex,
  vocal,
}: StatusProps): ReactElement {
  const date = dayjs(status.date).format('YYYY년 MM월 DD일');
  let time, details;
  if (status.equipment !== undefined) {
    time = status.period;
    details = status.equipment;
  } else if (status.subject !== undefined) {
    time = SPEECHTIME[status.time];
    details = status.subject;
  } else if (status.visitorsName !== undefined) {
    time = status.visitTime;
    details = status.visitorsName;
  } else if (status.reservationInfo !== undefined) {
    const [start, end] = getDurations(status.reservationInfo)[0].map((time) =>
      dayjs(time).format('HH:mm'),
    );
    time = `${start} - ${end}`;
    const mask = 0xffffff;
    const { location, title } = ROOM_INFOS.find(
      (room) => Number(room.id) === (status.reservationInfo | mask) >>> 0,
    );
    details = `${location} ${title}`;
  }

  return (
    <>
      <div className='dark:text-white'>{date}</div>
      <div className='border-2 border-gray-300 dark:border-white' />
      <div className='dark:text-white'>{time}</div>
      <div className='border-2 border-gray-300 dark:border-white' />
      <div className='w-56 overflow-hidden text-ellipsis whitespace-nowrap dark:text-gray-300'>
        {details}
      </div>
      {status.reservationInfo === undefined && (
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
      )}
      <button
        onClick={(event) => {
          event.preventDefault();
          setShowModal(true);
          setSelectForm(status);
        }}
        className={`rounded-2xl bg-red-400 px-2 text-white transition hover:bg-red-500 ${
          !vocal && mouseOnIndex === status.formId ? '' : 'invisible'
        }`}
      >
        취소
      </button>
    </>
  );
}
