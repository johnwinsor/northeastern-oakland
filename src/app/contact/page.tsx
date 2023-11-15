import Link from 'next/link'
import { Card, Flex, Heading, Text, Separator} from '@radix-ui/themes'
import { ChatBubbleIcon, IdCardIcon, QuestionMarkCircledIcon, PersonIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { FaPeopleArrows, FaMapMarkedAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai"
import { ExternalLinkIcon } from '@radix-ui/react-icons'

export default function Contact() {
    return (
        <Flex direction="column" align="center" p="4">
            <Flex direction="column" pb="4">
                <Heading size="8" className='py-5'>Contact Us</Heading>
            </Flex>
          
            <Flex gap="4" justify="center">
                <Card className="rounded-md shadow-xl p-1 bg-orange-100 mb-5 w-56 md:w-2/4">
                    <FaPeopleArrows size="36px" className="text-red-900 float-left mr-4" />
                    <Text as="p" size={{ initial: '2', md: '3' }}>Reference librarians are available every weekday to help you with your research or with other library questions! Make an appointment with a reference librarian <a href="/appointments/">here.<ExternalLinkIcon className="ml-0.5 inline-block" /></a></Text>
                </Card>
            </Flex>
          
            <Flex gap="4" wrap="wrap" justify="center">
                <Card className="bg-white rounded-lg shadow-xl p-1 md:p-4">
                    <Flex gap="1" direction="column">
                        <Flex gap="1">
                            <FaMapMarkedAlt size="24px" className="text-red-900 float-left mr-2" />
                            <Heading size={{ initial: '3', md: '5' }}>
                                Where to Find Us
                            </Heading>
                        </Flex>
                        <Separator size="4" />

                        <Flex pt="1">
                            <Flex align="center" gap="2">
                                <EnvelopeClosedIcon />
                                <Text size={{ initial: '2', md: '3' }}><a href="mailto:askalibmills@northeastern.libanswers.com">askalibmills@northeastern.libanswers.com</a></Text>
                            </Flex>
                        </Flex>
           
                        <Flex pt="1">
                            <Flex align="center" gap="2">
                                <AiOutlinePhone />
                                <Text size={{ initial: '2', md: '3' }}>Reference: 510-430-2385</Text>
                            </Flex>
                        </Flex>

                        <Flex pt="1">
                            <Flex align="center" gap="2">
                                <AiOutlinePhone className="text-lime-500" />
                                <Text size={{ initial: '2', md: '3' }}>Circulation: 510-430-2196</Text>
                            </Flex>
                        </Flex>

                        <Flex pt="1">
                            <Flex align="center" gap="2">
                                <AiOutlinePhone className="text-red-900" />
                                <Text size={{ initial: '2', md: '3' }}>Special Collections: 510-430-2047</Text>
                            </Flex>
                        </Flex>
                        <Separator size="4" />
                    </Flex>
                </Card>
                <Card className="bg-white rounded-lg shadow-xl p-1 md:p-4">
                    <Flex gap="1" direction="column">
                        <Flex gap="1">
                            <IoInformationCircleOutline size="24px" className="text-red-900 float-left mr-2" />
                            <Heading size={{ initial: '3', md: '5' }}>
                                More Information
                            </Heading>
                        </Flex>
                        <Separator size="4" />

                        <Link 
                            href={'/chat'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <ChatBubbleIcon />
                                    <Text size={{ initial: '2', md: '3' }}>Live 24/7 Chat</Text>
                                </Flex>
                            </Flex>
                        </Link>

                        <Link 
                            target="_blank"
                            href={'https://library.northeastern.edu/administration/library-staff-directory/?ul_filter_department=F.%20W.%20Olin%20Library'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <IdCardIcon />
                                    <Text size={{ initial: '2', md: '3' }}>Library Staff Directory</Text>
                                    <ExternalLinkIcon className="mt-0.5 ml-0.5" />
                                </Flex>
                            </Flex>
                        </Link>

                        <Link 
                            target="_blank"
                            href={'https://library.northeastern.edu/research_instruction/ask-a-librarian/email-the-library/'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <QuestionMarkCircledIcon />
                                    <Text size={{ initial: '2', md: '3' }}>Questions & Feedback</Text>
                                    <ExternalLinkIcon className="mt-0.5 ml-0.5" />
                                </Flex>
                            </Flex>
                        </Link>

                        <Link 
                            href={'/liaisons'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <PersonIcon />
                                    <Text size={{ initial: '2', md: '3' }}>Departmental Liaisons</Text>
                                </Flex>
                            </Flex>
                        </Link>

                        <Separator size="4" />

                    </Flex>
                </Card>
            </Flex>
        </Flex>
    )
  }