import apiController from '@/utils/apiController';
import formatDate from '@/utils/formatDate';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { type ReactElement, useEffect, useState } from 'react';

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

export default function Presentations(): ReactElement {
  const [date, setDate] = useState(formatDate());
  const [presentationsInfo, setPresentationsInfo] = useState<Data[]>([]);
  const [year, month, day] = date.split('-').map(Number);
  const today = new Date().getDate();

  useEffect(() => {
    async function getMonthData(): Promise<void> {
      const config = {
        url: '/presentations',
        params: { month: date },
      };
      const { data } = await apiController(config);
      setPresentationsInfo(data);
    }
    void getMonthData();
  }, [date]);

  return (
    <div className='m-8 rounded-2xl border-2 border-[#6A70FF] bg-slate-100 p-8 shadow-xl'>
      <div className='flex items-center justify-between border-b-2'>
        <h1 className='text-xl font-semibold text-gray-600'>{year}</h1>
        <div>
          <h3 className='text-xl font-semibold text-gray-600'>{Number(month)} 월</h3>
        </div>
        <input
          type='month'
          className='bg-slate-100'
          onChange={(e) => setDate(formatDate(new Date(`${e.target.value}-${today}`)))}
        />
      </div>
      <div className='mt-2 space-y-2'>
        {presentationsInfo.map((item, i: number) => (
          <Link
            key={i}
            href={`/presentations/111`}
            className='group flex items-center justify-between rounded-md bg-white shadow-xl transition hover:bg-[#6AA6FF]'
          >
            <div className='justify-left flex items-center space-x-2'>
              <button className='h-16 w-16 rounded-md text-2xl font-semibold text-gray-600 transition group-hover:text-white'>
                {item.date.split('-')[2]}
              </button>
              <div className='overflow-hidden'>
                <h1 className='animate-slide whitespace-nowrap font-semibold text-gray-800'>
                  {item.subject ? `제목 : ${item.subject}` : '-'}
                </h1>
                <h5 className=' text-gray-500'>{item.intraId}😎</h5>
              </div>
            </div>
            <button className='mr-4 rounded-xl px-3 group-hover:bg-white'>신청</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
