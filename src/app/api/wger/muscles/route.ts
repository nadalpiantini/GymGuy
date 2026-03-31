import { wgerFetch } from '@/lib/wger-proxy'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await wgerFetch('muscle/?format=json', 86400)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching muscles:', error)
    return Response.json({ error: 'Failed to fetch muscles' }, { status: 500 })
  }
}
