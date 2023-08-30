import { cls } from '@/styles/cls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

interface MenuProps {
  href: string;
  text: string;
}

function Menu({ href, text }: MenuProps): ReactElement {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={cls(
        router.asPath === href ? 'seletBtn' : 'notSeletBtn',
        'rounded-[20px] border-2 px-1 py-3.5 text-center text-sm font-bold text-white transition dark:border-slate-800 hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:hover:bg-white',
      )}
    >
      {text}
    </Link>
  );
}

export default function Sidebar({ showSidebar }): ReactElement {
  return (
    <div
      className={cls(
        showSidebar ? 'sidebar' : '',
        'fixed left-0 z-40 bg-[#4069FD] pt-[62px] dark:bg-slate-800 ',
      )}
    >
      <div className='flex h-screen w-28 flex-col space-y-2.5 border-r border-[#909090] px-2 py-3.5 dark:border-none'>
        <Menu href='/conference-rooms' text='회의실 예약' />
        <Menu href='/visitors' text='외부인 초대' />
        <Menu href='/presentations' text='수요지식회' />
        <Menu href='/equipments' text='기자재 대여' />
      </div>
    </div>
  );
}
