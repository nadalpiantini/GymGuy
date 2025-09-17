'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Settings, 
  Calendar, 
  BarChart3, 
  Crown,
  LogOut,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

interface Profile {
  id: string
  email: string
  name: string | null
  locale: string
  units: string
  plan: 'free' | 'premium'
  timezone: string
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { user, profile, updateProfile, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    locale: 'en',
    units: 'metric',
    timezone: 'UTC'
  })

  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        locale: profile.locale,
        units: profile.units,
        timezone: profile.timezone
      })
    }
  }, [profile])

  const handleSave = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { error } = await updateProfile(formData)
      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in required</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your profile</p>
          <Button onClick={() => window.location.href = '/login'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.name || 'User Profile'}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {profile?.plan === 'premium' ? (
                    <>
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600 font-medium">Premium Member</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-600">Free Member</span>
                  )}
                </div>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Profile Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={formData.locale}
                    onChange={(e) => setFormData(prev => ({ ...prev, locale: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  >
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Units
                  </label>
                  <select
                    value={formData.units}
                    onChange={(e) => setFormData(prev => ({ ...prev, units: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lbs, ft/in)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {new Date(profile?.created_at || '').toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium capitalize">{profile?.plan}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium uppercase">{profile?.locale}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Units</span>
                  <span className="font-medium capitalize">{profile?.units}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/workouts'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Workout
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/statistics'}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Statistics
                </Button>
                {profile?.plan !== 'premium' && (
                  <Button
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/premium'}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
