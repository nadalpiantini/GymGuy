-- Seed data for the application

-- Insert equipment
INSERT INTO public.equipment (name, slug, icon) VALUES
('Bodyweight', 'bodyweight', '💪'),
('Dumbbell', 'dumbbell', '🏋️'),
('Barbell', 'barbell', '🏋️‍♂️'),
('Kettlebell', 'kettlebell', '⚖️'),
('Resistance Band', 'resistance-band', '🎯'),
('Pull-up Bar', 'pull-up-bar', '🆙'),
('Bench', 'bench', '🪑'),
('Cable Machine', 'cable-machine', '🔗'),
('Medicine Ball', 'medicine-ball', '⚽'),
('TRX', 'trx', '🎪'),
('Plate', 'plate', '🥏'),
('EZ Bar', 'ez-bar', '🔄');

-- Insert muscles
INSERT INTO public.muscles (name, slug, icon) VALUES
('Chest', 'chest', '🫁'),
('Back', 'back', '🫂'),
('Shoulders', 'shoulders', '💪'),
('Biceps', 'biceps', '💪'),
('Triceps', 'triceps', '💪'),
('Forearms', 'forearms', '🤏'),
('Abs', 'abs', '🫃'),
('Obliques', 'obliques', '🫃'),
('Lower Back', 'lower-back', '🫂'),
('Quads', 'quads', '🦵'),
('Hamstrings', 'hamstrings', '🦵'),
('Glutes', 'glutes', '🍑'),
('Calves', 'calves', '🦶'),
('Traps', 'traps', '🫂'),
('Lats', 'lats', '🫂');

-- Insert exercises
INSERT INTO public.exercises (name, description, video_url, cues, difficulty, equipment_required, primary_muscles, secondary_muscles) VALUES
-- Chest exercises
('Push-ups', 'Classic bodyweight chest exercise', 'https://videos.fitdistance.io/push-ups.mp4', ARRAY['Keep core tight', 'Full range of motion', 'Hands shoulder-width apart'], 'beginner', ARRAY[1], ARRAY[1], ARRAY[3, 5, 7]),
('Bench Press', 'Barbell chest press on bench', 'https://videos.fitdistance.io/bench-press.mp4', ARRAY['Retract shoulder blades', 'Control the weight', 'Full extension'], 'intermediate', ARRAY[2, 7], ARRAY[1], ARRAY[3, 5]),
('Dumbbell Flyes', 'Chest fly with dumbbells', 'https://videos.fitdistance.io/dumbbell-flyes.mp4', ARRAY['Slight bend in elbows', 'Feel the stretch', 'Squeeze at the top'], 'intermediate', ARRAY[2, 7], ARRAY[1], ARRAY[3]),
('Incline Press', 'Inclined chest press', 'https://videos.fitdistance.io/incline-press.mp4', ARRAY['30-45 degree angle', 'Upper chest focus', 'Stable base'], 'intermediate', ARRAY[2, 7], ARRAY[1], ARRAY[3, 5]),

-- Back exercises
('Pull-ups', 'Bodyweight back exercise', 'https://videos.fitdistance.io/pull-ups.mp4', ARRAY['Full hang to chin over bar', 'Engage lats', 'Controlled movement'], 'intermediate', ARRAY[6], ARRAY[2], ARRAY[3, 4, 14, 15]),
('Bent-over Row', 'Barbell row for back', 'https://videos.fitdistance.io/bent-over-row.mp4', ARRAY['Hinge at hips', 'Pull to lower chest', 'Squeeze shoulder blades'], 'intermediate', ARRAY[3], ARRAY[2], ARRAY[3, 4, 14]),
('Lat Pulldown', 'Cable lat pulldown', 'https://videos.fitdistance.io/lat-pulldown.mp4', ARRAY['Wide grip', 'Pull to chest', 'Feel lats working'], 'beginner', ARRAY[8], ARRAY[15], ARRAY[2, 3, 4]),
('Deadlift', 'Hip hinge movement', 'https://videos.fitdistance.io/deadlift.mp4', ARRAY['Hinge at hips', 'Keep back straight', 'Drive through heels'], 'advanced', ARRAY[3], ARRAY[2], ARRAY[9, 11, 12]),

