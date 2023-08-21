import type { ReactElement, ReactNode } from 'react';

interface FormAgreementProps {
  children: ReactNode;
}

export default function FormAgreement({ children }: FormAgreementProps): ReactElement {
  return (
    <div className='col-span-full flex space-x-2'>
      <div className='flex h-6 items-center'>
        <button
          type='button'
          className='flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          role='switch'
          aria-checked='false'
          aria-labelledby='switch-1-label'
        >
          <span
            aria-hidden='true'
            className='h-4 w-4 translate-x-0 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
          ></span>
        </button>
      </div>
      <label className='text-sm leading-6 text-gray-600' id='switch-1-label'>
        {children}
      </label>
    </div>
  );
}
