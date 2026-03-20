'use client'

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold text-primary mb-6">
              Your Statistics
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Track your fitness progress and achievements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Workouts Completed</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Total Time</h3>
              <p className="text-3xl font-bold text-white">0h 0m</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Calories Burned</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
