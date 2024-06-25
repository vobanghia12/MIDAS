'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import MidasLogoNoText from '@/app/ui/midas-logo-no-text';
import { PowerIcon } from '@heroicons/react/24/outline';
import ConfirmSignoutModal from '../modals/confirm-signout';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import clsx from 'clsx';
import useFileModal from '@/hooks/useFileModal';

export default function SideNav() {
  const {isOpen: isOpenSignout, onOpen: onOpenSignout, onOpenChange: onOpenChangeSignout} = useDisclosure();
  const [ collapsed, setCollapsed] = useState(false);
  
  const arrows = {
    'left' : <>&larr;</>,
    'right': <>&rarr;</>
  }

  return (
    <div className={clsx("flex h-full flex-col px-3 py-4 md:px-2 max-sm:w-fit",
      {
        'w-16' : collapsed,
        'w-48' : !collapsed
      },
    )}>
      <ConfirmSignoutModal isOpen={isOpenSignout} onOpen={onOpenSignout} onOpenChange={onOpenChangeSignout}/>
      <div
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-gray-50 max-md:hidden md:h-24"
      >
        <div className="w-32 text-white md:w-40 max-md:hidden">
          <MidasLogoNoText />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 max-sm:w-fit">
        <NavLinks collapsed={collapsed}/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <button className='bg-gray-50 rounded-md max-md:hidden' onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? <p className='text-3xl'>{arrows.left}</p> : <p className='text-3xl'>{arrows.right}</p>}
          </button>
          
          <button onSubmit={onOpenSignout} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-2">
            <PowerIcon className="w-8" />
            {!collapsed ? <div className="hidden md:block">Sign Out</div> : <></>}
          </button>
      </div>
    </div>
  );
}
