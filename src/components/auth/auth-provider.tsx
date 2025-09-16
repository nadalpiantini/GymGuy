'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-client'
import type { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    // Check if we're in development mode without Supabase
    if (!process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL || process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL === 'https://placeholder.supabase.co') {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('gymguy_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    // Check if we're in development mode without Supabase
    if (!process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL || process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.log('Development mode: Supabase not configured')
      return { error: new Error('Supabase not configured in development mode') }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, name: string) => {
    // Check if we're in development mode without Supabase
    if (!process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL || process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.log('Development mode: Supabase not configured')
      return { error: new Error('Supabase not configured in development mode') }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (!error && data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          name,
        } as any)

      if (profileError) {
        console.error('Error creating profile:', profileError)
        return { error: profileError }
      }
    }

    return { error }
  }

  const signOut = async () => {
    // Check if we're in development mode without Supabase
    if (!process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL || process.env.NEXT_PUBLIC_GYMGUY_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.log('Development mode: Supabase not configured')
      return
    }

    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    const { error } = await (supabase as any)
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    }

    return { error }
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
