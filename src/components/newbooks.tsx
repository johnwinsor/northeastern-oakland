'use client';
import React, { useCallback } from 'react'
import Image from 'next/image'
import { Flex, Text, Container } from '@radix-ui/themes';
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import * as HoverCard from '@radix-ui/react-hover-card';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '@/components/css/newbooks.css';

export const Newbooks = ({ data }: {data: any}, props: any) => {
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false })])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
        }, [emblaApi])
    
    const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])
    
    return (
        <Flex grow="1" className="pt-5">
            <div className="embla m-auto min-w-full">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container h-full grid grid-flow-col auto-cols-100 md:auto-cols-33 xl:auto-cols-20">
                        {data.map((src: any, i: any) => {
                            const library = src.LibraryName;
                            const subject = src.ReportingCode;
                            let callnoStatus = src.PermanentCallNumber.replace(/Unknown/g, "In Processing");
                            if (src.LocationName == "On order") {
                                callnoStatus = "In Processing";
                            }
                            if (src.LocationName != "On order") {
                                callnoStatus = src.LocationName + ": " + callnoStatus
                            }
                            let callno = callnoStatus.replace(/ - 2nd Floor/g, "");
                            let availableDate = "Received: " + src.SortDate
                            const format = src.Format;
                            if (format == "E") {
                                callno = "Ebook";
                                availableDate = "Activated: " + src.TitleCreationDate;
                            }
                            const callnoDisplay = callno.replace(/Non-Fiction:|Fiction:/gi, "");
                            const splitTitle = src.Title.split(":")
                            const cleanTitle = splitTitle[0].replace(/\/$/gi, "");
                            
                            let authorArray: any = {}
                            if (src.Author != null) {
                                let author = src.Author.replace(/author\.|editor\.|publisher\.|;/gi, "");
                                authorArray = author.split(",")
                            }
                            return (
                                <div className="embla__slide px-2" key={i}>
                                    <HoverCard.Root>
                                        <HoverCard.Trigger asChild>
                                            <div className="relative mx-auto" style={{ position: 'relative', width: '250px', height: '350px' }}>
                                                <Image
                                                    src={src.coverurl[0]}
                                                    className="ImageTrigger p-2 border-2 border-slate-300 bg-slate-50"
                                                    alt="alt"
                                                    sizes="500px"
                                                    fill
                                                    style={{
                                                    objectFit: 'contain',
                                                    }}
                                                />
                                            </div>
                                        </HoverCard.Trigger>
                                        <HoverCard.Portal>
                                            <HoverCard.Content className="HoverCardContent text-xs md:text-sm overflow-hidden overflow-y-auto data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all" sideOffset={5} side="left">
                                                <Flex grow="1" direction="column" gap="3">
                                                    <Text color="ruby" className="text-lg">{splitTitle[0]}</Text>
                                                    <Text as="p">{src.summary}</Text>
                                                </Flex>
                                                <HoverCard.Arrow className="HoverCardArrow" />
                                            </HoverCard.Content>
                                        </HoverCard.Portal>
                                    </HoverCard.Root>
                                    <Flex id="bib" className="justify-center py-2">
                                        <Flex grow="1" direction="column" className="justify-center text-slate-700">
                                            <a href={`https://northeastern.alma.exlibrisgroup.com/discovery/fulldisplay?docid=alma${src.mmsId}&context=L&vid=01NEU_INST:NU&tab=default_tab&lang=en`} target="_blank" className="text-center">
                                                <Text size="4" className="text-center line-clamp-2">{cleanTitle}</Text>
                                            </a>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center line-clamp-1">{authorArray[1]} {authorArray[0]}</Text>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">{library}</Text>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">{callnoDisplay}</Text>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">Subject: {subject}</Text>
                                            <Text className="text-xs md:text-sm lg-text-lg text-center">{availableDate}</Text>
                                        </Flex>
                                    </Flex>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Container size="1" pb="2">
                    <Flex justify="between" p="1">
                        <button className="embla__prev text-slate-700" onClick={scrollPrev}>
                            <FaAnglesLeft />
                        </button>
                        <button className="embla__next text-slate-700" onClick={scrollNext}>
                            <FaAnglesRight />
                        </button>
                    </Flex>
                </Container>
            </div>
        </Flex>
    );
}