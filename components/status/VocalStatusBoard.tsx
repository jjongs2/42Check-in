import type FormInfo from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import { useEffect, useState } from 'react';
import type { Dispatch, ReactElement } from 'react';

import PresentationsStatus from './PresentationsStatus';
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
  selectFormInfo: FormInfo;
  setSelectFormInfo: Dispatch<React.SetStateAction<FormInfo>>;
  setCategory: Dispatch<React.SetStateAction<string>>;
  category: string;
  setCheckedList: Dispatch<React.SetStateAction<FormInfo[]>>;
  checkedList: FormInfo[];
  setChangePresentations: Dispatch<React.SetStateAction<{}>>;
  changePresentations: {};
}

export default function StatusBoard({
  selectFormInfo,
  setSelectFormInfo,
  setCategory,
  category,
  setCheckedList,
  checkedList,
  setChangePresentations,
  changePresentations,
}: VocalStatusBoardProps): ReactElement {
  const [responseDataList, setResponseDataList] = useState<FormInfo[]>([]);
  const [checked, setChecked] = useState(false);

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

  return (
    <div className='z-10 m-10 flex max-h-80 min-h-[80vh] min-w-max flex-col overflow-scroll rounded-xl border bg-white dark:bg-slate-800'>
      {/* 위에 버튼 4개있는 부분 */}
      <div className='sticky top-0 flex justify-between space-x-4 border-b-2 bg-white p-10 pb-4 dark:bg-slate-700'>
        <div className='flex items-center space-x-2'>
          {category !== 'presentations' && (
            <input
              value='white'
              type='checkbox'
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                if (checked) setCheckedList([]);
                else setCheckedList(responseDataList.map((item) => item));
              }}
              className='mr-10 h-6 w-6 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500'
            />
          )}
          {btnBox}
        </div>
      </div>
      <div className=' mt-6 space-y-5'>
        {responseDataList.map((item, i) => (
          <div
            key={item.formId}
            className='mx-4 flex justify-between space-x-2 rounded-2xl border-2 px-6 py-8 text-xl shadow-xl transition duration-300 ease-in-out hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
            onClick={() => {
              if (item === selectFormInfo) {
                setSelectFormInfo(undefined);
                return;
              }
              setSelectFormInfo(item);
            }}
          >
            {category !== 'presentations' && (
              <input
                value='white'
                type='checkbox'
                checked={item.status > 0 ? false : checkedList.includes(item)}
                onChange={() => {
                  checkedList.includes(item)
                    ? setCheckedList(checkedList.filter((id) => id !== item))
                    : setCheckedList([...checkedList, item]);
                }}
                className={cls(
                  item.status > 0 ? 'invisible' : '',
                  'h-6 w-6 rounded border-gray-300 transition',
                )}
              />
            )}
            {category !== 'presentations' ? (
              <Status status={item} vocal />
            ) : (
              <PresentationsStatus
                status={item}
                changePresentations={changePresentations}
                setChangePresentations={setChangePresentations}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
