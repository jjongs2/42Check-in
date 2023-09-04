import type { ApplicationFormInfo } from '@/interfaces/FormInfo';
import { cls } from '@/styles/cls';
import apiController from '@/utils/apiController';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Dispatch, ReactElement } from 'react';

import PresentationsStatus from './PresentationsStatus';
import Status from './Status';
import { btnContent } from './StatusBoard';

interface VocalStatusBoardProps {
  setCheckedList: Dispatch<React.SetStateAction<ApplicationFormInfo[]>>;
  checkedList: ApplicationFormInfo[];
  setChangePresentations: Dispatch<React.SetStateAction<{}>>;
  changePresentations: {};
}

interface FormInfosPage {
  list: ApplicationFormInfo[];
  pageCount: number;
}

const getPageOffset = (pageNumber): number => {
  return Math.floor((pageNumber - 1) / 5);
};

export default function VocalStatusBoard({
  setCheckedList,
  checkedList,
  setChangePresentations,
  changePresentations,
}: VocalStatusBoardProps): ReactElement {
  const router = useRouter();
  const { category, filter, page, size, sort } = router.query;
  const currentPage = Number(page);
  const initialOffset = getPageOffset(currentPage);

  const [checked, setChecked] = useState(false);
  const [formInfos, setFormInfos] = useState<ApplicationFormInfo[]>();
  const [pageCount, setPageCount] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [pageOffset, setPageOffset] = useState<number>(initialOffset);
  const [selectedFormInfo, setSelectedFormInfo] = useState<ApplicationFormInfo>();
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (pageCount === undefined) return;
    if (currentPage > pageCount) return;
    setPageNumbers(
      [...Array(5)]
        .map((_, index) => 5 * pageOffset + index + 1)
        .filter((value) => value <= pageCount),
    );
  }, [pageCount, pageOffset]);

  useEffect(() => {
    async function getFormInfosPage(): Promise<void> {
      const config = {
        url: `/vocal/subscriptions/${category as string}/form/${filter as string}`,
        params: { page, size, sort },
      };
      const { data } = await apiController<FormInfosPage>(config);
      const { list, pageCount } = data;
      setFormInfos(list);
      setPageCount(pageCount);
    }
    setShowDropDown(false);
    void getFormInfosPage();
  }, [router]);

  useEffect(() => {
    if (selectedFormInfo === undefined) return;
    const query = { ...router.query };
    if (selectedFormInfo === null) {
      delete query.formInfo;
    } else {
      query.formInfo = JSON.stringify(selectedFormInfo);
    }
    void router.push({ query });
  }, [selectedFormInfo]);

  if (formInfos === undefined) return;
  if (pageNumbers === undefined) return;

  const lastPageOffset = getPageOffset(pageCount);

  const paginate = (pageNumber: number): void => {
    void router.push({
      query: {
        ...router.query,
        page: pageNumber,
      },
    });
  };

  const btnBox = btnContent
    .filter((value) => value.category !== 'conference-rooms')
    .map((item) => {
      const handleCategoryClick = (): void => {
        const query = { ...router.query };
        query.category = item.category;
        delete query.formInfo;
        void router.push({ query });
      };
      return (
        <div key={item.text} onClick={handleCategoryClick}>
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

  return (
    <div className='z-10 m-4 flex h-full max-h-[79vh] min-w-[405px] flex-col overflow-auto rounded-xl border bg-white dark:bg-slate-800 lg:w-[800px]'>
      <div className='sticky top-0 flex items-center justify-between space-x-4 border-b-2 bg-white p-4 dark:bg-slate-700'>
        <div className='flex w-full items-center space-x-2'>
          <input
            value='white'
            type='checkbox'
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              if (checked) setCheckedList([]);
              else setCheckedList(formInfos.map((item) => item));
            }}
            className={cls(
              category !== 'presentations' ? '' : 'invisible',
              'mr-3 h-6 w-6 rounded border-gray-300 transition hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500',
            )}
          />
          <div className='flex space-x-3'>{btnBox}</div>
        </div>
        <div className='relative inline-block text-left'>
          <div>
            <button
              type='button'
              className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              id='menu-button'
              aria-expanded='true'
              aria-haspopup='true'
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
            >
              {filter === 'approval' ? '승인' : '미승인'}
              <svg
                className='-mr-1 h-5 w-5 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          {showDropDown && (
            <div
              className='absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
            >
              <div className='py-1 text-center' role='none'>
                <Link
                  href={{
                    query: {
                      ...router.query,
                      filter: 'not-approval',
                    },
                  }}
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-0'
                >
                  미승인
                </Link>
                <Link
                  href={{
                    query: {
                      ...router.query,
                      filter: 'approval',
                    },
                  }}
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  id='menu-item-1'
                >
                  승인
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-6 w-full'>
        {formInfos.map((item, i) => (
          <div
            key={item.formId}
            className='group mx-2 mb-4 flex h-14 items-center justify-center rounded-2xl border-2 shadow-xl transition duration-300 hover:bg-[#6AA6FF] dark:hover:bg-gray-700'
            onClick={() => {
              if (item.formId === selectedFormInfo?.formId) {
                setSelectedFormInfo(null);
                return;
              }
              setSelectedFormInfo(item);
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
                <PresentationsStatus
                  status={item}
                  changePresentations={changePresentations}
                  setChangePresentations={setChangePresentations}
                />
              </>
            )}
          </div>
        ))}
        <div className='flex justify-center'>
          <button
            onClick={() => setPageOffset(0)}
            className={`m-1 h-8 w-8 ${pageOffset === 0 ? 'bg-gray-300 text-white' : 'bg-white'}`}
            disabled={pageOffset === 0}
          >
            {'<<'}
          </button>
          <button
            onClick={() => setPageOffset(pageOffset - 1)}
            className={`m-1 h-8 w-8 ${pageOffset === 0 ? 'bg-gray-300 text-white' : 'bg-white'}`}
            disabled={pageOffset === 0}
          >
            {'<'}
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`m-1 h-8 w-8 ${
                number === currentPage ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              disabled={number === currentPage}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setPageOffset(pageOffset + 1)}
            className={`m-1 h-8 w-8 ${
              pageOffset === lastPageOffset ? 'bg-gray-300 text-white' : 'bg-white'
            }`}
            disabled={pageOffset === lastPageOffset}
          >
            {'>'}
          </button>
          <button
            onClick={() => setPageOffset(getPageOffset(pageCount))}
            className={`m-1 h-8 w-8 ${
              pageOffset === lastPageOffset ? 'bg-gray-300 text-white' : 'bg-white'
            }`}
            disabled={pageOffset === lastPageOffset}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}
