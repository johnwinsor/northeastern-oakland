import { Newbooks } from '@/components/newbooks'
import { Flex, Text} from '@radix-ui/themes';

export default async function newBooksPage() {
    
    const res = await fetch(
        'http://localhost:3000/api/newbooks',
        { cache: 'no-store' },
    );
    const data = await res.json()

    return (
        <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
            <Flex direction="column" className="h-12 p-5 text-slate-700">
                <Text as="p" className="text-center text-2xl">New Arrivals</Text>
            </Flex>
             <Newbooks data={data} />
        </Flex>
  )
}