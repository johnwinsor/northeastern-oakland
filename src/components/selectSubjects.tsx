'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export default function SelectSubjects({ subjformdata }: {subjformdata: any}, props: any) {
  const sortedSubjects = subjformdata.sort();
  
  const router = useRouter();
  let library = ''

  const pathname = usePathname()
  const path = decodeURI(pathname)
  // console.log(path)
  const regex = /\/newbooks\/(.*?)(\/|$)/g;
  const found = pathname.match(regex);
  if (found && found[0]) {
    // console.log(found[0])
    library = decodeURI(found[0].replace(/\/$/, ""));
    // console.log(library)
  } else {library = '/newbooks/Global Campus'}

  // console.log(library)

  const Subjects = () => {
    const subjects = sortedSubjects.map((subject: any, index: any)=>
      <option key={index} value={`${library}/${subject}`}>{subject}</option>)
    return <select name="selectedSubject" defaultValue={path} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' onChange={(e) => {router.push(e.target.value); }}><option value=''>Select Subject</option>{subjects}</select>
  }



  return (
    <div>
      <Subjects />
    </div>
  );
}