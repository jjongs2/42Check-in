import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import VocalStatusBoard from '@/components/status/VocalStatusBoard';
import Link from 'next/link';
import { type ReactElement, useState } from 'react';

export default function Vocal(): ReactElement {
  const [selectFormInfo, setSelectFormInfo] = useState({});

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

  return (
    <div>
      <VocalStatusBoard />
    </div>
  );
}
