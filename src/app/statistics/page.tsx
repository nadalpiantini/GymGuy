'use client'

import { PageHero } from '@/components/ui/page-hero'
import { StatCard } from '@/components/ui/stat-card'

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Your Progress"
        title="Your Statistics"
        subtitle="Track your fitness progress and achievements."
      />

      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              value={0}
              label="Workouts Completed"
            />
            <StatCard
              value="0h 0m"
              label="Total Time"
            />
            <StatCard
              value={0}
              label="Calories Burned"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
