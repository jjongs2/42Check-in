import type FormInfo from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import useHandleMouseIndex from '@/utils/handleMouse';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import ModalWrapper from '../common/ModalWrapper';
import Status from './Status';

export const btnContent = [
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
  const router = useRouter();
  const [category, setCategory] = useState<string>();
  const [formInfos, setFormInfos] = useState<FormInfo[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectForm, setSelectForm] = useState<FormInfo>();
  const { mouseOnIndex, handleMouseOut, handleMouseOver } = useHandleMouseIndex();

  useEffect(() => {
    if (category === undefined) return;
    const config = {
      url: `/my-checkin/${category}`,
    };
    async function fetchData(): Promise<void> {
      const { data } = await apiController(config);
      setFormInfos(data);
    }
    void fetchData();
  }, [category]);

  useEffect(() => {
    setCategory(router.query.category as string);
  }, [router]);

  if (formInfos === undefined) return;

  const btnBox = btnContent.map((item) => {
    const handleCategoryClick = (): void => {
      void router.push({
        query: { category: item.category },
      });
    };
    return (
      <div key={item.text} onClick={handleCategoryClick}>
        <button
          className={cls(
            category === item.category ? 'seletBtn' : 'notSeletBtn',
            'rounded-[20px] p-2 text-sm text-white transition duration-300 ease-in-out hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:hover:border-slate-700 dark:hover:bg-white',
          )}
        >
          {item.text}
        </button>
      </div>
    );
  });

  const handleCancelClick = async ({ formId }: FormInfo): Promise<void> => {
    const config = {
      url: `/${category}/cancel`,
      method: 'POST',
      data: { formId },
    };
    await apiController(config);
    setFormInfos(formInfos.filter((formInfo) => formInfo.formId !== formId));
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
        {formInfos.map((item, index) => (
          <div key={index}>
            {category !== 'conference-rooms' ? (
              <Link
                key={item.formId}
                href={{
                  pathname:
                    category === 'equipments' ? '/equipments/type/form' : `/${category}/form`,
                  query: { formInfo: JSON.stringify(item) },
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
            <p className='text-modal'>취소하시나요??</p>
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
                  void handleCancelClick(selectForm);
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
