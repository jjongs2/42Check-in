import PresentationsForm from '@/components/form/PresentationsForm';
import OkModal from '@/components/modal/OkModal';
import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ReactElement } from 'react';

export default function Form(): ReactElement {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <PresentationsForm setShowModal={setShowModal} />
      {showModal && <OkModal />}
    </div>
  );
}
