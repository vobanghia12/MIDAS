'use client';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function ConfirmSignoutModal({
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

  const handleLogout = () => {
    signOut({callbackUrl: '/'});
  }

  return (
    <Modal className={nunito.className} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Sign Out?
            </ModalHeader>

            <ModalBody>
              <div className='flex justify-center'>
                <Button onPress={handleLogout} className='w-full' color='success' variant='light'>
                  Confirm 
                </Button>
                
                <Button className='w-full' color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </div>
              
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}