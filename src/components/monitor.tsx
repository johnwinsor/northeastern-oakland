'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '@/components/css/monitor.css';

export const EmblaCarousel = ({ data }: {data: any}) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 }),])
    return (
            <div className="parentgrid">
                <Flex direction="column" className="p-5 text-slate-50" id="item-0">
                    <Text as="p" className="text-center text-2xl">New Arrivals</Text>
                </Flex>
                <div className='overflow-hidden' ref={emblaRef} id="item-1">
                    
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
                                    <div className="embla__slide justify-center justify-items-center" key={index}>

                                            <div id="image" className="relative rounded-lg h-full p-2 bg-slate-50 max-w-fit">
                                                <Image
                                                    src={slide.coverurl}
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    alt='cover image'
                                                    className='boxshadow w-auto h-full max-w-fit'
                                                />
                                            </div>
                                            <Flex grow="1" direction="column" id="bib" className="justify-center text-center m-auto">
                                                <Text as="p" className="text-center text-2xl text-slate-50 line-clamp-2 max-w-lg">{ splitTitle }</Text>
                                                <Text as="p" className="text-center text-md text-slate-50">{authorArray[1]} {authorArray[0]}</Text>
                                                <Text as="p" className="text-xs md:text-sm lg-text-lg text-center text-slate-50">{callnoStatus}</Text>
                                                <Text as="p" className="text-xs md:text-sm lg-text-lg text-center text-slate-50">Received: {slide.recDate}</Text>
                                            </Flex>

                                        
                                    </div>
                                );
                            })}

                    </div>
                </div>
            </div>
    );
}