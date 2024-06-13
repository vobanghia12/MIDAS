'use client';
import EmailModal from '@/app/ui/EmailModal';
import React, { useEffect, useState } from 'react';
import FileModal from '@/app/ui/FileModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <EmailModal />
      <FileModal />
    </>
  );
};

export default ModalProvider;
