'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  Users, 
  Dumbbell, 
  ArrowLeft,
  Play,
  Crown,
  CheckCircle,
  Circle
} from 'lucide-react'
import Link from 'next/link'

interface Program {
  id: number
  name: string
  description: string | null
  level: 'beginner' | 'intermediate' | 'advanced'
  type: 'strength' | 'cardio' | 'hiit' | 'mobility' | 'hybrid'
  duration_weeks: number
  frequency_per_week: number
  session_duration_minutes: number | null
  equipment_required: number[]
  is_premium: boolean
}

interface ProgramSession {
  id: number
  program_id: number
  week: number
  day: number
  name: string | null
  blocks: any
}

interface Equipment {
  id: number
  name: string
  slug: string
  icon: string | null
}

export default function ProgramDetailPage() {
  const params = useParams()
  const { user, profile } = useAuth()
  const [program, setProgram] = useState<Program | null>(null)
  const [sessions, setSessions] = useState<ProgramSession[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)

  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    if (params.id) {
      loadProgramData(parseInt(params.id as string))
    }
  }, [params.id])

  const loadProgramData = async (programId: number) => {
    try {
      const [programRes, sessionsRes, equipmentRes] = await Promise.all([
        supabase.from('programs').select('*').eq('id', programId).single(),
        supabase.from('program_sessions').select('*').eq('program_id', programId).order('week, day'),
        supabase.from('equipment').select('*').order('name')
      ])

      if ((programRes as any).data) setProgram((programRes as any).data)
      if ((sessionsRes as any).data) setSessions((sessionsRes as any).data)
      if ((equipmentRes as any).data) setEquipment((equipmentRes as any).data)
    } catch (error) {
      console.error('Error loading program data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartProgram = async () => {
    if (!user) {
      alert('Please sign in to start a program')
      return
    }

    if (program?.is_premium && profile?.plan !== 'premium') {
      alert('This is a premium program. Upgrade to premium to access it.')
      return
    }

    setStarting(true)
    try {
      const { error } = await supabase
        .from('user_programs')
        .insert({
          user_id: user.id,
          program_id: program!.id,
          started_at: new Date().toISOString(),
          status: 'active',
          current_week: 1
        } as any)

      if (error) throw error

      alert('Program started successfully! You can view your progress in your profile.')
      window.location.href = '/profile'
    } catch (error) {
      console.error('Error starting program:', error)
      alert('Error starting program. Please try again.')
    } finally {
      setStarting(false)
    }
  }

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || colors.beginner
  }

  const getEquipmentNames = (equipmentIds: number[]) => {
    return equipmentIds.map(id => equipment.find(e => e.id === id)?.name).filter(Boolean).join(', ')
  }

  const getWeekSessions = (week: number) => {
    return sessions.filter(session => session.week === week)
  }

  const getDayName = (day: number) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days[day - 1] || `Day ${day}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading program details...</p>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program not found</h1>
          <Link href="/programs">
            <Button>Back to Programs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/programs">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Programs</span>
            </Button>
          </Link>
        </div>

        {/* Program Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{program.name}</h1>
                {program.is_premium && (
                  <Crown className="h-6 w-6 text-yellow-500" />
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(program.level)}`}>
                  {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                </span>
                <span className="text-sm text-gray-600 capitalize">
                  {program.type} Training
                </span>
              </div>

              {program.description && (
                <p className="text-gray-600 mb-6">{program.description}</p>
              )}

              {/* Program Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{program.duration_weeks} weeks</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Frequency</div>
                    <div className="font-semibold">{program.frequency_per_week}/week</div>
                  </div>
                </div>
                
                {program.session_duration_minutes && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="text-sm text-gray-600">Session Time</div>
                      <div className="font-semibold">{program.session_duration_minutes} min</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Dumbbell className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Equipment</div>
                    <div className="font-semibold text-xs">
                      {getEquipmentNames(program.equipment_required) || 'None'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <Button
                onClick={handleStartProgram}
                disabled={starting || (program.is_premium && profile?.plan !== 'premium')}
                size="lg"
                className="w-full lg:w-auto"
              >
                {starting ? (
                  'Starting...'
                ) : program.is_premium && profile?.plan !== 'premium' ? (
                  <>
                    <Crown className="h-5 w-5 mr-2" />
                    Premium Required
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start Program
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Program Schedule */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Schedule</h2>
          
          <div className="space-y-8">
            {Array.from({ length: program.duration_weeks }, (_, weekIndex) => {
              const week = weekIndex + 1
              const weekSessions = getWeekSessions(week)
              
              return (
                <div key={week} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Week {week}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weekSessions.map((session) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">
                            {session.name || getDayName(session.day)}
                          </h4>
                          <Circle className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        {session.blocks && Array.isArray(session.blocks) && (
                          <div className="space-y-2">
                            {session.blocks.map((block: any, blockIndex: number) => (
                              <div key={blockIndex} className="text-sm">
                                <div className="font-medium text-gray-700 mb-1">
                                  {block.name || `Block ${blockIndex + 1}`}
                                </div>
                                {block.exercises && (
                                  <div className="text-gray-600">
                                    {block.exercises.length} exercise{block.exercises.length !== 1 ? 's' : ''}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Premium Upgrade CTA */}
        {program.is_premium && profile?.plan !== 'premium' && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-center">
            <Crown className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Unlock This Premium Program
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get access to this advanced training program along with all other premium features 
              including unlimited history, advanced statistics, and 1-on-1 coaching.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.location.href = '/premium'}
            >
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
