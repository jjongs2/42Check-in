import { type ReactElement, type ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormAgreementProps {
  children: ReactNode;
}

export default function FormAgreement({ children }: FormAgreementProps): ReactElement {
  const { register } = useFormContext();

  return (
    <div className='col-span-full flex space-x-2'>
      <label
        className='relative flex cursor-pointer items-start rounded-full pl-2 pr-1'
        htmlFor='checkbox'
        data-ripple-dark
      >
        <input
          type='checkbox'
          className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
          id='checkbox'
          {...register('agreement', { required: true })}
        />
        <div className='pointer-events-none absolute left-[11px] top-[3px] text-white opacity-0 transition-opacity peer-checked:opacity-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3.5 w-3.5'
            viewBox='0 0 20 20'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='1'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </label>
      <div>{children}</div>
    </div>
  );
}
