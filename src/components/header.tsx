'use client';
import Image from 'next/image'
import Link from 'next/link'
import { Flex, Heading, Text, Container} from '@radix-ui/themes'
import olinLogo from '../../public/oaklandLibrary.png'
import '../app/globals.css'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export default function Header() {
  return (
    <div className="justify-between p-2 rounded-b-md h-40 bg-teal-50">
        <Flex gap="1" direction="column">
          <Flex justify="between" pt="1">
            <Flex align="center">
              <Link href={'/'}>
                  <Image
                      src={olinLogo}
                      alt="Picture of the author"
                      height={100}
                      className="pb-3"
                  />
              </Link>
            </Flex>
            <ChatBubbleIcon />
          </Flex>
        </Flex>
        <Flex gap="1">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>Library Information</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                <DropdownMenu.Item>Policies and Services</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Puchase requests</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Questions and Feedback</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>Library Information</DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                <DropdownMenu.Item>Policies and Services</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Puchase requests</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Questions and Feedback</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          </Flex>
    </div>
  )
}