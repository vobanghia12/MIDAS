'use client';

import {
  UserGroupIcon,
  HomeIcon,
  AcademicCapIcon,
  UserIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import useFileModal from '@/hooks/useFileModal';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'School', href: '/dashboard/school', icon: HomeIcon },

  { name: 'Grade', href: '/dashboard/grade', icon: AcademicCapIcon },

  { name: 'Classroom', href: '/dashboard/classroom', icon: UserGroupIcon },

  { name: 'Student', href: '/dashboard/student', icon: UserIcon },

  { name: 'Upload', href: '', icon: ArrowUpTrayIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const fileModal = useFileModal();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (link.href) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-green-100 text-green-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else {
          return (
            <button
              key={link.name}
              onClick={fileModal.onOpen}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-green-100 text-green-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </button>
          );
        }
      })}
    </>
  );
}
