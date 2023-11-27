import { EmblaCarousel } from '@/components/monitor'
import { Theme } from '@radix-ui/themes';

export default async function Page() {
    const res = await fetch(
        'https://library.mills.edu/data.json',
        { cache: 'no-store' },
    );
    const data = await res.json()
    //console.log(data)

    return (
        <EmblaCarousel data={data} />
  )
}