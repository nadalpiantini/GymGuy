'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Sign in required</h1>
          <p className="text-[var(--text-secondary)] mb-6">Please sign in to view your profile</p>
          <Button onClick={() => window.location.href = '/login'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Account"
        title="Profile"
        subtitle="Manage your account settings"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header card */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  {profile?.name || 'User Profile'}
                </h2>
                <p className="text-[var(--text-secondary)]">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {profile?.plan === 'premium' ? (
                    <>
                      <Crown className="h-4 w-4 text-[var(--warning)]" />
                      <Badge variant="premium">Premium Member</Badge>
                    </>
                  ) : (
                    <span className="text-sm text-[var(--text-secondary)]">Free Member</span>
                  )}
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Profile Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="profile-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="profile-locale" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Language
                  </label>
                  <select
                    id="profile-locale"
                    value={formData.locale}
                    onChange={(e) => setFormData(prev => ({ ...prev, locale: e.target.value }))}
                    className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)]"
                    disabled
                  >
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="profile-units" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Units
                  </label>
                  <select
                    id="profile-units"
                    value={formData.units}
                    onChange={(e) => setFormData(prev => ({ ...prev, units: e.target.value }))}
                    className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)]"
                  >
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lbs, ft/in)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="profile-timezone" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Timezone
                  </label>
                  <select
                    id="profile-timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)]"
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
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Member since</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {new Date(profile?.created_at || '').toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Plan</span>
                  <span className="font-medium text-[var(--text-primary)] capitalize">{profile?.plan}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Language</span>
                  <span className="font-medium text-[var(--text-primary)] uppercase">{profile?.locale}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Units</span>
                  <span className="font-medium text-[var(--text-primary)] capitalize">{profile?.units}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h3>
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
