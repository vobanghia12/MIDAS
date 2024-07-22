'use client';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import useFileModal from "@/hooks/useFileModal";
import useSelectedSchool from "@/hooks/useSelectedSchool";

const schoolNames = [
  'fake_middle',
  'fake_elementary',
  'fake_high'
]

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
  const selectedSchool = useSelectedSchool();

  const [selectedSchoolDropdownItem, setSelectedSchoolDropdownItem] = useState("");
  const [ canSubmit, setCanSubmit ] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await fetch('./api/auth/register', {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        schoolName: selectedSchoolDropdownItem
      }),
    });

    if (response) {
      fileModal.onOpen();
      console.log({response});
    }
    
  };
  
  useEffect(() => {
    if (selectedSchoolDropdownItem !== "") {
      setCanSubmit(true);
      selectedSchool.setName(selectedSchoolDropdownItem)
    }
  }, [selectedSchoolDropdownItem]);

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

                  <Dropdown>
                    <DropdownTrigger className='flex min-w-full'>
                      <Button 
                        variant="bordered" 
                      >
                        {selectedSchoolDropdownItem == "" ? "Select your school" : selectedSchoolDropdownItem} 
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Static Actions">
                      {schoolNames.map((schoolName: string) => {
                        return (

                          <DropdownItem key={schoolName}>
                              <div className="w-full" onClick={() => setSelectedSchoolDropdownItem(schoolName)}>
                                {schoolName}
                              </div>
                          </DropdownItem>

                        );
                      })}

                    </DropdownMenu>
                  </Dropdown>

                  <Button type='submit' color="success" variant="faded" onPress={onClose} isDisabled={!canSubmit}>
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