-- Shoulder exercises
('Overhead Press', 'Barbell shoulder press', 'https://videos.fitdistance.io/overhead-press.mp4', ARRAY['Core tight', 'Press straight up', 'Full range of motion'], 'intermediate', ARRAY[3], ARRAY[3], ARRAY[7]),
('Lateral Raises', 'Dumbbell lateral raises', 'https://videos.fitdistance.io/lateral-raises.mp4', ARRAY['Slight bend in elbows', 'Raise to shoulder height', 'Control the descent'], 'beginner', ARRAY[2], ARRAY[3], ARRAY[]),
('Rear Delt Flyes', 'Rear deltoid isolation', 'https://videos.fitdistance.io/rear-delt-flyes.mp4', ARRAY['Bent over position', 'Squeeze shoulder blades', 'Feel rear delts'], 'beginner', ARRAY[2], ARRAY[3], ARRAY[2]),

-- Arm exercises
('Bicep Curls', 'Dumbbell bicep curls', 'https://videos.fitdistance.io/bicep-curls.mp4', ARRAY['Keep elbows at sides', 'Full range of motion', 'Squeeze at the top'], 'beginner', ARRAY[2], ARRAY[4], ARRAY[]),
('Tricep Dips', 'Bodyweight tricep exercise', 'https://videos.fitdistance.io/tricep-dips.mp4', ARRAY['Keep body upright', 'Full range of motion', 'Feel triceps working'], 'intermediate', ARRAY[1], ARRAY[5], ARRAY[3]),
('Hammer Curls', 'Neutral grip curls', 'https://videos.fitdistance.io/hammer-curls.mp4', ARRAY['Neutral grip', 'Keep wrists straight', 'Control the weight'], 'beginner', ARRAY[2], ARRAY[4], ARRAY[6]),

-- Leg exercises
('Squats', 'Bodyweight squat', 'https://videos.fitdistance.io/squats.mp4', ARRAY['Feet shoulder-width apart', 'Knees track over toes', 'Full depth'], 'beginner', ARRAY[1], ARRAY[10], ARRAY[11, 12]),
('Lunges', 'Bodyweight lunges', 'https://videos.fitdistance.io/lunges.mp4', ARRAY['Step forward', 'Lower back knee', 'Push back up'], 'beginner', ARRAY[1], ARRAY[10], ARRAY[11, 12]),
('Romanian Deadlift', 'Hip hinge for hamstrings', 'https://videos.fitdistance.io/romanian-deadlift.mp4', ARRAY['Hinge at hips', 'Feel hamstring stretch', 'Drive hips forward'], 'intermediate', ARRAY[3], ARRAY[11], ARRAY[12, 9]),
('Calf Raises', 'Calf isolation exercise', 'https://videos.fitdistance.io/calf-raises.mp4', ARRAY['Full range of motion', 'Squeeze at the top', 'Control the descent'], 'beginner', ARRAY[1], ARRAY[13], ARRAY[]),

-- Core exercises
('Plank', 'Isometric core exercise', 'https://videos.fitdistance.io/plank.mp4', ARRAY['Straight line from head to heels', 'Engage core', 'Breathe normally'], 'beginner', ARRAY[1], ARRAY[7], ARRAY[]),
('Russian Twists', 'Rotational core exercise', 'https://videos.fitdistance.io/russian-twists.mp4', ARRAY['Lean back slightly', 'Rotate from core', 'Touch ground each side'], 'beginner', ARRAY[1], ARRAY[7], ARRAY[8]),
('Mountain Climbers', 'Dynamic core exercise', 'https://videos.fitdistance.io/mountain-climbers.mp4', ARRAY['Keep core tight', 'Quick alternating steps', 'Maintain plank position'], 'intermediate', ARRAY[1], ARRAY[7], ARRAY[10]);

