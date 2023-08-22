import StatusBoard from '@/components/status/StatusBoard';
import { type ReactElement, useState } from 'react';

export default function MyCheckIn(): ReactElement {
  const [selectFormInfo, setSelectFormInfo] = useState({});

  return (
    <div>
      <StatusBoard setSelectFormInfo={setSelectFormInfo} />
    </div>
  );
}
