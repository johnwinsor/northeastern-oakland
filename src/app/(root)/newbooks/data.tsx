'use client';
import Carousel from '@/components/newbooksCarousel';
import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes';
import * as HoverCard from '@radix-ui/react-hover-card';

export default function Home({ data }: {data: any}) {
  return (
    <Flex direction="column" gap="1" className="text-slate-50 h-[calc(100vh-242px)]">
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
                return (
                    // <Flex gap="6" grow="1" direction="column" className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_20%]" key={i}>
                    <Flex gap="2" grow="1" direction="column" className="flex-[0_0_100%] sm:flex-[0_0_33%] md:flex-[0_0_20%]" key={i}>
                        <Flex grow="1" className="relative justify-center">
                            <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                                        <Image
                                            src={src.coverurl}
                                            fill={true}
                                            className="object-contain p-0 md:p-3"
                                            alt="alt"
                                            loading="lazy"
                                            sizes="(min-width: 60em) 24vw,
                                                    (min-width: 28em) 45vw,
                                                    100vw"
                                        />
                                    </div>
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                    <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                                        <div><p>{src.summary}</p></div>
                                        <HoverCard.Arrow className="HoverCardArrow" />
                                    </HoverCard.Content>
                                </HoverCard.Portal>
                            </HoverCard.Root>
                        </Flex>
                        <Flex className="justify-center pb-2">
                            <Flex direction="column" className="justify-center text-slate-700">
                                <Text as="p" className="text-sm md:text-md lg-text-xl text-center">{splitTitle[0]}</Text>
                                <Text as="p" className="text-xs md:text-sm lg-text-lg text-center">{src.author}</Text>
                                <Text as="p" className="text-xs md:text-sm lg-text-lg text-center">{callnoStatus}</Text>
                                <Text as="p" className="text-xs md:text-sm lg-text-lg text-center">Received: {src.recDate}</Text>
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