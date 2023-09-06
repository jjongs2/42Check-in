import ICONS from '@/assets/icons';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

export default function Loading(): ReactElement {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setShowLogo((prevShowLogo) => !prevShowLogo);
    }, 1000);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className={`box show`}>
        <div className='box-content'>
          {showLogo && <div className='logo w-[100px]'>{ICONS.logo}</div>}
        </div>
      </div>
      <div className='loading-text'>
        체크인 중입니다<span className='dots'></span>
      </div>
      <style jsx>{`
        .box {
          width: 150px; /* Adjust the width */
          height: 150px; /* Adjust the height */
          background-color: #4069fd;
          border-radius: 12px; /* Adjust the border radius */
          display: flex;
          justify-content: center;
          align-items: center;
          animation: appear-rotate 0.5s ease-in-out;
          transform-origin: center;
        }

        .loading-text {
          margin-top: 20px; /* Adjust the margin to move the message lower */
          font-size: 16px;
          color: #333;
          text-align: center; /* Center the text */
          font-style: italic; /* Add italic style */
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Add subtle text shadow */
        }
        .dots::after {
          content: '...';
          display: inline-block;
          animation: dotsAnimation 1s infinite steps(3);
        }

        @keyframes dotsAnimation {
          0%,
          33% {
            content: '.';
          }
          34%,
          66% {
            content: '..';
          }
          67%,
          100% {
            content: '...';
          }
        }

        .box.show {
          animation: appear-rotate 0.5s ease-in-out;
        }

        .box-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: drawLogo 1s ease-in-out forwards;
          opacity: 0;
        }

        @keyframes appear-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes drawLogo {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
