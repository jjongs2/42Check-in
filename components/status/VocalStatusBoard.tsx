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
    text: `수요 지식회`,
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
            'rounded-[20px] p-2 text-sm text-white hover:border-[#6AA6FF] hover:bg-[#6AA6FF] dark:hover:border-slate-700 dark:hover:bg-white',
          )}
        >
          {items.text}
        </button>
      </div>
    );
  });
  console.log(responseDataList);
  return (
    <div className='z-10 m-4 flex h-full max-h-[79vh] min-w-[405px] flex-col overflow-auto rounded-xl border bg-white dark:bg-slate-800 lg:w-[800px]'>
      <div className='sticky top-0 flex justify-between space-x-4 border-b-2 bg-white p-4 dark:bg-slate-700'>
        <div className='flex w-full items-center justify-between space-x-2'>
          <input
            value='white'
            type='checkbox'
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              if (checked) setCheckedList([]);
              else setCheckedList(responseDataList.map((item) => item));
            }}
            className={cls(
              category !== 'presentations' ? '' : 'invisible',
              'mr-3 h-6 w-6 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500',
            )}
          />
          <div className='flex space-x-3'>{btnBox}</div>
        </div>
      </div>
      <div className='mt-6 w-full'>
        {responseDataList.map((item, i) => (
          <div
            key={item.formId}
            className='group mx-2 mb-4 flex h-14 max-w-full items-center justify-around rounded-2xl border-2 shadow-xl transition duration-300 hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
                checked={item.status > 0 ? false : checkedList.includes(item)}
                onChange={() => {
                  checkedList.includes(item)
                    ? setCheckedList(checkedList.filter((id) => id !== item))
                    : setCheckedList([...checkedList, item]);
                }}
                className={cls(
                  item.status > 0 ? 'invisible' : '',
                  'mx-2 h-4 w-4 rounded border-gray-300 transition',
                )}
              />
            )}
            {category !== 'presentations' ? (
              <Status status={item} vocal />
            ) : (
              <>
                <div className='h-6 w-6'></div>
                <PresentationsStatus
                  status={item}
                  changePresentations={changePresentations}
                  setChangePresentations={setChangePresentations}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
