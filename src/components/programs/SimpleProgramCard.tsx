'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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
  const getLevelBadgeVariant = (level: string): 'success' | 'warning' | 'default' => {
    const variants = {
      beginner: 'success' as const,
      intermediate: 'warning' as const,
      advanced: 'default' as const,
    }
    return variants[level as keyof typeof variants] ?? 'default'
  }

  const getTypeColor = (type: string) => {
    const colors = {
      strength: 'text-blue-500',
      cardio: 'text-red-500',
      hiit: 'text-orange-500',
      mobility: 'text-green-500',
      hybrid: 'text-purple-500'
    }
    return colors[type as keyof typeof colors] || 'text-[var(--text-secondary)]'
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
    <Card variant="interactive" className="hover:border-[var(--accent)]/30">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">
            {program.name}
          </h3>
          {program.is_premium && (
            <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
          )}
        </div>

        {/* Level & Type */}
        <div className="flex items-center gap-2">
          <Badge variant={getLevelBadgeVariant(program.level)}>
            {program.level}
          </Badge>
          {program.is_premium && (
            <Badge variant="premium">Premium</Badge>
          )}
          <span className={`text-xs font-medium ${getTypeColor(program.type)}`}>
            {program.type}
          </span>
        </div>
      </div>

      {/* Description */}
      {program.description && (
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {program.description}
        </p>
      )}

      {/* Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-[var(--text-secondary)]">
          <Calendar className="h-3.5 w-3.5 mr-2 text-[var(--text-secondary)]" />
          <span>{program.duration_weeks} weeks</span>
        </div>

        <div className="flex items-center text-sm text-[var(--text-secondary)]">
          <Users className="h-3.5 w-3.5 mr-2 text-[var(--text-secondary)]" />
          <span>{program.frequency_per_week}x per week</span>
        </div>

        {program.session_duration_minutes && (
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <Clock className="h-3.5 w-3.5 mr-2 text-[var(--text-secondary)]" />
            <span>{program.session_duration_minutes} min/session</span>
          </div>
        )}

        <div className="flex items-center text-sm text-[var(--text-secondary)]">
          <Dumbbell className="h-3.5 w-3.5 mr-2 text-[var(--text-secondary)]" />
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
    </Card>
  )
}
