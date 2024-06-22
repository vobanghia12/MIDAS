import '@/app/ui/global.css';
import { nunito } from './ui/fonts';
import CaptureScreenshotButton from './ui/CaptureScreenshotButton';
import ModalProvider from '@/providers/ModalProvider';
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <ModalProvider />
        <div>{children}</div>
      </body>
    </html>
  );
}
