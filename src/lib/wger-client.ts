// ─── Pagination wrapper ───────────────────────────────────────────────────────

export interface WgerPaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ─── Reference types ──────────────────────────────────────────────────────────

export interface WgerMuscle {
  id: number
  name: string        // "Pectoralis major"
  name_en: string     // "Chest"
  is_front: boolean
  image_url_main: string
  image_url_secondary: string
}

export interface WgerEquipment {
  id: number
  name: string        // "Barbell", "Dumbbell", "Bodyweight", etc.
}

export interface WgerExerciseCategory {
  id: number
  name: string        // "Abs", "Arms", "Back", "Calves", "Cardio", "Chest", "Legs", "Shoulders"
}

// ─── Exercise types ───────────────────────────────────────────────────────────

export interface WgerExerciseTranslation {
  id: number
  name: string
  description: string
  language: number    // 2 = English, 4 = Spanish
}

export interface WgerExerciseImage {
  id: number
  exercise_base: number
  image: string       // full URL
  is_main: boolean
}

export interface WgerExerciseVideo {
  id: number
  exercise_base: number
  video: string
  is_main: boolean
}

export interface WgerExerciseInfo {
  id: number
  uuid: string
  category: { id: number; name: string }
  muscles: WgerMuscle[]
  muscles_secondary: WgerMuscle[]
  equipment: WgerEquipment[]
  images: WgerExerciseImage[]
  translations: WgerExerciseTranslation[]
  videos: WgerExerciseVideo[]
}

export interface WgerExerciseSearchResult {
  suggestions: Array<{
    value: string
    data: {
      id: number
      base_id: number
      name: string
      category: string
      image: string | null
      image_thumbnail: string | null
    }
  }>
}

// ─── Client functions (call our own proxy routes) ─────────────────────────────

const API_BASE = '/api/wger'

export async function fetchMuscles(): Promise<WgerMuscle[]> {
  const res = await fetch(`${API_BASE}/muscles`)
  if (!res.ok) throw new Error('Failed to fetch muscles')
  const data: WgerPaginatedResponse<WgerMuscle> = await res.json()
  return data.results
}

export async function fetchEquipment(): Promise<WgerEquipment[]> {
  const res = await fetch(`${API_BASE}/equipment`)
  if (!res.ok) throw new Error('Failed to fetch equipment')
  const data: WgerPaginatedResponse<WgerEquipment> = await res.json()
  return data.results
}

export async function fetchCategories(): Promise<WgerExerciseCategory[]> {
  const res = await fetch(`${API_BASE}/exercise-categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  const data: WgerPaginatedResponse<WgerExerciseCategory> = await res.json()
  return data.results
}

export async function fetchExercises(params?: {
  muscles?: number[]
  equipment?: number[]
  language?: number
  limit?: number
  offset?: number
}): Promise<WgerPaginatedResponse<WgerExerciseInfo>> {
  const query = new URLSearchParams()
  if (params?.muscles) params.muscles.forEach(id => query.append('muscles', String(id)))
  if (params?.equipment) params.equipment.forEach(id => query.append('equipment', String(id)))
  if (params?.language !== undefined) query.set('language', String(params.language))
  if (params?.limit !== undefined) query.set('limit', String(params.limit))
  if (params?.offset !== undefined) query.set('offset', String(params.offset))
  const qs = query.toString()
  const res = await fetch(`${API_BASE}/exercises${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error('Failed to fetch exercises')
  return res.json()
}

export async function fetchExerciseInfo(id: number): Promise<WgerExerciseInfo> {
  const res = await fetch(`${API_BASE}/exercises/${id}/info`)
  if (!res.ok) throw new Error(`Failed to fetch exercise ${id}`)
  return res.json()
}

export async function searchExercises(
  term: string,
  language = 'english'
): Promise<WgerExerciseSearchResult> {
  const res = await fetch(
    `${API_BASE}/exercises/search?term=${encodeURIComponent(term)}&language=${language}`
  )
  if (!res.ok) throw new Error('Failed to search exercises')
  return res.json()
}
