import { Newbooks } from '@/components/newbooks'
import { Flex, Text } from '@radix-ui/themes';
import Subjects from '@/components/subjects'


export default async function newBooksSubjectPage({ params }: { params: { subject: string } }) {
    
    const res = await fetch(
        `http://127.0.0.1/api/newbooks/${params.subject}`,
        { cache: 'no-store' },
    );
    const data = await res.json()

    const subject = decodeURI(params.subject)

    return (
        <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
            <Flex direction="row" className="h-12 p-5 text-slate-700 justify-center">
                <Text as="p" className="text-2xl">New Arrivals: {subject}</Text>    
                <Subjects />
            </Flex>
            <Newbooks data={data} />
        </Flex>
        
  )
}