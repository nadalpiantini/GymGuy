export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: {
          id: string
          email: string
          name?: string | null
          locale?: string
          units?: string
          plan?: 'free' | 'premium'
          timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          locale?: string
          units?: string
          plan?: 'free' | 'premium'
          timezone?: string
          created_at?: string
          updated_at?: string
        }
      }
      equipment: {
        Row: {
          id: number
          name: string
          slug: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          icon?: string | null
          created_at?: string
        }
      }
      muscles: {
        Row: {
          id: number
          name: string
          slug: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          icon?: string | null
          created_at?: string
        }
      }
      exercises: {
        Row: {
          id: number
          name: string
          description: string | null
          video_url: string | null
          cues: string[] | null
          difficulty: string
          equipment_required: number[]
          primary_muscles: number[]
          secondary_muscles: number[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          video_url?: string | null
          cues?: string[] | null
          difficulty?: string
          equipment_required?: number[]
          primary_muscles?: number[]
          secondary_muscles?: number[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          video_url?: string | null
          cues?: string[] | null
          difficulty?: string
          equipment_required?: number[]
          primary_muscles?: number[]
          secondary_muscles?: number[]
          created_at?: string
          updated_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          name: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_items: {
        Row: {
          id: string
          workout_id: string
          exercise_id: number
          sets: number
          reps: number | null
          weight: number | null
          tempo: string | null
          rest_seconds: number
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          exercise_id: number
          sets?: number
          reps?: number | null
          weight?: number | null
          tempo?: string | null
          rest_seconds?: number
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          exercise_id?: number
          sets?: number
          reps?: number | null
          weight?: number | null
          tempo?: string | null
          rest_seconds?: number
          order_index?: number
          created_at?: string
        }
      }
      programs: {
        Row: {
          id: number
          name: string
          description: string | null
          level: 'beginner' | 'intermediate' | 'advanced'
          type: 'strength' | 'cardio' | 'hiit' | 'mobility' | 'hybrid'
          duration_weeks: number
          frequency_per_week: number
          session_duration_minutes: number | null
          equipment_required: number[]
          is_premium: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          level: 'beginner' | 'intermediate' | 'advanced'
          type: 'strength' | 'cardio' | 'hiit' | 'mobility' | 'hybrid'
          duration_weeks: number
          frequency_per_week: number
          session_duration_minutes?: number | null
          equipment_required?: number[]
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          type?: 'strength' | 'cardio' | 'hiit' | 'mobility' | 'hybrid'
          duration_weeks?: number
          frequency_per_week?: number
          session_duration_minutes?: number | null
          equipment_required?: number[]
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      program_sessions: {
        Row: {
          id: number
          program_id: number
          week: number
          day: number
          name: string | null
          blocks: any
          created_at: string
        }
        Insert: {
          id?: number
          program_id: number
          week: number
          day: number
          name?: string | null
          blocks: any
          created_at?: string
        }
        Update: {
          id?: number
          program_id?: number
          week?: number
          day?: number
          name?: string | null
          blocks?: any
          created_at?: string
        }
      }
      user_programs: {
        Row: {
          id: string
          user_id: string
          program_id: number
          started_at: string
          status: 'active' | 'completed' | 'paused' | 'cancelled'
          current_week: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          program_id: number
          started_at?: string
          status?: 'active' | 'completed' | 'paused' | 'cancelled'
          current_week?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: number
          started_at?: string
          status?: 'active' | 'completed' | 'paused' | 'cancelled'
          current_week?: number
          created_at?: string
          updated_at?: string
        }
      }
      session_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          workout_id: string | null
          program_session_id: number | null
          duration_minutes: number | null
          total_volume: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          workout_id?: string | null
          program_session_id?: number | null
          duration_minutes?: number | null
          total_volume?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          workout_id?: string | null
          program_session_id?: number | null
          duration_minutes?: number | null
          total_volume?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      bodyweight_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          weight_kg: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          weight_kg: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          weight_kg?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan: 'free' | 'premium'
          status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          amount: number | null
          currency: string
          period_start: string | null
          period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan: 'free' | 'premium'
          status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          amount?: number | null
          currency?: string
          period_start?: string | null
          period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: 'free' | 'premium'
          status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          amount?: number | null
          currency?: string
          period_start?: string | null
          period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leaderboard_snapshots: {
        Row: {
          id: string
          period: 'all_time' | 'month' | 'week'
          scope: string
          ranks: any
          generated_at: string
        }
        Insert: {
          id?: string
          period: 'all_time' | 'month' | 'week'
          scope: string
          ranks: any
          generated_at?: string
        }
        Update: {
          id?: string
          period?: 'all_time' | 'month' | 'week'
          scope?: string
          ranks?: any
          generated_at?: string
        }
      }
      translations: {
        Row: {
          id: number
          key: string
          locale: string
          value: string
          created_at: string
        }
        Insert: {
          id?: number
          key: string
          locale: string
          value: string
          created_at?: string
        }
        Update: {
          id?: number
          key?: string
          locale?: string
          value?: string
          created_at?: string
        }
      }
    }
  }
}