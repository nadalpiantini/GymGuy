// Exercise database based on Free Exercise DB and MuscleWiki
// Source: https://github.com/garri93/free-exercise-db-es
// Visual reference: https://musclewiki.com/

export interface Exercise {
  id: number
  name: string
  description: string
  instructions: string[]
  primary_muscles: string[]
  secondary_muscles: string[]
  equipment: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  video_url?: string
  youtube_id?: string
  image_url?: string
  tips?: string[]
  duration?: string
  calories_burned?: number
}

export interface ExerciseCategory {
  id: string
  name: string
  description: string
  icon: string
}

export interface MuscleGroup {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

// Exercise categories
export const exerciseCategories: ExerciseCategory[] = [
  { id: 'strength', name: 'Strength', description: 'Strength and resistance exercises', icon: '💪' },
  { id: 'cardio', name: 'Cardio', description: 'Cardiovascular exercises', icon: '❤️' },
  { id: 'flexibility', name: 'Flexibility', description: 'Stretching and mobility', icon: '🧘' },
  { id: 'balance', name: 'Balance', description: 'Stability exercises', icon: '⚖️' },
  { id: 'plyometric', name: 'Plyometric', description: 'Explosive exercises', icon: '⚡' },
  { id: 'functional', name: 'Functional', description: 'Functional movements', icon: '🔄' }
]

// Muscle groups
export const muscleGroups: MuscleGroup[] = [
  { id: 'chest', name: 'Chest', description: 'Chest muscles', icon: '🫁', color: '#FF6B35' },
  { id: 'back', name: 'Back', description: 'Back muscles', icon: '🫸', color: '#00C9A7' },
  { id: 'shoulders', name: 'Shoulders', description: 'Shoulder muscles', icon: '🤲', color: '#7C3AED' },
  { id: 'biceps', name: 'Biceps', description: 'Biceps muscles', icon: '💪', color: '#FB7185' },
  { id: 'triceps', name: 'Triceps', description: 'Triceps muscles', icon: '💪', color: '#F472B6' },
  { id: 'forearms', name: 'Forearms', description: 'Forearm muscles', icon: '🤏', color: '#F59E0B' },
  { id: 'abs', name: 'Abs', description: 'Abdominal muscles', icon: '🎯', color: '#FEE75C' },
  { id: 'obliques', name: 'Obliques', description: 'Oblique muscles', icon: '🎯', color: '#FACC15' },
  { id: 'quads', name: 'Quads', description: 'Quadriceps muscles', icon: '🦵', color: '#10B981' },
  { id: 'hamstrings', name: 'Hamstrings', description: 'Hamstring muscles', icon: '🦵', color: '#059669' },
  { id: 'glutes', name: 'Glutes', description: 'Glute muscles', icon: '🍑', color: '#06B6D4' },
  { id: 'calves', name: 'Calves', description: 'Calf muscles', icon: '🦶', color: '#047857' }
]

// Exercise database (expanded based on Free Exercise DB)
export const exercisesDatabase: Exercise[] = [
  // CHEST
  {
    id: 1,
    name: 'Bench Press',
    description: 'Fundamental exercise for chest, shoulders and triceps development',
    instructions: [
      'Lie on a flat bench with feet firmly planted on the floor',
      'Grip the bar with a grip slightly wider than shoulder width',
      'Lower the bar controlled until it touches the chest',
      'Push the bar up to the starting position',
      'Keep shoulder blades retracted throughout the movement'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps'],
    equipment: ['barbell', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'gRVjAtPip0Y', // Athlean-X video about bench press
    duration: '3-5 min',
    calories_burned: 8,
    tips: ['Don\'t bounce the bar off your chest', 'Keep your core engaged', 'Breathe in on the way down, exhale on the way up']
  },
  {
    id: 2,
    name: 'Push-ups',
    description: 'Bodyweight exercise for chest, shoulders and triceps',
    instructions: [
      'Get into a plank position with hands slightly wider than shoulder width',
      'Keep your body in a straight line from head to heels',
      'Lower your chest toward the floor keeping elbows close to your body',
      'Push up to the starting position',
      'Keep your core engaged throughout the movement'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'IODxDxX7oi4', // Calisthenic Movement video about push-ups
    duration: '2-3 min',
    calories_burned: 6,
    tips: ['Keep your back straight', 'Don\'t let your hips sag', 'Breathe in on the way down, exhale on the way up']
  },
  {
    id: 3,
    name: 'Incline Dumbbell Press',
    description: 'Exercise for upper chest and shoulders',
    instructions: [
      'Adjust the bench to a 30-45 degree incline',
      'Sit with a dumbbell in each hand',
      'Push the dumbbells up and slightly together',
      'Lower controlled until elbows are at 90 degrees',
      'Repeat the movement maintaining control'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['Don\'t use too much weight', 'Keep shoulder blades retracted', 'Control the eccentric phase']
  },

  // BACK
  {
    id: 4,
    name: 'Pull-ups',
    description: 'Bodyweight exercise for back development',
    instructions: [
      'Hang from a bar with a grip wider than shoulder width',
      'Keep your body straight and shoulder blades retracted',
      'Pull your body up until your chin passes the bar',
      'Lower controlled to the starting position',
      'Keep your core engaged throughout the movement'
    ],
    primary_muscles: ['back'],
    secondary_muscles: ['biceps', 'shoulders'],
    equipment: ['pull-up-bar'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['Don\'t swing your body', 'Use assistance if needed', 'Keep your chest up']
  },
  {
    id: 5,
    name: 'Barbell Row',
    description: 'Fundamental exercise for back development',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Bend forward keeping your back straight',
      'Grip the bar with a grip slightly wider than shoulder width',
      'Pull the bar toward your abdomen',
      'Lower controlled to the starting position'
    ],
    primary_muscles: ['back'],
    secondary_muscles: ['biceps', 'shoulders'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['Keep your back straight', 'Don\'t use momentum', 'Feel the contraction in your back']
  },
  {
    id: 6,
    name: 'Deadlift',
    description: 'Compound exercise for back, glutes and legs',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Grip the bar with a grip slightly wider than shoulder width',
      'Keep your back straight and chest up',
      'Lift the bar by extending hips and knees',
      'Lower controlled maintaining proper form'
    ],
    primary_muscles: ['back', 'glutes'],
    secondary_muscles: ['hamstrings', 'quads', 'abs'],
    equipment: ['barbell'],
    difficulty: 'advanced',
    category: 'strength',
    tips: ['Keep the bar close to your body', 'Don\'t round your back', 'Use a belt if necessary']
  },

  // SHOULDERS
  {
    id: 7,
    name: 'Military Press',
    description: 'Exercise for shoulder development',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Grip the bar at shoulder height',
      'Push the bar up until arms are fully extended',
      'Lower controlled to the starting position',
      'Keep your core engaged throughout the movement'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: ['triceps', 'abs'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['Keep your core engaged', 'Don\'t use momentum', 'Breathe in on the way down, exhale on the way up']
  },
  {
    id: 8,
    name: 'Lateral Raises',
    description: 'Isolation exercise for lateral deltoids',
    instructions: [
      'Stand with feet shoulder-width apart, holding a dumbbell in each hand',
      'Keep your arms slightly bent at the elbows',
      'Raise the dumbbells out to the sides until they reach shoulder height',
      'Pause briefly at the top, feeling the contraction in your shoulders',
      'Lower the weights slowly and controlled back to the starting position',
      'Keep your core engaged and maintain good posture throughout'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: ['forearms'],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: '3VcKXONJ4',
    duration: '2-3 min',
    calories_burned: 4,
    tips: ['Don\'t use too much weight - focus on form', 'Keep elbows slightly bent throughout', 'Feel the contraction in your shoulders', 'Avoid swinging the weights']
  },

  // LEGS
  {
    id: 9,
    name: 'Squats',
    description: 'Fundamental exercise for leg development',
    instructions: [
      'Stand with feet shoulder-width apart, toes slightly pointed out',
      'Keep your chest up and core engaged throughout the movement',
      'Lower your body by bending at the hips and knees as if sitting back into a chair',
      'Descend until your thighs are parallel to the floor or lower',
      'Drive through your heels to return to the starting position',
      'Keep your knees tracking over your toes and maintain a neutral spine'
    ],
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'abs', 'calves'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'YaXPRqUwItQ',
    duration: '3-4 min',
    calories_burned: 8,
    tips: ['Keep knees aligned with your toes', 'Don\'t let knees cave inward', 'Breathe in on the way down, exhale on the way up', 'Keep weight on your heels']
  },
  {
    id: 10,
    name: 'Lunges',
    description: 'Unilateral exercise for legs and glutes',
    instructions: [
      'Stand with feet hip-width apart, hands on hips or at your sides',
      'Take a large step forward with your right leg, landing on your heel',
      'Lower your body until both knees are bent at 90-degree angles',
      'Keep your front knee directly over your ankle, not past your toes',
      'Push through your front heel to return to the starting position',
      'Alternate legs with each repetition or complete all reps on one side first'
    ],
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'abs', 'calves'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'QOVaHwm-Q6U',
    duration: '3-4 min',
    calories_burned: 6,
    tips: ['Keep your torso upright throughout', 'Don\'t let front knee go past your toes', 'Control the movement - no bouncing', 'Keep your core engaged for stability']
  },

  // CORE
  {
    id: 11,
    name: 'Plank',
    description: 'Isometric exercise for core strength',
    instructions: [
      'Start in a push-up position, then lower down to your forearms',
      'Place your elbows directly under your shoulders, forearms parallel',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes to maintain the position',
      'Hold for the desired duration while breathing normally',
      'Avoid letting your hips sag or pike up during the hold'
    ],
    primary_muscles: ['abs'],
    secondary_muscles: ['shoulders', 'glutes', 'back'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'pSHjTRCQxIw',
    duration: '1-2 min',
    calories_burned: 3,
    tips: ['Keep your core engaged throughout', 'Don\'t let your hips sag', 'Breathe normally during the hold', 'Start with shorter holds and build up']
  },
  {
    id: 12,
    name: 'Crunches',
    description: 'Basic exercise for abdominal muscles',
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Place your hands behind your head or across your chest',
      'Lift your shoulders off the ground by contracting your abs',
      'Curl your upper body toward your knees, keeping lower back on the floor',
      'Lower back down slowly and controlled to the starting position',
      'Keep your neck relaxed and avoid pulling on your head'
    ],
    primary_muscles: ['abs'],
    secondary_muscles: ['obliques'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'Xyd_faZzoR8',
    duration: '2-3 min',
    calories_burned: 4,
    tips: ['Don\'t pull on your neck', 'Feel the contraction in your abs', 'Control the movement', 'Keep your lower back pressed to the floor']
  },

  // ADDITIONAL CHEST EXERCISES
  {
    id: 13,
    name: 'Dumbbell Flyes',
    description: 'Isolation exercise for chest muscles',
    instructions: [
      'Lie on a flat bench holding a dumbbell in each hand',
      'Start with arms extended above your chest, palms facing each other',
      'Lower the dumbbells in a wide arc until you feel a stretch in your chest',
      'Keep a slight bend in your elbows throughout the movement',
      'Squeeze your chest muscles to bring the weights back to the starting position',
      'Control the movement and avoid going too deep to prevent shoulder injury'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'eozdVDA78K0',
    duration: '3-4 min',
    calories_burned: 7,
    tips: ['Don\'t use too much weight - focus on the stretch', 'Feel the stretch in your chest', 'Control the eccentric phase', 'Keep elbows slightly bent throughout']
  },
  {
    id: 14,
    name: 'Diamond Push-ups',
    description: 'Push-up variation that emphasizes triceps',
    instructions: [
      'Start in a push-up position with hands close together',
      'Form a diamond shape with your thumbs and index fingers',
      'Keep your body straight and core engaged throughout',
      'Lower your chest toward your hands, keeping elbows close to your body',
      'Push back up to the starting position using your triceps',
      'Maintain proper form and avoid letting your hips sag'
    ],
    primary_muscles: ['triceps'],
    secondary_muscles: ['chest', 'shoulders', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'J0DnG1_S92I',
    duration: '2-3 min',
    calories_burned: 6,
    tips: ['Keep elbows close to your body', 'Don\'t let your hips sag', 'Breathe properly', 'Start with knees on ground if too difficult']
  },

  // ADDITIONAL BACK EXERCISES
  {
    id: 15,
    name: 'Dumbbell Row',
    description: 'Unilateral exercise for back development',
    instructions: [
      'Place one knee and one hand on a bench for support',
      'Hold a dumbbell in your free hand with a neutral grip',
      'Keep your back straight and core engaged throughout',
      'Pull the dumbbell toward your hip, squeezing your shoulder blade',
      'Lower the weight slowly and controlled to the starting position',
      'Complete all reps on one side before switching to the other'
    ],
    primary_muscles: ['back'],
    secondary_muscles: ['biceps', 'shoulders', 'abs'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'pYcpY20QaE8',
    duration: '3-4 min',
    calories_burned: 8,
    tips: ['Keep your back straight', 'Feel the contraction in your back', 'Don\'t use momentum', 'Squeeze your shoulder blades together']
  },
  {
    id: 16,
    name: 'Romanian Deadlift',
    description: 'Deadlift variation that emphasizes hamstrings',
    instructions: [
      'Stand with feet hip-width apart, holding a barbell or dumbbells',
      'Keep your knees slightly bent and maintain this angle throughout',
      'Hinge at your hips, pushing them back while lowering the weight',
      'Lower the weight along your legs until you feel a stretch in your hamstrings',
      'Drive your hips forward and squeeze your glutes to return to standing',
      'Keep your chest up and core engaged throughout the movement'
    ],
    primary_muscles: ['hamstrings', 'glutes'],
    secondary_muscles: ['back', 'abs'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'ytGaGIn3SjE',
    duration: '4-5 min',
    calories_burned: 10,
    tips: ['Keep the bar close to your body', 'Feel the stretch in your hamstrings', 'Don\'t round your back', 'Focus on hip hinge movement']
  },

  // ADDITIONAL SHOULDER EXERCISES
  {
    id: 17,
    name: 'Front Raises',
    description: 'Isolation exercise for anterior deltoids',
    instructions: [
      'Stand with feet shoulder-width apart, holding a dumbbell in each hand',
      'Keep your arms extended in front of your body with palms facing down',
      'Raise the dumbbells up to shoulder height, keeping arms straight',
      'Pause briefly at the top, feeling the contraction in your front deltoids',
      'Lower the weights slowly and controlled back to the starting position',
      'Keep your core engaged and avoid using momentum'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: ['forearms'],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'WJ4GmOZ-2j4',
    duration: '2-3 min',
    calories_burned: 5,
    tips: ['Don\'t use too much weight', 'Keep arms extended', 'Control the movement', 'Avoid swinging the weights']
  },
  {
    id: 18,
    name: 'Reverse Flyes',
    description: 'Exercise for posterior deltoids',
    instructions: [
      'Bend forward at the hips with a dumbbell in each hand',
      'Keep your back straight and core engaged throughout',
      'Raise the dumbbells out to the sides, squeezing your shoulder blades together',
      'Focus on using your rear deltoids to lift the weights',
      'Lower the weights slowly and controlled back to the starting position',
      'Keep your chest up and avoid rounding your back'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: ['back', 'rhomboids'],
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'rep-qVOkqgk',
    duration: '3-4 min',
    calories_burned: 6,
    tips: ['Keep your back straight', 'Feel the contraction in your rear deltoids', 'Don\'t use momentum', 'Squeeze shoulder blades together']
  },

  // ADDITIONAL LEG EXERCISES
  {
    id: 19,
    name: 'Bulgarian Split Squats',
    description: 'Unilateral exercise for legs and glutes',
    instructions: [
      'Place the top of your rear foot on a bench or elevated surface',
      'Keep your front foot firmly planted on the ground',
      'Lower your body until your front thigh is parallel to the floor',
      'Push through your front heel to return to the starting position',
      'Keep your torso upright throughout the movement',
      'Complete all reps on one leg before switching to the other'
    ],
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'abs', 'calves'],
    equipment: ['bodyweight', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: '2C-uNgKwzNY',
    duration: '3-4 min',
    calories_burned: 8,
    tips: ['Keep your torso upright', 'Don\'t let your front knee go past your toes', 'Control the movement', 'Focus on your front leg doing the work']
  },
  {
    id: 20,
    name: 'Calf Raises',
    description: 'Exercise for calf development',
    instructions: [
      'Stand with feet shoulder-width apart, toes pointing forward',
      'Rise up onto your toes by contracting your calf muscles',
      'Hold the contraction at the top for a brief moment',
      'Lower your heels slowly and controlled back to the starting position',
      'Repeat the movement maintaining control throughout',
      'Keep your core engaged and maintain good posture'
    ],
    primary_muscles: ['calves'],
    secondary_muscles: ['ankles'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'jAxgE9e2j4s',
    duration: '2-3 min',
    calories_burned: 4,
    tips: ['Maintain control throughout the movement', 'Feel the contraction in your calves', 'Don\'t use momentum', 'Try single-leg variations for more challenge']
  },

  // ADDITIONAL CORE EXERCISES
  {
    id: 21,
    name: 'Mountain Climbers',
    description: 'Cardiovascular exercise that works the core',
    instructions: [
      'Start in a plank position with hands directly under shoulders',
      'Keep your core engaged and body in a straight line',
      'Bring one knee toward your chest, then quickly switch legs',
      'Alternate legs rapidly while maintaining plank position',
      'Keep a steady, controlled rhythm throughout the movement',
      'Maintain proper form and avoid letting your hips rise up'
    ],
    primary_muscles: ['abs'],
    secondary_muscles: ['shoulders', 'quads', 'glutes'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    category: 'cardio',
    youtube_id: 'nmwgirgXLYM',
    duration: '1-2 min',
    calories_burned: 12,
    tips: ['Keep your core engaged', 'Don\'t let your hips rise up', 'Maintain a steady rhythm', 'Focus on bringing knees to chest']
  },
  {
    id: 22,
    name: 'Russian Twists',
    description: 'Exercise for obliques and core',
    instructions: [
      'Sit on the floor with knees bent and feet flat on the ground',
      'Lean back slightly while keeping your back straight',
      'Lift your feet off the ground if possible for added difficulty',
      'Hold your hands together or use a weight in front of your chest',
      'Rotate your torso from side to side, touching the ground beside you',
      'Keep your core engaged throughout the entire movement'
    ],
    primary_muscles: ['obliques'],
    secondary_muscles: ['abs', 'back'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'wkD8rjkodUI',
    duration: '2-3 min',
    calories_burned: 6,
    tips: ['Keep your core engaged', 'Control the movement', 'Don\'t use momentum', 'Keep your back straight', 'Breathe with each twist']
  }
]

// Funciones de utilidad
export const getExercisesByMuscle = (muscle: string): Exercise[] => {
  return exercisesDatabase.filter(exercise => 
    exercise.primary_muscles.includes(muscle) || 
    exercise.secondary_muscles.includes(muscle)
  )
}

export const getExercisesByEquipment = (equipment: string): Exercise[] => {
  return exercisesDatabase.filter(exercise => 
    exercise.equipment.includes(equipment)
  )
}

export const getExercisesByDifficulty = (difficulty: string): Exercise[] => {
  return exercisesDatabase.filter(exercise => 
    exercise.difficulty === difficulty
  )
}

export const getExerciseById = (id: number): Exercise | undefined => {
  return exercisesDatabase.find(exercise => exercise.id === id)
}

export const searchExercises = (query: string): Exercise[] => {
  const lowercaseQuery = query.toLowerCase()
  return exercisesDatabase.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery) ||
    exercise.description.toLowerCase().includes(lowercaseQuery) ||
    exercise.primary_muscles.some(muscle => muscle.toLowerCase().includes(lowercaseQuery)) ||
    exercise.equipment.some(eq => eq.toLowerCase().includes(lowercaseQuery))
  )
}
