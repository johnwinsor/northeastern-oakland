'use client';
import { Flex, Button, DropdownMenu } from '@radix-ui/themes';
import { FaRegCirclePlay } from "react-icons/fa6";
import Link from 'next/link';

export default function Subjects() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
            <Button className='bg-slate-700 text-xs md:text-base text-nowrap' variant="solid" highContrast>
                Choose Subject
                <FaRegCirclePlay width="12" height="12" />
            </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft" color="indigo">
                <DropdownMenu.Item><Link href="/newbooks/Art">Art</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Biology">Biology</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Business">Business</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Chemistry">Chemistry</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Communications">Communications</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Computer Science ">Computer Science </Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Cooking">Cooking</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Dance">Dance</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Education">Education</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/English Language Studies">English Language Studies</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Ethnic Studies">Ethnic Studies</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Fiction">Fiction</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Game Design">Game Design</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/General">General</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/General Science">General Science</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Health Sciences">Health Sciences</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/History">History</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Juvenile">Juvenile</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Music">Music</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Philosophy">Philosophy</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Poetry">Poetry</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Political Science">Political Science</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Psychology">Psychology</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Public Policy">Public Policy</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Sociology">Sociology</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/WGSS">WGSS</Link></DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}