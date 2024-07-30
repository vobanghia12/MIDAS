'use client';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from './button';
import { CameraIcon } from '@radix-ui/react-icons';
import { error } from 'console';
import useEmailModal from '@/hooks/useEmailModal';

const CaptureScreenshotButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailModal = useEmailModal();
  const onClick = (img: string) => {
    emailModal.setImage(img);
    return emailModal.onOpen();
  };
  const handleCaptureClick = async () => {
    setLoading(true);
    setError(null);
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            }),
        ),
    );
    html2canvas(document.body, {
      imageTimeout: 0,
      foreignObjectRendering: true,
      useCORS: true,
      allowTaint: true,
      scale: 2, // Improve resolution
      logging: true, // For debugging
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        setLoading(false);
        const content = imgData.split(',')[1];
        onClick(content);
      })
      .catch((err) => {
        console.error('Error capturing screenshot:', err);
        setError('Failed to capture screenshot. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="z-5 absolute bottom-10 right-10">
      <Button
        onClick={handleCaptureClick}
        disabled={loading}
        className="hover:opacity-2"
      >
        {loading ? (
          'Capturing...'
        ) : (
          <div className="flex items-center justify-center">
            {/* <p className=" font-semibold">Screenshot</p> */}
            <CameraIcon width={25} height={25} className=" font-bold" />
          </div>
        )}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CaptureScreenshotButton;
