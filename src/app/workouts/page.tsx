'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/i18n'
import { 
  exercisesDatabase, 
  muscleGroups, 
  exerciseCategories,
  getExercisesByMuscle,
  getExercisesByEquipment,
  searchExercises,
  type Exercise,
  type MuscleGroup
} from '@/lib/exercise-database'
import { YouTubeVideo } from '@/components/ui/youtube-video'
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Plus, 
  Check,
  Play,
  Dumbbell,
  Target,
  List
} from 'lucide-react'

interface Equipment {
  id: string
  name: string
  slug: string
  icon: string
}

interface WorkoutItem {
  exercise_id: number
  sets: number
  reps: number | null
  weight: number | null
  rest_seconds: number
}

export default function WorkoutGeneratorPage() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const [selectedExercises, setSelectedExercises] = useState<WorkoutItem[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [muscles, setMuscles] = useState<MuscleGroup[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [workoutName, setWorkoutName] = useState('')

  // Using the imported supabase client from supabase-client.ts

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedEquipment.length > 0 && selectedMuscles.length > 0) {
      loadExercises()
    }
  }, [selectedEquipment, selectedMuscles])

  const loadData = async () => {
    try {
      // Check if we're in development mode without Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co' || supabaseUrl === 'your_supabase_project_url') {
        // Use exercise database for development
        console.log('Using exercise database for development')
        setEquipment([
          { id: 'dumbbells', name: 'Mancuernas', slug: 'dumbbells', icon: '🏋️' },
          { id: 'barbell', name: 'Barra', slug: 'barbell', icon: '🏋️‍♂️' },
          { id: 'kettlebell', name: 'Kettlebell', slug: 'kettlebell', icon: '⚡' },
          { id: 'resistance-bands', name: 'Bandas de Resistencia', slug: 'resistance-bands', icon: '🎯' },
          { id: 'bodyweight', name: 'Peso Corporal', slug: 'bodyweight', icon: '💪' },
          { id: 'pull-up-bar', name: 'Barra de Dominadas', slug: 'pull-up-bar', icon: '🆙' },
          { id: 'bench', name: 'Banco', slug: 'bench', icon: '🪑' }
        ])
        setMuscles(muscleGroups)
        setLoading(false)
        return
      }

      const [equipmentRes, musclesRes] = await Promise.all([
        supabase.from('equipment').select('*').order('name'),
        supabase.from('muscles').select('*').order('name')
      ])

      if (equipmentRes.data) setEquipment(equipmentRes.data)
      if (musclesRes.data) setMuscles(musclesRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadExercises = async () => {
    try {
      // Check if we're in development mode without Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co' || supabaseUrl === 'your_supabase_project_url') {
        // Use exercise database for development
        console.log('Loading exercises from database')
        
        // Filter exercises based on selected equipment and muscles
        const filteredExercises = exercisesDatabase.filter(exercise => {
          const hasEquipment = selectedEquipment.some(eq => exercise.equipment.includes(eq))
          const hasMuscle = selectedMuscles.some(muscle => 
            exercise.primary_muscles.includes(muscle) || 
            exercise.secondary_muscles.includes(muscle)
          )
          return hasEquipment && hasMuscle
        })
        
        setExercises(filteredExercises)
        return
      }

      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .overlaps('equipment_required', selectedEquipment)
        .overlaps('primary_muscles', selectedMuscles)
        .order('name')

      if (error) throw error
      setExercises(data || [])
    } catch (error) {
      console.error('Error loading exercises:', error)
    }
  }

  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    )
  }

  const handleMuscleSelect = (muscleId: string) => {
    setSelectedMuscles(prev => 
      prev.includes(muscleId) 
        ? prev.filter(id => id !== muscleId)
        : [...prev, muscleId]
    )
  }

  const handleExerciseAdd = (exercise: Exercise) => {
    const newItem: WorkoutItem = {
      exercise_id: exercise.id,
      sets: 3,
      reps: 10,
      weight: null,
      rest_seconds: 60
    }
    setSelectedExercises(prev => [...prev, newItem])
  }

  const handleExerciseRemove = (exerciseId: number) => {
    setSelectedExercises(prev => prev.filter(item => item.exercise_id !== exerciseId))
  }

  const handleExerciseUpdate = (exerciseId: number, updates: Partial<WorkoutItem>) => {
    setSelectedExercises(prev => 
      prev.map(item => 
        item.exercise_id === exerciseId 
          ? { ...item, ...updates }
          : item
      )
    )
  }

  const handleSaveWorkout = async () => {
    if (!workoutName.trim() || selectedExercises.length === 0) return

    setSaving(true)
    try {
      // Check if we're in development mode without Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co' || supabaseUrl === 'your_supabase_project_url') {
        // Simulate saving in development mode
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Workout saved successfully! (Development mode)')
        // Reset form
        setCurrentStep(1)
        setSelectedEquipment([])
        setSelectedMuscles([])
        setSelectedExercises([])
        setWorkoutName('')
        setSaving(false)
        return
      }

      if (!user) {
        alert('Please log in to save workouts')
        setSaving(false)
        return
      }

      // Create workout
      const { data: workout, error: workoutError } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          name: workoutName.trim(),
          notes: `Generated workout with ${selectedExercises.length} exercises`
        } as any)
        .select()
        .single()

      if (workoutError) throw workoutError
      if (!workout) throw new Error('Failed to create workout')

      // Create workout items
      const workoutItems = selectedExercises.map((item, index) => ({
        workout_id: (workout as any).id,
        exercise_id: item.exercise_id,
        sets: item.sets,
        reps: item.reps,
        weight: item.weight,
        rest_seconds: item.rest_seconds,
        order_index: index
      }))

      const { error: itemsError } = await supabase
        .from('workout_items')
        .insert(workoutItems as any)

      if (itemsError) throw itemsError

      alert('Workout saved successfully!')
      // Reset form
      setCurrentStep(1)
      setSelectedEquipment([])
      setSelectedMuscles([])
      setSelectedExercises([])
      setWorkoutName('')
    } catch (error) {
      console.error('Error saving workout:', error)
      alert('Error saving workout. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedEquipment.length > 0
      case 2: return selectedMuscles.length > 0
      case 3: return selectedExercises.length > 0
      default: return false
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workout generator...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workout Generator
          </h1>
          <p className="text-gray-600">
            Create your perfect workout in 3 simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <div className="text-center">
              <Dumbbell className="h-6 w-6 mx-auto mb-1 text-gray-600" />
              <span className="text-sm text-gray-600">Equipment</span>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 mx-auto mb-1 text-gray-600" />
              <span className="text-sm text-gray-600">Muscles</span>
            </div>
            <div className="text-center">
              <List className="h-6 w-6 mx-auto mb-1 text-gray-600" />
              <span className="text-sm text-gray-600">Exercises</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Equipment Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Select Your Available Equipment
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {equipment.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleEquipmentSelect(item.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200
                      ${selectedEquipment.includes(item.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-medium">{item.name}</div>
                    {selectedEquipment.includes(item.id) && (
                      <Check className="h-5 w-5 text-blue-600 mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Muscle Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Choose Target Muscle Groups
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {muscles.map((muscle) => (
                  <button
                    key={muscle.id}
                    onClick={() => handleMuscleSelect(muscle.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200
                      ${selectedMuscles.includes(muscle.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{muscle.icon}</div>
                    <div className="font-medium">{muscle.name}</div>
                    {selectedMuscles.includes(muscle.id) && (
                      <Check className="h-5 w-5 text-blue-600 mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Exercise Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Add Exercises to Your Workout
              </h2>
              
              {/* Available Exercises */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Available Exercises ({exercises.length})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {exercises.map((exercise) => {
                    const isAdded = selectedExercises.some(item => item.exercise_id === exercise.id)
                    return (
                      <div key={exercise.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900 text-lg">{exercise.name}</h4>
                          <button
                            onClick={() => isAdded ? handleExerciseRemove(exercise.id) : handleExerciseAdd(exercise)}
                            disabled={isAdded}
                            className={`
                              px-3 py-1 rounded text-sm font-medium transition-colors
                              ${isAdded 
                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                              }
                            `}
                          >
                            {isAdded ? 'Added' : 'Add'}
                          </button>
                        </div>
                        
                        {/* Video de YouTube */}
                        {exercise.youtube_id && (
                          <div className="mb-4">
                            <YouTubeVideo 
                              videoId={exercise.youtube_id}
                              title={`Cómo hacer ${exercise.name}`}
                              className="w-full"
                            />
                          </div>
                        )}
                        
                        {exercise.description && (
                          <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                          <span className="capitalize bg-gray-100 px-2 py-1 rounded">{exercise.difficulty}</span>
                          <span className="bg-blue-100 px-2 py-1 rounded">{exercise.category}</span>
                          {exercise.duration && (
                            <span className="bg-green-100 px-2 py-1 rounded">⏱️ {exercise.duration}</span>
                          )}
                          {exercise.calories_burned && (
                            <span className="bg-orange-100 px-2 py-1 rounded">🔥 {exercise.calories_burned} cal/min</span>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">
                          <div className="mb-1">
                            <strong>Músculos:</strong> {exercise.primary_muscles.join(', ')}
                            {exercise.secondary_muscles.length > 0 && (
                              <span> + {exercise.secondary_muscles.join(', ')}</span>
                            )}
                          </div>
                          <div>
                            <strong>Equipo:</strong> {exercise.equipment.join(', ')}
                          </div>
                        </div>
                        
                        {/* Instrucciones */}
                        {exercise.instructions && exercise.instructions.length > 0 && (
                          <div className="mb-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Instrucciones:</h5>
                            <ol className="text-xs text-gray-600 space-y-1">
                              {exercise.instructions.slice(0, 3).map((instruction, index) => (
                                <li key={index} className="flex">
                                  <span className="font-medium mr-2">{index + 1}.</span>
                                  <span>{instruction}</span>
                                </li>
                              ))}
                              {exercise.instructions.length > 3 && (
                                <li className="text-gray-500 italic">
                                  ... y {exercise.instructions.length - 3} pasos más
                                </li>
                              )}
                            </ol>
                          </div>
                        )}
                        
                        {/* Tips */}
                        {exercise.tips && exercise.tips.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">💡 Tips:</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {exercise.tips.slice(0, 2).map((tip, index) => (
                                <li key={index} className="flex">
                                  <span className="mr-2">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Selected Exercises */}
              {selectedExercises.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Your Workout ({selectedExercises.length} exercises)
                  </h3>
                  <div className="space-y-4">
                    {selectedExercises.map((item, index) => {
                      const exercise = exercises.find(e => e.id === item.exercise_id)
                      if (!exercise) return null

                      return (
                        <div key={item.exercise_id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                            <button
                              onClick={() => handleExerciseRemove(exercise.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sets
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="20"
                                value={item.sets}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { sets: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reps
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={item.reps || ''}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { reps: parseInt(e.target.value) || null })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Weight (kg)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={item.weight || ''}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { weight: parseFloat(e.target.value) || null })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rest (sec)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={item.rest_seconds}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { rest_seconds: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Workout Name and Save */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Workout Name
                      </label>
                      <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="Enter workout name..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={handleSaveWorkout}
                        disabled={!workoutName.trim() || saving}
                        className="flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Saving...' : 'Save Workout'}</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = '/workouts'}
                        className="flex items-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Start Workout</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="text-sm text-gray-500">
                {selectedExercises.length} exercises selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
