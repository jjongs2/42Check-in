import apiController from '@/utils/apiController';
import formatDate from '@/utils/formatDate';
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
  const methods = useForm();
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string>();
  const [rentalType, setRentalType] = useState<string>();

  const onSubmit = async (data: any): Promise<void> => {
    const category = router.pathname.split('/')[1];
    const config = {
      url: `/${category}/form`,
      method: 'POST',
      data: { ...data, date: formattedDate },
    };
    if (category === 'equipments') {
      config.url = `/equipments/form/${rentalType}`;
    }
    await apiController(config);
    setShowModal(true);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { date, type } = router.query;
    if (typeof date !== 'string') return;
    setFormattedDate(formatDate(new Date(date)));
    if (typeof type !== 'string') return;
    setRentalType(type);
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
        <FormSubmitButton />
      </form>
    </FormProvider>
  );
}