-- Insert programs
INSERT INTO public.programs (name, description, level, type, duration_weeks, frequency_per_week, session_duration_minutes, equipment_required, is_premium) VALUES
('Full Body Novice', 'Perfect for beginners starting their fitness journey. Focus on learning proper form and building a foundation.', 'beginner', 'strength', 4, 3, 45, ARRAY[1, 2, 3, 7], false),
('Upper/Lower Split', 'Intermediate program alternating between upper and lower body workouts for balanced development.', 'intermediate', 'strength', 6, 4, 60, ARRAY[1, 2, 3, 6, 7, 8], false),
('Push/Pull/Legs', 'Advanced 6-day program for serious lifters. Maximum volume and intensity.', 'advanced', 'strength', 8, 6, 75, ARRAY[1, 2, 3, 6, 7, 8, 11], true),
('Bodyweight Basics', 'No equipment needed! Build strength using only your body weight.', 'beginner', 'strength', 4, 3, 30, ARRAY[1], false),
('HIIT Cardio Blast', 'High-intensity interval training for fat loss and cardiovascular health.', 'intermediate', 'hiit', 4, 3, 25, ARRAY[1], false),
('Mobility & Flexibility', 'Improve range of motion and reduce injury risk with this mobility-focused program.', 'beginner', 'mobility', 6, 5, 20, ARRAY[1, 9], false);

-- Insert program sessions for Full Body Novice (Program ID 1)
INSERT INTO public.program_sessions (program_id, week, day, name, blocks) VALUES
(1, 1, 1, 'Full Body A', '[
  {
    "name": "Warm-up",
    "exercises": [
      {"exercise_id": 1, "sets": 1, "reps": 10, "rest_seconds": 30}
    ]
  },
  {
    "name": "Main Workout",
    "exercises": [
      {"exercise_id": 2, "sets": 3, "reps": 8, "rest_seconds": 90},
      {"exercise_id": 5, "sets": 3, "reps": 5, "rest_seconds": 90},
      {"exercise_id": 9, "sets": 3, "reps": 8, "rest_seconds": 60},
      {"exercise_id": 15, "sets": 3, "reps": 12, "rest_seconds": 60},
      {"exercise_id": 17, "sets": 3, "reps": 10, "rest_seconds": 60}
    ]
  }
]'::jsonb),
(1, 1, 3, 'Full Body B', '[
  {
    "name": "Warm-up",
    "exercises": [
      {"exercise_id": 1, "sets": 1, "reps": 10, "rest_seconds": 30}
    ]
  },
  {
    "name": "Main Workout",
    "exercises": [
      {"exercise_id": 3, "sets": 3, "reps": 10, "rest_seconds": 90},
      {"exercise_id": 6, "sets": 3, "reps": 8, "rest_seconds": 90},
      {"exercise_id": 10, "sets": 3, "reps": 10, "rest_seconds": 60},
      {"exercise_id": 16, "sets": 3, "reps": 12, "rest_seconds": 60},
      {"exercise_id": 18, "sets": 3, "reps": 10, "rest_seconds": 60}
    ]
  }
]'::jsonb),
(1, 1, 5, 'Full Body C', '[
  {
    "name": "Warm-up",
    "exercises": [
      {"exercise_id": 1, "sets": 1, "reps": 10, "rest_seconds": 30}
    ]
  },
  {
    "name": "Main Workout",
    "exercises": [
      {"exercise_id": 4, "sets": 3, "reps": 8, "rest_seconds": 90},
      {"exercise_id": 8, "sets": 3, "reps": 5, "rest_seconds": 90},
      {"exercise_id": 11, "sets": 3, "reps": 8, "rest_seconds": 60},
      {"exercise_id": 19, "sets": 3, "reps": 12, "rest_seconds": 60},
      {"exercise_id": 20, "sets": 3, "reps": 10, "rest_seconds": 60}
    ]
  }
]'::jsonb);

-- Insert translations
INSERT INTO public.translations (key, locale, value) VALUES
-- Navigation
('nav.home', 'en', 'Home'),
('nav.home', 'es', 'Inicio'),
('nav.workouts', 'en', 'Workouts'),
('nav.workouts', 'es', 'Entrenamientos'),
('nav.programs', 'en', 'Programs'),
('nav.programs', 'es', 'Programas'),
('nav.statistics', 'en', 'Statistics'),
('nav.statistics', 'es', 'Estadísticas'),
('nav.tools', 'en', 'Tools'),
('nav.tools', 'es', 'Herramientas'),
('nav.leaderboard', 'en', 'Leaderboard'),
('nav.leaderboard', 'es', 'Ranking'),
('nav.premium', 'en', 'Premium'),
('nav.premium', 'es', 'Premium'),
('nav.about', 'en', 'About'),
('nav.about', 'es', 'Acerca de'),

