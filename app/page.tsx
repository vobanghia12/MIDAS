'use client';

import { Nunito } from 'next/font/google';
import LoginModal from './ui/modals/login';
import { Button, useDisclosure } from '@nextui-org/react';
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

export default function Page() {
  const {isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin} = useDisclosure();

  return (
    <main className={`${nunito.className} flex min-h-screen flex-col justify-center items-center p-6`}>
      <LoginModal isOpen={isOpenLogin} onOpen={onOpenLogin} onOpenChange={onOpenChangeLogin}/>
      <div className='flex flex-col gap-2  w-1/4'>
        <p className='text-3xl mb-2'>Welcome to the MIDAS dashboard</p>

        <Button onPress={onOpenLogin} className='w-full' variant='flat' color='success'>
          <p className='text-2xl'>Login</p>
        </Button>

        <Button className='w-full' variant='flat' color='secondary'>
          <p className='text-2xl'>Support</p>
        </Button>
        
      </div>
    </main>
  );
}
