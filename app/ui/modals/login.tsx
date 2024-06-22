'use client';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


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
  const  [ incorrectLogin, setIncorrectLogin ] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in");
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    });

    if (!response?.error) {
      router.push('/dashboard/school');
      router.refresh();
      setIncorrectLogin(false);
    }
    else {
      setIncorrectLogin(true);
    }
  };
  return (
    <Modal className={nunito.className} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Login
            </ModalHeader>

            <ModalBody>
              <div className='flex flex-col justify-center'>
                {incorrectLogin && <p className='text-red-500'>Username or password was incorrect.</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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