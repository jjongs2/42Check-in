import StatusBoard from '@/components/status/StatusBoard';
import React from 'react';
import type { ReactElement } from 'react';

export default function MyCheckin(): ReactElement {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <StatusBoard />
    </div>
  );
}
