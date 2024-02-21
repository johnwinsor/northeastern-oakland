import { Libguides } from '@/components/libguides'
import { Flex } from '@radix-ui/themes';

export default async function libguidesSubjectPage({
    params,
}: {
    params: { subject: string }
}) {
    
    
    const fetchURL = `${process.env.HOST_BASE_URL}/api/libguides/${params.subject}`;
    
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