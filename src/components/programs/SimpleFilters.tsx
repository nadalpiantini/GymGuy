'use client'

import { Search, X } from 'lucide-react'

interface SimpleFiltersProps {
  search: string
  level: string
  type: string
  onSearchChange: (value: string) => void
  onLevelChange: (value: string) => void
  onTypeChange: (value: string) => void
  onClearFilters: () => void
  resultCount: number
  totalCount: number
}

export default function SimpleFilters({
  search,
  level,
  type,
  onSearchChange,
  onLevelChange,
  onTypeChange,
  onClearFilters,
  resultCount,
  totalCount
}: SimpleFiltersProps) {
  const hasActiveFilters = search || level !== 'all' || type !== 'all'

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 mb-6 shadow-soft">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Level Filter */}
          <select
            value={level}
            onChange={(e) => onLevelChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="hiit">HIIT</option>
            <option value="mobility">Mobility</option>
            <option value="hybrid">Hybrid</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing <span className="font-semibold text-primary">{resultCount}</span>
          {resultCount === totalCount ? ' programs' : ` of ${totalCount} programs`}
        </div>
      </div>
    </div>
  )
}