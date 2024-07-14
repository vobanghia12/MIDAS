'use client';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FormEvent } from "react";
import useFileModal from "@/hooks/useFileModal";


export default function RegisterModal({
  isOpen,
  onOpen,
  onOpenChange,
}:
{
  isOpen: boolean,
  onOpen: any,
  onOpenChange: any,
}) {
  
  const fileModal = useFileModal();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('./api/auth/register', {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        schoolName: formData.get("schoolName")
      }),
    });

    fileModal.onOpen();

    console.log({response});
  };

  
  
  return (

    <Modal className={nunito.className} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Register new account
            </ModalHeader>

            <ModalBody>
              <div className='flex justify-center'>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <Input label='Email' name='email' required={true}/>
                  <Input label='Username' name='username' required={true}/>
                  <Input label='Password' name='password' type='password' required={true}/>
                  <Input label='School Name' name='schoolName' required={true}/>
                  <Button type='submit' color="success" variant="faded" onPress={onClose}>
                    Register
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