import type FormInfo from '@/interfaces/FormInfo';
import { ROOM_INFOS } from '@/pages/conference-rooms/form';
import { cls } from '@/styles/cls';
import getDurations from '@/utils/getDurations';
import dayjs from 'dayjs';
import { type ReactElement } from 'react';

interface StatusProps {
  status: FormInfo;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectForm?: React.Dispatch<React.SetStateAction<FormInfo | undefined>>;
  mouseOnIndex?: number;
  vocal?: boolean;
}

const STATUS = ['신청 중', '승인', '스케줄 등록 완료', '아젠다 등록', '강의 완료', '차례 대기 중'];
const SPEECHTIME = ['15분', '30분', '45분', '1시간', '1시간 이상'];
const PERIOD = ['', '1 개월', '', '3 개월'];
const DEVICES = ['', '맥북', '삼성 노트북', '아이패드'];
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
    time = PERIOD[status.period];
    details = DEVICES[status.equipment];
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
    <div className='flex w-full items-center justify-evenly text-sm'>
      <div className='w-22 text-center dark:text-white sm:w-max'>{date}</div>
      <div className='ml-2 h-3 border-[1px] border-gray-300 dark:border-white' />
      <div className='w-20 text-center dark:text-white sm:w-max'>{time}</div>
      <div className='h-3  border-[1px] border-gray-300 dark:border-white' />
      <div className='w-20 whitespace-nowrap text-center dark:text-gray-300 md:w-max'>
        {details}
      </div>
      {status.reservationInfo === undefined && (
        <div
          className={cls(
            status.status !== 0
              ? 'bg-green-400 dark:bg-green-800'
              : 'bg-yellow-300 dark:bg-yellow-700',
            'relative -right-6 -top-7 w-max whitespace-nowrap rounded-xl px-4 text-gray-700 dark:text-gray-300',
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
    </div>
  );
}
