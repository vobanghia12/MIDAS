import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useEmailModal from '@/hooks/useEmailModal';
import { Button } from './button';
import { EmailFormat } from '@/types';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { postData } from '../lib/helpers';
import { error } from 'console';

const EmailModal = () => {
  const [content, setContent] = React.useState<string>('');
  const [filename, setFilename] = React.useState('');
  const [isLoading, setIsLoading] = useState<boolean>();
  const emailModal = useEmailModal();
  const router = useRouter();
  //handle form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      emailModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const emailFormat: EmailFormat = {
        receiver: values.receiver,
        image: emailModal.image,
        filename: filename,
      };
      //fetch api
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailFormat: {
            receiver: emailFormat.receiver,
            image: emailFormat.image,
          },
        }),
      });
      //handle edge cases
      if (!response.ok) {
        throw new Error('Error in sending screenshot to user email!');
      } else {
        const data = await response.json();
        console.log('Success:', data);
        toast.success('Email sent');
      }
    } catch (error) {
      toast.error('Somthing went wrong');
    } finally {
      router.refresh();
      setIsLoading(false);
      emailModal.onClose();
      reset();
    }
  };

  return (
    <>
      <Modal
        title="Sending an Email"
        description=""
        isOpen={emailModal.isOpen}
        onChange={onChange}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div>
            <div className="pb-2 text-left">To :</div>
            <Input
              type="email"
              className="mt-1"
              id="receiver"
              disabled={isLoading}
              placeholder="Email"
              {...register('receiver', { required: true })}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="font-semibold">
            Send
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EmailModal;
