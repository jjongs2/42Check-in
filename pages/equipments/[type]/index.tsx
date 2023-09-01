import IMAGES from '@/assets/images';
import Calendar from '@/components/calendar/Calendar';
import { PERIODS } from '@/components/form/EquipmentsForm';
import OkModal from '@/components/modal/OkModal';
import type EquipmentsFormInfo from '@/interfaces/EquipmentsFormInfo';
import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

const DEVICE = {
  0: { svg: '', device: '기타' },
  1: { svg: '', device: 'MacBook' },
  2: { svg: '', device: 'SAMSUNG' },
  3: { svg: '', device: 'iPad' },
};

export default function RentalList(): ReactElement {
  const router = useRouter();
  const [formInfos, setFormInfos] = useState<EquipmentsFormInfo[]>([]);
  const [type, setType] = useState<string | string[]>();
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [selectForm, setSelectForm] = useState(undefined);

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

  const onSubmit = async (data): Promise<void> => {
    const config = {
      url: '/equipments/form/extension',
      method: 'POST',
      data: { ...selectForm, data },
    };
    await apiController(config);
    setShowModal(true);
  };

  return (
    <>
      {type === 'extension' ? (
        <div className='relative ml-20 flex w-[80vw] flex-col items-center justify-center lg:flex-row'>
          {formInfos.map((item, i) => (
            <div
              key={i}
              className='container'
              onMouseOver={() => {
                setSelectForm(item);
              }}
            >
              <div className='card mx-2'>
                <div className='face face1'>
                  <div className='content'>
                    <div className='w-44'>{DEVICE[item.equipment].svg}</div>
                    <p className='p-2 text-center text-white'>{DEVICE[item.equipment].device}</p>
                  </div>
                </div>
                <div className='face face2'>
                  <div className='content'>
                    <p className='h-10 border-b-2 border-dashed border-slate-700'>
                      기존 반납 일자: {item.returnDate}
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className=' mt-2 flex flex-col space-y-2'
                    >
                      <div>
                        <label htmlFor='meetingDate'>면담 신청 일자: </label>
                        <input
                          type='date'
                          title='면담 일자'
                          name='date'
                          {...register('date', { required: '입력하셔야죠.' })}
                        />
                      </div>
                      <div>
                        <label htmlFor='extensionPeriod'>연장 기간: </label>
                        <select
                          name='extensionPeriod'
                          id='extensionPeriod'
                          {...register('period', { required: '입력하셔야죠.' })}
                        >
                          {PERIODS.map((item, i) => {
                            return <option key={i}>{item}</option>;
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
            </div>
          ))}
          {showModal && <OkModal />}
        </div>
      ) : (
        <Calendar />
      )}
      <style>{`
            .container {
              width: 1000px;
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
              max-width: 100px;
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
