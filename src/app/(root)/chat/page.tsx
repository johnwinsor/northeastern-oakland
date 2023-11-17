import { Card, Flex, Heading, Text} from '@radix-ui/themes'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function ChatPage() {
	return (
		<Flex direction="column" align="center" p="4">
			<Flex direction="column" pb="4">
				<Heading size="5" className='py-5'>Chat with a Librarian</Heading>
			</Flex>

			<Flex gap="4" justify="center">
				<Card className="rounded-md shadow-xl p-1 bg-orange-100 mb-6">
                    <Flex align="center">
                        <IoChatbubbleEllipsesOutline size="36px" className="text-red-900 float-left mr-4" />
                        <Flex direction="column">
                            <p className="text-md text-left">Have A Question?</p>
                            <p className="text-md text-left">Chat with a Librarian 24/7</p>
                        </Flex>
                    </Flex>
				</Card>
			</Flex>
			<Card className="bg-white rounded-lg shadow-xl w-full">
				<iframe src="https://northeastern.libanswers.com/chat/widget/8750838048d7579fb24d5596b2bfdc95" width="100%" height="700px"></iframe>
			</Card>


		</Flex>
	);
}