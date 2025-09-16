'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Dumbbell,
  Heart,
  Zap,
  Target,
  Crown
} from 'lucide-react'

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

interface Equipment {
  id: number
  name: string
  slug: string
  icon: string | null
}

export default function ProgramsPage() {
  const { user, profile } = useAuth()
  const [programs, setPrograms] = useState<Program[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    level: 'all',
    type: 'all',
    equipment: 'all',
    search: ''
  })

  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [programsRes, equipmentRes] = await Promise.all([
        supabase.from('programs').select('*').order('name'),
        supabase.from('equipment').select('*').order('name')
      ])

      if (programsRes.data) setPrograms(programsRes.data)
      if (equipmentRes.data) setEquipment(equipmentRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPrograms = programs.filter(program => {
    if (filters.level !== 'all' && program.level !== filters.level) return false
    if (filters.type !== 'all' && program.type !== filters.type) return false
    if (filters.equipment !== 'all' && !program.equipment_required.includes(parseInt(filters.equipment))) return false
    if (filters.search && !program.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || colors.beginner
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      strength: Dumbbell,
      cardio: Heart,
      hiit: Zap,
      mobility: Target,
      hybrid: Calendar
    }
    return icons[type as keyof typeof icons] || Calendar
  }

  const getTypeColor = (type: string) => {
    const colors = {
      strength: 'text-blue-600',
      cardio: 'text-red-600',
      hiit: 'text-orange-600',
      mobility: 'text-green-600',
      hybrid: 'text-purple-600'
    }
    return colors[type as keyof typeof colors] || 'text-gray-600'
  }

  const getEquipmentNames = (equipmentIds: number[]) => {
    return equipmentIds.map(id => equipment.find(e => e.id === id)?.name).filter(Boolean).join(', ')
  }

  const handleStartProgram = async (programId: number) => {
    if (!user) {
      alert('Please sign in to start a program')
      return
    }

    if (programs.find(p => p.id === programId)?.is_premium && profile?.plan !== 'premium') {
      alert('This is a premium program. Upgrade to premium to access it.')
      return
    }

    try {
      const { error } = await supabase
        .from('user_programs')
        .insert({
          user_id: user.id,
          program_id: programId,
          started_at: new Date().toISOString(),
          status: 'active',
          current_week: 1
        } as any)

      if (error) throw error

      alert('Program started successfully! You can view your progress in your profile.')
    } catch (error) {
      console.error('Error starting program:', error)
      alert('Error starting program. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading programs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Training Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your challenge and get stronger with our professionally designed programs. 
            From beginner-friendly routines to advanced training protocols.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Level Filter */}
            <select
              value={filters.level}
              onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="hiit">HIIT</option>
              <option value="mobility">Mobility</option>
              <option value="hybrid">Hybrid</option>
            </select>

            {/* Equipment Filter */}
            <select
              value={filters.equipment}
              onChange={(e) => setFilters(prev => ({ ...prev, equipment: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Equipment</option>
              {equipment.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => {
            const TypeIcon = getTypeIcon(program.type)
            
            return (
              <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Program Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                  <TypeIcon className={`h-16 w-16 ${getTypeColor(program.type)}`} />
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {program.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                          {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                        </span>
                        {program.is_premium && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {program.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {program.description}
                    </p>
                  )}

                  {/* Program Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{program.duration_weeks} weeks</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{program.frequency_per_week} sessions/week</span>
                    </div>
                    
                    {program.session_duration_minutes && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{program.session_duration_minutes} min/session</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Dumbbell className="h-4 w-4 mr-2" />
                      <span className="truncate">
                        {getEquipmentNames(program.equipment_required) || 'No equipment needed'}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleStartProgram(program.id)}
                    disabled={program.is_premium && profile?.plan !== 'premium'}
                    className="w-full"
                  >
                    {program.is_premium && profile?.plan !== 'premium' ? (
                      <>
                        <Crown className="h-4 w-4 mr-2" />
                        Premium Required
                      </>
                    ) : (
                      'Start Program'
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No programs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more programs
            </p>
          </div>
        )}

        {/* Premium CTA */}
        {profile?.plan !== 'premium' && (
          <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-center">
            <Crown className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Unlock Premium Programs
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get access to advanced training programs, personalized coaching, 
              and exclusive content designed for serious athletes.
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
