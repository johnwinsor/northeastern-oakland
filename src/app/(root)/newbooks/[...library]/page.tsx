import { Newbooks } from '@/components/newbooks'
import { Flex, Text, Box } from '@radix-ui/themes';
import SelectSubjects from '@/components/selectSubjects'
import SelectLibraries from '@/components/selectLibraries'

export default async function newBooksSubjectPage({ 
    params,
    searchParams,
}: {
    params: { library: string[] }
    searchParams: { [key: string]: string | string[] | undefined } 
}) {
    
    const library = params.library[0]
    const subject = params.library[1]
    
    const date = searchParams['date']
    let fetchURL = ''
    let subjectTitle = ''
    let libraryTitle = decodeURI(params.library[0])
    if (libraryTitle == 'all') {
        libraryTitle = 'Global Campus'
    }

    if (typeof subject !== 'undefined') {
        subjectTitle = decodeURI(params.library[1])
        if (typeof date !== 'undefined') {
            fetchURL = `${process.env.HOST_BASE_URL}/api/newbooks/${library}/${subject}?date=${date}`;
        } else {
            fetchURL = `${process.env.HOST_BASE_URL}/api/newbooks/${library}/${subject}`;
        }
    } else {
        if (typeof date !== 'undefined') {
            fetchURL = `${process.env.HOST_BASE_URL}/api/newbooks/${library}?date=${date}`;
        } else {
            fetchURL = `${process.env.HOST_BASE_URL}/api/newbooks/${library}`;
        }
    }
    
    const res = await fetch(
        fetchURL,
        { cache: 'no-store' },
    );
    const data = await res.json()

    const subjform = await fetch(`${process.env.HOST_BASE_URL}/api/subjects`);
    const subjformdata = await subjform.json()
    // console.log(subjformdata)

    return (
        <Flex direction="column" gap="1" className="text-slate-50 min-h-[calc(100vh-242px)]">
            <Flex direction={{initial:"column", sm:"row"}} className="p-5 h-16 text-slate-700 justify-between self-center sm:self-stretch m-auto md:m-2">
                <Box height="9" className="w-full md:w-1/5"><SelectLibraries /></Box>
                <Box height="9" className="w-full md:w-3/5 text-center grow"><Flex className="justify-center flex-col"><Text as="p" className="text-base sm:text-lg md:text-2xl text-nowrap">New Arrivals: {libraryTitle}</Text><Text as="p" className="text-base sm:text-lg md:text-2xl text-nowrap">{subjectTitle}</Text></Flex></Box>
                <Box height="9" className="w-full md:w-1/5"><SelectSubjects subjformdata={subjformdata} /></Box>
            </Flex>
            <Newbooks data={data} />
        </Flex>
        
  )
}