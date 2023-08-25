import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import Link from 'next/link';
import type { ReactElement } from 'react';

export default function OkModal(): ReactElement {
  return (
    <ModalWrapper>
      <ModalText>
        <p>신청이 완료되었습니다.</p>
        <p>Vocal분의 승인을 기다려 주세요 :)</p>
      </ModalText>
      <div className='flex justify-center'>
        <Link href='/' className='button-modal'>
          <p>오예~~!!</p>
        </Link>
      </div>
    </ModalWrapper>
  );
}
