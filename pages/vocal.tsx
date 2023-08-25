import StatusBoard from '@/components/status/StatusBoard';
import { type ReactElement, useState } from 'react';

export default function Vocal(): ReactElement {
  const [selectFormInfo, setSelectFormInfo] = useState({});
  return (
    <div>
      <StatusBoard setSelectFormInfo={setSelectFormInfo} vocal />
      {console.log('너들어왔니??')}
    </div>
  );
}
