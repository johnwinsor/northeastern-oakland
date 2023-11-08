import Image from 'next/image'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export default function Header() {
  return (
    <main className="flex flex-col items-center justify-between p-24 rounded-b-md h-40 bg-teal-50">
      <Container size="1">
        <Flex direction="column" pb="4">
          <Heading>Home Page</Heading>
          <Text color='gray'>Here is some text</Text>
        </Flex>
        <Flex gap="4" direction="column">
          <Text>Header</Text>
        </Flex>
      </Container>
    </main>
  )
}