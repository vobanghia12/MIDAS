'use client';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";



export default function LoginModal({
  isOpen,
  onOpen,
  onOpenChange,
}:
{
  isOpen: boolean,
  onOpen: any,
  onOpenChange: any,
}) {
  const router = useRouter();

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push('/dashboard/school')
    }
    else {
      console.log("Error routing to dashboard from login")
    }
  }

  return (
    <Modal className={nunito.className} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Login
            </ModalHeader>

            <ModalBody>
              <div className='flex justify-center'>
                <form onSubmit={HandleSubmit} className="flex flex-col gap-4 w-full">
                  <Input label='Username' name='username' required={true}/>
                  <Input label='Password' name='password' type='password' required={true}/>
                  <Button type='submit' color="success" variant="faded">
                    Login
                  </Button>
                </form>
              </div>
              
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}