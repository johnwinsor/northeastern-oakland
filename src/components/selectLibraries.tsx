'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export default function SelectLibraries() {
    let library = ''
    const router = useRouter();
    const pathname = usePathname()
    // console.log(pathname)

    const regex = /\/newbooks\/(.*?)\/(.*?)(\/|$)/g;
    const found = pathname.match(regex);
    // console.log(found)

    if (found) {
        library = pathname.replace(/(.*)\/.*$/, '$1');
    } else {library = pathname}
    // console.log(library)

    return (
        <div>
            <select 
                name='selectedLibrary'
                defaultValue={library}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={(e) => {
                    router.push(e.target.value);
                }}
            >
                <option value=''>Select Library</option>
                <option value='/newbooks/all'>Global Campus</option>
                <option value='/newbooks/F.W.%20Olin%20Library'>F.W. Olin Library</option>
                <option value='/newbooks/School of Law Library'>School of Law Library</option>
                <option value='/newbooks/Snell%20Library'>Snell Library</option>
            </select>
        </div>
    )
}