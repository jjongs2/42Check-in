import { calenderIcon } from '@/assets/icons';
import type { ReactElement } from 'react';

export default function Presentations(): ReactElement {
  return (
    <div className='m-8 rounded-2xl border-2 border-[#6A70FF] bg-slate-100 p-8 shadow-xl'>
      <div className='flex items-center justify-between border-b-2'>
        <h1 className='text-xl font-semibold text-gray-600'>2023</h1>
        <div>
          <h3 className='text-xl font-semibold text-gray-600'>8 월</h3>
        </div>
        <button>{calenderIcon}</button>
      </div>
      <div className='mt-2 space-y-2'>
        {[1, 1, 1, 11, 1].map((item, i) => (
          <div
            key={i}
            className='group flex items-center justify-between rounded-md bg-white shadow-xl transition hover:bg-[#6AA6FF]'
          >
            <div className='flex items-center justify-center space-x-2 '>
              <button className='h-16 w-16 rounded-md text-2xl font-semibold text-gray-600 transition group-hover:text-white'>
                19
              </button>
              <div>
                <h1 className='font-semibold text-gray-800'>제목 : 42에서 살아남기</h1>
                <h5 className=' text-gray-500'>yongmipa🤩</h5>
              </div>
            </div>
            <button className='mr-4 rounded-xl px-3 group-hover:bg-white'>신청</button>
          </div>
        ))}
      </div>
    </div>
  );
}
