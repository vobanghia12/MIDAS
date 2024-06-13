import useSchoolLevel from '@/hooks/useSchoolLevel';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import qs from 'query-string';

export default function StudentSearch() {
  const schoolSearch = useSchoolLevel();
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  useEffect(() => {
    const query = { studentId: debouncedValue };

    const url = qs.stringifyUrl({
      url: '/dashboard/student',
      query: query,
    });

    router.push(url);
  }, [debouncedValue]);
  return (
    <div className="mb-4 w-full rounded-md bg-zinc-100 p-4 md:p-6">
      <label htmlFor="student" className="mb-2 block text-sm font-medium">
        Input Student ID
      </label>
      <div className="relative">
        <input
          type="text"
          id="student"
          name="student"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          placeholder="SCH-08-47531108"
          pattern="[a-zA-Z]*-[0-9]{2}-[0-9]{8}"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
