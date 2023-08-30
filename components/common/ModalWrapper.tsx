import type { ReactElement, ReactNode } from 'react';

interface ModalWrapperProps {
  children: ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps): ReactElement {
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center text-center'>
          <div className='relative w-full max-w-lg transform space-y-4 overflow-hidden rounded-lg bg-white py-10 shadow-xl transition-all dark:bg-slate-600'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
