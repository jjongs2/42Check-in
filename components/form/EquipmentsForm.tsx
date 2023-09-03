import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import getISODate from '@/utils/getISODate';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

import FormAgreement from '../common/FormAgreement';
import FormContainer from '../common/FormContainer';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormTextArea from '../common/FormTextArea';
import FormWrapper from '../common/FormWrapper';

const EQUIPMENTS = ['맥북', '삼성 노트북', '아이패드'];
export const PERIODS = ['1개월', '3개월'];
const PURPOSES = ['42 과제'];

interface EquipmentsFormProps {
  setShowModal?: Dispatch<SetStateAction<boolean>>;
}

function ReturnDate(): ReactElement {
  const { watch } = useFormContext();

  const date = watch('date');
  if (date === undefined) return;

  const period = watch('period', 0);
  const meetingDate = dayjs(date);
  const returnMonth = meetingDate.get('month') + Number(PERIODS[period].at(0));
  const returnDate = meetingDate.month(returnMonth).format('YYYY-MM-DD');

  return (
    <FormInput
      name='returnDate'
      title='반납 예정 날짜'
      value={returnDate}
      type='date'
      registerOptions={{ value: returnDate }}
      span='1'
      disabled
    />
  );
}

export default function EquipmentsForm({ setShowModal }: EquipmentsFormProps): ReactElement {
  const router = useRouter();
  const [formInfo, setFormInfo] = useState<EquipmentsFormInfo>();
  const [selectedDate, setSelectedDate] = useState<string>();

  function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
    setSelectedDate(event.target.value);
  }

  useEffect(() => {
    const { date, formInfo } = router.query;
    setSelectedDate(getISODate(date as string));
    if (formInfo !== undefined) {
      setFormInfo(JSON.parse(formInfo as string));
    }
  }, [router]);

  if (selectedDate === undefined) return;

  return (
    <FormContainer>
      <div className='mx-auto max-w-2xl pb-5 text-gray-700'>
        <h2 className='border-b border-[#6A70FF] pb-3 text-3xl font-bold tracking-tight text-[#6A70FF] dark:border-gray-300 dark:text-white'>
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
            placeholder='실명을 알려 주세요. (예시: 정우성)'
          />
          <FormInput
            name='phoneNumber'
            title='연락처'
            type='text'
            value={formInfo?.phoneNumber}
            placeholder='연락처를 입력해 주세요. (예시: 010-4242-4242)'
          />
          <FormSelect
            name='equipment'
            title='대여 물품'
            options={EQUIPMENTS}
            span='1'
            value={EQUIPMENTS[formInfo?.equipment - 1]}
            etcName='etcEquipment'
          />
          <FormSelect
            name='purpose'
            title='대여 목적'
            options={PURPOSES}
            span='1'
            value={PURPOSES[formInfo?.purpose - 1]}
            etcName='etcPurpose'
          />
          <FormTextArea
            name='detail'
            value={formInfo?.detail}
            title='활용 계획 (무엇을, 어떻게, 왜, 언제까지 4가지를 꼭 기재해 주세요.)'
            placeholder='상세히 기술해 주세요.'
          />
          <FormTextArea
            name='benefit'
            title='기대 효과'
            placeholder='상세히 기술해 주세요.'
            value={formInfo?.benefit}
          />
          <FormSelect
            name='period'
            title='대여 기간'
            value={PERIODS[formInfo?.period]}
            options={PERIODS}
            span='1'
          />
          <ReturnDate />
          <FormInput
            name='date'
            title='면담 희망 날짜'
            type='date'
            span='1'
            registerOptions={{ onChange: handleDateChange }}
            value={formInfo?.date ?? selectedDate}
          />
          <FormInput
            name='time'
            title='면담 희망 시각'
            type='time'
            span='1'
            value={formInfo?.time}
          />
          <FormAgreement>
            <p>대여한 물품이 파손될 경우 비용이 청구될 수 있음을 확인했습니다.</p>
          </FormAgreement>
        </div>
      </FormWrapper>
    </FormContainer>
  );
}
