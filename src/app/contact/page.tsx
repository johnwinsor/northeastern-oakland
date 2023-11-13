import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Container, Flex, Heading, Text, Separator} from '@radix-ui/themes'
import { ChatBubbleIcon, IdCardIcon, QuestionMarkCircledIcon, PersonIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { FaPeopleArrows, FaMapMarkedAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai"

export default function Contact() {
    return (
        <Flex direction="column" align="center">
            <Flex direction="column" pb="4">
                <Heading size="8" className='py-5'>Contact Us</Heading>
            </Flex>
          
            <Flex gap="4">
                <Card className="rounded-md shadow-xl p-1 bg-orange-100 mb-5 w-96">
                    <FaPeopleArrows size="36px" className="text-red-900 float-left mr-4" />
                    <p className="text-md">Reference librarians are available every weekday to help you with your research or with other library questions! Make an appointment with a reference librarian <a href="https://nuoakland.libcal.com/appointments/">here.</a></p>
                </Card>
            </Flex>
          
            <Flex gap="4">
                <Card className="bg-white rounded-lg shadow-xl p-4">
                    <Flex gap="1" direction="column">
                        <Flex gap="1">
                            <FaMapMarkedAlt size="24px" className="text-red-900 float-left mr-2" />
                            <Heading size="5">
                                Where to Find Us
                            </Heading>
                        </Flex>
                        <Separator size="4" />

                        <Flex justify="between" pt="1">
                            <Flex align="center" gap="2">
                                <EnvelopeClosedIcon />
                                <Text> Email: askalibmills@northeastern.libanswers.com</Text>
                            </Flex>
                        </Flex>
           
                        <Flex justify="between" pt="1">
                            <Flex align="center" gap="2">
                                <AiOutlinePhone />
                                <Text>Reference: 510-430-2385</Text>
                            </Flex>
                        </Flex>

                        <Flex justify="between" pt="1">
                            <Flex align="center" gap="2">
                                <AiOutlinePhone className="text-lime-500" />
                                <Text>Circulation: 510-430-2196</Text>
                            </Flex>
                        </Flex>

                        <Flex justify="between" pt="1">
                            <Flex align="center" gap="2">
                                <AiOutlinePhone className="text-red-900" />
                                <Text>Special Collections: 510-430-2047</Text>
                            </Flex>
                        </Flex>
                        <Separator size="4" />
                    </Flex>
                </Card>
                <Card className="bg-white rounded-lg shadow-xl p-4">
                    <Flex gap="1" direction="column">
                        <Flex gap="1">
                            <IoInformationCircleOutline size="24px" className="text-red-900 float-left mr-2" />
                            <Heading size="5">
                                More Information
                            </Heading>
                        </Flex>
                        <Separator size="4" />

                        <Link 
                            href={'https://northeastern.libanswers.com/chat/widget/8750838048d7579fb24d5596b2bfdc95'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <ChatBubbleIcon />
                                    <Text>Live 24/7 Chat</Text>
                                </Flex>
                            </Flex>
                        </Link>

                        <Link 
                            href={'https://library.northeastern.edu/administration/library-staff-directory/?ul_filter_department=F.%20W.%20Olin%20Library'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <IdCardIcon />
                                    <Text>Library Staff Directory</Text>
                                </Flex>
                            </Flex>
                        </Link>

                        <Link 
                            href={'https://library.mills.edu/forms/questions/libanswers-embed.php'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <QuestionMarkCircledIcon />
                                    <Text>Questions & Feedback</Text>
                                </Flex>
                            </Flex>
                        </Link>

                        <Link 
                            href={'/liaisons'}>
                            <Flex justify="between" pt="1">
                                <Flex align="center" gap="2">
                                    <PersonIcon />
                                    <Text>Departmental Liaisons</Text>
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