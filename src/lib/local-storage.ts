// Local Storage Manager for GymGuy App
// Handles all localStorage operations with type safety

interface StorageItem {
  value: any
  timestamp: number
  expiry?: number
}

class LocalStorageManager {
  private prefix = 'gymguy_'

  // Generic get method with type safety
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key)
      if (!item) return defaultValue || null

      const parsed: StorageItem = JSON.parse(item)

      // Check if expired
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key)
        return defaultValue || null
      }

      return parsed.value as T
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return defaultValue || null
    }
  }

  // Generic set method with optional expiry
  set<T>(key: string, value: T, expiryHours?: number): boolean {
    try {
      const item: StorageItem = {
        value,
        timestamp: Date.now(),
        expiry: expiryHours ? Date.now() + (expiryHours * 60 * 60 * 1000) : undefined
      }
      localStorage.setItem(this.prefix + key, JSON.stringify(item))
      return true
    } catch (error) {
      console.error('LocalStorage set error:', error)
      return false
    }
  }

  // Remove item
  remove(key: string): void {
    localStorage.removeItem(this.prefix + key)
  }

  // Clear all GymGuy data
  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key))
  }

  // Get all keys
  getAllKeys(): string[] {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.replace(this.prefix, ''))
  }

  // Check if key exists
  has(key: string): boolean {
    return localStorage.getItem(this.prefix + key) !== null
  }

  // Get storage size in KB
  getSize(): number {
    let size = 0
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => {
        const item = localStorage.getItem(key)
        if (item) size += item.length
      })
    return Math.round(size / 1024)
  }
}

// User Progress Storage
interface UserProgress {
  userId: string
  currentProgram: string | null
  completedPrograms: string[]
  currentWeek: number
  totalWorkouts: number
  streak: number
  lastWorkoutDate: string | null
  personalRecords: Record<string, number>
  achievements: string[]
  experience: number
  level: number
}

// Program Progress Storage
interface ProgramProgress {
  programId: string
  startDate: string
  completedWorkouts: string[]
  currentPhase: number
  completionPercentage: number
  notes: string[]
}

// Workout Session Storage
interface WorkoutSession {
  id: string
  date: string
  programId: string
  workoutId: string
  exercises: ExerciseLog[]
  duration: number
  calories: number
  notes: string
}

interface ExerciseLog {
  exerciseId: string
  sets: SetLog[]
  notes: string
}

interface SetLog {
  reps: number
  weight: number
  rpe?: number // Rate of Perceived Exertion
  completed: boolean
}

// Achievements Storage
interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string | null
  progress: number
  target: number
  xpReward: number
  category: 'strength' | 'consistency' | 'endurance' | 'milestone'
}

// User Preferences
interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  units: 'metric' | 'imperial'
  language: string
  notifications: {
    workoutReminders: boolean
    achievements: boolean
    weeklyReport: boolean
  }
  privacy: {
    shareProgress: boolean
    publicProfile: boolean
  }
}

// Export storage instance and types
export const storage = new LocalStorageManager()

// Specialized storage functions
export const userStorage = {
  getProgress: () => storage.get<UserProgress>('user_progress', {
    userId: 'local_user',
    currentProgram: null,
    completedPrograms: [],
    currentWeek: 1,
    totalWorkouts: 0,
    streak: 0,
    lastWorkoutDate: null,
    personalRecords: {},
    achievements: [],
    experience: 0,
    level: 1
  }),

  setProgress: (progress: UserProgress) =>
    storage.set('user_progress', progress),

  updateProgress: (updates: Partial<UserProgress>) => {
    const current = userStorage.getProgress()!
    return storage.set('user_progress', { ...current, ...updates })
  }
}

export const programStorage = {
  getProgress: (programId: string) =>
    storage.get<ProgramProgress>(`program_${programId}`),

  setProgress: (programId: string, progress: ProgramProgress) =>
    storage.set(`program_${programId}`, progress),

  getAllProgress: () => {
    const keys = storage.getAllKeys()
    return keys
      .filter(key => key.startsWith('program_'))
      .map(key => storage.get<ProgramProgress>(key))
      .filter(Boolean) as ProgramProgress[]
  }
}

export const workoutStorage = {
  save: (session: WorkoutSession) =>
    storage.set(`workout_${session.id}`, session),

  get: (sessionId: string) =>
    storage.get<WorkoutSession>(`workout_${sessionId}`),

  getAll: () => {
    const keys = storage.getAllKeys()
    return keys
      .filter(key => key.startsWith('workout_'))
      .map(key => storage.get<WorkoutSession>(key))
      .filter(Boolean) as WorkoutSession[]
  },

  getByDateRange: (startDate: Date, endDate: Date) => {
    const sessions = workoutStorage.getAll()
    return sessions.filter(s => {
      const sessionDate = new Date(s.date)
      return sessionDate >= startDate && sessionDate <= endDate
    })
  }
}

export const achievementStorage = {
  getAll: () =>
    storage.get<Achievement[]>('achievements', []),

  unlock: (achievementId: string) => {
    const achievements = achievementStorage.getAll()
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString()
      storage.set('achievements', achievements)

      // Update user XP
      const progress = userStorage.getProgress()!
      progress.experience += achievement.xpReward

      // Check for level up
      const newLevel = Math.floor(progress.experience / 1000) + 1
      if (newLevel > progress.level) {
        progress.level = newLevel
      }

      userStorage.setProgress(progress)
      return true
    }
    return false
  },

  updateProgress: (achievementId: string, progress: number) => {
    const achievements = achievementStorage.getAll()
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement) {
      achievement.progress = Math.min(progress, achievement.target)

      // Auto unlock if target reached
      if (achievement.progress >= achievement.target && !achievement.unlockedAt) {
        achievementStorage.unlock(achievementId)
      } else {
        storage.set('achievements', achievements)
      }
    }
  }
}

export const preferencesStorage = {
  get: () => storage.get<UserPreferences>('preferences', {
    theme: 'dark',
    units: 'metric',
    language: 'en',
    notifications: {
      workoutReminders: true,
      achievements: true,
      weeklyReport: true
    },
    privacy: {
      shareProgress: true,
      publicProfile: false
    }
  }),

  set: (preferences: UserPreferences) =>
    storage.set('preferences', preferences),

  update: (updates: Partial<UserPreferences>) => {
    const current = preferencesStorage.get()!
    return storage.set('preferences', { ...current, ...updates })
  }
}

// Export types
export type {
  UserProgress,
  ProgramProgress,
  WorkoutSession,
  ExerciseLog,
  SetLog,
  Achievement,
  UserPreferences
}