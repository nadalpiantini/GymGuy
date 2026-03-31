import { wgerFetch } from '@/lib/wger-proxy'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const term = url.searchParams.get('term') || ''
    const language = url.searchParams.get('language') || 'english'
    const path = `exercise/search/?term=${encodeURIComponent(term)}&language=${language}&format=json`
    const res = await wgerFetch(path, 3600)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error searching exercises:', error)
    return Response.json({ error: 'Failed to search exercises' }, { status: 500 })
  }
}
