'use client';

import { Nunito } from 'next/font/google';
import LoginModal from './ui/modals/login';
import { Button, useDisclosure } from '@nextui-org/react';
import RegisterModal from './ui/modals/register';
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

export default function Page() {
  const {isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin} = useDisclosure();
  const {isOpen: isOpenRegister, onOpen: onOpenRegister, onOpenChange: onOpenChangeRegister} = useDisclosure();

  return (
    <main className={`${nunito.className} flex min-h-screen flex-col justify-center items-center p-6`}>
      <LoginModal isOpen={isOpenLogin} onOpen={onOpenLogin} onOpenChange={onOpenChangeLogin}/>
      <RegisterModal isOpen={isOpenRegister} onOpen={onOpenRegister} onOpenChange={onOpenChangeRegister}/>
      <div className='flex flex-col gap-2  w-1/4'>
        <p className='text-3xl mb-2'>Welcome to the MIDAS dashboard</p>

        <Button onPress={onOpenLogin} className='w-full' variant='flat' color='success'>
          <p className='text-2xl'>Login</p>
        </Button>

        <Button onPress={onOpenRegister} className='w-full' variant='flat' color='primary'>
          <p className='text-2xl'>Register</p>
        </Button>

        <Button className='w-full' variant='flat' color='secondary'>
          <p className='text-2xl'>Support</p>
        </Button>
        
      </div>
    </main>
  );
}
