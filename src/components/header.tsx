import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Flex } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import olinLogo from '../../public/oaklandLibrary.png'
import olinLogoMobile from '../../public/oaklandLibraryMobileCampus.png'
import '../app/globals.css'
import { Hours } from "@/components/hours";
import Navbar from "@/components/navbar";

export default function Header() {
  return (
    <Flex grow="1" direction="column" className="rounded-b-md h-40 bg-teal-50">
        <Flex gap="1" direction="column" justify="between">
          <Flex justify="between" pt="1" pb="2" px={{initial:"2", sm:"5"}}>
            <Flex align="center" className="pl-1 md:pl-3 max-md">
              <Link href={'/'}>
                  <Image
                      src={olinLogo}
                      alt="Northeastern Oakland Library Logo"
                      height={90}
                      className="pb-3 sm:block hidden"
                  />
                  <Image
                      src={olinLogoMobile}
                      alt="Northeastern Oakland Library Logo"
                      height={90}
                      className="pb-3 sm:hidden"
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