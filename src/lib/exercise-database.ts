// Base de datos de ejercicios basada en Free Exercise DB y MuscleWiki
// Fuente: https://github.com/garri93/free-exercise-db-es
// Referencia visual: https://musclewiki.com/

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

// Categorías de ejercicios
export const exerciseCategories: ExerciseCategory[] = [
  { id: 'strength', name: 'Fuerza', description: 'Ejercicios de fuerza y resistencia', icon: '💪' },
  { id: 'cardio', name: 'Cardio', description: 'Ejercicios cardiovasculares', icon: '❤️' },
  { id: 'flexibility', name: 'Flexibilidad', description: 'Estiramientos y movilidad', icon: '🧘' },
  { id: 'balance', name: 'Equilibrio', description: 'Ejercicios de estabilidad', icon: '⚖️' },
  { id: 'plyometric', name: 'Pliométricos', description: 'Ejercicios explosivos', icon: '⚡' },
  { id: 'functional', name: 'Funcional', description: 'Movimientos funcionales', icon: '🔄' }
]

// Grupos musculares
export const muscleGroups: MuscleGroup[] = [
  { id: 'chest', name: 'Pecho', description: 'Músculos del pecho', icon: '🫁', color: '#FF6B35' },
  { id: 'back', name: 'Espalda', description: 'Músculos de la espalda', icon: '🫸', color: '#00C9A7' },
  { id: 'shoulders', name: 'Hombros', description: 'Músculos del hombro', icon: '🤲', color: '#7C3AED' },
  { id: 'biceps', name: 'Bíceps', description: 'Músculos del bíceps', icon: '💪', color: '#FB7185' },
  { id: 'triceps', name: 'Tríceps', description: 'Músculos del tríceps', icon: '💪', color: '#F472B6' },
  { id: 'forearms', name: 'Antebrazos', description: 'Músculos del antebrazo', icon: '🤏', color: '#F59E0B' },
  { id: 'abs', name: 'Abdominales', description: 'Músculos abdominales', icon: '🎯', color: '#FEE75C' },
  { id: 'obliques', name: 'Oblicuos', description: 'Músculos oblicuos', icon: '🎯', color: '#FACC15' },
  { id: 'quads', name: 'Cuádriceps', description: 'Músculos del cuádriceps', icon: '🦵', color: '#10B981' },
  { id: 'hamstrings', name: 'Isquiotibiales', description: 'Músculos isquiotibiales', icon: '🦵', color: '#059669' },
  { id: 'glutes', name: 'Glúteos', description: 'Músculos glúteos', icon: '🍑', color: '#06B6D4' },
  { id: 'calves', name: 'Pantorrillas', description: 'Músculos de la pantorrilla', icon: '🦶', color: '#047857' }
]

