import Calendar from '@/components/calendar/Calendar';
import ModalButton from '@/components/common/ModalButton';
import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function Equipments(): ReactElement {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal && (
        <ModalWrapper>
          <ModalText>신청 유형을 선택해 주세요.</ModalText>
          <div className='space-x-2'>
            <ModalButton text='신규' />
            <ModalButton text='연장' />
          </div>
        </ModalWrapper>
      )}
      <Calendar />
    </>
  );
}
