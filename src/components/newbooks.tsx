'use client';
import React from 'react';
import Image from 'next/image'
import { Flex, Text, Heading } from '@radix-ui/themes';
import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '@/components/css/newbooks.css';

export const Newbooks = ({ data }: {data: any}) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false }),])
    return (
        <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
            <Flex direction="column" className="h-12 p-5 text-slate-700">
                <Text as="p" className="text-center text-2xl">New Arrivals</Text>
            </Flex>
            <Flex grow="1" className="pt-5">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container h-full">
                        {data.map((src: any, i: any) => {
                            let callnoStatus = src.callNo.replace(/Unknown/g, "In Processing");
                            if (src.location == "On order") {
                                callnoStatus = "In Processing";
                            }
                            if (src.location != "On order") {
                                callnoStatus = src.location + ": " + callnoStatus
                            }
                            let callno = callnoStatus.replace(/ - 2nd Floor/g, "");
                            const callnoDisplay = callno.replace(/Fiction: /g, "");
                            const splitTitle = src.title.split(":")
                            const authorArray = src.author.split(",")
                            return (
                                <Flex justify="center" gap="2" grow="1" direction="column" className="embla__slide flex-[0_0_100%] md:flex-[0_0_33%] xl:flex-[0_0_20%] px-2" key={i}>
                                    <Flex justify="center" grow="1">
                                        <HoverCard.Root>
                                            <HoverCard.Trigger asChild>
                                                <div className="relative">
                                                    <Image
                                                        src={src.coverurl}
                                                        width="0"
                                                        height="0"
                                                        sizes="100vw"
                                                        className="ImageTrigger p-2 border-2 border-slate-300 bg-slate-50 h-full w-full"
                                                        alt="alt"
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
                                                <Text size="4" className="text-center line-clamp-1">{splitTitle[0]}</Text>
                                            </a>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">{authorArray[1]} {authorArray[0]}</Text>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">{callnoDisplay}</Text>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">Received: {src.recDate}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            );
                        })}
                    </div>
                </div>
            </Flex>
        </Flex>
    );
}