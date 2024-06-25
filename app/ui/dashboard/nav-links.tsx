'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  UserIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Input, Textarea } from '@nextui-org/react';
import path from 'path';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '@/app/context/nav-search-context';
import useFileModal from '@/hooks/useFileModal';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'School', 
    href: '/dashboard/school',
    icon: HomeIcon },

  { name: 'Grade', 
    href: '/dashboard/grade' ,
    icon: AcademicCapIcon 
  },
  
  { name: 'Classroom', 
    href: '/dashboard/classroom', 
    icon: UserGroupIcon 
  },

  { name: 'Student',
    href: '/dashboard/student',
    icon: UserIcon,
  },
  { 
    name: 'Upload', 
    href: '', 
    icon: ArrowUpTrayIcon 
  },
];

const NavSearchBox: React.FC<{ href: string }> = ({ href }) => {
  const pathname = usePathname();
  

  console.log("HREF: " + href)
  const placeholders = {
    '/dashboard/school': "Enter school ID",
    '/dashboard/grade': "Enter grade level",
    '/dashboard/classroom': "Enter classroom ID",
    '/dashboard/student': "Enter student ID"
  }

  const formNames = {
    '/dashboard/school': "schoolId",
    '/dashboard/grade': "gradeId",
    '/dashboard/classroom': "classroomId",
    '/dashboard/student': "studentId"
  }

  const {
    school,
    grade,
    classroom,
    student
  } = useContext(SearchContext);
  
  // const sidenavContext = useContext(SidenavSearchContext);
    
  const SearchAction = async (formData: FormData) => {
    console.log("Searching...")
    if (href === '/dashboard/school') {
      const id = formData.get('schoolId') || ""
      school[1](id.toString())
      console.log("Searched school " + id)
    }
    else if (href === '/dashboard/grade') {
      const id = formData.get('gradeId') || ""
      grade[1](id.toString())
      console.log("Searched grade " + id)
    }
    else if (href === '/dashboard/classroom') {
      const id = formData.get('classroomId') || ""
      classroom[1](id.toString())
      console.log("Searched classroom " + id)
    }
    else {
      const id = formData.get('studentId') || ""
      student[1](id.toString())
      console.log("Searched student " + student[0])
    }
  }
  
  if (pathname === href) {
    return (
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        const formData = new FormData(e.target as HTMLFormElement);
        SearchAction(formData); 
      }}>
        <Input
          type='text' 
          variant='bordered'
          name={formNames[pathname as keyof typeof formNames]}
          placeholder={placeholders[pathname as keyof typeof placeholders]}
          className="max-md:hidden h-8 mb-4"
        />
      </form>
    )
  }

  return null;
}


export default function NavLinks({
  collapsed
}: {
  collapsed: boolean;
}) {

  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const value = { selectedSchool, setSelectedSchool };

  const pathname = usePathname();
  const fileModal = useFileModal();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (link.href) {
        return (
          <div>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  'bg-green-100 text-green-600': pathname === link.href,
                }
              )}
            >
              {/* <LinkIcon className={clsx({'w-6' : !collapsed, 'w-9' : collapsed})}/> */}
              <LinkIcon className='w-6'></LinkIcon>
              {!collapsed ? <p className="hidden md:block">{link.name}</p> : <></>}
            </Link>
            {!collapsed ? <NavSearchBox href={link.href} /> : null}
          </div>
        );
      }
      else {
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
            {!collapsed ? <p className="hidden md:block">{link.name}</p> : <></>}
          </button>
        );
      }
      })}
    </>
  );
}
