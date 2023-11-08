import Image from 'next/image'
import Link from 'next/link'
import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import olinLogo from '../../public/oaklandLibrary.png'

export default function Header() {
  return (
    <div className="flex flex-col justify-between p-2 rounded-b-md h-40 bg-teal-50">

        <Flex direction="column" pb="4">
            <Link href={'/'}>
                <Image
                    src={olinLogo}
                    alt="Picture of the author"
                    height={100}
                    className="pb-3"
                />
            </Link>
        </Flex>

    </div>
  )
}