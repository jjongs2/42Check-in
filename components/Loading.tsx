import { ReactElement, useEffect, useState } from 'react';
import { Logo } from '@/assets/images';

export default function Loading(): ReactElement {
  const [showBox, setShowBox] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setShowBox(false);
      setShowLogo(false);

      setTimeout(() => {
        setShowBox(true);
        setTimeout(() => {
          setShowLogo(true);
        }, 1000); // 1 second delay before showing the logo
      }, 1000); // 1 second delay before showing the box
    }, 3000); // 3 second interval for repeating the animation

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className={`box ${showBox ? 'show' : ''}`}>
        <div className='box-content'>
          {showLogo && (
            <div className='logo'>
              {Logo}
            </div>
          )}
        </div>
      </div>
      <div className='loading-text'>
        Check-in 중입니다<span className='dots'></span>
      </div>
      <style jsx>{`
        .box {
          width: 100px;
          height: 100px;
          background-color: #4069FD;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: appear 1s ease-in-out;
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
          animation: dotsAnimation 1.5s infinite steps(4);
        }


        @keyframes dotsAnimation {
          0%, 33% {
            content: '.';
          }
          34%, 66% {
            content: '..';
          }
          67%, 100% {
            content: '...';
          }
        }
        .box.show {
          animation: appear-rotate 1s ease-in-out;
        }

        .box-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo {
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: drawLogo 1.5s ease-in-out forwards;
          opacity: 0;
        }

        @keyframes appear {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
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