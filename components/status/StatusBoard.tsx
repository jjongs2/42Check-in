import type FormInfo from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import useHandleMouseIndex from '@/utils/handleMouse';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import ModalWrapper from '../common/ModalWrapper';
import Status from './Status';

const btnContent = [
  {
    category: 'conference-rooms',
    text: '회의실 예약',
  },
  {
    category: 'visitors',
    text: '외부인 초대',
  },
  {
    category: 'presentations',
    text: '수요지식회',
  },
  {
    category: 'equipments',
    text: '기자재 대여',
  },
];

export default function StatusBoard(): ReactElement {
  const [category, setCategory] = useState('conference-rooms');
  const [responseDataList, setResponseDataList] = useState<FormInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectForm, setSelectForm] = useState<FormInfo>();
  const { mouseOnIndex, handleMouseOut, handleMouseOver } = useHandleMouseIndex();

  useEffect(() => {
    const config = {
      url: `/my-checkin/${category}`,
    };
    async function fecthForms(): Promise<void> {
      const { data } = await apiController(config);
      setResponseDataList(data);
    }
    void fecthForms();
  }, [category]);

  const btnBox = btnContent.map((item) => {
    return (
      <div
        key={item.text}
        onClick={() => {
          setCategory(item.category);
        }}
      >
        <button
          className={cls(
            category === item.category ? 'seletBtn' : 'notSeletBtn',
            'rounded-[20px] p-2 text-sm text-white hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:hover:border-slate-700 dark:hover:bg-white',
          )}
        >
          {item.text}
        </button>
      </div>
    );
  });

  const onClick = async ({ formId }: FormInfo): Promise<void> => {
    const config = {
      url: `/${category}/cancel`,
      method: 'POST',
      data: { formId },
    };
    await apiController(config);
    setResponseDataList(responseDataList.filter((data) => data.formId !== formId));
  };

  return (
    <div className='m-4 flex max-h-[90vh] min-h-[90vh] flex-col overflow-auto rounded-xl border'>
      {/* 위에 버튼 4개있는 부분 */}
      <div className='sticky top-0 flex justify-between space-x-4 border-b-2 bg-white p-4 dark:bg-slate-700'>
        <div className='ml-2 flex w-full items-center justify-end space-x-2'>{btnBox}</div>
      </div>
      <div
        onMouseOut={() => {
          handleMouseOut(-1);
        }}
        className=' mt-6 space-y-3'
      >
        {responseDataList.map((item, index) => (
          <div key={index}>
            {category !== 'conference-rooms' ? (
              <Link
                key={item.formId}
                href={{
                  pathname: `/my-checkin/${category}`,
                  query: { formDetail: JSON.stringify(item) },
                }}
                onMouseOver={() => {
                  handleMouseOver(item.formId);
                }}
                className=' mx-2 flex h-16 justify-between space-x-2 rounded-2xl border-2 px-3 text-xl shadow-xl transition duration-300 ease-in-out hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
              >
                <Status
                  status={item}
                  setShowModal={setShowModal}
                  setSelectForm={setSelectForm}
                  mouseOnIndex={mouseOnIndex}
                />
              </Link>
            ) : (
              <div
                key={item.formId}
                onMouseOver={() => {
                  handleMouseOver(item.formId);
                }}
                className='mx-4 flex h-14 justify-between space-x-2 rounded-2xl border-2 px-6 py-8 text-xl shadow-xl'
              >
                <Status
                  status={item}
                  setShowModal={setShowModal}
                  setSelectForm={setSelectForm}
                  mouseOnIndex={mouseOnIndex}
                />
              </div>
            )}
          </div>
        ))}
        {showModal && (
          <ModalWrapper>
            <div className='text-modal'>취소하시나요??</div>
            <div className='flex justify-center space-x-2'>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setShowModal(false);
                }}
                className='button-modal border dark:border-white dark:text-lg dark:text-white dark:hover:text-[#54595E]'
              >
                취소
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  void onClick(selectForm);
                  setShowModal(false);
                }}
                className='button-modal border dark:border-white dark:text-lg dark:text-white dark:hover:text-[#54595E]'
              >
                확인
              </button>
            </div>
          </ModalWrapper>
        )}
      </div>
    </div>
  );
}
