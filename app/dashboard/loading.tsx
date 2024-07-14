import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <Spinner color='success'/>
    </div>
  )
}