-- Landing page
('landing.title', 'en', 'Build Your Perfect Workout'),
('landing.title', 'es', 'Construye tu Entrenamiento Perfecto'),
('landing.subtitle', 'en', 'Create personalized workouts, follow structured programs, and track your fitness journey with our comprehensive platform.'),
('landing.subtitle', 'es', 'Crea entrenamientos personalizados, sigue programas estructurados y rastrea tu viaje fitness con nuestra plataforma integral.'),
('landing.cta', 'en', 'Create Workout'),
('landing.cta', 'es', 'Crear Entrenamiento'),
('landing.explore_programs', 'en', 'Explore Programs'),
('landing.explore_programs', 'es', 'Explorar Programas'),

-- Workout generator
('generator.step1.title', 'en', 'Select Equipment'),
('generator.step1.title', 'es', 'Seleccionar Equipo'),
('generator.step2.title', 'en', 'Choose Muscles'),
('generator.step2.title', 'es', 'Elegir Músculos'),
('generator.step3.title', 'en', 'Add Exercises'),
('generator.step3.title', 'es', 'Añadir Ejercicios'),
('generator.next', 'en', 'Next'),
('generator.next', 'es', 'Siguiente'),
('generator.previous', 'en', 'Previous'),
('generator.previous', 'es', 'Anterior'),
('generator.save', 'en', 'Save Workout'),
('generator.save', 'es', 'Guardar Entrenamiento'),

-- Tools
('tools.calorie.title', 'en', 'Calorie Calculator'),
('tools.calorie.title', 'es', 'Calculadora de Calorías'),
('tools.bmi.title', 'en', 'BMI Calculator'),
('tools.bmi.title', 'es', 'Calculadora de IMC'),
('tools.macro.title', 'en', 'Macro Calculator'),
('tools.macro.title', 'es', 'Calculadora de Macros'),
('tools.heartrate.title', 'en', 'Heart Rate Zones'),
('tools.heartrate.title', 'es', 'Zonas de Frecuencia Cardíaca'),
('tools.onerm.title', 'en', '1RM Calculator'),
('tools.onerm.title', 'es', 'Calculadora de 1RM'),

-- Premium
('premium.title', 'en', 'Go Premium'),
('premium.title', 'es', 'Hazte Premium'),
('premium.subtitle', 'en', 'Unlock advanced features and support the project'),
('premium.subtitle', 'es', 'Desbloquea funciones avanzadas y apoya el proyecto'),
('premium.features.unlimited_history', 'en', 'Unlimited workout history'),
('premium.features.unlimited_history', 'es', 'Historial ilimitado de entrenamientos'),
('premium.features.advanced_stats', 'en', 'Advanced statistics and analytics'),
('premium.features.advanced_stats', 'es', 'Estadísticas y análisis avanzados'),
('premium.features.pro_programs', 'en', 'Access to all premium programs'),
('premium.features.pro_programs', 'es', 'Acceso a todos los programas premium'),
('premium.features.personal_coach', 'en', '1-on-1 coaching sessions'),
('premium.features.personal_coach', 'es', 'Sesiones de coaching 1 a 1'),

-- About
('about.title', 'en', 'About Workout.cool'),
('about.title', 'es', 'Acerca de Workout.cool'),
('about.story', 'en', 'Workout.cool was created to provide a modern, actively maintained alternative to the abandoned workout.lol platform.'),
('about.story', 'es', 'Workout.cool fue creado para proporcionar una alternativa moderna y mantenida activamente a la plataforma abandonada workout.lol.'),
('about.opensource', 'en', 'Open Source & Community'),
('about.opensource', 'es', 'Código Abierto y Comunidad'),
('about.contribute', 'en', 'We welcome contributions in code, documentation, and ideas.'),
('about.contribute', 'es', 'Damos la bienvenida a contribuciones en código, documentación e ideas.');
