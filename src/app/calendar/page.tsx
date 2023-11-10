import { Badge, Card, Container, Flex, Heading, Text} from '@radix-ui/themes'
import { IoLibraryOutline } from "react-icons/io5";
import './styles.css'

export default function CalendarPage() {
	return (
		<Flex direction="column">
			<Text size="8" className='py-5'>Library Calendar</Text>

			<Card className="max-w-[600px] rounded-md p-1 bg-orange-100 mb-5">
                <IoLibraryOutline size="56px" className="text-red-900 float-left mr-4" />
                <div className="flex flex-col">
                    <p className="text-md text-left">Special Collections hours are subject to change and there may be unscheduled closures. Please call 510-430-2047 to make an appointment.</p>
                </div>
			</Card>

			<div className='flex self-end'>
            	<div className='pr-1 pt-2'>
					<div className="w-3 h-3 bg-amber-600"></div>  
            	</div>
            	<div>
              		<p className="text-xs text-end">F.W. Olin Library</p>
            	</div>
				<div className='pr-1 pt-2 pl-3'>
					<div className="w-3 h-3 bg-rose-400"></div>  
            	</div>
            	<div>
              		<p className="text-xs text-end">Special Collections</p>
            	</div>
          	</div>
            <div className="responsiveCal">
                <div className="deskContent">
                    {/* <iframe src="https://calendar.google.com/calendar/embed?height=800&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&src=Y19iMTYzMWJjYjM1ODBhNmNkOTM4NzViZjI4NDhkYWQxZWEwOTc0N2U5OWVkY2Q0Y2M3NzgzMDFlN2JiNDdhMGVjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y182YWE3YmU4ZDg5ZGQ3ZWJmNTczZTcxNzc2OGZhYTg5MDE2NDI1NmQzOGM4MjNmN2Y1YzUxMTJkZDAzMTJjYjhiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F09300&color=%234A716C&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0"></iframe> */}
                    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showCalendars=0&showTabs=0&showPrint=0&src=Y19iMTYzMWJjYjM1ODBhNmNkOTM4NzViZjI4NDhkYWQxZWEwOTc0N2U5OWVkY2Q0Y2M3NzgzMDFlN2JiNDdhMGVjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y182YWE3YmU4ZDg5ZGQ3ZWJmNTczZTcxNzc2OGZhYTg5MDE2NDI1NmQzOGM4MjNmN2Y1YzUxMTJkZDAzMTJjYjhiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F09300&color=%23D81B60"></iframe>
                    #0891b2
                </div>
            </div>
        </Flex>
	);
}
