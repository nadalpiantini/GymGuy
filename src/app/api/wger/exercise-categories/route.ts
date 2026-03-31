import { wgerFetch } from '@/lib/wger-proxy'

export async function GET() {
  try {
    const res = await wgerFetch('exercisecategory/?format=json', 86400)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching exercise categories:', error)
    return Response.json({ error: 'Failed to fetch exercise categories' }, { status: 500 })
  }
}
