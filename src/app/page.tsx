import Image from 'next/image'
import { Badge, Card, Container, Flex, Box, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import Search from "@/components/search";

export default function Home() {
    return (
    <div className="backg rounded-t-lg p-24">
      <Container size="2">
        <Flex gap="4" direction="column">
          <Search />
        </Flex>
      </Container>
      </div>
  )
}
