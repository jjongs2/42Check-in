import type VisitorsFormInfo from '@/interfaces/VisitorsFormInfo';
import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';

import FormAgreement from '../common/FormAgreement';
import FormContainer from '../common/FormContainer';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormWrapper from '../common/FormWrapper';

const PLACES = [
  'B1F: 어셈블리',
  '1F: 오픈 스튜디오',
  '2/4/5F: 클러스터',
  '3F: 회의실',
  '폴베가 있는 마루관',
];
const PURPOSES = [
  '견학: "너희 교육장이 정말 궁금하구나!"',
  '학습: "너와 함께 공부하고 싶어!"',
  '토크: "이야기할 것이 많으니 교육장 안에서 이야기하자!"',
];
const RELATIONS = [
  '42서울에서 인연을 맺었던 동료 "피시너/카뎃"',
  '나를 보고 싶어 개포까지 달려 올 나의 "친구"',
  '나의 소중한 "가족"',
  '멘토님 또는 그에 상응하는 "은사"',
];

interface VisitorsFormProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  formInfo: VisitorsFormInfo;
}

export default function VisitorsForm({ setShowModal }: VisitorsFormProps): ReactElement {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const myCheckin = router.pathname.includes('/my-checkin');
  const [formDetail, setFormDetail] = useState<VisitorsFormInfo>();

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { date, formDetail } = router.query;
    setSelectedDate(formatDate(new Date(date as string)));
    if (formDetail !== undefined) {
      setFormDetail(JSON.parse(formDetail as string));
    }
  }, [router]);

  return (
    <FormContainer>
      <div className='mx-auto max-w-2xl pb-5 text-gray-900'>
        <h2 className='border-b border-[#6A70FF] pb-3 text-3xl font-bold tracking-tight text-[#6A70FF]'>
          외부인 초대 사전 승인 신청
        </h2>
        <p className='pt-5'>안녕하세요. 폴라베어입니다.</p>
        <p>우리 42서울은 외부인 방문이 가능한 곳입니다만 무분별한 출입은 불허하고 있습니다.</p>
        <p className='pt-4'>우리 교육장에는 값비싼 기자재 및 시설들이 즐비하며,</p>
        <p>외부인이 이를 파손 시 우리 42서울 카뎃분들이 상당한 불편함을 가질 수 있기 때문입니다.</p>
        <p className='pt-4'>그렇기에 스태프의 사전 승인 없이는 외부인 출입을 불허하고 있으며,</p>
        <p>본 신청을 통해 외부인 출입을 허용해 드리고자 합니다.</p>
        <p className='pt-4'>
          조금은 불편하더라도 확실한 보안을 위한 절차이오니 이 점 참고해 주시기 바랍니다.
        </p>
      </div>
      <FormWrapper setShowModal={setShowModal}>
        <div className='grid grid-cols-2 gap-x-8 gap-y-6 pb-6'>
          <FormInput
            name='visitorsName'
            title='방문자 이름'
            type='text'
            placeholder='어떤 분을 데려 오시나요? 이름을 알려 주세요.'
            value={formDetail?.visitorsName}
            disabled={myCheckin}
          />
          <FormSelect
            name='relationWithUser'
            title='방문자와의 관계'
            options={RELATIONS}
            etcName='etcRelation'
            placeholder='방문자와 어떤 사이신가요?'
            value={RELATIONS[formDetail?.relationWithUser - 1]}
            disabled={myCheckin}
          />
          <FormSelect
            name='visitPurpose'
            title='방문 목적'
            options={PURPOSES}
            etcName='etcPurpose'
            placeholder='방문 목적을 선택해 주세요.'
            value={PURPOSES[formDetail?.visitPurpose - 1]}
            disabled={myCheckin}
          />
          <FormSelect
            name='visitPlace'
            title='방문 장소'
            options={PLACES}
            etcName='etcPlace'
            placeholder='방문 목적을 선택해 주세요.'
            value={PLACES[formDetail?.visitPlace - 1]}
            disabled={myCheckin}
          />
          <FormInput
            name='visitDate'
            title='방문 예정 날짜'
            type='date'
            span='1'
            registerOptions={{ onChange: handleDateChange }}
            value={formDetail?.visitDate || selectedDate}
            disabled={myCheckin}
          />
          <FormInput
            name='visitTime'
            title='방문 예정 시각'
            type='time'
            span='1'
            value={formDetail?.visitTime}
            disabled={myCheckin}
          />
          <FormAgreement>
            <p>외부인 방문 시 반드시 동행할 것을 약속하며</p>
            <p>외부인에 의해 시설이 훼손된 경우 공동 책임이 따름을 확인했습니다.</p>
          </FormAgreement>
        </div>
      </FormWrapper>
    </FormContainer>
  );
}
