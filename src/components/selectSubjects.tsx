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
        <option value='/newbooks/Art'>Art</option>
        <option value='/newbooks/Biology'>Biology</option>
        <option value='/newbooks/Business'>Business</option>
        <option value='/newbooks/Chemistry'>Chemistry</option>
        <option value='/newbooks/Communications'>Communications</option>
        <option value='/newbooks/Computer Science'>Computer Science</option>
        <option value='/newbooks/Cooking'>Cooking</option>
        <option value='/newbooks/Dance'>Dance</option>
        <option value='/newbooks/Education'>Education</option>
        <option value='/newbooks/English Language Studies'>English Language Studies</option>
        <option value='/newbooks/Ethnic Studies'>Ethnic Studies</option>
        <option value='/newbooks/Fiction'>Fiction</option>
        <option value='/newbooks/Game Design'>Game Design</option>
        <option value='/newbooks/General'>General</option>
        <option value='/newbooks/General Science'>General Science</option>
        <option value='/newbooks/Health Sciences'>Health Sciences</option>
        <option value='/newbooks/History'>History</option>
        <option value='/newbooks/Juvenile'>Juvenile</option>
        <option value='/newbooks/Music'>Music</option>
        <option value='/newbooks/Philosophy'>Philosophy</option>
        <option value='/newbooks/Poetry'>Poetry</option>
        <option value='/newbooks/Political Science'>Political Science</option>
        <option value='/newbooks/Psychology'>Psychology</option>
        <option value='/newbooks/Public Policy'>Public Policy</option>
        <option value='/newbooks/Sociology'>Sociology</option>
        <option value='/newbooks/WGSS'>WGSS</option>
      </select>
    </div>
  );
}