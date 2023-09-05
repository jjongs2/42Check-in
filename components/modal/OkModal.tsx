import ModalWrapper from '@/components/common/ModalWrapper';
import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';

interface OkModalProps {
  children?: ReactNode;
}

export default function OkModal({
  children = (
    <>
      <p>신청이 완료되었습니다.</p>
      <p>Bocal분의 승인을 기다려 주세요 :)</p>
    </>
  ),
}: OkModalProps): ReactElement {
  return (
    <ModalWrapper>
      <div className='text-modal'>{children}</div>
      <div className='flex justify-center'>
        <Link href='/' className='button-modal'>
          <p>오예~~!!</p>
        </Link>
      </div>
    </ModalWrapper>
  );
}
