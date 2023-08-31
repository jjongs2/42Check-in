import IMAGES from '@/assets/images';
import Calendar from '@/components/calendar/Calendar';
import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

const DEVICE = {
  0: { svg: IMAGES.laptop, device: 'MacBook' },
  1: { svg: IMAGES.ipad, device: 'iPad' },
  3: {},
};

export default function RentalList(): ReactElement {
  const router = useRouter();
  const [formInfos, setFormInfos] = useState<EquipmentsFormInfo[]>([]);
  const [type, setType] = useState<string | string[]>();
  const [selectedDevice, setSelectedDevice] = useState<EquipmentsFormInfo>();

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

  const extensionDevice = (e) => {
    setSelectedDevice(e);
  };

  return (
    <>
      {type === 'extension' ? (
        <div className='flex h-full items-center justify-evenly'>
          {formInfos.map((item) => (
            <div
              key={item.formId}
              className='flex flex-col items-center justify-center rounded-lg border-2 bg-slate-300 p-4 hover:bg-[#6AA6FF] hover:ring-2 hover:ring-[#6AA6FF] hover:ring-offset-1'
              onClick={() => extensionDevice(item)}
            >
              <p className='h-44 w-44'>{DEVICE[item.equipment].svg}</p>
              <p>{DEVICE[item.equipment].device}</p>
              <p>반납 예정일 : {item.returnDate}</p>
            </div>
          ))}
          {selectedDevice !== undefined ?? <div></div>}
        </div>
      ) : (
        <Calendar />
      )}
    </>
  );
}
