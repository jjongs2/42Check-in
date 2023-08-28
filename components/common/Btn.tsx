import { cls } from '@/styles/cls';
import type { MouseEventHandler, ReactElement } from 'react';

interface BtnProps {
  fontSize: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  px: string;
  py: string;
  text: string;
  selectItem?: string;
}

export default function Btn({
  fontSize,
  onClick,
  px,
  py,
  text,
  selectItem,
}: BtnProps): ReactElement {
  return (
    <button
      className={cls(
        selectItem === text ? 'bg-[#6AA6FF]' : '',
        `rounded-[20px] bg-[#6A70FF] px-${px} py-${py} text-${fontSize} font-bold text-white hover:bg-[#6AA6FF]`,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
