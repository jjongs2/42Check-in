import type { ReactElement, ReactNode } from 'react';

interface ModalTextProps {
  children: ReactNode;
}

export default function ModalText({ children }: ModalTextProps): ReactElement {
  return <div className='text-[20px] font-bold text-[#54595E]'>{children}</div>;
}
