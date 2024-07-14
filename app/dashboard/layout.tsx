import SideNav from '@/app/ui/dashboard/sidenav';
import CaptureScreenshotButton from '../ui/CaptureScreenshotButton';
import ToasterProvider from '@/providers/ToastProvider';
import { SearchContextProvider } from '../context/nav-search-context-provider';

export default async function Layout({ children }: { children: React.ReactNode}) {

  return (
    <SearchContextProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="">
          <SideNav />
        </div>
        
        <div className="flex-grow p-6 md:overflow-y-auto ">
          <ToasterProvider />
          {children}
        </div>

        <div className='z-10 absolute bottom-0 right-0 opacity-75'>
          <CaptureScreenshotButton />
        </div>
      </div>
    </SearchContextProvider>
  );
}
