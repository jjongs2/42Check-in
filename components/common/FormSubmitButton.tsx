import PAGES from '@/constants/pages';
import { cls } from '@/styles/cls';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormSubmitButtonProps {
  text?: string;
}

export default function FormSubmitButton({
  text = 'Check - in',
}: FormSubmitButtonProps): ReactElement {
  const { watch } = useFormContext();
  const router = useRouter();

  if (PAGES.readOnly.has(router.pathname)) return;

  const isAgreed: boolean = watch('agreement') ?? true;

  return (
    <button
      type='submit'
      className={cls(
        isAgreed ? 'hover:bg-indigo-500 dark:hover:bg-slate-400 ' : 'opacity-30',
        'block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-[opacity] duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-500',
      )}
      disabled={!isAgreed}
    >
      {text}
    </button>
  );
}
