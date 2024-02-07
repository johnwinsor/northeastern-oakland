'use client';

import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react'

export default function SelectSubjects() {
  const router = useRouter();

  return (
    <div>
      <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        onChange={(e) => {
            router.push(e.target.value);
        }}
      >
        <option value=''>Select Subject</option>
        <option value='Art'>Art</option>
        <option value='Biology'>Biology</option>
        <option value='Business'>Business</option>
        <option value='Chemistry'>Chemistry</option>
        <option value='Communications'>Communications</option>
        <option value='Computer Science'>Computer Science</option>
        <option value='Cooking'>Cooking</option>
        <option value='Dance'>Dance</option>
        <option value='Education'>Education</option>
        <option value='English Language Studies'>English Language Studies</option>
        <option value='Ethnic Studies'>Ethnic Studies</option>
        <option value='Fiction'>Fiction</option>
        <option value='Game Design'>Game Design</option>
        <option value='General'>General</option>
        <option value='General Science'>General Science</option>
        <option value='Health Sciences'>Health Sciences</option>
        <option value='History'>History</option>
        <option value='Juvenile'>Juvenile</option>
        <option value='Music'>Music</option>
        <option value='Philosophy'>Philosophy</option>
        <option value='Poetry'>Poetry</option>
        <option value='Political Science'>Political Science</option>
        <option value='Psychology'>Psychology</option>
        <option value='Public Policy'>Public Policy</option>
        <option value='Sociology'>Sociology</option>
        <option value='WGSS'>WGSS</option>
      </select>
    </div>
  );
}