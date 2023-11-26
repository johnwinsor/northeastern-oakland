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
        <div className='parent'>
            <Flex direction="column" className="h-12 p-5 text-slate-50">
                <Text as="p" className="text-center text-2xl">New Arrivals</Text>
            </Flex>
            <div className='overflow-hidden py-5' ref={emblaRef}>
                
                <div className="embla__container">
                        {data.map((slide: any, index: any) => (
                            <div className="embla__slide" key={index}>
                                <Image
                                    src={slide.coverurl}
                                    width={200}
                                    height={200}
                                    alt='sample'
                                    className='rounded-lg p-2 border-2 border-slate-300 bg-slate-50 h-auto'
                                    loading="lazy"
                                />
                            </div>
                        ))}

                </div>
            </div>
        </div>
    );
}