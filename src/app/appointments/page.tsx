import { Card, Flex, Heading, Text} from '@radix-ui/themes'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function AppointmentsPage() {
	return (
		<Flex direction="column" align="center" p="4">
			<Flex direction="column" pb="4">
				<Heading size="5" className='py-5'>Meet with a Librarian</Heading>
			</Flex>

			<Flex gap="4" justify="center">
				<Card className="rounded-md shadow-xl p-1 bg-orange-100 mb-5">
                    <Flex align="center">
                        <IoChatbubbleEllipsesOutline size="36px" className="text-red-900 float-left mr-4" />
                        <Flex direction="column">
                            <p className="text-md text-left">Have A Research Need?</p>
                            <p className="text-md text-left">Schedule a meeting with a Librarian either in person or online</p>
                        </Flex>
                    </Flex>
				</Card>
			</Flex>

			<Card className="bg-white rounded-lg shadow-xl p-1 md:p-4 w-full">
				<iframe src="https://nuoakland.libcal.com/appointments/" width="100%" height="700px"></iframe>
			</Card>


		</Flex>
	);
}