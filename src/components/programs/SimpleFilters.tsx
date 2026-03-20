'use client'

import { Search, X } from 'lucide-react'
import { FormField } from '@/components/ui/form-field'

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
    <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] p-4 mb-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Level Filter */}
          <div className="flex-1">
            <FormField
              as="select"
              id="simple-filters-level"
              label=""
              value={level}
              onChange={(e) => onLevelChange(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </FormField>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <FormField
              as="select"
              id="simple-filters-type"
              label=""
              value={type}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="hiit">HIIT</option>
              <option value="mobility">Mobility</option>
              <option value="hybrid">Hybrid</option>
            </FormField>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)]/80 hover:bg-[var(--accent)]/10 rounded-lg transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-[var(--text-secondary)]">
          Showing <span className="font-semibold text-[var(--accent)]">{resultCount}</span>
          {resultCount === totalCount ? ' programs' : ` of ${totalCount} programs`}
        </div>
      </div>
    </div>
  )
}
