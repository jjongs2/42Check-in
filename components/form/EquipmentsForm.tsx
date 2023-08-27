import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import { useRouter } from 'next/router';
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
  formInfo: EquipmentsFormInfo;
}

export default function EquipmentsForm({
  setShowModal,
  formInfo,
}: EquipmentsFormProps): ReactElement {
  const { pathname } = useRouter();
  const myCheckin = pathname === '/my-checkin';

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
            value={formInfo?.userName}
            disabled={myCheckin}
            placeholder='실명을 알려 주세요. (예시: 정우성)'
          />
          <FormInput
            name='phoneNumber'
            title='연락처'
            type='text'
            value={formInfo?.phoneNumber}
            disabled={myCheckin}
            placeholder='연락처를 입력해 주세요. (예시: 010-4242-4242)'
          />
          <FormSelect
            name='equipment'
            title='대여 물품'
            options={EQUIPMENTS}
            span='1'
            value={EQUIPMENTS[formInfo?.equipment - 1]}
            disabled={myCheckin}
            etcName='etcEquipment'
          />
          <FormSelect
            name='purpose'
            title='대여 목적'
            options={PURPOSES}
            span='1'
            value={PURPOSES[formInfo?.purpose - 1]}
            disabled={myCheckin}
            etcName='etcPurpose'
          />
          <FormTextArea
            name='detail'
            value={formInfo?.detail}
            disabled={myCheckin}
            title='활용 계획 (무엇을, 어떻게, 왜, 언제까지 4가지를 꼭 기재해 주세요.)'
            placeholder='상세히 기술해 주세요.'
          />
          <FormTextArea
            name='benefit'
            title='기대 효과'
            value={formInfo?.benefit}
            disabled={myCheckin}
          />
          <FormSelect
            name='period'
            title='대여 기간'
            value={PERIODS[formInfo?.period]}
            disabled={myCheckin}
            options={PERIODS}
            span='1'
          />
          <FormInput
            name='returnDate'
            title='반납 예정일'
            value={formInfo?.returnDate}
            disabled={myCheckin}
            type='date'
            span='1'
          />
          <FormAgreement>
            대여한 물품을 파손시킬 경우 비용이 청구될 수 있음을 확인했습니다.
          </FormAgreement>
        </div>
      </FormWrapper>
    </FormContainer>
  );
}
