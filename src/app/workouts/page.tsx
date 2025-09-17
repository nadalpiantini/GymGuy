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
          { id: 'dumbbells', name: 'Dumbbells', slug: 'dumbbells', icon: '🏋️' },
          { id: 'barbell', name: 'Barbell', slug: 'barbell', icon: '🏋️‍♂️' },
          { id: 'kettlebell', name: 'Kettlebell', slug: 'kettlebell', icon: '⚡' },
          { id: 'resistance-bands', name: 'Resistance Bands', slug: 'resistance-bands', icon: '🎯' },
          { id: 'bodyweight', name: 'Bodyweight', slug: 'bodyweight', icon: '💪' },
          { id: 'pull-up-bar', name: 'Pull-up Bar', slug: 'pull-up-bar', icon: '🆙' },
          { id: 'bench', name: 'Bench', slug: 'bench', icon: '🪑' }
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400 font-teko-medium">Loading workout generator...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 shadow-primary-glow/20">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Workout Generator
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold mb-6">
            <span className="brand-text">Build Your Perfect Workout</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Create your perfect workout in 3 simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-teko-bold transition-all duration-300
                  ${currentStep >= step 
                    ? 'bg-primary text-white shadow-primary-glow' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }
                `}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`
                    w-16 h-1 mx-2 rounded-full transition-all duration-300
                    ${currentStep > step ? 'bg-primary' : 'bg-gray-700'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-16">
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-all duration-300">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-gray-400 font-teko-medium">Equipment</span>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-all duration-300">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-sm text-gray-400 font-teko-medium">Muscles</span>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-all duration-300">
                <List className="h-6 w-6 text-accent" />
              </div>
              <span className="text-sm text-gray-400 font-teko-medium">Exercises</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 hover:shadow-primary-glow transition-all duration-300">
          {/* Step 1: Equipment Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-teko-bold text-primary mb-8">
                Select Your Available Equipment
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {equipment.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleEquipmentSelect(item.id)}
                    className={`
                      p-6 rounded-xl border-2 transition-all duration-300 group hover:animate-card-lift
                      ${selectedEquipment.includes(item.id)
                        ? 'border-primary bg-primary/10 text-primary shadow-primary-glow'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300 hover:bg-gray-800'
                      }
                    `}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div className="font-teko-medium text-sm">{item.name}</div>
                    {selectedEquipment.includes(item.id) && (
                      <Check className="h-5 w-5 text-primary mx-auto mt-3 animate-set-complete" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Muscle Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-teko-bold text-primary mb-8">
                Choose Target Muscle Groups
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {muscles.map((muscle) => (
                  <button
                    key={muscle.id}
                    onClick={() => handleMuscleSelect(muscle.id)}
                    className={`
                      p-6 rounded-xl border-2 transition-all duration-300 group hover:animate-card-lift
                      ${selectedMuscles.includes(muscle.id)
                        ? 'border-primary bg-primary/10 text-primary shadow-primary-glow'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300 hover:bg-gray-800'
                      }
                    `}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{muscle.icon}</div>
                    <div className="font-teko-medium text-sm">{muscle.name}</div>
                    {selectedMuscles.includes(muscle.id) && (
                      <Check className="h-5 w-5 text-primary mx-auto mt-3 animate-set-complete" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Exercise Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-teko-bold text-primary mb-8">
                Add Exercises to Your Workout
              </h2>
              
              {/* Available Exercises */}
              <div className="mb-8">
                <h3 className="text-xl font-teko-bold text-primary mb-6">
                  Available Exercises ({exercises.length})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {exercises.map((exercise) => {
                    const isAdded = selectedExercises.some(item => item.exercise_id === exercise.id)
                    return (
                      <div key={exercise.id} className="border border-gray-700 rounded-xl p-6 bg-gray-800 shadow-soft hover:shadow-primary-glow transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-teko-bold text-primary text-xl">{exercise.name}</h4>
                          <button
                            onClick={() => isAdded ? handleExerciseRemove(exercise.id) : handleExerciseAdd(exercise)}
                            disabled={isAdded}
                            className={`
                              px-4 py-2 rounded-lg text-sm font-teko-medium transition-all duration-300
                              ${isAdded 
                                ? 'bg-success/10 text-success border border-success/20 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary/90 hover:shadow-primary-glow'
                              }
                            `}
                          >
                            {isAdded ? 'Added' : 'Add'}
                          </button>
                        </div>
                        
                        {/* YouTube Video */}
                        {exercise.youtube_id && (
                          <div className="mb-4">
                            <YouTubeVideo 
                              videoId={exercise.youtube_id}
                              title={`How to do ${exercise.name}`}
                              className="w-full"
                            />
                          </div>
                        )}
                        
                        {exercise.description && (
                          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{exercise.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-2 text-xs mb-4 flex-wrap">
                          <span className="capitalize bg-primary/10 text-primary px-3 py-1 rounded-lg border border-primary/20">{exercise.difficulty}</span>
                          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg border border-secondary/20">{exercise.category}</span>
                          {exercise.duration && (
                            <span className="bg-success/10 text-success px-3 py-1 rounded-lg border border-success/20">⏱️ {exercise.duration}</span>
                          )}
                          {exercise.calories_burned && (
                            <span className="bg-energy/10 text-energy px-3 py-1 rounded-lg border border-energy/20">🔥 {exercise.calories_burned} cal/min</span>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-400 mb-4">
                          <div className="mb-2">
                            <strong className="text-primary font-teko-medium">Muscles:</strong> {exercise.primary_muscles.join(', ')}
                            {exercise.secondary_muscles.length > 0 && (
                              <span> + {exercise.secondary_muscles.join(', ')}</span>
                            )}
                          </div>
                          <div>
                            <strong className="text-primary font-teko-medium">Equipment:</strong> {exercise.equipment.join(', ')}
                          </div>
                        </div>
                        
                        {/* Instructions */}
                        {exercise.instructions && exercise.instructions.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-teko-medium text-primary mb-3">Instructions:</h5>
                            <ol className="text-xs text-gray-400 space-y-2">
                              {exercise.instructions.slice(0, 3).map((instruction, index) => (
                                <li key={index} className="flex">
                                  <span className="font-teko-bold text-primary mr-3">{index + 1}.</span>
                                  <span>{instruction}</span>
                                </li>
                              ))}
                              {exercise.instructions.length > 3 && (
                                <li className="text-gray-500 italic">
                                  ... and {exercise.instructions.length - 3} more steps
                                </li>
                              )}
                            </ol>
                          </div>
                        )}
                        
                        {/* Tips */}
                        {exercise.tips && exercise.tips.length > 0 && (
                          <div>
                            <h5 className="text-sm font-teko-medium text-energy mb-3">💡 Tips:</h5>
                            <ul className="text-xs text-gray-400 space-y-2">
                              {exercise.tips.slice(0, 2).map((tip, index) => (
                                <li key={index} className="flex">
                                  <span className="text-energy mr-3">•</span>
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
                  <h3 className="text-xl font-teko-bold text-primary mb-6">
                    Your Workout ({selectedExercises.length} exercises)
                  </h3>
                  <div className="space-y-4">
                    {selectedExercises.map((item, index) => {
                      const exercise = exercises.find(e => e.id === item.exercise_id)
                      if (!exercise) return null

                      return (
                        <div key={item.exercise_id} className="border border-gray-700 rounded-xl p-6 bg-gray-800 shadow-soft hover:shadow-primary-glow transition-all duration-300">
                          <div className="flex justify-between items-start mb-6">
                            <h4 className="font-teko-bold text-primary text-xl">{exercise.name}</h4>
                            <button
                              onClick={() => handleExerciseRemove(exercise.id)}
                              className="text-error hover:text-error/80 font-teko-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                 <div>
                                   <label htmlFor={`sets-${exercise.id}`} className="block text-sm font-teko-medium text-primary mb-2">
                                     Sets
                                   </label>
                                   <input
                                     id={`sets-${exercise.id}`}
                                     type="number"
                                     min="1"
                                     max="20"
                                     value={item.sets}
                                     onChange={(e) => handleExerciseUpdate(exercise.id, { sets: parseInt(e.target.value) })}
                                     className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                                     aria-describedby={`sets-help-${exercise.id}`}
                                   />
                                   <div id={`sets-help-${exercise.id}`} className="sr-only">Number of sets for {exercise.name}</div>
                                 </div>
                            
                            <div>
                              <label htmlFor={`reps-${exercise.id}`} className="block text-sm font-teko-medium text-primary mb-2">
                                Reps
                              </label>
                              <input
                                id={`reps-${exercise.id}`}
                                type="number"
                                min="1"
                                max="100"
                                value={item.reps || ''}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { reps: parseInt(e.target.value) || null })}
                                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                                aria-describedby={`reps-help-${exercise.id}`}
                              />
                              <div id={`reps-help-${exercise.id}`} className="sr-only">Number of repetitions for {exercise.name}</div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-teko-medium text-primary mb-2">
                                Weight (kg)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={item.weight || ''}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { weight: parseFloat(e.target.value) || null })}
                                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-teko-medium text-primary mb-2">
                                Rest (sec)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={item.rest_seconds}
                                onChange={(e) => handleExerciseUpdate(exercise.id, { rest_seconds: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Workout Name and Save */}
                  <div className="mt-8 p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-soft">
                    <div className="mb-6">
                      <label className="block text-sm font-teko-medium text-primary mb-3">
                        Workout Name
                      </label>
                      <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="Enter workout name..."
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleSaveWorkout}
                        disabled={!workoutName.trim() || saving}
                        className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 hover:shadow-primary-glow transition-all duration-300"
                      >
                        <Save className="h-4 w-4" />
                        <span className="font-teko-medium">{saving ? 'Saving...' : 'Save Workout'}</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = '/workouts'}
                        className="flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <Play className="h-4 w-4" />
                        <span className="font-teko-medium">Start Workout</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-teko-medium">Previous</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 hover:shadow-primary-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-teko-medium">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="text-sm text-gray-400 font-teko-medium">
                {selectedExercises.length} exercises selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
