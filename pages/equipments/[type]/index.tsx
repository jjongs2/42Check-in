import Calendar from '@/components/calendar/Calendar';
import ModalWrapper from '@/components/common/ModalWrapper';
import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

export default function RentalList(): ReactElement {
  const router = useRouter();
  const [formInfos, setFormInfos] = useState<EquipmentsFormInfo[]>([]);
  const [type, setType] = useState<string | string[]>();

  useEffect(() => {
    setType(router.query.type);
  }, [router]);

  useEffect(() => {
    if (type !== 'extension') return;
    async function fetchData(): Promise<void> {
      const config = {
        url: '/equipments/form/extension',
      };
      const { data } = await apiController(config);
      setFormInfos(data);
    }
    void fetchData();
  }, [type]);

  return (
    <>
      {type === 'extension' && (
        <ModalWrapper>
          <div className='text-modal'>연장할 장비를 선택해 주세요.</div>
          <div className='flex-col justify-center space-y-2'>
            {formInfos.map(({ formId, equipment, returnDate }) => (
              <div key={formId}>
                <p>{equipment}</p>
                <p>{returnDate}</p>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}
      <Calendar />
    </>
  );
}
