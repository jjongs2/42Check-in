import EquipmentsForm from '@/components/form/EquipmentsForm';
import PresentationsForm from '@/components/form/PresentationsForm';
import VisitorsForm from '@/components/form/VisitorsForm';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect, useState } from 'react';

export default function FormDetail(): ReactElement {
  const [formBox, setFormBox] = useState<ReactElement>();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const data = router.query;
    switch (data.category) {
      case 'visitors':
        setFormBox(<VisitorsForm formInfo={data.formDetail} />);
        break;
      case 'presentations':
        setFormBox(<PresentationsForm formInfo={data.formDetail} />);
        break;
      case 'equipments':
        setFormBox(<EquipmentsForm formInfo={data.formDetail} />);
        break;
    }
  }, []);

  return <div>{formBox}</div>;
}
