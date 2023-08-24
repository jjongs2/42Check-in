import { calendarIcon } from '@/assets/icons';
import Btn from '@/components/common/Btn';
import apiController from '@/utils/apiController';
import formatDate from '@/utils/formatDate';
import parseDate from '@/utils/parseDate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

const LOCATIONS = ['개포', '서초'];
const PLACES = ['2F-1', '2F-2', '3F-1', '4F-1', '4F-2'];

export default function RoomReservation(): ReactElement {
  const router = useRouter();
  const [selectLocation, setSelectLocation] = useState(LOCATIONS[0]);
  const [selectItem, setSelectItem] = useState(PLACES[0]);

  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; ++i) {
    const day = new Date();
    day.setDate(today.getDate() + i);
    days.push(day);
  }

  const onSelectLocation = (item: string): void => {
    setSelectLocation(item);
  };

  const onSelectPlace = (item: string): void => {
    setSelectItem(item);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const date = parseDate(router.query);
    if (date === null) {
      void router.push('/');
      return;
    }
    const formattedDate = formatDate(date);
    async function fetchData(): Promise<void> {
      const config = {
        url: `/conference-rooms/place-time/${formattedDate}`,
      };
      const { data } = await apiController(config);
      console.log(data);
      // setData(data);
    }
    void fetchData();
  }, [router]);

  return (
    <div className='container p-8'>
      <div className='flex max-h-[80vh] flex-col rounded-[30px] bg-[#EDEDED] p-4 shadow-xl md:p-10'>
        <div className='mb-4 flex items-center justify-between'>
          <div />
          <h1 className='text-2xl font-semibold text-gray-700'>회의실 예약</h1>
          <Link href={'/conference-rooms'}>
            <button className='text-2xl'>{calendarIcon}</button>
          </Link>
        </div>
        <div className='flex'>
          <div className='flex flex-col justify-between'>
            <div className='item-center flex justify-stretch'>
              <div className='flex min-w-max flex-col items-start space-y-2 border-r-2 border-[#8B8B8B] px-2 md:pr-3.5'>
                {LOCATIONS.map((location) => (
                  <Btn
                    key={location}
                    fontSize='sm'
                    onClick={() => {
                      onSelectLocation(location);
                    }}
                    px='2'
                    py='2'
                    text={location}
                    selectItem={selectLocation}
                  />
                ))}
              </div>
              <div className='flex min-w-max flex-col items-center justify-center space-y-2 border-r-2 border-[#8B8B8B] px-2 md:px-3.5'>
                {PLACES.map((place) => (
                  <Btn
                    key={place}
                    fontSize='sm'
                    onClick={() => {
                      onSelectPlace(place);
                    }}
                    px='2'
                    py='2'
                    text={place}
                    selectItem={selectItem}
                  />
                ))}
              </div>
            </div>
            <div className='mt-10 max-h-[37vh] items-end overflow-auto rounded-3xl bg-white p-4 shadow-xl md:max-h-[34vh]'>
              <p>회의실은</p>
              <p>전자 칠판이 있는 곳입니다.</p>
              <br />
              <p>08:00 선택 시</p>
              <p>08:00 ~ 08:30 이용 가능</p>
              <br />
              <p>1인당 최대 2시간 예약 가능</p>
              <br />
              <p>사용 후에는 꼭!</p>
              <p>다음 사람을 위해</p>
              <p>정리해야겠죠?</p>
            </div>
          </div>
          <div className='flex w-full flex-col justify-between space-y-5 px-4 py-2'>
            <div className='flex max-w-[24vh] justify-between space-x-4 overflow-x-auto sm:max-w-full'>
              {days.map((day, index) => (
                <button
                  key={index}
                  className='w-full rounded-md bg-white px-2 py-2 text-sm shadow-md hover:bg-[]'
                >
                  {day.getDate()}
                </button>
              ))}
            </div>
            <div className='grid-rows-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-6 md:grid-cols-6 md:grid-rows-4 md:gap-4'>
              {[...Array(12)].map((_, hour) =>
                [0, 30].map((minute) => {
                  const time = `${(hour + 8).toString().padStart(2, '0')}:${minute
                    .toString()
                    .padStart(2, '0')}`;
                  return (
                    <button
                      key={time}
                      className='px-auto button text-sm sm:py-4 md:py-6 xl:text-xl'
                    >
                      {time}
                    </button>
                  );
                }),
              )}
            </div>
            <div className='flex justify-end pt-10'>
              <button className='duration:150 rounded-[20px] bg-[#6A70FF] px-6 py-3 text-xl font-semibold text-white shadow-xl transition ease-in-out hover:bg-[#6AA6FF]'>
                Check-in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
