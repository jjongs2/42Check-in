import StatusBoard from '@/components/status/StatusBoard';
import { type ReactElement, useState } from 'react';

export default function MyCheckIn(): ReactElement {
  const [selectFormId, setSelectFormId] = useState(-1);
  const [category, setCategory] = useState(0);
  return (
    <div>
      <StatusBoard setSelectFormId={setSelectFormId} setCategory={setCategory} />
    </div>
  );
}
