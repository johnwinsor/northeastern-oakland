import { Libguides } from '@/components/libguides'
import { Flex } from '@radix-ui/themes';

export default async function libguidesPage({
    params,
}: {
    params: { library: string[] }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    
    const library = params.library[0]
    const subject = params.library[1]
    
    const fetchURL = `${process.env.HOST_BASE_URL}/api/libguides/${library}/${subject}`;
    
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