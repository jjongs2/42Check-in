import apiController from '@/utils/apiController';
import router from 'next/router';
import type { ReactElement } from 'react';

interface FormSubmitButtonProps {
  text?: string;
  formId?: number;
}

export default function FormSubmitButton({ text, formId }: FormSubmitButtonProps): ReactElement {
  
  const onClick = async (): Promise<void> => {
    if (text === '승인') {
      const config = {
        url: `/vocal/subscriptions/${category}`,
        method: 'POST',
        data: { formIds: [formId] },
      };
      await apiController(config);
    }
  };
  return (
    <button
      type={text === '승인' ? 'button' : 'submit'}
      className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-500 dark:hover:bg-slate-400'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
