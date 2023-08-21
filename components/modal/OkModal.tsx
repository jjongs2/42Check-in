import ModalButton from '@/components/common/ModalButton';
import ModalText from '@/components/common/ModalText';
import ModalWrapper from '@/components/common/ModalWrapper';
import type { ReactElement } from 'react';

export default function OkModal(): ReactElement {
  return (
    <ModalWrapper>
      <ModalText>
        <p>신청이 완료되었습니다.</p>
        <p>Vocal분의 승인을 기다려 주세요 :)</p>
      </ModalText>
      <ModalButton text='오예~~!!' />
    </ModalWrapper>
  );
}
