import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { FormProvider, set, useForm } from 'react-hook-form';

import FormSubmitButton from '../common/FormSubmitButton';

interface FormWrapperProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function FormWrapper({ setShowModal, children }: FormWrapperProps): ReactElement {
  const methods = useForm();
  const router = useRouter();
  const [date, setDate] = useState<string>();
  const [rentalType, setRentalType] = useState<string>();

  const onSubmit = async (data: any): Promise<void> => {
    const category = router.pathname.split('/')[1];
    const config = {
      url: `/${category}/form`,
      method: 'POST',
      data: { ...data, date },
    };
    if (category === 'equipments') {
      config.url = `/equipments/form/${rentalType}`;
    }
    await apiController(config);
    setShowModal(true);
  };

  useEffect(() => {
    const { date, type } = router.query;
    setDate(date as string);
    setRentalType(type as string);
  }, [router]);

  return (
    <FormProvider {...methods}>
      <form
        action='#'
        method='POST'
        onSubmit={methods.handleSubmit(onSubmit)}
        className='mx-auto my-10 max-w-xl'
      >
        {children}
        {!router.pathname.includes('/my-checkin') && <FormSubmitButton />}
      </form>
    </FormProvider>
  );
}
