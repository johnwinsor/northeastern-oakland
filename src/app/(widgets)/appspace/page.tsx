import { Monitor } from '@/components/monitor'

export default async function Page() {
    const fetchURL = `${process.env.HOST_BASE_URL}/api/appspace`;
    const res = await fetch(
        fetchURL,
        { cache: 'no-store' },
    );
    const data = await res.json()
    // const filtered = data.filter((d: { isbn: string; }) => d.isbn == '9781588346407');
    // console.log(filtered)

    return (
        <Monitor data={data} />
  )
}