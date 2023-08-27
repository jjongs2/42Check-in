import Link from 'next/link';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  return (
    <main className='fixed inset-0 z-50 grid min-h-full place-items-center bg-white'>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-600'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          Page not found
        </h1>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            href='/'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
