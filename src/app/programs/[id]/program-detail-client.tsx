'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userStorage, programStorage } from '@/lib/local-storage'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, Calendar, Clock, Dumbbell, Users, Star,
  TrendingUp, Award, Play, CheckCircle, Lock, ChevronRight,
  Target, Zap, Brain, Heart
} from 'lucide-react'

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

interface ProgramDetailClientProps {
  program: Program
}

export default function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  const router = useRouter()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(1)
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  useEffect(() => {
    // Check enrollment status
    const userProgress = userStorage.getProgress()
    if (userProgress?.currentProgram === program.id) {
      setIsEnrolled(true)
      setCurrentWeek(userProgress.currentWeek || 1)
    }

    // Load program progress
    const programProgress = programStorage.getProgress(program.id)
    if (programProgress) {
      setCompletedWorkouts(programProgress.completedWorkouts || [])
      setActivePhaseIndex(programProgress.currentPhase || 0)
    }
  }, [program.id])

  const handleStartProgram = () => {
    // Update user progress
    const userProgress = userStorage.getProgress()!
    userProgress.currentProgram = program.id
    userProgress.currentWeek = 1
    userStorage.setProgress(userProgress)

    // Initialize program progress
    programStorage.setProgress(program.id, {
      programId: program.id,
      startDate: new Date().toISOString(),
      completedWorkouts: [],
      currentPhase: 0,
      completionPercentage: 0,
      notes: []
    })

    setIsEnrolled(true)
    setCurrentWeek(1)
  }

  const getLevelBadgeVariant = (level: string): 'success' | 'warning' | 'default' => {
    switch(level) {
      case 'beginner': return 'success'
      case 'intermediate': return 'warning'
      case 'advanced': return 'default'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'strength': return '💪'
      case 'cardio': return '🏃'
      case 'hiit': return '⚡'
      case 'mobility': return '🧘'
      case 'hybrid': return '🎯'
      default: return '🏋️'
    }
  }

  const getFocusIcon = (focus: string) => {
    const focusLower = focus.toLowerCase()
    if (focusLower.includes('strength') || focusLower.includes('power')) return <Zap className="w-4 h-4" />
    if (focusLower.includes('endurance') || focusLower.includes('cardio')) return <Heart className="w-4 h-4" />
    if (focusLower.includes('technique') || focusLower.includes('form')) return <Brain className="w-4 h-4" />
    return <Target className="w-4 h-4" />
  }

  const totalWorkouts = program.duration_weeks * program.frequency_per_week
  const completionPercentage = (completedWorkouts.length / totalWorkouts) * 100

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="pt-24 pb-24">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="max-w-7xl mx-auto w-full">
              <button
                onClick={() => router.push('/programs')}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Programs</span>
              </button>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={getLevelBadgeVariant(program.level)}>
                      {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                    </Badge>
                    <span className="text-4xl">{getTypeIcon(program.type)}</span>
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-4">
                    {program.name}
                  </h1>
                  <p className="text-xl text-white/80 max-w-3xl">
                    {program.description}
                  </p>
                </div>
                {isEnrolled && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-white/60 text-sm mb-1">Your Progress</div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {completionPercentage.toFixed(0)}%
                    </div>
                    <div className="text-white/80 text-sm">
                      Week {currentWeek} of {program.duration_weeks}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <Card>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Program Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <Calendar className="w-5 h-5 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{program.duration_weeks}</div>
                    <div className="text-sm text-[var(--text-secondary)]">Weeks</div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <Dumbbell className="w-5 h-5 text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{program.frequency_per_week}</div>
                    <div className="text-sm text-[var(--text-secondary)]">Days/Week</div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <Clock className="w-5 h-5 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{program.session_duration_minutes}</div>
                    <div className="text-sm text-[var(--text-secondary)]">Min/Session</div>
                  </div>
                  <div className="bg-[var(--bg-primary)] rounded-lg p-4">
                    <TrendingUp className="w-5 h-5 text-red-500 mb-2" />
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{program.difficulty}/10</div>
                    <div className="text-sm text-[var(--text-secondary)]">Difficulty</div>
                  </div>
                </div>
              </Card>

              {/* Program Phases */}
              <Card>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Training Phases</h2>
                <div className="space-y-4">
                  {program.phases.map((phase, index) => (
                    <div
                      key={phase.id}
                      className={`bg-[var(--bg-primary)] rounded-lg p-6 border transition-all ${
                        index === activePhaseIndex && isEnrolled
                          ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                          : 'border-[var(--border)]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                              index < activePhaseIndex ? 'bg-green-500' :
                              index === activePhaseIndex ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'
                            }`}>
                              {index < activePhaseIndex ? <CheckCircle className="w-5 h-5" /> : index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">{phase.name}</h3>
                          </div>
                          <p className="text-[var(--text-secondary)] mb-3">{phase.description}</p>
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">{phase.weeks} weeks</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {phase.focus.map((focus) => (
                          <div key={focus} className="flex items-center gap-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-3 py-1 rounded-md text-sm">
                            {getFocusIcon(focus)}
                            <span>{focus}</span>
                          </div>
                        ))}
                      </div>

                      {index > activePhaseIndex && (
                        <div className="mt-4 flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                          <Lock className="w-4 h-4" />
                          <span>Complete previous phases to unlock</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Equipment Required */}
              <Card>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Equipment Required</h2>
                {program.equipment_required.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {program.equipment_required.map((equipment) => (
                      <div key={equipment} className="bg-[var(--bg-primary)] rounded-lg p-3 text-center">
                        <div className="text-2xl mb-2">
                          {equipment === 'barbell' && '🏋️'}
                          {equipment === 'dumbbells' && '💪'}
                          {equipment === 'kettlebell' && '🔔'}
                          {equipment === 'resistance_bands' && '🎗️'}
                          {equipment === 'pull_up_bar' && '🚪'}
                          {equipment === 'mat' && '🧘'}
                          {equipment === 'none' && '👐'}
                          {!['barbell', 'dumbbells', 'kettlebell', 'resistance_bands', 'pull_up_bar', 'mat', 'none'].includes(equipment) && '🎯'}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] capitalize">
                          {equipment.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">👐</div>
                    <p className="text-[var(--text-secondary)]">No equipment required!</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {isEnrolled ? 'Continue Training' : 'Ready to Start?'}
                </h3>
                <p className="mb-4 text-white/80">
                  {isEnrolled
                    ? `You're on week ${currentWeek} of ${program.duration_weeks}`
                    : 'Join thousands transforming their fitness'
                  }
                </p>
                {isEnrolled ? (
                  <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Continue Workout
                  </button>
                ) : (
                  <button
                    onClick={handleStartProgram}
                    className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Start Program
                  </button>
                )}
                {!isEnrolled && (
                  <p className="text-xs text-white/60 mt-3 text-center">
                    Free • No credit card required
                  </p>
                )}
              </div>

              {/* Rating Card */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Community Rating</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-bold text-[var(--text-primary)]">{program.rating}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentage = stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : stars === 2 ? 3 : 2
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-[var(--text-secondary)]">{stars}</span>
                          <Star className="w-4 h-4 text-[var(--text-secondary)]" />
                        </div>
                        <div className="flex-1 bg-[var(--bg-tertiary)] rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-[var(--text-secondary)] w-10 text-right">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Users className="w-4 h-4" />
                    <span>Based on {program.reviews} reviews</span>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <Card>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Program Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Achievements Preview */}
              <Card>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Unlock Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-2xl">
                      🎯
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--text-primary)]">First Steps</div>
                      <div className="text-xs text-[var(--text-secondary)]">Complete your first workout</div>
                    </div>
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-2xl">
                      🗓️
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--text-primary)]">Week Warrior</div>
                      <div className="text-xs text-[var(--text-secondary)]">Complete 7 workouts in a week</div>
                    </div>
                    <Award className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-2xl">
                      🎓
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--text-primary)]">Program Graduate</div>
                      <div className="text-xs text-[var(--text-secondary)]">Complete the full program</div>
                    </div>
                    <Award className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
