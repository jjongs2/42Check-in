import { cls } from '@/styles/cls';
import React, { useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormSelectProps {
  name: string;
  options: string[];
  title: string;
  disabled?: boolean;
  etcName?: string;
  placeholder?: string;
  span?: string;
  value?: string;
}

export default function FormSelect({
  name,
  options,
  title,
  disabled,
  etcName,
  placeholder,
  span = 'full',
  value,
}: FormSelectProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === '0') {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const hasEtc = etcName !== undefined;
  if (hasEtc) {
    options = [...options, '기타'];
  }

  return (
    <div className={`col-span-${span}`}>
      <label htmlFor={title} className='block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300'>
        {title}
      </label>
      <div className='mt-2 flex'>
        <select
          id={title}
          className={cls(
            showInput ? 'w-[30%]' : 'w-full',
            'block rounded-md border-0 px-2.5 py-2.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600',
          )}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          {...register(name, {
            required: true,
            onChange: (e) => {
              handleSelectChange(e);
            },
          })}
        >
          {options.map((option, index) => {
            const key = option === '기타' ? 0 : index + Number(hasEtc);
            return (
              <option key={key} value={key}>
                {option}
              </option>
            );
          })}
        </select>
        {showInput && (
          <input
            type='text'
            value={inputValue}
            className='block w-[70%] rounded-md border-0 px-2.5 py-2.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
            {...register(etcName, {
              required: hasEtc,
              onChange: handleInputChange,
            })}
          />
        )}
      </div>
    </div>
  );
}
