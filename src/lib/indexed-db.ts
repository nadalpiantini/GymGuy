// IndexedDB Manager for GymGuy App
// Handles complex data storage with better performance than localStorage

interface DBConfig {
  name: string
  version: number
  stores: StoreConfig[]
}

interface StoreConfig {
  name: string
  keyPath: string
  indexes?: IndexConfig[]
}

interface IndexConfig {
  name: string
  keyPath: string | string[]
  unique?: boolean
}

class IndexedDBManager {
  private db: IDBDatabase | null = null
  private dbName = 'GymGuyDB'
  private version = 1

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create stores
        this.createStores(db)
      }
    })
  }

  private createStores(db: IDBDatabase): void {
    // Programs store
    if (!db.objectStoreNames.contains('programs')) {
      const programStore = db.createObjectStore('programs', { keyPath: 'id' })
      programStore.createIndex('level', 'level', { unique: false })
      programStore.createIndex('type', 'type', { unique: false })
      programStore.createIndex('duration', 'duration_weeks', { unique: false })
    }

    // Exercises store
    if (!db.objectStoreNames.contains('exercises')) {
      const exerciseStore = db.createObjectStore('exercises', { keyPath: 'id' })
      exerciseStore.createIndex('name', 'name', { unique: false })
      exerciseStore.createIndex('category', 'category', { unique: false })
      exerciseStore.createIndex('muscle', 'primaryMuscle', { unique: false })
    }

    // Workouts store
    if (!db.objectStoreNames.contains('workouts')) {
      const workoutStore = db.createObjectStore('workouts', { keyPath: 'id' })
      workoutStore.createIndex('date', 'date', { unique: false })
      workoutStore.createIndex('programId', 'programId', { unique: false })
    }

    // Progress Photos store
    if (!db.objectStoreNames.contains('photos')) {
      const photoStore = db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true })
      photoStore.createIndex('date', 'date', { unique: false })
      photoStore.createIndex('type', 'type', { unique: false })
    }

    // Body Measurements store
    if (!db.objectStoreNames.contains('measurements')) {
      const measurementStore = db.createObjectStore('measurements', { keyPath: 'id', autoIncrement: true })
      measurementStore.createIndex('date', 'date', { unique: false })
      measurementStore.createIndex('type', 'type', { unique: false })
    }
  }

  // Generic CRUD operations
  async add<T>(storeName: string, data: T): Promise<number | string> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => resolve(request.result as number | string)
      request.onerror = () => reject(request.error)
    })
  }

  async get<T>(storeName: string, key: number | string): Promise<T | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  async update<T>(storeName: string, data: T): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async delete(storeName: string, key: number | string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async query<T>(
    storeName: string,
    indexName: string,
    value: any
  ): Promise<T[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = index.getAll(value)

      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

// Data Types
export interface Program {
  id: string
  name: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  type: 'strength' | 'cardio' | 'hiit' | 'mobility' | 'hybrid'
  duration_weeks: number
  frequency_per_week: number
  session_duration_minutes: number
  equipment_required: string[]
  phases: ProgramPhase[]
  workouts: ProgramWorkout[]
  tags: string[]
  rating: number
  reviews: number
  difficulty: number
  imageUrl?: string
}

export interface ProgramPhase {
  id: string
  name: string
  weeks: number
  description: string
  focus: string[]
  workouts: string[]
}

export interface ProgramWorkout {
  id: string
  week: number
  day: number
  name: string
  description: string
  warmup: Exercise[]
  main: Exercise[]
  cooldown: Exercise[]
  estimatedDuration: number
}

export interface Exercise {
  id: string
  name: string
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'plyometric'
  primaryMuscle: string
  secondaryMuscles: string[]
  equipment: string[]
  instructions: string[]
  tips: string[]
  variations: string[]
  difficulty: number
  videoUrl?: string
  imageUrl?: string
  sets?: number
  reps?: string // Can be range like "8-12"
  rest?: number // in seconds
  tempo?: string // e.g., "2-0-2-0"
  rpe?: number // Rate of Perceived Exertion
}

export interface ProgressPhoto {
  id?: number
  date: string
  type: 'front' | 'side' | 'back'
  dataUrl: string
  weight?: number
  notes?: string
}

export interface BodyMeasurement {
  id?: number
  date: string
  type: string // 'weight', 'chest', 'waist', 'hips', 'arms', etc.
  value: number
  unit: 'kg' | 'lbs' | 'cm' | 'inches'
  notes?: string
}

// Export database instance
export const db = new IndexedDBManager()

// Specialized database functions
export const programDB = {
  async getAll(): Promise<Program[]> {
    return db.getAll<Program>('programs')
  },

  async get(id: string): Promise<Program | null> {
    return db.get<Program>('programs', id)
  },

  async getByLevel(level: string): Promise<Program[]> {
    return db.query<Program>('programs', 'level', level)
  },

  async getByType(type: string): Promise<Program[]> {
    return db.query<Program>('programs', 'type', type)
  },

  async search(query: string): Promise<Program[]> {
    const all = await db.getAll<Program>('programs')
    const lowercaseQuery = query.toLowerCase()
    return all.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags.some(t => t.toLowerCase().includes(lowercaseQuery))
    )
  }
}

export const exerciseDB = {
  async getAll(): Promise<Exercise[]> {
    return db.getAll<Exercise>('exercises')
  },

  async get(id: string): Promise<Exercise | null> {
    return db.get<Exercise>('exercises', id)
  },

  async getByCategory(category: string): Promise<Exercise[]> {
    return db.query<Exercise>('exercises', 'category', category)
  },

  async getByMuscle(muscle: string): Promise<Exercise[]> {
    return db.query<Exercise>('exercises', 'muscle', muscle)
  },

  async search(query: string): Promise<Exercise[]> {
    const all = await db.getAll<Exercise>('exercises')
    const lowercaseQuery = query.toLowerCase()
    return all.filter(e =>
      e.name.toLowerCase().includes(lowercaseQuery) ||
      e.primaryMuscle.toLowerCase().includes(lowercaseQuery) ||
      e.secondaryMuscles.some(m => m.toLowerCase().includes(lowercaseQuery))
    )
  }
}

export const photoStorage = {
  async save(photo: ProgressPhoto): Promise<number | string> {
    return db.add('photos', photo)
  },

  async getAll(): Promise<ProgressPhoto[]> {
    return db.getAll<ProgressPhoto>('photos')
  },

  async getByDate(date: string): Promise<ProgressPhoto[]> {
    return db.query<ProgressPhoto>('photos', 'date', date)
  },

  async delete(id: number): Promise<void> {
    return db.delete('photos', id)
  }
}

export const measurementStorage = {
  async save(measurement: BodyMeasurement): Promise<number | string> {
    return db.add('measurements', measurement)
  },

  async getAll(): Promise<BodyMeasurement[]> {
    return db.getAll<BodyMeasurement>('measurements')
  },

  async getByType(type: string): Promise<BodyMeasurement[]> {
    return db.query<BodyMeasurement>('measurements', 'type', type)
  },

  async getLatest(type: string): Promise<BodyMeasurement | null> {
    const measurements = await measurementStorage.getByType(type)
    if (measurements.length === 0) return null
    return measurements.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0]
  }
}