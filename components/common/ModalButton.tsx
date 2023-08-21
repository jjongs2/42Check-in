import type { ReactElement } from 'react';

interface ModalButtonProps {
  text: string;
}

export default function ModalButton({ text }: ModalButtonProps): ReactElement {
  return (
    <button className='rounded-[8px] px-14 py-2.5 text-[14px] text-[#4F4F4F] ring-1 ring-inset ring-[#4F4F4F] hover:bg-gray-50'>
      {text}
    </button>
  );
}
