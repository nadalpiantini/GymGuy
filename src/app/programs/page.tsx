'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SimpleNav from '@/components/layout/simple-nav'
import programsData from '@/data/programs.json'
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

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'intermediate': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      case 'advanced': return 'text-red-500 bg-red-500/10 border-red-500/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
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
            : 'bg-zinc-800'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-black">
      <SimpleNav />
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Training Programs
            </h1>
            <p className="text-xl text-gray-400">
              Science-based programs designed for real results
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white hover:border-blue-500 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg py-2 px-3 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="hiit">HIIT</option>
                      <option value="mobility">Mobility</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {filteredPrograms.length} of {programs.length} programs
            </p>
          </div>

          {/* Program Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-blue-500 transition-all duration-300 overflow-hidden group"
              >
                {/* Program Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600">
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(program.level)}`}>
                      {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-3xl">
                    {getTypeIcon(program.type)}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {program.name}
                    </h3>
                  </div>
                </div>

                {/* Program Details */}
                <div className="p-6">
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{program.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Dumbbell className="w-4 h-4 text-gray-500" />
                      <span>{program.frequency_per_week}x/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{program.session_duration_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span>{program.type}</span>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Difficulty</span>
                      <span className="text-xs text-gray-400">{program.difficulty}/10</span>
                    </div>
                    <div className="flex gap-1">
                      {getDifficultyBars(program.difficulty)}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-white font-medium">{program.rating}</span>
                      <span className="text-sm text-gray-500">({program.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">{program.reviews} users</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push(`/programs/${program.id}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105">
                    View Program
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No programs found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedLevel('all')
                  setSelectedType('all')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
