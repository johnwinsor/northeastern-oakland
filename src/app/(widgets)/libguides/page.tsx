import { Libguides } from '@/components/libguides'
import { Flex } from '@radix-ui/themes';

export default async function libguidesPage() {
    
    const fetchURL = `${process.env.HOST_BASE_URL}/api/newbooks`;
    
    const res = await fetch(
        fetchURL,
        { cache: 'no-store' },
    );
    const data = await res.json()

    return (
        <Flex direction="column" gap="1" className="text-slate-50">
            <Libguides data={data} />
        </Flex>
  )
}