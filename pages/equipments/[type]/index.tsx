import Calendar from '@/components/calendar/Calendar';
import { PERIODS } from '@/components/form/EquipmentsForm';
import OkModal from '@/components/modal/OkModal';
import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import apiController from '@/utils/apiController';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import MacBook from '../../../assets/MacBook.png';
import Samsung from '../../../assets/Samsung.png';
import etc from '../../../assets/etc.png';
import iPad from '../../../assets/iPad.png';

const DEVICE = {
  0: { img: etc, device: '기타' },
  1: { img: MacBook, device: 'MacBook' },
  2: { img: Samsung, device: 'SAMSUNG' },
  3: { img: iPad, device: 'iPad' },
};

interface RentalProps {
  formInfo: EquipmentsFormInfo;
}

function Rental({ formInfo }: RentalProps): ReactElement {
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data): Promise<void> => {
    const config = {
      url: '/equipments/form/extension',
      method: 'POST',
      data: { ...formInfo, data },
    };
    await apiController(config);
    setShowModal(true);
  };

  return (
    <div className='container'>
      <div className='card mx-2'>
        <div className='face face1'>
          <div className='content flex flex-col'>
            <Image
              className='mb-10 aspect-auto object-contain px-10'
              src={DEVICE[formInfo.equipment].img}
              alt={DEVICE[formInfo.equipment].device}
            />
            <p className='p-2 text-center text-white'>{DEVICE[formInfo.equipment].device}</p>
          </div>
        </div>
        <div className='face face2'>
          <div className='content'>
            <p className='h-10 border-b-2 border-dashed border-slate-700'>
              기존 반납 일자: {formInfo.returnDate}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className=' mt-2 flex flex-col space-y-2'>
              <div>
                <label htmlFor='meetingDate'>면담 희망 일자: </label>
                <input type='date' title='면담 일자' {...register('date', { required: true })} />
              </div>
              <div>
                <label htmlFor='meetingTime'>면담 희망 시간: </label>
                <input type='time' title='면담 시간' {...register('time', { required: true })} />
              </div>
              <div>
                <label htmlFor='extensionPeriod'>연장 기간: </label>
                <select id='extensionPeriod' {...register('period', { required: true })}>
                  {PERIODS.map((item, i) => {
                    return (
                      <option key={i} value={i}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <input
                type='submit'
                className='mt-4 cursor-pointer rounded-xl p-2 hover:bg-[#6AA6FF] hover:text-white'
              />
            </form>
          </div>
        </div>
      </div>
      {showModal && <OkModal />}
    </div>
  );
}

export default function RentalList(): ReactElement {
  const router = useRouter();
  const [formInfos, setFormInfos] = useState<EquipmentsFormInfo[]>([]);
  const [type, setType] = useState<string>();

  useEffect(() => {
    setType(router.query.type as string);
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
      {type === 'extension' ? (
        <div className='ml-20 grid h-full grid-cols-1 place-content-center place-items-center gap-20 lg:grid-cols-2 2xl:grid-cols-4 '>
          {formInfos.map((item) => (
            <Rental formInfo={item} />
          ))}
        </div>
      ) : (
        <Calendar />
      )}
      <style>{`
            .container {
              position: relative;
              display: flex;
              justify-content: space-between;
            }
            .container .card {
              position: relative;
            }
            .container .card .face {
              width: 300px;
              height: 300px;
              transition: 0.5s;
            }
            .container .card .face.face1 {
              position: relative;
              background: #4069FD;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1;
              transform: translateY(200px);
            }
            .container .card:hover .face.face1 {
              background: #6AA6FF;
              transform: translateY(0);
            }
            .container .card .face.face1 .content {
              transition: 0.5s;
            }
            .container .card .face.face1 .content img {
              max-width: 300px;
            }
            .container .card .face.face2 {
              position: relative;
              background: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 20px;
              box-sizing: border-box;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
              transform: translateY(-100px);
            }
            .container .card:hover .face.face2 {
              transform: translateY(0);
            }
            .container .card .face.face2 .content p {
              margin: 0;
              padding: 0;
            }
            .container .card .face.face2 .content a {
              margin: 15px 0 0;
              display: inline-block;
              text-decoration: none;
              font-weight: 900;
              color: #333;
              padding: 5px;
              border: 1px solid #333;
            }
            .container .card .face.face2 .content a:hover {
              background: #333;
              color: #fff;
            }
          `}</style>
    </>
  );
}
