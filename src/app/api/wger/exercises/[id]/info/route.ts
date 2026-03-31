import { wgerFetch } from '@/lib/wger-proxy'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await wgerFetch(`exerciseinfo/${params.id}/?format=json`, 3600)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error(`Error fetching exercise ${params.id}:`, error)
    return Response.json({ error: 'Failed to fetch exercise info' }, { status: 500 })
  }
}
