import EquipmentsForm from '@/components/form/EquipmentsForm';
import PresentationsForm from '@/components/form/PresentationsForm';
import VisitorsForm from '@/components/form/VisitorsForm';
import StatusBoard from '@/components/status/StatusBoard';
import type FormInfo from '@/interfaces/FormInfo';
import React, { type ReactElement, useEffect, useState } from 'react';

export default function MyCheckin(): ReactElement {
  const [selectFormInfo, setSelectFormInfo] = useState<FormInfo>();
  const [selectCategory, setSelectCategory] = useState('visitors');
  const [formBox, setFormBox] = useState<ReactElement>();

  useEffect(() => {
    if (selectFormInfo !== undefined) {
      switch (selectCategory) {
        case 'visitors':
          setFormBox(<VisitorsForm formInfo={selectFormInfo} />);
          break;
        case 'presentations':
          setFormBox(<PresentationsForm formInfo={selectFormInfo} />);
          break;
        case 'equipments':
          setFormBox(<EquipmentsForm formInfo={selectFormInfo} />);
          break;
      }
    }
  }, [selectCategory, selectFormInfo]);

  return (
    <div>
      <StatusBoard setSelectFormInfo={setSelectFormInfo} setSelectCategory={setSelectCategory} />
      <div>{formBox}</div>
    </div>
  );
}
