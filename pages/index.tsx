import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className='flex items-center justify-center'>
      {/* 뒷배경 이미지들 */}
      <div className='relative -z-20 opacity-30'>
        <Image
          src={'https://i.imgur.com/2fOlNnG.png'}
          alt='calendarImg'
          width={900}
          height={900}
          className=' fixed -bottom-[13%] -left-[200px]'
        />
        <Image
          src={'https://i.imgur.com/DkpUR4N.png'}
          alt='checkLintImg'
          width={300}
          height={300}
          className=' fixed left-1/2 top-[90px]'
        />
        <Image
          src={'https://i.imgur.com/0zfzFX5.png'}
          alt='sttingManImg'
          width={900}
          height={900}
          className=' fixed -right-40 bottom-0'
        />
      </div>
      {/* 안에 4가지 카테고리 (vh ) */}
      <div className='mx-4 grid grid-cols-2 gap-x-10 gap-y-10 lg:h-2/5 lg:grid-cols-4'>
        {/* 회의실 */}
        <div className='category group bg-[#3983f2] bg-opacity-20 dark:bg-slate-500 dark:bg-opacity-30'>
          <Link href={'/conference-rooms'} className='categoryIner'>
            <h2 className='categoryText'>회의실 예약</h2>
            <Image
              src={'https://i.imgur.com/BgCoX27.png'}
              alt='conference-rooms'
              width={250}
              height={250}
              className='group-hover:animate-bounce'
            />
          </Link>
        </div>
        <div className='category group bg-[#4069FD] bg-opacity-60 shadow-xl dark:bg-[#3983f2] dark:bg-opacity-30'>
          <Link href={'/visitors'} className='categoryIner'>
            <h2 className='categoryText'>외부인 초대</h2>
            <Image
              src={'https://i.imgur.com/bZ095Nd.png'}
              alt='visitors'
              width={400}
              height={400}
              className='relative -bottom-[120px] group-hover:animate-bounce'
            />
          </Link>
        </div>
        <div className='category group bg-[#3983f2] bg-opacity-20 shadow-xl dark:bg-slate-500 dark:bg-opacity-30'>
          <Link href={'/presentations'} className='categoryIner'>
            <h2 className='categoryText'>수요지식회</h2>
            <Image
              src={'https://i.imgur.com/AhuDuIv.png'}
              alt='presentations'
              width={200}
              height={100}
              className='relative -bottom-[120px] group-hover:animate-bounce'
            />
          </Link>
        </div>
        <div className='category group bg-[#4069FD] bg-opacity-60 shadow-xl dark:bg-[#3983f2] dark:bg-opacity-30'>
          <Link href={'/equipments'} className='categoryIner'>
            <h2 className='categoryText'>기자재 대여</h2>
            <Image
              src={'https://i.imgur.com/qRynJ5O.png'}
              alt='equipments'
              width={250}
              height={250}
              className='group-hover:animate-bounce'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
