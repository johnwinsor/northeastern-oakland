import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Flex } from '@radix-ui/themes'
import olinLogo from '../../public/oaklandLibrary.png'
import '../app/globals.css'
import { Hours } from "@/components/hours";
import Navbar from "@/components/navbar";

export default function Header() {
  return (
    <Flex direction="column" className="rounded-b-md h-40 bg-teal-50 px-5 justify-end">
        <Flex gap="1" direction="column" justify="between">
          <Flex justify="between" pt="1">
            <Flex align="center" className="pl-3">
              <Link href={'/'}>
                  <Image
                      src={olinLogo}
                      alt="Northeastern Oakland Library Logo"
                      height={90}
                      className="pb-3"
                  />
              </Link>
            </Flex>
            <Hours />
          </Flex>
          <Navbar />
        </Flex>
    </Flex>
  )
}