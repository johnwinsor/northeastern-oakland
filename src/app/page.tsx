import Image from 'next/image'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export default function Home() {
  return (
    <div className="backg w-full
    p-24
    relative
    overflow-hidden
    block
    z-10
    
    bg-[url('../../public/libraryOverhead.png')]
    bg-cover
    bg-no-repeat
    bg-center

    before:content-['']
    before:absolute
    before:inset-0
    before:block
    before:bg-gradient-to-r
    before:from-green-400
    before:to-blue-500
    before:opacity-75
    before:z-[-5]
">
      <Container size="1">
        <Flex direction="column" pb="4">
          <Heading>Home Page</Heading>
          <Text color='gray'>Here is some text</Text>
        </Flex>
        <Flex gap="4" direction="column">
          <Card>
            <Flex gap="1" direction="column">
              <Text>Issue #24 - Button is wrong color</Text>
              <Flex gap="2">
                <Badge color="orange">Devops</Badge>
                <Badge color="green">UI</Badge>
              </Flex>
              <Text>
                This is an issue that is very serious. On a dashboard the wrong color is displaying.
              </Text>
              <Flex justify="between" pt="1">
                <Flex align="center">
                  <ChatBubbleIcon />
                  <Text color="gray" ml="2" size="1">3 Comments</Text>
                </Flex>
                <ChatBubbleIcon />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Container>
      </div>
  )
}
