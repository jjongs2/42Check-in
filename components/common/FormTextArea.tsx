import type { ChangeEventHandler, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterOptions } from 'react-hook-form';

interface FormTextAreaProps {
  name: string;
  title: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  registerOptions?: RegisterOptions;
  value?: string;
}

export default function FormTextArea({
  name,
  title,
  disabled,
  onChange,
  placeholder,
  registerOptions = { required: true },
  value,
}: FormTextAreaProps): ReactElement {
  const { register } = useFormContext();

  return (
    <div className='col-span-full'>
      <label
        htmlFor={title}
        className='block text-sm font-medium leading-6 text-gray-900 dark:text-white'
      >
        {title}
      </label>
      <div className='mt-2.5'>
        <textarea
          name={title}
          id={title}
          rows={4}
          className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          {...register(name, registerOptions)}
        />
      </div>
    </div>
  );
}
