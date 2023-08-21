import { cls } from '@/styles/cls';
import React, { useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';

interface FormSelectProps {
  title: string;
  contents: string[];
  disabled?: boolean;
  placeholder?: string;
  span?: string;
}

export default function FormSelect({
  title,
  contents,
  disabled,
  placeholder,
  span = 'full',
}: FormSelectProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === '기타') {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className={`col-span-${span}`}>
      <label htmlFor={title} className='block text-sm font-medium leading-6 text-gray-900'>
        {title}
      </label>
      <div className='mt-2 flex'>
        <select
          id={title}
          name={title}
          onChange={handleSelectChange}
          className={cls(
            showInput ? 'w-[30%]' : 'w-full',
            'block rounded-md border-0 px-2.5 py-2.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600',
          )}
          disabled={disabled}
          placeholder={placeholder}
        >
          {contents.map((content) => (
            <option key={content}>{content}</option>
          ))}
        </select>
        {showInput && (
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            className='block w-[70%] rounded-md border-0 px-2.5 py-2.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          />
        )}
      </div>
    </div>
  );
}
