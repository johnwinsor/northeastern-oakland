'use client';
import React from 'react'
import Image from 'next/image'
import { Flex, Text, Heading } from '@radix-ui/themes';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '@/components/css/monitor.css';

export const EmblaCarousel = ({ data }: {data: any}) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    return (
        <div>
            <Flex direction="column" className="p-5 text-slate-50">
                <Text as="p" className="text-center text-2xl">New Arrivals</Text>
            </Flex>
            <div className='overflow-hidden' ref={emblaRef}>
                
                <div className="embla__container">
                        {data.map((slide: any, index: any) => {
                            let callnoStatus = slide.callNo.replace(/Unknown/g, "In Processing");
                            if (slide.location == "On order") {
                                callnoStatus = "In Processing";
                            }
                            if (slide.location != "On order") {
                                callnoStatus = slide.location + ": " + callnoStatus
                            }
                            const splitTitle = slide.title.split(":")
                            const authorArray = slide.author.split(",")
                            return (
                                
                                <div className="embla__slide justify-center" key={index}>
                                    <Flex direction="column" className="items-center">
                                        <Image
                                            src={slide.coverurl}
                                            width={400}
                                            height={400}
                                            alt='cover image'
                                            className='boxshadow rounded-lg p-2 bg-slate-50 h-auto'
                                            loading="lazy"
                                        />
                                        <Flex direction="column" className="p-5 text-slate-50 items-center">
                                            <Text as="p" className="text-center text-2xl">{ splitTitle }</Text>
                                            <Text as="p" className="text-center text-lg">{authorArray[1]} {authorArray[0]}</Text>
                                            <Text as="p" className="text-xs md:text-sm lg-text-lg text-center">{callnoStatus}</Text>
                                            <Text as="p" className="text-xs md:text-sm lg-text-lg text-center">Received: {slide.recDate}</Text>
                                        </Flex>
                                    </Flex>
                                    
                                </div>
                            );
                        })}

                </div>
            </div>
        </div>
    );
}