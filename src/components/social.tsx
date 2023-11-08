import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Social() {
  return (
    <div className="flex flex-col rounded-b-md h-10 pr-5">
        <Flex gap="2" justify="end" className="items-center h-10">
            <div className="myminerva text-slate-100">
                <a href="https://onesearch.library.northeastern.edu/discovery/account?vid=01NEU_INST:NU_Olin&amp;section=overview&amp;lang=en">My Library Account</a>
             </div>
             <Link href="https://www.facebook.com/MillsCollegeLibrary/" target="_blank" rel="noopener noreferrer" title="Facebook">
                <FaFacebook size="22px" className="text-sky-600 bg-white rounded p-0.5 align-middle" />
             </Link>
             <Link href="https://www.instagram.com/f.w.olinlibrary/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <FaInstagram size="22px" className="text-orange-600 bg-white rounded p-0.5 align-middle" />
             </Link>
        </Flex>
    </div>
  )
}