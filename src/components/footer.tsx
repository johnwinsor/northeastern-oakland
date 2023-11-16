import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export default function Footer() {
  return (
    <Flex gap="2" align="center" className="rounded-b-md h-10 bg-teal-50 justify-center">
        <Text size="1" className="p-0">5000 MacArthur Blvd, Oakland, CA 94613 510.430.2196</Text>
        <Link
            className="p-0"
            href="mailto:askalibmills@northeastern.libanswers.com"
            title="AskALib"
        >
            <Flex><Text size="1">Ask A Librarian</Text></Flex>
        </Link>
    </Flex>
  )
}