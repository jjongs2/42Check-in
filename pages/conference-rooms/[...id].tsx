import Btn from '@/components/common/Btn';
import instance from '@/utils/instance';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

const LOCATIONS = ['개포', '서초'];
const PLACES = ['2F-1', '2F-2', '3F-1', '4F-1', '4F-2'];

export default function RoomReservation(): ReactElement {
  const { asPath } = useRouter();
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
    async function fetchData(): Promise<void> {
      const url = asPath.replace('/conference-rooms/', '/conference-rooms/place-time/');
      const { data } = await instance.get(url);
      // setData(data);
    }
    void fetchData();
  }, []);

  return (
    <div className='container mx-auto h-full p-10'>
      <div className='flex space-x-10 rounded-[30px] bg-[#EDEDED] p-10 shadow-xl md:flex-row'>
        <div className='flex w-full flex-col justify-between py-16 md:w-1/4'>
          <div className='mx-6 flex justify-between'>
            <div className='flex flex-col items-start space-y-2 border-r-2 border-[#8B8B8B] px-3.5'>
              {LOCATIONS.map((location) => (
                <Btn
                  key={location}
                  fontSize='base'
                  onClick={() => {
                    onSelectLocation(location);
                  }}
                  px='6'
                  py='2'
                  text={location}
                  selectItem={selectLocation}
                />
              ))}
            </div>
            <div className='flex flex-col items-start space-y-2 border-r-2 border-[#8B8B8B] px-3.5'>
              {PLACES.map((place) => (
                <Btn
                  key={place}
                  fontSize='base'
                  onClick={() => {
                    onSelectPlace(place);
                  }}
                  px='6'
                  py='2'
                  text={place}
                  selectItem={selectItem}
                />
              ))}
            </div>
          </div>
          <div className='mt-10 items-end rounded-3xl bg-white p-4 shadow-xl'>
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
        <div className='w-full space-y-5 p-2 md:w-3/4'>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-2xl font-semibold'>회의실 예약</h1>
            <Link href={'/conference-rooms'}>
              <button className='text-2xl'>📅</button>
            </Link>
          </div>
          <div className='flex justify-between'>
            {days.map((day, index) => (
              <button key={index} className='rounded-md bg-white px-10 py-2 shadow-md'>
                {day.getDate()}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-6 grid-rows-4 gap-3'>
            {[...Array(12)].map((_, hour) =>
              [0, 30].map((minute) => {
                const time = `${(hour + 8).toString().padStart(2, '0')}:${minute
                  .toString()
                  .padStart(2, '0')}`;
                return (
                  <Btn key={time} fontSize='xl' onClick={() => {}} px='auto' py='4' text={time} />
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
  );
}
