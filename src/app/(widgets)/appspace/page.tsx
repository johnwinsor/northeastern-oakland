import { Monitor } from '@/components/monitor'

export default async function Page() {
    const res = await fetch(
        'https://library.mills.edu/data.json',
        { cache: 'no-store' },
    );
    const data = await res.json()
    const filtered = data.filter((d: { isbn: string; }) => d.isbn == '9781588346407');
    console.log(filtered)

    return (
        <Monitor data={filtered} />
  )
}