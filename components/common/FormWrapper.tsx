import type FormInfo from '@/interfaces/FormInfo';
import apiController from '@/utils/apiController';
import getISODate from '@/utils/getISODate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormSubmitButton from '../common/FormSubmitButton';

interface FormWrapperProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function FormWrapper({ setShowModal, children }: FormWrapperProps): ReactElement {
  const router = useRouter();
  const [rentalType, setRentalType] = useState<string>();

  const onSubmit = async (data: any): Promise<void> => {
    const category = router.pathname.split('/')[1];
    const config = {
      url: `/${category}/form`,
      method: 'POST',
      data,
    };
    if (category === 'equipments') {
      config.url = `/equipments/form/${rentalType}`;
    }
    await apiController(config);
    setShowModal(true);
  };

  useEffect(() => {
    const { type } = router.query;
    setRentalType(type as string);
  }, [router]);

  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto my-10 max-w-xl'>
        {children}
        <FormSubmitButton />
      </form>
    </FormProvider>
  );
}
