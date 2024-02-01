'use client';
import { Flex, Button, DropdownMenu } from '@radix-ui/themes';
import { FaRegCirclePlay } from "react-icons/fa6";
import Link from 'next/link';

export default function Subjects() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
            <Button className='bg-slate-700' variant="solid" highContrast>
                Choose Subject
                <FaRegCirclePlay width="12" height="12" />
            </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft" color="indigo">
                <DropdownMenu.Item><Link href="/newbooks/Art">Art</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/History">History</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Juvenile">Juvenile</Link></DropdownMenu.Item>
                <DropdownMenu.Item><Link href="/newbooks/Philosophy">Philosophy</Link></DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}