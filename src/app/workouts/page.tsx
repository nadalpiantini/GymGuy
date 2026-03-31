'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/ui/page-hero'
import {
  fetchMuscles,
  fetchEquipment,
  fetchExercises,
  type WgerMuscle,
  type WgerEquipment,
  type WgerExerciseInfo,
} from '@/lib/wger-client'
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Plus,
  Dumbbell,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MappedExercise {
  id: number
  name: string
  description: string
  primary_muscles: string[]
  secondary_muscles: string[]
  equipment: string[]
  image_url: string | null
  category: string
}

interface WorkoutItem {
  exercise_id: number
  sets: number
  reps: number | null
  weight: number | null
  rest_seconds: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapWgerToUI(exercise: WgerExerciseInfo): MappedExercise {
  const translation =
    exercise.translations.find(t => t.language === 2) ?? exercise.translations[0]
  const mainImage =
    exercise.images.find(i => i.is_main) ?? exercise.images[0]
  return {
    id: exercise.id,
    name: translation?.name || `Exercise #${exercise.id}`,
    description: translation?.description || '',
    primary_muscles: exercise.muscles.map(m => m.name_en),
    secondary_muscles: exercise.muscles_secondary.map(m => m.name_en),
    equipment: exercise.equipment.map(e => e.name),
    image_url: mainImage?.image || null,
    category: exercise.category.name,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkoutGeneratorPage() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([])
  const [selectedMuscles, setSelectedMuscles] = useState<number[]>([])
  const [selectedExercises, setSelectedExercises] = useState<WorkoutItem[]>([])
  const [equipment, setEquipment] = useState<WgerEquipment[]>([])
  const [muscles, setMuscles] = useState<WgerMuscle[]>([])
  const [exercises, setExercises] = useState<MappedExercise[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [workoutName, setWorkoutName] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [muscleList, equipmentList] = await Promise.all([
        fetchMuscles(),
        fetchEquipment(),
      ])
      setMuscles(muscleList)
      setEquipment(equipmentList)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadExercises = useCallback(async () => {
    if (selectedEquipment.length === 0 || selectedMuscles.length === 0) return
    try {
      const data = await fetchExercises({
        muscles: selectedMuscles,
        equipment: selectedEquipment,
        language: 2,
        limit: 20,
      })
      setExercises(data.results.map(mapWgerToUI))
    } catch (error) {
      console.error('Error loading exercises:', error)
    }
  }, [selectedEquipment, selectedMuscles])

  useEffect(() => {
    if (selectedEquipment.length > 0 && selectedMuscles.length > 0) {
      loadExercises()
    }
  }, [loadExercises, selectedEquipment, selectedMuscles])

  const toggleEquipment = (id: number) => {
    setSelectedEquipment(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleMuscle = (id: number) => {
    setSelectedMuscles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const addExercise = (exercise: MappedExercise) => {
    const workoutItem: WorkoutItem = {
      exercise_id: exercise.id,
      sets: 3,
      reps: 12,
      weight: null,
      rest_seconds: 60,
    }
    setSelectedExercises(prev => [...prev, workoutItem])
  }

  const removeExercise = (index: number) => {
    setSelectedExercises(prev => prev.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: keyof WorkoutItem, value: number | null) => {
    setSelectedExercises(prev =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const saveWorkout = async () => {
    if (!user) return
    setSaving(true)
    try {
      const { error } = await supabase
        .from('gymguy_workouts')
        .insert({
          name: workoutName || `Workout ${new Date().toLocaleDateString()}`,
          user_id: user.id,
          exercises: selectedExercises,
        })
        .select()
        .single()

      if (error) throw error

      setSelectedExercises([])
      setWorkoutName('')
      setCurrentStep(1)
      alert('Workout saved successfully!')
    } catch (error) {
      console.error('Error saving workout:', error)
      alert('Error saving workout. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ─── Steps ──────────────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Select Equipment</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {equipment.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleEquipment(item.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedEquipment.includes(item.id)
                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-primary)]'
                : 'border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)]/40 text-[var(--text-primary)]'
            }`}
          >
            <div className="font-medium">{item.name}</div>
          </button>
        ))}
      </div>

      {selectedEquipment.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={() => setCurrentStep(2)}>
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Select Target Muscles</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {muscles.map((muscle) => (
          <button
            key={muscle.id}
            onClick={() => toggleMuscle(muscle.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedMuscles.includes(muscle.id)
                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-primary)]'
                : 'border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)]/40 text-[var(--text-primary)]'
            }`}
          >
            <div className="font-medium">{muscle.name_en}</div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        {selectedMuscles.length > 0 && (
          <Button onClick={() => setCurrentStep(3)}>
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Select Exercises</h2>
      {exercises.length === 0 ? (
        <p className="text-[var(--text-secondary)]">No exercises found for this selection. Try different muscles or equipment.</p>
      ) : (
        <div className="grid gap-4">
          {exercises.map((exercise) => (
            <Card key={exercise.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{exercise.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exercise.primary_muscles.map((m) => (
                      <Badge key={m} variant="default">{m}</Badge>
                    ))}
                    {exercise.equipment.map((eq) => (
                      <Badge key={eq} variant="default">{eq}</Badge>
                    ))}
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {exercise.image_url ? (
                    <img
                      src={exercise.image_url}
                      alt={exercise.name}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-32 h-24 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-8 h-8 text-[var(--text-secondary)]" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => addExercise(exercise)}
                  disabled={selectedExercises.some(item => item.exercise_id === exercise.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Workout
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        {selectedExercises.length > 0 && (
          <Button onClick={() => setCurrentStep(4)}>
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Review Your Workout</h2>

      <div className="space-y-1.5">
        <label htmlFor="workout-name" className="block text-sm font-medium text-[var(--text-secondary)]">
          Workout Name
        </label>
        <input
          id="workout-name"
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder={`Workout ${new Date().toLocaleDateString()}`}
          className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200 min-h-[44px]"
        />
      </div>

      <div className="space-y-4">
        {selectedExercises.map((item, index) => {
          const exercise = exercises.find(e => e.id === item.exercise_id)
          return (
            <Card key={index}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-[var(--text-primary)]">{exercise?.name}</h3>
                <Button variant="outline" size="sm" onClick={() => removeExercise(index)}>
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor={`workout-sets-${index}`} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Sets</label>
                  <input
                    id={`workout-sets-${index}`}
                    type="number"
                    min="1"
                    max="10"
                    value={item.sets}
                    onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor={`workout-reps-${index}`} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Reps</label>
                  <input
                    id={`workout-reps-${index}`}
                    type="number"
                    min="1"
                    max="50"
                    value={item.reps || ''}
                    onChange={(e) => updateExercise(index, 'reps', e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor={`workout-weight-${index}`} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Weight (lbs)</label>
                  <input
                    id={`workout-weight-${index}`}
                    type="number"
                    min="0"
                    step="2.5"
                    value={item.weight || ''}
                    onChange={(e) => updateExercise(index, 'weight', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor={`workout-rest-${index}`} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Rest (sec)</label>
                  <input
                    id={`workout-rest-${index}`}
                    type="number"
                    min="0"
                    max="600"
                    step="30"
                    value={item.rest_seconds}
                    onChange={(e) => updateExercise(index, 'rest_seconds', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep(3)}>
            Add More Exercises
          </Button>
          <Button onClick={saveWorkout} disabled={saving}>
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--text-primary)] mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Workout
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Workout Generator"
        title="Create Your Workout"
        subtitle="Pick your equipment, target your muscles, and build the perfect session."
      />

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
          <span>Step {currentStep} of 4</span>
          <span>•</span>
          <span>
            {currentStep === 1 && 'Select Equipment'}
            {currentStep === 2 && 'Select Target Muscles'}
            {currentStep === 3 && 'Select Exercises'}
            {currentStep === 4 && 'Review & Save'}
          </span>
        </div>

        <Card>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </Card>
      </div>
    </div>
  )
}
