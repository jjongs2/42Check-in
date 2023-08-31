import ModalWrapper from '@/components/common/ModalWrapper';
import EquipmentsForm from '@/components/form/EquipmentsForm';
import PresentationsForm from '@/components/form/PresentationsForm';
import VisitorsForm from '@/components/form/VisitorsForm';
import VocalStatusBoard from '@/components/status/VocalStatusBoard';
import type FormInfo from '@/interfaces/FormInfo';
import apiController from '@/utils/apiController';
import Link from 'next/link';
import { type ReactElement, useState } from 'react';

export default function Vocal(): ReactElement {
  const [selectFormInfo, setSelectFormInfo] = useState<FormInfo>(undefined);
  const [category, setCategory] = useState('visitors');
  const [showModal, setShowModal] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [changePresentations, setChangePresentations] = useState({});
  const staff = localStorage.getItem('staff');

  if (staff === 'false') {
    return (
      <ModalWrapper>
        <div className='text-modal'>
          <p>접근 권한이 없습니다.</p>
        </div>
        <div className='flex justify-center'>
          <Link href='/' className='button-modal'>
            <p>오예~~!!</p>
          </Link>
        </div>
      </ModalWrapper>
    );
  }

  const selectedForm = (): ReactElement => {
    if (selectFormInfo !== undefined) {
      switch (category) {
        case 'visitors':
          return <VisitorsForm formInfo={selectFormInfo} />;
        case 'presentations':
          return <PresentationsForm formInfo={selectFormInfo} />;
        case 'equipments':
          return <EquipmentsForm formInfo={selectFormInfo} />;
      }
    }
  };

  const onClick = async (formIds: number[], selectFormInfo: number[]): Promise<void> => {
    const formId = formIds.length === 0 ? selectFormInfo : formIds;
    const config = {
      url: `/vocal/subscriptions/${category}`,
      method: 'POST',
      data: { formIds: formId },
    };
    await apiController(config);
  };

  const onClickPresentations = async (presenList: {}) => {
    const config = {
      url: '/vocal/subscriptions/presentations',
      method: 'POST',
      data: { presenList },
    };
    await apiController(config);
  };
  return (
    <div className='flex flex-col justify-between lg:flex-row'>
      <VocalStatusBoard
        setSelectFormInfo={setSelectFormInfo}
        category={category}
        setCategory={setCategory}
        setCheckedList={setCheckedList}
        checkedList={checkedList}
        setChangePresentations={setChangePresentations}
        changePresentations={changePresentations}
      />
      <div className='m-10 flex min-w-max flex-col overflow-auto rounded-xl border'>
        {selectedForm()} {/* 선택된 폼 상세 내용  */}
      </div>
      <div className='flex space-x-4'>
        <button
          onClick={() => {
            if (checkedList.length === 0 && !selectFormInfo) return alert('선택된 폼이 없습니다.');
            setShowModal(true);
          }}
          className='absolute left-1/2 top-20 z-50 h-14 w-14 rounded-full bg-teal-400 text-lg text-white shadow-xl ring-2 ring-teal-300 transition-colors hover:animate-pulse hover:bg-teal-300 hover:ring-2 hover:ring-teal-300 hover:ring-offset-2 dark:hover:text-black'
        >
          승인
        </button>
      </div>
      {showModal && (
        <ModalWrapper>
          <div className='text-modal'>해당 신청서를 승인 하시나요??</div>
          <div className='flex justify-center space-x-2'>
            <button
              onClick={(event) => {
                setShowModal(false);
              }}
              className='button-modal dark:text-white'
            >
              취소
            </button>
            <button
              onClick={(event) => {
                if (category !== 'presentations')
                  void onClick(checkedList, [selectFormInfo.formId]);
                else void onClickPresentations(changePresentations);
                setShowModal(false);
              }}
              className='button-modal dark:text-white'
            >
              승인
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
