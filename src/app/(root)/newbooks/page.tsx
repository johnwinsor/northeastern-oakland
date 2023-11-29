import { Newbooks } from '@/components/newbooks'

export default async function Page() {
    const res = await fetch(
        'https://library.mills.edu/data.json',
        { cache: 'no-store' },
    );
    const data = await res.json()

    return (
        <Newbooks data={data} />
  )
}