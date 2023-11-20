import Carousel from '@/components/newbooksCarousel';
import Image from 'next/image'
import './newbooksCarousel.css';
import { Flex, Text } from '@radix-ui/themes';
import * as HoverCard from '@radix-ui/react-hover-card';

export default async function NewBooks() {
    const res = await fetch(
        'https://library.mills.edu/data.json',
        { cache: 'no-store' },
    );
  const data = await res.json()

  return (
    <Flex direction="column" gap="1" className="text-slate-50 h-[calc(100vh-242px)]">
        <Flex direction="column" className="h-12 p-5 text-slate-700">
            <Text as="p" className="text-center text-2xl">New Arrivals</Text>
        </Flex>
        <Flex grow="1" className="pt-5">
            <Carousel loop>
                {data.map((src:any, i:any) => {
                let callnoStatus = src.callNo.replace(/Unknown/g, "In Processing");
                if (src.location == "On order") {
                    callnoStatus = "In Processing";
                }
                if (src.location != "On order") {
                    callnoStatus = src.location + ": " + callnoStatus
                }
                const splitTitle = src.title.split(":")
                return (
                    <Flex gap="6" grow="1" direction="column" className="flex-[0_0_25%]" key={i}>
                        <Flex grow="1" className="relative">
                            <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                    <Image
                                        src={src.coverurl}
                                        fill={true}
                                        className="mx-auto object-contain"
                                        alt="alt"
                                    />
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                    <HoverCard.Content className="HoverCardContent" sideOffset={5} side="left">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                            {src.summary}
                                        </div>
                                        <HoverCard.Arrow className="HoverCardArrow" />
                                    </HoverCard.Content>
                                </HoverCard.Portal>
                            </HoverCard.Root>
                        </Flex>
                        <Flex className="justify-center">
                            <Flex direction="column" className="justify-center text-slate-700">
                                <Text as="p" className="text-lg text-center">{splitTitle[0]}</Text>
                                <Text as="p" className="text-sm text-center">{src.author}</Text>
                                <Text as="p" className="text-sm text-center">{callnoStatus}</Text>
                                <Text as="p" className="text-sm text-center">Received: {src.recDate}</Text>
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