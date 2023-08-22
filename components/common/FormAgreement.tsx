import { type ReactElement, type ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormAgreementProps {
  children: ReactNode;
}

export default function FormAgreement({ children }: FormAgreementProps): ReactElement {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const toggleSwitch = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className='col-span-full flex space-x-2'>
      <div className='flex h-6 items-center'>
        <button
          type='button'
          className={`flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isChecked ? 'bg-indigo-600' : ''
          }`}
          role='switch'
          aria-checked={isChecked}
          aria-labelledby='switch-1-label'
          onClick={toggleSwitch}
        >
          <span
            aria-hidden='true'
            className={`h-4 w-4 translate-x-0 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${
              isChecked ? 'translate-x-3.5' : ''
            }`}
          ></span>
        </button>
        <input
          type='checkbox'
          checked={isChecked}
          className='sr-only'
          {...register('agree', { required: true })}
        />
      </div>
      <label className='text-sm leading-6 text-gray-600' id='switch-1-label'>
        {children}
      </label>
    </div>
  );
}
