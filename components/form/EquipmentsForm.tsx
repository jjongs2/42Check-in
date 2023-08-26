import type { Dispatch, ReactElement, SetStateAction } from 'react';

import FormAgreement from '../common/FormAgreement';
import FormContainer from '../common/FormContainer';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormTextArea from '../common/FormTextArea';
import FormWrapper from '../common/FormWrapper';

const EQUIPMENTS = ['맥북', '삼성 노트북', '아이패드'];
const PERIODS = ['1개월', '3개월'];
const PURPOSES = ['42 과제'];

interface EquipmentsFormProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function EquipmentsForm({ setShowModal }: EquipmentsFormProps): ReactElement {
  return (
    <FormContainer>
      <div className='mx-auto max-w-2xl pb-5 text-gray-900'>
        <h2 className='border-b border-[#6A70FF] pb-3 text-3xl font-bold tracking-tight text-[#6A70FF]'>
          기자재 대여 신청
        </h2>
      </div>
      <FormWrapper setShowModal={setShowModal}>
        <div className='grid grid-cols-2 gap-x-8 gap-y-6 pb-6'>
          <FormInput
            name='userName'
            title='신청자 이름'
            type='text'
            placeholder='실명을 알려 주세요. (예시: 정우성)'
          />
          <FormInput
            name='phoneNumber'
            title='연락처'
            type='text'
            placeholder='연락처를 입력해 주세요. (예시: 010-4242-4242)'
          />
          <FormSelect name='equipment' title='대여 물품' options={EQUIPMENTS} span='1' />
          <FormSelect name='purpose' title='대여 목적' options={PURPOSES} span='1' etcName='etc' />
          <FormTextArea
            name='purpose'
            title='활용 계획 (무엇을, 어떻게, 왜, 언제까지 4가지를 꼭 기재해 주세요.)'
            placeholder='상세히 기술해 주세요.'
          />
          <FormTextArea name='benefit' title='기대 효과' />
          <FormSelect name='period' title='대여 기간' options={PERIODS} span='1' />
          <FormInput name='returnDate' title='반납 예정일' type='date' span='1' />
          <FormAgreement>
            대여한 물품을 파손시킬 경우 비용이 청구될 수 있음을 확인했습니다.
          </FormAgreement>
        </div>
      </FormWrapper>
    </FormContainer>
  );
}
