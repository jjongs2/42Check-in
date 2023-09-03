import { cls } from '@/styles/cls';
import { useRouter } from 'next/router';
import { type ReactElement, useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const router = useRouter();
  const noLayoutPages = new Set(['/login', '/oauth/login']);
  const hasLayout = !noLayoutPages.has(router.pathname);

  if (!hasLayout) return <>{children}</>;

  const noSidebarPages = new Set(['/', '/my-checkin', '/vocal']);
  const hasSidebar = !noSidebarPages.has(router.pathname) && router.query.formInfo === undefined;

  return (
    <>
      <Header />
      {hasSidebar && <Sidebar />}
      <div className={cls(hasSidebar ? 'main-content duration-700' : ' ', 'pt-16')}>{children}</div>
    </>
  );
}
