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
        router.asPath === href
          ? 'border-[#6AA6FF] bg-[#6AA6FF] dark:border-2 dark:border-slate-700 dark:bg-white dark:text-slate-700'
          : 'border-[#6A70FF] bg-[#6A70FF] dark:border-2 dark:border-slate-700 dark:bg-slate-700 dark:text-white dark:hover:bg-white dark:hover:text-slate-700',
        'rounded-[20px] border-2 px-1 py-3.5 text-center text-sm font-bold text-white transition hover:border-[#6AA6FF] hover:bg-[#6AA6FF] ',
      )}
    >
      {text}
    </Link>
  );
}

export default function Sidebar(): ReactElement {
  return (
    <div className='fixed left-0 z-10 bg-white pt-20'>
      <div className='flex h-screen w-28 flex-col space-y-2.5 border-r border-[#909090] px-2 py-3.5'>
        <Menu href='/conference-rooms' text='회의실 예약' />
        <Menu href='/visitors' text='외부인 초대' />
        <Menu href='/presentations' text='수요지식회' />
        <Menu href='/equipments' text='기자재 대여' />
      </div>
    </div>
  );
}
