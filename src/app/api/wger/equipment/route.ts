import { wgerFetch } from '@/lib/wger-proxy'

export async function GET() {
  try {
    const res = await wgerFetch('equipment/?format=json', 86400)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return Response.json({ error: 'Failed to fetch equipment' }, { status: 500 })
  }
}
