import type { Dispatch, ReactElement, SetStateAction } from 'react';

import FormContainer from '../common/FormContainer';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormTextArea from '../common/FormTextArea';
import FormWrapper from '../common/FormWrapper';

const IS_VIDEO = ['희망', '희망하지 않음'];
const LECTURES = [
  'Rush',
  'Piscine',
  'Partnership',
  'Conference',
  'Meet-up',
  'Event',
  'Association',
  'Hackathon',
  'Workshop',
  'Challenge',
  'Extern',
];
const TIMES = ['15분', '30분', '45분', '1시간', '1~2시간'];

interface PresentationsFormProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function PresentationsForm({ setShowModal }: PresentationsFormProps): ReactElement {
  return (
    <FormContainer>
      <div className='mx-auto max-w-2xl pb-5 text-gray-900'>
        <h2 className='border-b border-[#6A70FF] pb-3 text-3xl font-bold tracking-tight text-[#6A70FF]'>
          수요지식회 신청
        </h2>
        <p className='pt-5'>1. 주제는 소프트웨어 개발자로 성장하기에 도움이 될 만한 주제입니다.</p>
        <p>
          (테크 특강, 자기 소개, 커뮤니티, 개발자로서의 생활, 그 밖에 본인이 도움이 된다고
          생각한다면 오케이!)
        </p>
        <p className='pt-2'>
          2. 지식 공유의 시간은 15분에서 1시간 이내를 권장합니다. (실습 시 조정 가능)
        </p>
        <p className='pt-2'>
          3. 새롬관 B1F 오픈 스튜디오에서 진행하며, 오프라인 지식 공유만 허용합니다.
        </p>
        <p className='pt-2'>
          4. 지식을 나누겠다고 선뜻 나서 주시는 카뎃에게 새로 만든 42서울 굿즈를 선사합니다!
        </p>
        <p className='pt-2'>
          5. 만약 스케줄이 꽉 찼거나 관련 요청, 질문이 있다면 @42_holly에게 DM 요청해 주세요!
        </p>
      </div>
      <FormWrapper setShowModal={setShowModal}>
        <div className='grid grid-cols-3 gap-x-8 gap-y-6 pb-10'>
          <FormInput
            title='신청자 이름'
            type='text'
            onChange={() => {}}
            placeholder='실명을 알려 주세요. (예시: 이정재)'
          />
          <FormInput
            title='수요지식회 제목'
            type='text'
            onChange={() => {}}
            placeholder='강연 제목을 입력해 주세요.'
          />
          <FormInput
            title='수요지식회 주제'
            type='text'
            onChange={() => {}}
            placeholder='어떤 주제로 강연하시나요?'
          />
          <FormTextArea title='상세 내용' onChange={() => {}} />
          <FormSelect title='소요 시간' contents={TIMES} span='1' />
          <FormSelect title='강연 종류' contents={LECTURES} span='1' />
          <FormSelect title='영상 촬영' contents={IS_VIDEO} span='1' />
        </div>
      </FormWrapper>
    </FormContainer>
  );
}
