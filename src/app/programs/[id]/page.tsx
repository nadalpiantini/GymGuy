import programsData from '@/data/programs.json'
import ProgramDetailClient from './program-detail-client'

export async function generateStaticParams() {
  // Only generate static params for production builds
  if (process.env.NODE_ENV === 'production') {
    return programsData.map((program) => ({
      id: program.id,
    }))
  }
  return []
}

interface Program {
  id: string
  name: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  type: 'strength' | 'cardio' | 'hiit' | 'mobility' | 'hybrid'
  duration_weeks: number
  frequency_per_week: number
  session_duration_minutes: number
  equipment_required: string[]
  phases: ProgramPhase[]
  tags: string[]
  rating: number
  reviews: number
  difficulty: number
  imageUrl?: string
}

interface ProgramPhase {
  id: string
  name: string
  weeks: number
  description: string
  focus: string[]
  workouts: string[]
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = programsData.find(p => p.id === params.id) as Program | undefined

  if (!program) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white">Program not found</h2>
        </div>
      </div>
    )
  }

  return <ProgramDetailClient program={program} />
}