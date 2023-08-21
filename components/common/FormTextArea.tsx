import type { ChangeEventHandler, ReactElement } from 'react';

interface FormTextAreaProps {
  title: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: string;
}

export default function FormTextArea({
  title,
  disabled,
  onChange,
  placeholder,
  value,
}: FormTextAreaProps): ReactElement {
  return (
    <div className='col-span-full'>
      <label htmlFor={title} className='block text-sm font-medium leading-6 text-gray-900'>
        {title}
      </label>
      <div className='mt-2.5'>
        <textarea
          name={title}
          id={title}
          rows={4}
          className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
