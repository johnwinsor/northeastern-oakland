import { Newbooks } from '@/components/newbooks'
import { Flex, Text } from '@radix-ui/themes';

export default async function newBooksSubjectPage({ params }: { params: { subject: string } }) {
    
    const res = await fetch(
        `https://northeastern-oakland.vercel.app/api/newbooks/${params.subject}`,
        { cache: 'no-store' },
    );
    const data = await res.json()

    return (
        <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
            <Flex direction="column" className="h-12 p-5 text-slate-700">
                <Text as="p" className="text-center text-2xl">New Arrivals {params.subject}</Text>
            </Flex>
             <Newbooks data={data} />
        </Flex>
        
  )
}