import { supabase } from './supabase-client'

export type Locale = 'en' | 'es'

export interface Translation {
  key: string
  locale: string
  value: string
}

export class I18nService {
  private translations: Map<string, string> = new Map()
  private currentLocale: Locale = 'en'

  constructor(locale: Locale = 'en') {
    this.currentLocale = locale
  }

  async loadTranslations(locale: Locale = this.currentLocale): Promise<void> {
    try {
      // Check if we're in development mode without Supabase
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        // Use default translations in development mode
        this.translations.clear()
        Object.entries(defaultTranslations).forEach(([key, translations]) => {
          this.translations.set(key, translations[locale] || translations.en)
        })
        this.currentLocale = locale
        return
      }

      const { data, error } = await supabase
        .from('translations')
        .select('key, value')
        .eq('locale', locale)

      if (error) {
        console.error('Error loading translations:', error)
        return
      }

      this.translations.clear()
      data?.forEach((translation: any) => {
        this.translations.set(translation.key, translation.value)
      })

      this.currentLocale = locale
    } catch (error) {
      console.error('Error loading translations:', error)
    }
  }

  t(key: string, fallback?: string): string {
    return this.translations.get(key) || fallback || key
  }

  setLocale(locale: Locale): void {
    this.currentLocale = locale
  }

  getLocale(): Locale {
    return this.currentLocale
  }
}

// Default translations for fallback
export const defaultTranslations: Record<string, Record<Locale, string>> = {
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.workouts': { en: 'Workouts', es: 'Entrenamientos' },
  'nav.programs': { en: 'Programs', es: 'Programas' },
  'nav.statistics': { en: 'Statistics', es: 'Estadísticas' },
  'nav.tools': { en: 'Tools', es: 'Herramientas' },
  'nav.leaderboard': { en: 'Leaderboard', es: 'Ranking' },
  'nav.premium': { en: 'Premium', es: 'Premium' },
  'nav.about': { en: 'About', es: 'Acerca de' },
  'landing.title': { en: 'Build Your Perfect Workout', es: 'Construye tu Entrenamiento Perfecto' },
  'landing.subtitle': { 
    en: 'Create personalized workouts, follow structured programs, and track your fitness journey with our comprehensive platform.',
    es: 'Crea entrenamientos personalizados, sigue programas estructurados y rastrea tu viaje fitness con nuestra plataforma integral.'
  },
  'landing.cta': { en: 'Create Workout', es: 'Crear Entrenamiento' },
  'landing.explore_programs': { en: 'Explore Programs', es: 'Explorar Programas' },
  'generator.step1.title': { en: 'Select Equipment', es: 'Seleccionar Equipo' },
  'generator.step2.title': { en: 'Choose Muscles', es: 'Elegir Músculos' },
  'generator.step3.title': { en: 'Add Exercises', es: 'Añadir Ejercicios' },
  'generator.next': { en: 'Next', es: 'Siguiente' },
  'generator.previous': { en: 'Previous', es: 'Anterior' },
  'generator.save': { en: 'Save Workout', es: 'Guardar Entrenamiento' },
  'tools.calorie.title': { en: 'Calorie Calculator', es: 'Calculadora de Calorías' },
  'tools.bmi.title': { en: 'BMI Calculator', es: 'Calculadora de IMC' },
  'tools.macro.title': { en: 'Macro Calculator', es: 'Calculadora de Macros' },
  'tools.heartrate.title': { en: 'Heart Rate Zones', es: 'Zonas de Frecuencia Cardíaca' },
  'tools.onerm.title': { en: '1RM Calculator', es: 'Calculadora de 1RM' },
  'premium.title': { en: 'Go Premium', es: 'Hazte Premium' },
  'premium.subtitle': { 
    en: 'Unlock advanced features and support the project',
    es: 'Desbloquea funciones avanzadas y apoya el proyecto'
  },
  'about.title': { en: 'About Workout.cool', es: 'Acerca de Workout.cool' },
  'about.story': { 
    en: 'Workout.cool was created to provide a modern, actively maintained alternative to the abandoned workout.lol platform.',
    es: 'Workout.cool fue creado para proporcionar una alternativa moderna y mantenida activamente a la plataforma abandonada workout.lol.'
  },
  'auth.sign_in': { en: 'Sign In', es: 'Iniciar Sesión' },
  'auth.sign_up': { en: 'Sign Up', es: 'Registrarse' },
  'auth.sign_out': { en: 'Sign Out', es: 'Cerrar Sesión' }
}

export function getTranslation(key: string, locale: Locale = 'en'): string {
  return defaultTranslations[key]?.[locale] || key
}
