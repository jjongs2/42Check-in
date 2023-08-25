import type FormInfo from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import { type Dispatch, type ReactElement, type SetStateAction, useEffect, useState } from 'react';

import Btn from '../common/Btn';

const btnContent = [
  {
    text: '회의실 예약',
    url: 'conference-rooms',
  },
  {
    text: '외부인 초대',
    url: 'visitors',
  },
  {
    text: '수요지식회',
    url: 'presentations',
  },
  {
    text: '기자재 대여',
    url: 'equipments',
  },
];

interface StatusBoardProps {
  setSelectFormInfo: Dispatch<SetStateAction<FormInfo>>;
  vocal?: boolean;
}

export default function StatusBoard({ setSelectFormInfo, vocal }: StatusBoardProps): ReactElement {
  const preReq = vocal ? 'visitors' : 'conference-rooms';
  const [category, setCategory] = useState(preReq);
  const [responseDataList, setResponseDataList] = useState<FormInfo[]>([]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const config = {};
    if (vocal === true) {
      config['url'] = `/vocal/subscriptions/${category}`;
    } else {
      config['url'] = `/my-checkin/${category}`;
    }
    async function fecthForms(): Promise<void> {
      const { data } = await apiController(config);
      setResponseDataList(data);
    }
    void fecthForms();
  }, [category]);

  const btnBox = btnContent.map((items) => {
    return vocal && items.url === 'conference-rooms' ? null : (
      <div
        key={items.text}
        onClick={() => {
          setCategory(items.url);
        }}
      >
        <button
          className={cls(
            category === items.url ? 'bg-[#6AA6FF]' : 'bg-[#6A70FF]',
            'rounded-[20px] px-5 py-2 font-bold text-white hover:bg-[#6AA6FF]',
          )}
        >
          {items.text}
        </button>
      </div>
    );
  });
  return (
    <div className='m-10 flex max-h-80 min-h-[80vh] min-w-max flex-col overflow-scroll rounded-xl border'>
      {/* 위에 버튼 4개있는 부분 */}
      <div className='sticky top-0 flex justify-between space-x-4 border-b-2 bg-white p-10 pb-4'>
        <div className='flex items-center space-x-2'>
          {vocal && (
            <input
              value='white'
              type='checkbox'
              defaultChecked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
              className='mr-10 h-6 w-6 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500'
            />
          )}
          {btnBox}
        </div>
        {vocal && (
          <div className='flex space-x-4'>
            <button className='rounded-full px-2 transition-colors hover:bg-[#6AA6FF] hover:text-white hover:shadow-xl'>
              수락
            </button>
            <div className='my-2 border-2 border-gray-300' />
            <button className='rounded-full px-2 transition-colors hover:bg-[#6AA6FF] hover:text-white hover:shadow-xl'>
              거절
            </button>
          </div>
        )}
      </div>
      <div className=' mt-6 space-y-5'>
        {responseDataList.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectFormInfo(responseDataList[i]);
            }}
            className='mx-4 flex justify-between space-x-2 rounded-2xl border-2 px-6 py-8 text-xl shadow-xl transition duration-300 ease-in-out hover:bg-[#6AA6FF]'
          >
            {vocal && (
              <input
                value='white'
                type='checkbox'
                defaultChecked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
                className='h-6 w-6 rounded border-gray-300 transition'
              />
            )}
            <div className=''>{item.formInfo.date}</div>
            <div className=' border-2 border-gray-300' />
            <div className=''>13:00</div>
            <div className=' border-2 border-gray-300' />
            <div className=' w-56 overflow-hidden text-ellipsis whitespace-nowrap'>
              홍길동, 박수환asdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
