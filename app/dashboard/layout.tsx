

import SideNav from '@/app/ui/dashboard/sidenav';
import CaptureScreenshotButton from '../ui/CaptureScreenshotButton';
import ToasterProvider from '@/providers/ToastProvider';
import { SessionProvider } from 'next-auth/react';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Layout({ children, pageProps}: { children: React.ReactNode; pageProps: {session: Session, pageProps: any[] }}) {
  // Redirect back to home if not logged in
  // const session = await getServerSession();
  
  // if (!session) {
  //   redirect('/');
  // }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-48">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto ">
        <ToasterProvider />
        {children}
        <CaptureScreenshotButton />
      </div>
    </div>
  );
}
