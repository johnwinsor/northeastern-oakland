import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { IoLibraryOutline } from "react-icons/io5";

export default function CalendarPage() {
	return (
		<Flex direction="column" align="center">
			<Flex direction="column" pb="4">
				<Heading size="8" className='py-5'>Library Calendar</Heading>
			</Flex>

			<Flex gap="4">
				<Card className="rounded-md p-1 bg-orange-100 mb-5 w-96">
					<IoLibraryOutline size="56px" className="text-red-900 float-left mr-4" />
					<p className="text-md text-left">Special Collections hours are subject to change and there may be unscheduled closures. Please call 510-430-2047 to make an appointment.</p>
				</Card>
			</Flex>

			<Flex width="100%" gap="4" className="justify-end">
				<Flex gap="2">
					<div className="w-3 h-3 bg-amber-600"></div>
					<Text size="1">F.W. Olin Library</Text>
				</Flex>
				<Flex  gap="2">
					<div className="w-3 h-3 bg-rose-400"></div>
					<Text size="1">Special Collections</Text>
				</Flex>
			</Flex>


			<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23f0fdfa&ctz=America%2FLos_Angeles&showCalendars=0&showTabs=0&showPrint=0&src=Y19iMTYzMWJjYjM1ODBhNmNkOTM4NzViZjI4NDhkYWQxZWEwOTc0N2U5OWVkY2Q0Y2M3NzgzMDFlN2JiNDdhMGVjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y182YWE3YmU4ZDg5ZGQ3ZWJmNTczZTcxNzc2OGZhYTg5MDE2NDI1NmQzOGM4MjNmN2Y1YzUxMTJkZDAzMTJjYjhiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F09300&color=%23D81B60" width="100%" height="700px"></iframe>


		</Flex>
	);
}
