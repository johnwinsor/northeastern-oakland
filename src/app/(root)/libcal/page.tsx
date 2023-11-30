import { Card, Flex, Heading, Text} from '@radix-ui/themes'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function LibcalPage() {
	return (
		<Flex direction="column" align="center" p="4">
			<iframe src="https://nuoakland.libcal.com/reserve/StudyRooms" width="100%" height="700px"></iframe>
		</Flex>
	);
}