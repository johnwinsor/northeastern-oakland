import { Newbooks } from '@/components/newbooks'
import { Flex, Text, Box } from '@radix-ui/themes';
import SelectSubjects from '@/components/selectSubjects'


export default async function newBooksSubjectPage({ params }: { params: { subject: string } }) {
    const res = await fetch(
        `${process.env.VERCEL_URL}/api/newbooks/${params.subject}`,
        { cache: 'no-store' },
    );
    const data = await res.json()

    const subject = decodeURI(params.subject)

    return (
        <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
            <Flex direction={{initial:"column", sm:"row"}} className="p-5 h-16 text-slate-700 justify-between self-center sm:self-stretch m-auto md:m-2">
                <Box height="9" className="w-full md:w-1/5"></Box>
                <Box height="9" className="w-full md:w-3/5 text-center grow"><Text as="p" className="text-base sm:text-lg md:text-2xl text-nowrap">New Arrivals: {subject}</Text></Box>
                <Box height="9" className="w-full md:w-1/5"><SelectSubjects /></Box>
            </Flex>
            <Newbooks data={data} />
        </Flex>
        
  )
}