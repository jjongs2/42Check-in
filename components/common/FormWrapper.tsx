import apiController from '@/utils/apiController';
import { useRouter } from 'next/router';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormSubmitButton from '../common/FormSubmitButton';

interface FormWrapperProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function FormWrapper({ setShowModal, children }: FormWrapperProps): ReactElement {
  const methods = useForm();
  const { pathname } = useRouter();
  const category = pathname.split('/')[1];

  const onSubmit = async (data: any): Promise<void> => {
    const config = {
      url: `/${category}/form`,
      method: 'POST',
      data,
    };
    await apiController(config);
    setShowModal(true);
  };

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
