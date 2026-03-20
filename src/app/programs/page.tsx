'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import programsData from '@/data/programs.json'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FormField } from '@/components/ui/form-field'
import { Button } from '@/components/ui/button'
import { Search, Filter, Clock, Calendar, Dumbbell, TrendingUp, Star, Users } from 'lucide-react'

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
  tags: string[]
  rating: number
  reviews: number
  difficulty: number
  imageUrl?: string
}

export default function ProgramsPage() {
  const router = useRouter()
  const [programs, setPrograms] = useState<Program[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Load programs from JSON
    setPrograms(programsData as Program[])
    setFilteredPrograms(programsData as Program[])
  }, [])

  useEffect(() => {
    // Filter programs based on search and filters
    let filtered = programs

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(p => p.level === selectedLevel)
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType)
    }

    setFilteredPrograms(filtered)
  }, [searchTerm, selectedLevel, selectedType, programs])

  const getLevelBadgeVariant = (level: string): 'success' | 'default' | 'warning' => {
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

  const getDifficultyBars = (difficulty: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        className={`h-2 w-3 rounded-sm ${
          i < difficulty
            ? difficulty <= 3 ? 'bg-green-500'
              : difficulty <= 6 ? 'bg-yellow-500'
              : 'bg-red-500'
            : 'bg-[var(--bg-tertiary)]'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Structured Training"
        title="Training Programs"
        subtitle="Science-based programs designed for real results"
      />

      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg py-3 pl-10 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <Card className="mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    as="select"
                    id="programs-level"
                    label="Level"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </FormField>
                  <FormField
                    as="select"
                    id="programs-type"
                    label="Type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="hiit">HIIT</option>
                    <option value="mobility">Mobility</option>
                    <option value="hybrid">Hybrid</option>
                  </FormField>
                </div>
              </Card>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[var(--text-secondary)]">
              Showing {filteredPrograms.length} of {programs.length} programs
            </p>
          </div>

          {/* Program Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card
                key={program.id}
                variant="interactive"
                className="overflow-hidden p-0 group"
              >
                {/* Program Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600">
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4">
                    <Badge variant={getLevelBadgeVariant(program.level)}>
                      {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 text-3xl">
                    {getTypeIcon(program.type)}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                      {program.name}
                    </h3>
                  </div>
                </div>

                {/* Program Details */}
                <div className="p-6">
                  <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
                      <span>{program.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Dumbbell className="w-4 h-4 text-[var(--text-secondary)]" />
                      <span>{program.frequency_per_week}x/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
                      <span>{program.session_duration_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <TrendingUp className="w-4 h-4 text-[var(--text-secondary)]" />
                      <span>{program.type}</span>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[var(--text-secondary)]">Difficulty</span>
                      <span className="text-xs text-[var(--text-secondary)]">{program.difficulty}/10</span>
                    </div>
                    <div className="flex gap-1">
                      {getDifficultyBars(program.difficulty)}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-[var(--text-primary)] font-medium">{program.rating}</span>
                      <span className="text-sm text-[var(--text-secondary)]">({program.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[var(--text-secondary)]" />
                      <span className="text-sm text-[var(--text-secondary)]">{program.reviews} users</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => router.push(`/programs/${program.id}`)}
                    className="w-full"
                  >
                    View Program
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                No programs found
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedLevel('all')
                  setSelectedType('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
