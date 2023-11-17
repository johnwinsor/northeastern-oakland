import Carousel from '@/components/EmblaCarousel';
import Image from 'next/image'
import './EmblaCarousel.css';
import { Flex, Text, Heading } from '@radix-ui/themes';

function shuffle(a: any) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j]; 
            a[j] = x;
        }
    return a;
}

export default async function Monitor({ params }: { params: { id: string } }) {
    const res = await fetch(
        'https://library.mills.edu/data.json',
        { cache: 'no-store' },
    );
  const data = await res.json()
  const shuffled = shuffle(data)

  return (
    <Flex direction="column" gap="3" className="text-slate-50 h-full">
        <Flex className="h-12">
            <Text size="9">New Arrivals</Text>
        </Flex>
        <Flex>
            <Carousel loop>
                {shuffled.map((src:any, i:any) => {
                let callnoStatus = src.callNo.replace(/Unknown/g, "In Processing");
                if (src.location == "On order") {
                    callnoStatus = "In Processing";
                }
                if (src.location != "On order") {
                    callnoStatus = src.location + ": " + callnoStatus
                }
                return (
                    <Flex direction="column" className="w-auto h-full flex-[0_0_100%]" key={i}>
                        <Flex className="h-4/5 relative">
                            <Image
                                src={src.coverurl}
                                fill={true}
                                // width="400"
                                // height="400"
                                className="mx-auto object-contain"
                                alt="alt"
                            />
                        </Flex>
                        <Flex direction="column">
                            <Heading size="9">{src.title}</Heading>
                            <Text as="p" className="text-center">{src.author}</Text>
                            <Text as="p" className="text-center">{callnoStatus}</Text>
                            <Text as="p" className="text-center">Received: {src.recDate}</Text>
                        </Flex>
                    </Flex>
                );
                })}
            </Carousel>
        </Flex>
    </Flex>
  );
}