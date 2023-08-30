import ModalWrapper from '@/components/common/ModalWrapper';
import Link from 'next/link';
import type { ReactElement } from 'react';

export default function Error(): ReactElement {
  return (
    <ModalWrapper>
      <div className='flex items-center space-x-2.5 px-6'>
        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100'>
          <svg
            className='h-6 w-6 text-red-600'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
            />
          </svg>
        </div>
        <p className='text-[20px] font-semibold text-black'>잘못된 요청입니다.</p>
      </div>
      <div className='flex justify-center'>
        <Link href='/' className='button-modal'>
          <p>로그인 페이지로 돌아가기</p>
        </Link>
      </div>
    </ModalWrapper>
  );
}
