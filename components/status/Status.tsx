import CATEGORIES from '@/constants/categories';
import STATUS, { PRESENTATION_STATUS } from '@/constants/status';
import TIMES from '@/constants/times';
import type FormInfo from '@/interfaces/FormInfo';
import { ROOM_INFOS } from '@/pages/conference-rooms/form';
import { cls } from '@/styles/cls';
import getDurations from '@/utils/getDurations';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { isMobile } from 'react-device-detect';

interface StatusProps {
  status: any;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectForm?: React.Dispatch<React.SetStateAction<FormInfo | undefined>>;
  mouseOnIndex?: number;
  bocal?: boolean;
}

const PERIOD = ['', '1 개월', '', '3 개월'];
const DEVICES = ['기타', '맥북', '삼성 노트북', '아이패드'];

export default function Status({
  status,
  setShowModal,
  setSelectForm,
  mouseOnIndex,
  bocal,
}: StatusProps): ReactElement {
  const date = dayjs(status.date).format('YY.MM.DD (ddd)');
  const router = useRouter();
  const { category } = router.query;
  const isConferenceRoom = category === 'conference-rooms';

  let time, details;
  if (bocal) {
    if (status.equipment !== undefined) {
      time = DEVICES[status.equipment];
    } else if (status.subject !== undefined) {
      time = TIMES[status.time];
    } else if (status.visitorsName !== undefined) {
      time = status.visitTime;
    }
    details = status.intraId;
  } else {
    if (status.equipment !== undefined) {
      time = PERIOD[status.period];
      details = DEVICES[status.equipment];
    } else if (status.subject !== undefined) {
      time = TIMES[status.time];
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
      if (isMobile) {
        details = details.replace('Cluster', 'C');
      }
    }
  }

  function CancelButton(): ReactElement {
    const isCancelable = category === CATEGORIES.conference || new Set([0, 4]).has(status.status);
    let isVisible = false;
    if (!bocal && !isMobile && isCancelable && mouseOnIndex === status.formId) {
      isVisible = true;
    }
    return (
      <button
        onClick={(event) => {
          event.preventDefault();
          setShowModal(true);
          setSelectForm(status);
        }}
        className={cls(
          !isVisible && 'invisible',
          'rounded-2xl bg-red-400 px-2 text-white transition hover:bg-red-500',
        )}
      >
        취소
      </button>
    );
  }

  let statusColor: string;
  switch (status.status) {
    case 0: {
      statusColor = 'bg-yellow-300 dark:bg-yellow-700';
      break;
    }
    case 4: {
      statusColor = 'bg-purple-300 dark:bg-purple-700';
      break;
    }
    default: {
      statusColor = 'bg-green-400 dark:bg-green-800';
    }
  }

  return (
    <div className='flex h-full w-full flex-col items-end justify-center'>
      <div
        className={cls(
          !isConferenceRoom && 'mt-6',
          ' flex w-full items-center justify-between text-sm',
        )}
      >
        <div className='ml-1 flex w-[20%] justify-center whitespace-nowrap text-center text-xs dark:text-white'>
          {date}
        </div>
        <div className='column-separator' />
        <div
          className={cls(
            isConferenceRoom ? 'w-[30%]' : 'w-[20%]',
            'text-center text-xs dark:text-white',
          )}
        >
          {time}
        </div>
        <div className='column-separator' />
        <div
          className={cls(
            isConferenceRoom ? 'w-[25%]' : 'w-[39%]',
            'whitespace-nowrap text-center text-xs dark:text-gray-300',
          )}
        >
          {details}
        </div>
        <CancelButton />
      </div>
      {status.reservationInfo === undefined && (
        <div
          className={cls(
            statusColor,
            'relative -top-12 right-3 h-[24px] w-max whitespace-nowrap rounded-xl px-2 text-sm text-gray-700 dark:text-gray-300',
          )}
        >
          {category === CATEGORIES.presentation
            ? PRESENTATION_STATUS[status.status]
            : STATUS[status.status]}
        </div>
      )}
    </div>
  );
}
