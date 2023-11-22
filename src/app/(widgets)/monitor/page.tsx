import Carousel from '@/components/EmblaCarousel';
import Image from 'next/image'
import './monitor.css';
import { Flex, Text, Heading, Card } from '@radix-ui/themes';

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

export default async function Monitor() {
    const res = await fetch(
        'https://library.mills.edu/data.json',
        { cache: 'no-store' },
    );
  const data = await res.json()
  const shuffled = shuffle(data)

  return (
    <Flex direction="column" gap="3" className="text-slate-50">
        <Flex direction="column" className="h-12 p-5">
            <Text as="p" className="text-center text-2xl">New Arrivals</Text>
        </Flex>
        <Flex grow="1">
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
                    <Flex grow="1" direction="column" className="flex-[0_0_100%] pb-5 justify-center" key={i}>
                        <Flex grow="1" className="relative">
                            <Image
                                src={src.coverurl}
                                fill={true}
                                className="mx-auto object-contain"
                                alt="alt"
                            />
                        </Flex>
                        <Flex className="justify-center">
                            <Card className="rounded-md shadow-xl p-1 bg-slate-700 mb-5 w-96">
                                <Flex direction="column" className="justify-center">
                                    <Text as="p" className="text-xl text-center">{src.title}</Text>
                                    <Text as="p" className="text-center">{src.author}</Text>
                                    <Text as="p" className="text-center">{callnoStatus}</Text>
                                    <Text as="p" className="text-center">Received: {src.recDate}</Text>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                );
                })}
            </Carousel>
        </Flex>
    </Flex>
  );
}