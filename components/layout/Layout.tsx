import { cls } from '@/styles/cls';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

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

  const noSidebarPages = new Set(['/', '/contact', '/my-checkin', '/vocal']);
  const hasSidebar = !noSidebarPages.has(pathname);

  const [showSidebar, setShowSideBar] = useState(false);

  return (
    <>
      <Header setShowSideBar={setShowSideBar} showSidebar={showSidebar} />
      {hasSidebar && <Sidebar showSidebar={showSidebar} />}
      {/* onClick했을 때 화면이 안밀림 click 했을 때 true -> 화면이 커지면 false로 만들어야함 */}
      <div className={cls(hasSidebar ? 'main-content ml-28 duration-700' : ' ', 'pt-16')}>
        {children}
      </div>
    </>
  );
}
