import type { Dispatch, FormEvent, ReactElement, ReactNode, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormSubmitButton from '../common/FormSubmitButton';

interface FormWrapperProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function FormWrapper({ setShowModal, children }: FormWrapperProps): ReactElement {
  // const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   setShowModal(true);
  // };
  const methods = useForm();
  const onSubmit = (data) => console.log(data);
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
