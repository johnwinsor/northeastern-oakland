import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export default function Footer() {
  return (
    <Flex direction="column" className="rounded-b-md h-10 bg-teal-50 items-center">
          <Text size="1">5000 MacArthur Blvd, Oakland, CA 94613 510.430.2196&nbsp;</Text>
          <Link
              href="mailto:askalibmills@northeastern.libanswers.com"
              title="AskALib"
            >
              <Text size="1">&nbsp;Ask A Librarian</Text>
            </Link>
    </Flex>
  )
}