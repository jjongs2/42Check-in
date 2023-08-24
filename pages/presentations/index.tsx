import { calenderIcon } from '@/assets/icons';
import apiController from '@/utils/apiController';
import formatDate from '@/utils/formatDate';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

interface Data {
  formId: number;
  status: number;
  date: string;
  subject: string; // 발표 제목
  contents: string; // 발표 내용
  detail: string; // 상세 내용
  time: number; // (enum) 15, 30, 45, 1시간
  type: number; // 유형 겁나 많음 enum
  screen: boolean;
  intraId: string;
}

// interface PageProps {
//   presentationsInfo: Data[];
// }
const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Presentations(): ReactElement {
  const [presentationsInfo, setPresentationsInfo] = useState<Data[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function getMonthData(): Promise<void> {
      const config = {
        url: '/presentations',
        params: { month: formatDate() },
      };
      const { data } = await apiController(config);
      setPresentationsInfo(data);
    }
    void getMonthData();
  }, [month, year]);

  return (
    <div className='m-8 rounded-2xl border-2 border-[#6A70FF] bg-slate-100 p-8 shadow-xl'>
      <div className='flex items-center justify-between border-b-2'>
        <h1 className='text-xl font-semibold text-gray-600'>{year}</h1>
        <div>
          <h3 className='text-xl font-semibold text-gray-600'>{month}</h3>
        </div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {calenderIcon}
        </button>
        {isOpen && (
          <div className='absolute right-10 top-20 flex flex-col bg-white'>
            {MONTH.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setMonth(item);
                }}
                className='rounded-md shadow-xl transition hover:bg-[#6AA6FF]'
              >
                {item} 월
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='mt-2 space-y-2'>
        {presentationsInfo.map((item, i: number) => (
          <Link
            key={i}
            href={`/presentations/${item.date}`}
            className='group flex items-center justify-between rounded-md bg-white shadow-xl transition hover:bg-[#6AA6FF]'
          >
            <div className='flex items-center justify-center space-x-2 '>
              <button className='h-16 w-16 rounded-md text-2xl font-semibold text-gray-600 transition group-hover:text-white'>
                {item.date}
              </button>
              <div>
                <h1 className='font-semibold text-gray-800'>제목 : {item.subject}</h1>
                <h5 className=' text-gray-500'>{item.intraId}🤩</h5>
              </div>
            </div>
            <button className='mr-4 rounded-xl px-3 group-hover:bg-white'>신청</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
