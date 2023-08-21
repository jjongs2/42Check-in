import type { ReactElement } from 'react';

export default function Loading(): ReactElement {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='animate-bounce text-[100px]'>👀</div>
      <div className='text-5xl font-bold text-gray-900'>로딩중...💻</div>
      <div className='mt-2 text-gray-600 underline'>현재 API를 요청하고 있는 것 같네요...</div>
    </div>
  );
}
