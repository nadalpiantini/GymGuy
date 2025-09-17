'use client'

import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  Users,
  Dumbbell,
  Crown,
  ChevronRight
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
}

interface SimpleProgramCardProps {
  program: Program
  equipment: Equipment[]
  isPremiumUser: boolean
  onStart: (programId: number) => void
}

export default function SimpleProgramCard({
  program,
  equipment,
  isPremiumUser,
  onStart
}: SimpleProgramCardProps) {
  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'text-green-600 bg-green-50 border-green-200',
      intermediate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      advanced: 'text-red-600 bg-red-50 border-red-200'
    }
    return colors[level as keyof typeof colors] || colors.beginner
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
    if (!equipmentIds || equipmentIds.length === 0) return 'No equipment needed'
    const names = equipmentIds.map(id => equipment.find(e => e.id === id)?.name).filter(Boolean)
    if (names.length > 2) {
      return `${names.slice(0, 2).join(', ')} +${names.length - 2}`
    }
    return names.join(', ')
  }

  const canStart = !program.is_premium || isPremiumUser

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:shadow-primary-glow transition-all duration-300">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-teko-bold text-white leading-tight">
            {program.name}
          </h3>
          {program.is_premium && (
            <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
          )}
        </div>

        {/* Level & Type */}
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getLevelColor(program.level)}`}>
            {program.level}
          </span>
          <span className={`text-xs font-medium ${getTypeColor(program.type)}`}>
            {program.type}
          </span>
        </div>
      </div>

      {/* Description */}
      {program.description && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {program.description}
        </p>
      )}

      {/* Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
          <span>{program.duration_weeks} weeks</span>
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <Users className="h-3.5 w-3.5 mr-2 text-gray-400" />
          <span>{program.frequency_per_week}x per week</span>
        </div>

        {program.session_duration_minutes && (
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-3.5 w-3.5 mr-2 text-gray-400" />
            <span>{program.session_duration_minutes} min/session</span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-400">
          <Dumbbell className="h-3.5 w-3.5 mr-2 text-gray-400" />
          <span className="truncate">{getEquipmentNames(program.equipment_required)}</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => onStart(program.id)}
        disabled={!canStart}
        variant={canStart ? "default" : "outline"}
        size="sm"
        className="w-full group"
      >
        {!canStart ? (
          <>
            <Crown className="h-3.5 w-3.5 mr-2" />
            Premium Required
          </>
        ) : (
          <>
            Start Program
            <ChevronRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </div>
  )
}