import { cls } from '@/styles/cls';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { pathname } = useRouter();

  const noLayoutPages = new Set(['/login', '/oauth/login']);
  const hasLayout = !noLayoutPages.has(pathname);

  if (!hasLayout) return <>{children}</>;

  const noSidebarPages = new Set(['/', '/my-checkin', '/vocal']);
  const hasSidebar = !noSidebarPages.has(pathname);

  return (
    <>
      <Header />
      {hasSidebar && <Sidebar />}
      <div className={cls(hasSidebar ? 'ml-28' : '', 'pt-14')}>{children}</div>
    </>
  );
}
