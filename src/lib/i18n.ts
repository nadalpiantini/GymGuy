import { supabase } from './supabase-client'

export type Locale = 'en'

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
        Object.entries(defaultTranslations).forEach(([key, value]) => {
          this.translations.set(key, value)
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
export const defaultTranslations: Record<string, string> = {
  'nav.home': 'Home',
  'nav.workouts': 'Workouts',
  'nav.programs': 'Programs',
  'nav.statistics': 'Statistics',
  'nav.tools': 'Tools',
  'nav.leaderboard': 'Leaderboard',
  'nav.premium': 'Premium',
  'nav.about': 'About',
  'landing.title': 'Build Your Perfect Workout',
  'landing.subtitle': 'Create personalized workouts, follow structured programs, and track your fitness journey with our comprehensive platform.',
  'landing.cta': 'Create Workout',
  'landing.explore_programs': 'Explore Programs',
  'generator.step1.title': 'Select Equipment',
  'generator.step2.title': 'Choose Muscles',
  'generator.step3.title': 'Add Exercises',
  'generator.next': 'Next',
  'generator.previous': 'Previous',
  'generator.save': 'Save Workout',
  'tools.calorie.title': 'Calorie Calculator',
  'tools.bmi.title': 'BMI Calculator',
  'tools.macro.title': 'Macro Calculator',
  'tools.heartrate.title': 'Heart Rate Zones',
  'tools.onerm.title': '1RM Calculator',
  'premium.title': 'Go Premium',
  'premium.subtitle': 'Unlock advanced features and support the project',
  'about.title': 'About GymGuy',
  'about.story': 'GymGuy was created to provide a modern, actively maintained alternative to the abandoned workout.lol platform.',
  'auth.sign_in': 'Sign In',
  'auth.sign_up': 'Sign Up',
  'auth.sign_out': 'Sign Out',
  'auth.password_mismatch': 'Passwords do not match',
  'auth.password_too_short': 'Password must be at least 6 characters',
  'auth.signup_success': 'Account created successfully!',
  'auth.check_email': 'Please check your email to verify your account.',
  'auth.name': 'Name',
  'auth.name_placeholder': 'Enter your name',
  'auth.email': 'Email',
  'auth.email_placeholder': 'Enter your email',
  'auth.password': 'Password',
  'auth.password_placeholder': 'Enter your password',
  'auth.confirm_password': 'Confirm Password',
  'auth.confirm_password_placeholder': 'Confirm your password',
  'auth.creating_account': 'Creating account...',
  'auth.create_account': 'Create Account',
  'auth.have_account': 'Already have an account? Sign in',
  'auth.signing_in': 'Signing in...',
  'auth.no_account': "Don't have an account? Sign up"
}

export function getTranslation(key: string, locale: Locale = 'en'): string {
  return defaultTranslations[key] || key
}
