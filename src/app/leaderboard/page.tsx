'use client'

import { useState, useEffect, useCallback } from 'react'
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

  const loadLeaderboard = useCallback(async () => {
    try {
      // Try to get cached leaderboard first
      const { data: snapshot, error: snapshotError } = await supabase
        .from('gymguy_leaderboard_snapshots')
        .select('*')
        .eq('period', period)
        .eq('scope', scope)
        .order('generated_at', { ascending: false })
        .limit(1)
        .single()

      if (snapshot && !snapshotError) {
        setLeaderboard((snapshot as LeaderboardSnapshot).ranks || [])
        setLoading(false)
        return
      }

      // If no cached data, use mock data
      setLeaderboard([])
      setLoading(false)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
      setLoading(false)
    }
  }, [period, scope])

  useEffect(() => {
    loadLeaderboard()
  }, [loadLeaderboard])

  const generateLeaderboard = async () => {
    try {
      let query = supabase
        .from('gymguy_session_logs')
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

      // Cache the leaderboard
      await supabase
        .from('gymguy_leaderboard_snapshots')
        .insert({
          period,
          scope,
          ranks: leaderboardData,
          generated_at: new Date().toISOString()
        })

      setLoading(false)
    } catch (error) {
      console.error('Error generating leaderboard:', error)
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Trophy className="w-6 h-6 text-orange-600" />
      default:
        return <Medal className="w-6 h-6 text-gray-300" />
    }
  }

  const getScopeLabel = () => {
    switch (scope) {
      case 'workouts':
        return 'Workouts Completed'
      case 'volume':
        return 'Total Volume (lbs)'
      case 'streak':
        return 'Current Streak'
      default:
        return 'Workouts Completed'
    }
  }

  const getPeriodLabel = () => {
    switch (period) {
      case 'week':
        return 'This Week'
      case 'month':
        return 'This Month'
      case 'all_time':
        return 'All Time'
      default:
        return 'This Week'
    }
  }

  const currentUserRank = leaderboard.find(entry => entry.user_id === user?.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            See how you stack up against other gym members
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={period === 'week' ? 'default' : 'outline'}
                onClick={() => setPeriod('week')}
                size="sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                This Week
              </Button>
              <Button
                variant={period === 'month' ? 'default' : 'outline'}
                onClick={() => setPeriod('month')}
                size="sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                This Month
              </Button>
              <Button
                variant={period === 'all_time' ? 'default' : 'outline'}
                onClick={() => setPeriod('all_time')}
                size="sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                All Time
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={scope === 'workouts' ? 'default' : 'outline'}
                onClick={() => setScope('workouts')}
                size="sm"
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                Workouts
              </Button>
              <Button
                variant={scope === 'volume' ? 'default' : 'outline'}
                onClick={() => setScope('volume')}
                size="sm"
              >
                <Target className="w-4 h-4 mr-2" />
                Volume
              </Button>
              <Button
                variant={scope === 'streak' ? 'default' : 'outline'}
                onClick={() => setScope('streak')}
                size="sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Streak
              </Button>
            </div>
          </div>
        </div>

        {/* Current User Stats */}
        {currentUserRank && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Rank</h3>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">{currentUserRank.rank}</span>
                  </div>
                  <div>
                    <p className="font-medium">{currentUserRank.name}</p>
                    <p className="text-sm opacity-90">
                      {getScopeLabel()}: {
                        scope === 'workouts' ? currentUserRank.workouts :
                        scope === 'volume' ? currentUserRank.volume :
                        currentUserRank.streak
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">{getPeriodLabel()}</p>
                <p className="text-lg font-semibold">
                  Top {Math.round((currentUserRank.rank / leaderboard.length) * 100)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {getPeriodLabel()} - {getScopeLabel()}
            </h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboard.map((entry) => (
                <div
                  key={entry.user_id}
                  className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    entry.user_id === user?.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div>
                      <p className={`font-medium ${
                        entry.user_id === user?.id 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {entry.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getScopeLabel()}: {
                          scope === 'workouts' ? entry.workouts :
                          scope === 'volume' ? entry.volume :
                          entry.streak
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      entry.user_id === user?.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      #{entry.rank}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round((entry.rank / leaderboard.length) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Total Members
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {leaderboard.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Dumbbell className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Avg. {getScopeLabel()}
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {leaderboard.length > 0 
                ? Math.round(leaderboard.reduce((sum, entry) => 
                    sum + (scope === 'workouts' ? entry.workouts :
                          scope === 'volume' ? entry.volume :
                          entry.streak), 0) / leaderboard.length)
                : 0
              }
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Top Performer
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {leaderboard[0]?.name || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}