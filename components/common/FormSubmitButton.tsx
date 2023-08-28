import type { ReactElement } from 'react';

interface FormSubmitButtonProps {
  text?: string;
}

export default function FormSubmitButton({
  text = 'Check - in',
}: FormSubmitButtonProps): ReactElement {
  return (
    <button
      type='submit'
      className='block w-full rounded-md bg-indigo-600 dark:bg-slate-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    >
      {text}
    </button>
  );
}
