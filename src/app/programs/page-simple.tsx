'use client'

import SimpleNav from '@/components/layout/simple-nav'

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-black">
      <SimpleNav />
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold text-primary mb-6">
              Fitness Programs
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from our curated collection of fitness programs designed for all levels.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Beginner Program</h3>
              <p className="text-gray-400 mb-6">Perfect for those starting their fitness journey.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Intermediate Program</h3>
              <p className="text-gray-400 mb-6">For those with some fitness experience.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Advanced Program</h3>
              <p className="text-gray-400 mb-6">Challenging workouts for experienced athletes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
