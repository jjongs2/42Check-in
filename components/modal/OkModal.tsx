import ModalText from '@/components/common/ModalText';
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
      <p>Vocal분의 승인을 기다려 주세요 :)</p>
    </>
  ),
}: OkModalProps): ReactElement {
  return (
    <ModalWrapper>
      <ModalText>{children}</ModalText>
      <div className='flex justify-center'>
        <Link href='/' className='button-modal group dark:border dark:border-white'>
          <p className='dark:text-white dark:group-hover:text-black'>오예~~!!</p>
        </Link>
      </div>
    </ModalWrapper>
  );
}
