'use client';
import React from 'react';
import Carousel from '@/components/newbooksCarousel';
import Image from 'next/image'
import { Flex, Text, Heading } from '@radix-ui/themes';
import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';

export default function Home({ data }: {data: any}) {
  return (
    <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
        <Flex direction="column" className="h-12 p-5 text-slate-700">
            <Text as="p" className="text-center text-2xl">New Arrivals</Text>
        </Flex>
        <Flex grow="1" className="pt-5">
            <Carousel loop>
                {data.map((src: any, i: any) => {
                    let callnoStatus = src.callNo.replace(/Unknown/g, "In Processing");
                    if (src.location == "On order") {
                        callnoStatus = "In Processing";
                    }
                    if (src.location != "On order") {
                        callnoStatus = src.location + ": " + callnoStatus
                    }
                    const splitTitle = src.title.split(":")
                    const authorArray = src.author.split(",")
                    return (
                        <Flex justify="center" gap="2" grow="1" direction="column" className="flex-[0_0_100%] md:flex-[0_0_33%] xl:flex-[0_0_20%] px-2" key={i}>
                            <Flex justify="center" grow="1">
                                <HoverCard.Root>
                                    <HoverCard.Trigger asChild>
                                        <div>
                                            <Image
                                                src={src.coverurl}
                                                width={300}
                                                height={200}
                                                className="ImageTrigger p-2 border-2 border-slate-300 bg-slate-50"
                                                alt="alt"
                                                loading="lazy"
                                            />
                                        </div>
                                    </HoverCard.Trigger>
                                    <HoverCard.Portal>
                                        <HoverCard.Content className="HoverCardContent text-xs md:text-sm overflow-hidden overflow-y-auto" sideOffset={5} side="left">
                                            <Flex grow="1" direction="column" gap="3">
                                                <Text color="ruby" className="text-lg">{splitTitle[0]}</Text>
                                                <Text as="p">{src.summary}</Text>
                                            </Flex>
                                            <HoverCard.Arrow className="HoverCardArrow" />
                                        </HoverCard.Content>
                                    </HoverCard.Portal>
                                </HoverCard.Root>
                            </Flex>
                            <Flex className="justify-center pb-2">
                                <Flex grow="1" direction="column" className="justify-center text-slate-700">
                                    <a href={`https://onesearch.library.northeastern.edu/permalink/01NEU_INST/lt8evo/alma${src.mmsId}`} target="_blank" className="text-center">
                                        <Text size="4" className="text-center">{splitTitle[0]}</Text>
                                    </a>
                                    <Text className="text-xs md:text-sm lg-text-lg text-center">{authorArray[1]} {authorArray[0]}</Text>
                                    <Text className="text-xs md:text-sm lg-text-lg text-center">{callnoStatus}</Text>
                                    <Text className="text-xs md:text-sm lg-text-lg text-center">Received: {src.recDate}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    );
                })}
            </Carousel>
        </Flex>
    </Flex>
  );
}