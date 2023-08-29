import type FormInfo from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import { useEffect, useState } from 'react';
import type { Dispatch, ReactElement } from 'react';

import ModalText from '../common/ModalText';
import ModalWrapper from '../common/ModalWrapper';
import Status from './Status';

const btnContent = [
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

interface VocalStatusBoardProps {
  setSelectFormInfo: Dispatch<React.SetStateAction<FormInfo>>;
  setCategory: Dispatch<React.SetStateAction<string>>;
  category: string;
}

export default function StatusBoard({
  setSelectFormInfo,
  setCategory,
  category,
}: VocalStatusBoardProps): ReactElement {
  const [responseDataList, setResponseDataList] = useState<FormInfo[]>([]);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  useEffect(() => {
    const config = {
      url: `/vocal/subscriptions/${category}`,
    };
    async function fecthForms(): Promise<void> {
      const { data } = await apiController(config);
      setResponseDataList(data);
    }
    void fecthForms();
  }, [category]);

  const btnBox = btnContent.map((items) => {
    return (
      <div
        key={items.text}
        onClick={() => {
          setCategory(items.url);
          setSelectFormInfo(undefined);
          setChecked(false);
          setCheckedList([]);
        }}
      >
        <button
          className={cls(
            category === items.url ? 'seletBtn' : 'notSeletBtn',
            'rounded-[20px] px-5 py-2 font-bold text-white hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:hover:border-slate-700 dark:hover:bg-white',
          )}
        >
          {items.text}
        </button>
      </div>
    );
  });

  const onClick = async (formIds: number[]): Promise<void> => {
    const config = {
      url: `/vocal/subscriptions/${category}`,
      method: 'POST',
      data: { formIds },
    };
    await apiController(config);
  };

  return (
    <div className='z-30 m-10 flex max-h-80 min-h-[80vh] min-w-max flex-col overflow-scroll rounded-xl border bg-white'>
      {/* 위에 버튼 4개있는 부분 */}
      <div className='sticky top-0 flex justify-between space-x-4 border-b-2 bg-white p-10 pb-4 dark:bg-slate-700'>
        <div className='flex items-center space-x-2'>
          <input
            value='white'
            type='checkbox'
            defaultChecked={false}
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              if (checked) setCheckedList([]);
              else setCheckedList(responseDataList.map((item) => item.formId));
            }}
            className='mr-10 h-6 w-6 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500'
          />
          {btnBox}
        </div>
        <div className='flex space-x-4'>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className='rounded-full px-2 transition-colors hover:bg-[#6AA6FF] hover:text-white hover:shadow-xl'
          >
            승인
          </button>
          <div className='my-2 border-2 border-gray-300' />
          <button className='rounded-full px-2 transition-colors hover:bg-[#6AA6FF] hover:text-white hover:shadow-xl'>
            거절
          </button>
        </div>
      </div>
      <div className=' mt-6 space-y-5'>
        {responseDataList.map((item, i) => (
          <div
            key={item.formId}
            className='mx-4 flex justify-between space-x-2 rounded-2xl border-2 px-6 py-8 text-xl shadow-xl transition duration-300 ease-in-out hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
            onClick={() => {
              setSelectFormInfo(item);
            }}
          >
            <input
              value='white'
              type='checkbox'
              defaultChecked={false}
              checked={checkedList.includes(item.formId)}
              onChange={() => {
                checkedList.includes(item.formId)
                  ? setCheckedList(checkedList.filter((id) => id !== item.formId))
                  : setCheckedList([...checkedList, item.formId]);
              }}
              className='h-6 w-6 rounded border-gray-300 transition'
            />
            <Status status={item} setShowModal={setShowModal} vocal />
          </div>
        ))}
        {showModal && (
          <ModalWrapper>
            <ModalText>해당 신청서를 승인 하시나요??</ModalText>
            <div className='flex justify-center space-x-2'>
              <button
                onClick={(event) => {
                  setShowModal(false);
                }}
                className='button-modal'
              >
                취소
              </button>
              <button
                onClick={(event) => {
                  void onClick(checkedList);
                  setShowModal(false);
                }}
                className='button-modal'
              >
                승인
              </button>
            </div>
          </ModalWrapper>
        )}
      </div>
    </div>
  );
}
