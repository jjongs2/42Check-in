import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import EquipmentsForm from '@/components/form/EquipmentsForm';
import PresentationsForm from '@/components/form/PresentationsForm';
import VisitorsForm from '@/components/form/VisitorsForm';
import VocalStatusBoard from '@/components/status/VocalStatusBoard';
import type FormInfo from '@/interfaces/FormInfo';
import Link from 'next/link';
import { type ReactElement, useState } from 'react';

export default function Vocal(): ReactElement {
  const [selectFormInfo, setSelectFormInfo] = useState<FormInfo>(undefined);
  const [category, setCategory] = useState('visitors');

  const staff = localStorage.getItem('staff');
  if (staff === 'false') {
    return (
      <ModalWrapper>
        <ModalText>
          <p>접근 권한이 없습니다.</p>
        </ModalText>
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

  return (
    <div className='flex flex-col justify-between lg:flex-row'>
      <VocalStatusBoard
        setSelectFormInfo={setSelectFormInfo}
        category={category}
        setCategory={setCategory}
      />
      <div className='m-10 flex min-w-max flex-col overflow-auto rounded-xl border'>
        {selectedForm()}
      </div>
    </div>
  );
}
