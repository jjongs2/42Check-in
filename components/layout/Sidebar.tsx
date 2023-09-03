import { cls } from '@/styles/cls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect, useState } from 'react';

interface MenuProps {
  href: string;
  text: string;
  icon: string;
}

function Menu({ href, text, icon }: MenuProps): ReactElement {
  const router = useRouter();
  return (
    <li className='nav-link'>
      <Link
        href={href}
        className={cls(
          router.pathname.startsWith(href) && 'border-2 border-[#6AA6FF] dark:border-white',
        )}
      >
        <i className={`bx ${icon} icon`}></i>
        <span className='text nav-text'>{text}</span>
      </Link>
    </li>
  );
}

export default function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle visibility of #nav when #switch is clicked
  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id='nav' className={cls(isOpen ? '' : 'close', 'sidebar border-r-2 dark:bg-slate-900 ')}>
      <header>
        <div className='image-text'>
          <span className='image'></span>
          <div className='text logo-text ml-2'></div>
        </div>
        <i id='switch' onClick={toggleSidebar} className='bx bx-chevron-right toggle'></i>
      </header>
      <div className='menu-bar'>
        <div className='menu'>
          <ul className='menu-links'>
            <Menu href='/conference-rooms' text='회의실 예약' icon='bx-conversation' />
            <Menu href='/visitors' text='외부인 초대' icon='bx-street-view' />
            <Menu href='/presentations' text='수요지식회' icon='bxs-megaphone' />
            <Menu href='/equipments' text='기자재 대여' icon='bx-donate-heart' />
          </ul>
        </div>
      </div>
      <style>
        {`* {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        :root {
          --sidebar-color: #fff;
          --primary-color: #6AA6FF;
          --primary-color-light: #ddd;
          --toggle-color: #6AA6FF;
          --text-color: #000;

          --tran-03: all 0.2s ease;
          --tran-03: all 0.2s ease;
          --tran-04: all 0.2s ease;
          --tran-05: all 0.2s ease;
        }

        body {
          min-height: 100vh;
          background-color: var(--body-color);
          transition: var(--tran-05);
        }

        ::selection {
          background-color: var(--primary-color);
          color: #fff;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 250px;
          padding: 10px 14px;
          background: var(--sidebar-color);
          transition: var(--tran-05);
          z-index: 30;
        }

        .sidebar.close {
          width: 88px;
          @media (max-width: 640px) {
            left: -72px;
          }
        }

        .sidebar li {
          height: 50px;
          list-style: none;
          display: flex;
          align-items: center;
          margin-top: 10px;
        }

        .sidebar header .image,
        .sidebar .icon {
          min-width: 60px;
          min-height: 60px
        }

        .sidebar .icon {
          min-width: 60px;
          border-radius: 6px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .sidebar .text,
        .sidebar .icon {
          transition: var(--tran-03);
        }

        .sidebar .text {
          font-size: 17px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 1;
        }

        .sidebar.close .text {
          opacity: 0;
        }

        .sidebar header {
          position: relative;
        }

        .sidebar header .image-text {
          display: flex;
          align-items: center;
        }

        .sidebar header .logo-text {
          display: flex;
          flex-direction: column;
        }

        header .image-text .name {
          margin-top: 2px;
          font-size: 18px;
          font-weight: 600;
        }

        header .image-text .profession {
          font-size: 16px;
          margin-top: -2px;
          display: block;
        }

        .sidebar header .image img {
          width: 40px;
          border-radius: 6px;
        }

        .sidebar header .toggle {
          position: absolute;
          top: 160%;
          right: -25px;
          transform: translateY(-50%) rotate(180deg);
          height: 25px;
          width: 25px;
          background-color: var(--primary-color);
          color: var(--sidebar-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          transition: var(--tran-05);
        }

        body.dark .sidebar header .toggle {
          color: var(--text-color);
        }

        .sidebar.close .toggle {
          transform: translateY(-50%) rotate(0deg);
        }

        .sidebar .menu {
          margin-top: 40px;
        }

        .sidebar li a {
          list-style: none;
          height: 100%;
          background-color: transparent;
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
          border-radius: 6px;
          text-decoration: none;
          transition: var(--tran-03);
        }

        .sidebar li a:hover {
          background-color: var(--primary-color);
        }

        .sidebar li a:hover .icon,
        .sidebar li a:hover .text {
          color: var(--sidebar-color);
        }

        body.dark .sidebar li a:hover .icon,
        body.dark .sidebar li a:hover .text {
          color: var(--text-color);
        }

        .sidebar .menu-bar {
          height: calc(100% - 55px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: scroll;
        }

        .menu-bar::-webkit-scrollbar {
          display: none;
        }

        .home {
          position: absolute;
          top: 0;
          top: 0;
          left: 250px;
          height: 100vh;
          width: calc(100% - 250px);
          background-color: var(--body-color);
          transition: var(--tran-05);
        }

        .home .text {
          font-size: 30px;
          font-weight: 500;
          color: var(--text-color);
          padding: 12px 60px;
        }

        .sidebar.close ~ .home {
          left: 78px;
          height: 100vh;
          width: calc(100% - 78px);
        }

        body.dark .home .text {
          color: var(--text-color);
        }
      `}
      </style>
    </nav>
  );
}