// Base de datos de ejercicios (expandida basada en Free Exercise DB)
export const exercisesDatabase: Exercise[] = [
  // PECHO
  {
    id: 1,
    name: 'Press de banca',
    description: 'Ejercicio fundamental para el desarrollo del pecho, hombros y tríceps',
    instructions: [
      'Acuéstate en un banco plano con los pies firmemente plantados en el suelo',
      'Agarra la barra con un agarre ligeramente más ancho que los hombros',
      'Baja la barra controladamente hasta tocar el pecho',
      'Empuja la barra hacia arriba hasta la posición inicial',
      'Mantén los omóplatos retraídos durante todo el movimiento'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps'],
    equipment: ['barbell', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'gRVjAtPip0Y', // Video de Athlean-X sobre press de banca
    duration: '3-5 min',
    calories_burned: 8,
    tips: ['No rebotes la barra en el pecho', 'Mantén el core activado', 'Respira al bajar, exhala al subir']
  },
  {
    id: 2,
    name: 'Flexiones',
    description: 'Ejercicio de peso corporal para el pecho, hombros y tríceps',
    instructions: [
      'Colócate en posición de plancha con las manos ligeramente más anchas que los hombros',
      'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
      'Baja el pecho hacia el suelo manteniendo los codos cerca del cuerpo',
      'Empuja hacia arriba hasta la posición inicial',
      'Mantén el core activado durante todo el movimiento'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'IODxDxX7oi4', // Video de Calisthenic Movement sobre flexiones
    duration: '2-3 min',
    calories_burned: 6,
    tips: ['Mantén la espalda recta', 'No dejes que las caderas se hundan', 'Respira al bajar, exhala al subir']
  },
  {
    id: 3,
    name: 'Press inclinado con mancuernas',
    description: 'Ejercicio para el pecho superior y hombros',
    instructions: [
      'Ajusta el banco a una inclinación de 30-45 grados',
      'Siéntate con una mancuerna en cada mano',
      'Empuja las mancuernas hacia arriba y ligeramente juntas',
      'Baja controladamente hasta que los codos estén a 90 grados',
      'Repite el movimiento manteniendo el control'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders', 'triceps'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['No uses demasiado peso', 'Mantén los omóplatos retraídos', 'Controla la fase excéntrica']
  },

  // ESPALDA
  {
    id: 4,
    name: 'Dominadas',
    description: 'Ejercicio de peso corporal para el desarrollo de la espalda',
    instructions: [
      'Cuelga de una barra con un agarre más ancho que los hombros',
      'Mantén el cuerpo recto y los omóplatos retraídos',
      'Tira del cuerpo hacia arriba hasta que el mentón pase la barra',
      'Baja controladamente hasta la posición inicial',
      'Mantén el core activado durante todo el movimiento'
    ],
    primary_muscles: ['back'],
    secondary_muscles: ['biceps', 'shoulders'],
    equipment: ['pull-up-bar'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['No balancees el cuerpo', 'Usa asistencia si es necesario', 'Mantén el pecho hacia arriba']
  },
  {
    id: 5,
    name: 'Remo con barra',
    description: 'Ejercicio fundamental para el desarrollo de la espalda',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Inclínate hacia adelante manteniendo la espalda recta',
      'Agarra la barra con un agarre ligeramente más ancho que los hombros',
      'Tira de la barra hacia el abdomen',
      'Baja controladamente hasta la posición inicial'
    ],
    primary_muscles: ['back'],
    secondary_muscles: ['biceps', 'shoulders'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['Mantén la espalda recta', 'No uses impulso', 'Siente la contracción en la espalda']
  },
  {
    id: 6,
    name: 'Peso muerto',
    description: 'Ejercicio compuesto para espalda, glúteos y piernas',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Agarra la barra con un agarre ligeramente más ancho que los hombros',
      'Mantén la espalda recta y el pecho hacia arriba',
      'Levanta la barra extendiendo las caderas y rodillas',
      'Baja controladamente manteniendo la forma correcta'
    ],
    primary_muscles: ['back', 'glutes'],
    secondary_muscles: ['hamstrings', 'quads', 'abs'],
    equipment: ['barbell'],
    difficulty: 'advanced',
    category: 'strength',
    tips: ['Mantén la barra cerca del cuerpo', 'No redondees la espalda', 'Usa un cinturón si es necesario']
  },

  // HOMBROS
  {
    id: 7,
    name: 'Press militar',
    description: 'Ejercicio para el desarrollo de los hombros',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Agarra la barra a la altura de los hombros',
      'Empuja la barra hacia arriba hasta que los brazos estén completamente extendidos',
      'Baja controladamente hasta la posición inicial',
      'Mantén el core activado durante todo el movimiento'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: ['triceps', 'abs'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    category: 'strength',
    tips: ['Mantén el core activado', 'No uses impulso', 'Respira al bajar, exhala al subir']
  },
  {
    id: 8,
    name: 'Elevaciones laterales',
    description: 'Ejercicio de aislamiento para los deltoides laterales',
    instructions: [
      'Párate con una mancuerna en cada mano',
      'Mantén los brazos ligeramente flexionados',
      'Eleva las mancuernas hacia los lados hasta la altura de los hombros',
      'Baja controladamente hasta la posición inicial',
      'Mantén el control durante todo el movimiento'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: [],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    category: 'strength',
    tips: ['No uses demasiado peso', 'Mantén los codos ligeramente flexionados', 'Siente la contracción en los hombros']
  },

  // PIERNAS
  {
    id: 9,
    name: 'Sentadillas',
    description: 'Ejercicio fundamental para el desarrollo de las piernas',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Mantén el pecho hacia arriba y el core activado',
      'Baja como si te fueras a sentar en una silla',
      'Baja hasta que los muslos estén paralelos al suelo',
      'Empuja hacia arriba hasta la posición inicial'
    ],
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    tips: ['Mantén las rodillas alineadas con los dedos de los pies', 'No dejes que las rodillas se vayan hacia adentro', 'Respira al bajar, exhala al subir']
  },
  {
    id: 10,
    name: 'Zancadas',
    description: 'Ejercicio unilateral para piernas y glúteos',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Da un paso hacia adelante con una pierna',
      'Baja hasta que ambas rodillas estén a 90 grados',
      'Empuja hacia arriba hasta la posición inicial',
      'Alterna las piernas en cada repetición'
    ],
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    tips: ['Mantén el torso erguido', 'No dejes que la rodilla delantera pase los dedos del pie', 'Controla el movimiento']
  },

  // CORE
  {
    id: 11,
    name: 'Plancha',
    description: 'Ejercicio isométrico para el core',
    instructions: [
      'Colócate en posición de flexión',
      'Apoya los antebrazos en el suelo',
      'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
      'Mantén la posición durante el tiempo establecido',
      'Respira normalmente durante el ejercicio'
    ],
    primary_muscles: ['abs'],
    secondary_muscles: ['shoulders', 'glutes'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    tips: ['Mantén el core activado', 'No dejes que las caderas se hundan', 'Respira normalmente']
  },
  {
    id: 12,
    name: 'Crunches',
    description: 'Ejercicio básico para los abdominales',
    instructions: [
      'Acuéstate boca arriba con las rodillas flexionadas',
      'Coloca las manos detrás de la cabeza',
      'Levanta los hombros del suelo contrayendo los abdominales',
      'Baja controladamente hasta la posición inicial',
      'Mantén el cuello relajado durante el movimiento'
    ],
    primary_muscles: ['abs'],
    secondary_muscles: [],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'Xyd_faZzoR8', // Video de Fitness Blender sobre crunches
    duration: '2-3 min',
    calories_burned: 4,
    tips: ['No tires del cuello', 'Siente la contracción en los abdominales', 'Controla el movimiento']
  },

  // EJERCICIOS ADICIONALES - PECHO
  {
    id: 13,
    name: 'Aperturas con mancuernas',
    description: 'Ejercicio de aislamiento para el pecho',
    instructions: [
      'Acuéstate en un banco plano con una mancuerna en cada mano',
      'Extiende los brazos hacia arriba con las palmas enfrentadas',
      'Baja las mancuernas en un arco amplio hasta sentir el estiramiento',
      'Regresa a la posición inicial contrayendo el pecho',
      'Mantén los codos ligeramente flexionados durante todo el movimiento'
    ],
    primary_muscles: ['chest'],
    secondary_muscles: ['shoulders'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'eozdVDA78K0', // Video de Athlean-X sobre aperturas
    duration: '3-4 min',
    calories_burned: 7,
    tips: ['No uses demasiado peso', 'Siente el estiramiento en el pecho', 'Controla la fase excéntrica']
  },
  {
    id: 14,
    name: 'Flexiones diamante',
    description: 'Variación de flexiones que enfatiza los tríceps',
    instructions: [
      'Colócate en posición de flexión',
      'Coloca las manos juntas formando un diamante con los dedos',
      'Mantén el cuerpo recto y el core activado',
      'Baja el pecho hacia las manos',
      'Empuja hacia arriba hasta la posición inicial'
    ],
    primary_muscles: ['triceps'],
    secondary_muscles: ['chest', 'shoulders'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'J0DnG1_S92I', // Video de Calisthenic Movement sobre flexiones diamante
    duration: '2-3 min',
    calories_burned: 6,
    tips: ['Mantén los codos cerca del cuerpo', 'No dejes que las caderas se hundan', 'Respira correctamente']
  },

  // EJERCICIOS ADICIONALES - ESPALDA
  {
    id: 15,
    name: 'Remo con mancuernas',
    description: 'Ejercicio unilateral para el desarrollo de la espalda',
    instructions: [
      'Coloca una rodilla y una mano en un banco',
      'Agarra una mancuerna con la mano libre',
      'Mantén la espalda recta y el core activado',
      'Tira de la mancuerna hacia la cadera',
      'Baja controladamente hasta la posición inicial'
    ],
    primary_muscles: ['back'],
    secondary_muscles: ['biceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'pYcpY20QaE8', // Video de Athlean-X sobre remo con mancuerna
    duration: '3-4 min',
    calories_burned: 8,
    tips: ['Mantén la espalda recta', 'Siente la contracción en la espalda', 'No uses impulso']
  },
  {
    id: 16,
    name: 'Peso muerto rumano',
    description: 'Variación del peso muerto que enfatiza los isquiotibiales',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Agarra la barra con un agarre ligeramente más ancho que los hombros',
      'Mantén las rodillas ligeramente flexionadas',
      'Hinge en las caderas bajando la barra',
      'Regresa a la posición inicial contrayendo los glúteos'
    ],
    primary_muscles: ['hamstrings', 'glutes'],
    secondary_muscles: ['back', 'abs'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'ytGaGIn3SjE', // Video de Athlean-X sobre peso muerto rumano
    duration: '4-5 min',
    calories_burned: 10,
    tips: ['Mantén la barra cerca del cuerpo', 'Siente el estiramiento en los isquiotibiales', 'No redondees la espalda']
  },

  // EJERCICIOS ADICIONALES - HOMBROS
  {
    id: 17,
    name: 'Elevaciones frontales',
    description: 'Ejercicio de aislamiento para los deltoides frontales',
    instructions: [
      'Párate con una mancuerna en cada mano',
      'Mantén los brazos extendidos frente al cuerpo',
      'Eleva las mancuernas hasta la altura de los hombros',
      'Baja controladamente hasta la posición inicial',
      'Mantén el control durante todo el movimiento'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: [],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'WJ4GmOZ-2j4', // Video de Athlean-X sobre elevaciones frontales
    duration: '2-3 min',
    calories_burned: 5,
    tips: ['No uses demasiado peso', 'Mantén los brazos extendidos', 'Controla el movimiento']
  },
  {
    id: 18,
    name: 'Pájaros',
    description: 'Ejercicio para los deltoides posteriores',
    instructions: [
      'Inclínate hacia adelante con una mancuerna en cada mano',
      'Mantén la espalda recta y el core activado',
      'Eleva las mancuernas hacia los lados',
      'Squeeze los omóplatos al final del movimiento',
      'Baja controladamente hasta la posición inicial'
    ],
    primary_muscles: ['shoulders'],
    secondary_muscles: ['back'],
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'rep-qVOkqgk', // Video de Athlean-X sobre pájaros
    duration: '3-4 min',
    calories_burned: 6,
    tips: ['Mantén la espalda recta', 'Siente la contracción en los hombros posteriores', 'No uses impulso']
  },

  // EJERCICIOS ADICIONALES - PIERNAS
  {
    id: 19,
    name: 'Sentadillas búlgaras',
    description: 'Ejercicio unilateral para piernas y glúteos',
    instructions: [
      'Coloca el empeine del pie trasero en un banco',
      'Mantén el pie delantero firmemente plantado',
      'Baja hasta que el muslo delantero esté paralelo al suelo',
      'Empuja hacia arriba hasta la posición inicial',
      'Mantén el torso erguido durante todo el movimiento'
    ],
    primary_muscles: ['quads', 'glutes'],
    secondary_muscles: ['hamstrings', 'abs'],
    equipment: ['bodyweight', 'bench'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: '2C-uNgKwzNY', // Video de Athlean-X sobre sentadillas búlgaras
    duration: '3-4 min',
    calories_burned: 8,
    tips: ['Mantén el torso erguido', 'No dejes que la rodilla pase los dedos del pie', 'Controla el movimiento']
  },
  {
    id: 20,
    name: 'Elevaciones de pantorrillas',
    description: 'Ejercicio para el desarrollo de las pantorrillas',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Eleva los talones del suelo',
      'Mantén la contracción por un momento',
      'Baja controladamente hasta la posición inicial',
      'Repite el movimiento manteniendo el control'
    ],
    primary_muscles: ['calves'],
    secondary_muscles: [],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    category: 'strength',
    youtube_id: 'jAxgE9e2j4s', // Video de Athlean-X sobre elevaciones de pantorrillas
    duration: '2-3 min',
    calories_burned: 4,
    tips: ['Mantén el control durante todo el movimiento', 'Siente la contracción en las pantorrillas', 'No uses impulso']
  },

  // EJERCICIOS ADICIONALES - CORE
  {
    id: 21,
    name: 'Mountain climbers',
    description: 'Ejercicio cardiovascular que trabaja el core',
    instructions: [
      'Colócate en posición de plancha',
      'Mantén el core activado y el cuerpo recto',
      'Lleva una rodilla hacia el pecho',
      'Alterna rápidamente entre las piernas',
      'Mantén un ritmo constante y controlado'
    ],
    primary_muscles: ['abs'],
    secondary_muscles: ['shoulders', 'quads'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    category: 'cardio',
    youtube_id: 'nmwgirgXLYM', // Video de Fitness Blender sobre mountain climbers
    duration: '1-2 min',
    calories_burned: 12,
    tips: ['Mantén el core activado', 'No dejes que las caderas se eleven', 'Mantén un ritmo constante']
  },
  {
    id: 22,
    name: 'Russian twists',
    description: 'Ejercicio para los oblicuos y el core',
    instructions: [
      'Siéntate con las rodillas flexionadas',
      'Inclínate ligeramente hacia atrás',
      'Levanta los pies del suelo si es posible',
      'Gira el torso de lado a lado',
      'Mantén el core activado durante todo el movimiento'
    ],
    primary_muscles: ['obliques'],
    secondary_muscles: ['abs'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    category: 'strength',
    youtube_id: 'wkD8rjkodUI', // Video de Fitness Blender sobre Russian twists
    duration: '2-3 min',
    calories_burned: 6,
    tips: ['Mantén el core activado', 'Controla el movimiento', 'No uses impulso']
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
