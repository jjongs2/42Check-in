import VisitorsForm from '@/components/form/VisitorsForm';
import OkModal from '@/components/modal/OkModal';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function Visitors(): ReactElement {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <VisitorsForm setShowModal={setShowModal} />
      {showModal && <OkModal />}
    </>
  );
}
