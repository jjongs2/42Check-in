import EquipmentsForm from '@/components/form/EquipmentsForm';
import OkModal from '@/components/modal/OkModal';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function Form(): ReactElement {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <EquipmentsForm setShowModal={setShowModal} />
      {showModal && <OkModal />}
    </>
  );
}
