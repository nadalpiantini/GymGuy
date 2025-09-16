'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target,
  Weight,
  Dumbbell,
  Clock,
  Crown,
  Plus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface BodyWeightLog {
  id: string
  date: string
  weight_kg: number
}

interface SessionLog {
  id: string
  date: string
  duration_minutes: number | null
  total_volume: number | null
}

interface WorkoutItem {
  id: string
  exercise_id: number
  sets: number
  reps: number | null
  weight: number | null
}

interface Exercise {
  id: number
  name: string
}

export default function StatisticsPage() {
  const { user, profile } = useAuth()
  const [bodyWeightLogs, setBodyWeightLogs] = useState<BodyWeightLog[]>([])
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([])
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'4' | '8' | '12'>('8')
  const [showAddWeight, setShowAddWeight] = useState(false)
  const [newWeight, setNewWeight] = useState('')

  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    if (user) {
      loadStatisticsData()
    }
  }, [user, timeRange])

  const loadStatisticsData = async () => {
    if (!user) return

    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - (parseInt(timeRange) * 7))

      const [bodyWeightRes, sessionLogsRes, workoutItemsRes, exercisesRes] = await Promise.all([
        supabase
          .from('bodyweight_logs')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', startDate.toISOString().split('T')[0])
          .lte('date', endDate.toISOString().split('T')[0])
          .order('date'),
        supabase
          .from('session_logs')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', startDate.toISOString().split('T')[0])
          .lte('date', endDate.toISOString().split('T')[0])
          .order('date'),
        supabase
          .from('workout_items')
          .select(`
            *,
            workouts!inner(user_id)
          `)
          .eq('workouts.user_id', user.id)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString()),
        supabase.from('exercises').select('id, name')
      ])

      if (bodyWeightRes.data) setBodyWeightLogs(bodyWeightRes.data)
      if (sessionLogsRes.data) setSessionLogs(sessionLogsRes.data)
      if (workoutItemsRes.data) setWorkoutItems(workoutItemsRes.data)
      if (exercisesRes.data) setExercises(exercisesRes.data)
    } catch (error) {
      console.error('Error loading statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddWeight = async () => {
    if (!user || !newWeight) return

    try {
      const { error } = await supabase
        .from('bodyweight_logs')
        .upsert({
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          weight_kg: parseFloat(newWeight)
        } as any)

      if (error) throw error

      setNewWeight('')
      setShowAddWeight(false)
      loadStatisticsData()
    } catch (error) {
      console.error('Error adding weight:', error)
      alert('Error adding weight. Please try again.')
    }
  }

  const prepareWeightData = () => {
    return bodyWeightLogs.map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: log.weight_kg
    }))
  }

  const prepareVolumeData = () => {
    const weeklyData: { [key: string]: number } = {}
    
    sessionLogs.forEach(log => {
      const date = new Date(log.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split('T')[0]
      
      if (log.total_volume) {
        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + log.total_volume
      }
    })

    return Object.entries(weeklyData).map(([week, volume]) => ({
      week: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: Math.round(volume)
    }))
  }

  const calculateStats = () => {
    const totalSessions = sessionLogs.length
    const totalDuration = sessionLogs.reduce((sum, log) => sum + (log.duration_minutes || 0), 0)
    const totalVolume = sessionLogs.reduce((sum, log) => sum + (log.total_volume || 0), 0)
    const avgSessionDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0

    const weightChange = bodyWeightLogs.length >= 2 
      ? bodyWeightLogs[bodyWeightLogs.length - 1].weight_kg - bodyWeightLogs[0].weight_kg
      : 0

    return {
      totalSessions,
      totalDuration,
      totalVolume,
      avgSessionDuration,
      weightChange,
      currentWeight: bodyWeightLogs.length > 0 ? bodyWeightLogs[bodyWeightLogs.length - 1].weight_kg : null
    }
  }

  const stats = calculateStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in required</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your statistics</p>
          <Button onClick={() => window.location.href = '/login'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistics</h1>
            <p className="text-gray-600">Track your fitness progress and performance</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '4' | '8' | '12')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="4">Last 4 weeks</option>
              <option value="8">Last 8 weeks</option>
              <option value="12">Last 12 weeks</option>
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(stats.totalVolume)} kg
                </p>
              </div>
              <Dumbbell className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Session</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgSessionDuration}m
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Weight Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Weight Progress</h2>
            <Button
              onClick={() => setShowAddWeight(!showAddWeight)}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Weight</span>
            </Button>
          </div>

          {showAddWeight && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Weight (kg)"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleAddWeight} disabled={!newWeight}>
                  Add
                </Button>
                <Button variant="outline" onClick={() => setShowAddWeight(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {bodyWeightLogs.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prepareWeightData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12">
              <Weight className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No weight data available</p>
              <p className="text-sm text-gray-400">Add your first weight entry to start tracking</p>
            </div>
          )}

          {stats.currentWeight && (
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Weight</p>
                <p className="text-xl font-bold text-gray-900">{stats.currentWeight} kg</p>
              </div>
              {stats.weightChange !== 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Change ({timeRange} weeks)</p>
                  <p className={`text-xl font-bold ${stats.weightChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {stats.weightChange > 0 ? '+' : ''}{stats.weightChange.toFixed(1)} kg
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Volume Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Training Volume</h2>
          
          {sessionLogs.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareVolumeData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No training volume data available</p>
              <p className="text-sm text-gray-400">Complete some workouts to see your volume progress</p>
            </div>
          )}
        </div>

        {/* Premium Features */}
        {profile?.plan !== 'premium' && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-center">
            <Crown className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Unlock Advanced Statistics
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get detailed analytics, exercise-specific progress tracking, 
              and personalized insights with premium membership.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.location.href = '/premium'}
            >
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
