export async function wgerFetch(path: string, revalidate = 3600): Promise<Response> {
  const url = `${process.env.WGER_API_URL}/api/v2/${path}`
  const res = await fetch(url, {
    headers: { Authorization: `Token ${process.env.WGER_API_TOKEN}` },
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`wger API error: ${res.status} — ${url}`)
  return res
}
