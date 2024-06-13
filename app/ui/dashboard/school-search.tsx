"use client";

import Link from 'next/link';
import { SchoolField } from '@/app/lib/definitions';
import {
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SchoolSearch({ schools }: { schools: SchoolField[] }) {
    const [selectedSchool, setSelectedSchool] = useState('');

    return (
        <div className="rounded-md w-full bg-zinc-100 p-4 md:p-6">
            <div className="mb-4">
            <label htmlFor="school" className="mb-2 block text-sm font-medium">
                Choose school
            </label>
            <div className="relative">
                <select
                id="school"
                name="school"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                // onChange={e => setSelectedSchool(e.target.value)}
                >
                <option value="" disabled>
                    Select a school
                </option>
                {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                    {school.name}
                    </option>
                ))}
                
                </select>
                <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            </div>
        </div>
    );
}