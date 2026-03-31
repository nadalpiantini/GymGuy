import { wgerFetch } from '@/lib/wger-proxy'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams.toString()
    const path = `exerciseinfo/?format=json${params ? '&' + params : ''}`
    const res = await wgerFetch(path, 3600)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return Response.json({ error: 'Failed to fetch exercises' }, { status: 500 })
  }
}
