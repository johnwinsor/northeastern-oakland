import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export default function Footer() {
  return (
    <main className="flex flex-col items-center justify-between rounded-b-md h-10 bg-teal-50">
      <Container size="1">
        <Flex direction="column" pb="4">
        <Link
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </Flex>
      </Container>
    </main>
  )
}