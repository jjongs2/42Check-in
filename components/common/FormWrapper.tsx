import apiController from '@/utils/apiController';
import getCategory from '@/utils/getCategory';
import { useRouter } from 'next/router';
import {
  type Dispatch,
  type FormEvent,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormSubmitButton from '../common/FormSubmitButton';

interface FormWrapperProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function FormWrapper({ setShowModal, children }: FormWrapperProps): ReactElement {
  const methods = useForm();
  const route = useRouter();
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!route.isReady) return;
    setCategory(getCategory(route.asPath));
  }, [route.asPath, route.isReady]);

  const onSubmit = async (data: any): Promise<void> => {
    console.log(data);
    const config = {
      url: `/${category}/form`,
      methods: 'POST',
      data,
    };
    await apiController(config);
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
