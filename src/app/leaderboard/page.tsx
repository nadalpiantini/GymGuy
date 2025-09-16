'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Users, 
  Calendar,
  TrendingUp,
  Target,
  Dumbbell
} from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  user_id: string
  name: string
  workouts: number
  volume: number
  streak: number
}

interface LeaderboardSnapshot {
  id: string
  period: 'all_time' | 'month' | 'week'
  scope: string
  ranks: LeaderboardEntry[]
  generated_at: string
}

export default function LeaderboardPage() {
  const { user, profile } = useAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'all_time' | 'month' | 'week'>('week')
  const [scope, setScope] = useState<'workouts' | 'volume' | 'streak'>('workouts')

  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    loadLeaderboard()
  }, [period, scope])

  const loadLeaderboard = async () => {
    try {
      // Try to get cached leaderboard first
      const { data: snapshot, error: snapshotError } = await supabase
        .from('leaderboard_snapshots')
        .select('*')
        .eq('period', period)
        .eq('scope', scope)
        .order('generated_at', { ascending: false })
        .limit(1)
        .single()

      if (snapshot && !snapshotError) {
        setLeaderboard((snapshot as any).ranks || [])
        setLoading(false)
        return
      }

      // If no cached data, generate leaderboard
      await generateLeaderboard()
    } catch (error) {
      console.error('Error loading leaderboard:', error)
      setLoading(false)
    }
  }

  const generateLeaderboard = async () => {
    try {
      let query = supabase
        .from('session_logs')
        .select(`
          user_id,
          profiles!inner(name),
          total_volume
        `)

      // Apply time filter based on period
      if (period === 'week') {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        query = query.gte('date', weekAgo.toISOString().split('T')[0])
      } else if (period === 'month') {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        query = query.gte('date', monthAgo.toISOString().split('T')[0])
      }

      const { data: sessionData, error } = await query

      if (error) throw error

      // Process data to create leaderboard
      const userStats: { [key: string]: { name: string; workouts: number; volume: number } } = {}

      sessionData?.forEach((session: any) => {
        const userId = session.user_id
        if (!userStats[userId]) {
          userStats[userId] = {
            name: session.profiles?.name || 'Anonymous',
            workouts: 0,
            volume: 0
          }
        }
        userStats[userId].workouts += 1
        userStats[userId].volume += session.total_volume || 0
      })

      // Convert to array and sort
      const leaderboardData = Object.entries(userStats)
        .map(([userId, stats]) => ({
          rank: 0, // Will be set after sorting
          user_id: userId,
          name: stats.name,
          workouts: stats.workouts,
          volume: Math.round(stats.volume),
          streak: 0 // TODO: Calculate actual streak
        }))
        .sort((a, b) => {
          switch (scope) {
            case 'workouts':
              return b.workouts - a.workouts
            case 'volume':
              return b.volume - a.volume
            case 'streak':
              return b.streak - a.streak
            default:
              return b.workouts - a.workouts
          }
        })
        .map((entry, index) => ({
          ...entry,
          rank: index + 1
        }))
        .slice(0, 50) // Top 50

      setLeaderboard(leaderboardData)

      // Cache the result
      await supabase
        .from('leaderboard_snapshots')
        .insert({
          period,
          scope,
          ranks: leaderboardData,
          generated_at: new Date().toISOString()
        } as any)

    } catch (error) {
      console.error('Error generating leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Medal className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>
  }

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'workouts': return <Target className="h-4 w-4" />
      case 'volume': return <Dumbbell className="h-4 w-4" />
      case 'streak': return <TrendingUp className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getScopeLabel = (scope: string) => {
    switch (scope) {
      case 'workouts': return 'Workouts Completed'
      case 'volume': return 'Total Volume (kg)'
      case 'streak': return 'Current Streak'
      default: return 'Workouts Completed'
    }
  }

  const getScopeValue = (entry: LeaderboardEntry) => {
    switch (scope) {
      case 'workouts': return entry.workouts
      case 'volume': return entry.volume
      case 'streak': return entry.streak
      default: return entry.workouts
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Champions Leaderboard
          </h1>
          <p className="text-xl text-gray-600">
            Compete with the community and climb to the top of the rankings
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <div className="flex space-x-2">
                {[
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                  { value: 'all_time', label: 'All Time' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPeriod(option.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      period === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ranking Criteria
              </label>
              <div className="flex space-x-2">
                {[
                  { value: 'workouts', label: 'Workouts', icon: Target },
                  { value: 'volume', label: 'Volume', icon: Dumbbell },
                  { value: 'streak', label: 'Streak', icon: TrendingUp }
                ].map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => setScope(option.value as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                        scope === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              {getScopeIcon(scope)}
              <span className="ml-2">{getScopeLabel(scope)}</span>
            </h2>
          </div>

          {leaderboard.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.user_id}
                  className={`p-6 flex items-center justify-between ${
                    entry.user_id === user?.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getMedalIcon(entry.rank)}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {entry.name}
                        </h3>
                        {entry.user_id === user?.id && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {entry.workouts} workouts
                        </span>
                        <span className="flex items-center">
                          <Dumbbell className="h-4 w-4 mr-1" />
                          {entry.volume} kg
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {getScopeValue(entry)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {scope === 'workouts' && 'workouts'}
                      {scope === 'volume' && 'kg'}
                      {scope === 'streak' && 'days'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No data available
              </h3>
              <p className="text-gray-600">
                Complete some workouts to appear on the leaderboard
              </p>
            </div>
          )}
        </div>

        {/* Sign In Prompt */}
        {!user && (
          <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Join the Competition
            </h3>
            <p className="text-blue-700 mb-4">
              Sign in to track your progress and compete with other users
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How the Leaderboard Works
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• <strong>Weekly:</strong> Rankings reset every Monday at midnight (Paris time)</p>
            <p>• <strong>Monthly:</strong> Rankings reset on the 1st of each month</p>
            <p>• <strong>All Time:</strong> Cumulative rankings since account creation</p>
            <p>• <strong>Workouts:</strong> Number of completed training sessions</p>
            <p>• <strong>Volume:</strong> Total weight lifted (kg × reps × sets)</p>
            <p>• <strong>Streak:</strong> Consecutive days with completed workouts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
