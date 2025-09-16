// Fitness calculation utilities

export interface BMICalculation {
  bmi: number
  category: string
}

export interface TDEECalculation {
  bmr: number
  tdee: number
  activityFactor: number
  macros: {
    protein_g: number
    carbs_g: number
    fat_g: number
  }
}

export interface HeartRateCalculation {
  mhr: {
    fox: number
    tanaka: number
    gulati: number
    hunt: number
  }
  zones: {
    sedentary: [number, number]
    light: [number, number]
    sporadic: [number, number]
    regular: [number, number]
    high: [number, number]
  }
}

export interface OneRMCalculation {
  oneRepMax: number
}

export interface MacroCalculation {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  ratios: {
    protein_percent: number
    carb_percent: number
    fat_percent: number
  }
}

// BMI Calculator
export function calculateBMI(weightKg: number, heightCm: number): BMICalculation {
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  
  let category: string
  if (bmi < 18.5) {
    category = 'Underweight'
  } else if (bmi < 25) {
    category = 'Normal weight'
  } else if (bmi < 30) {
    category = 'Overweight'
  } else {
    category = 'Obese'
  }
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category
  }
}

// BMR Calculator using Mifflin-St Jeor equation
export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: 'male' | 'female'): number {
  if (sex === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  }
}

// TDEE Calculator
export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very-active' | 'extra-active'
): TDEECalculation {
  const bmr = calculateBMR(weightKg, heightCm, age, sex)
  
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    'very-active': 1.725,
    'extra-active': 1.9
  }
  
  const activityFactor = activityFactors[activityLevel]
  const tdee = bmr * activityFactor
  
  // Default macro distribution: 30% protein, 40% carbs, 30% fat
  const protein_g = Math.round((tdee * 0.30) / 4)
  const carbs_g = Math.round((tdee * 0.40) / 4)
  const fat_g = Math.round((tdee * 0.30) / 9)
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    activityFactor,
    macros: {
      protein_g,
      carbs_g,
      fat_g
    }
  }
}

// Heart Rate Zones Calculator
export function calculateHeartRateZones(age: number, sex: 'male' | 'female'): HeartRateCalculation {
  // Fox formula: 220 - age
  const fox = 220 - age
  
  // Tanaka formula: 208 - 0.7 * age
  const tanaka = 208 - 0.7 * age
  
  // Gulati formula (women): 206 - 0.88 * age
  const gulati = sex === 'female' ? 206 - 0.88 * age : tanaka
  
  // HUNT formula: 211 - 0.64 * age
  const hunt = 211 - 0.64 * age
  
  const mhr = { fox, tanaka, gulati, hunt }
  
  // Training zones as percentages
  const zones = {
    sedentary: [0.57, 0.67] as [number, number],
    light: [0.64, 0.74] as [number, number],
    sporadic: [0.74, 0.84] as [number, number],
    regular: [0.80, 0.91] as [number, number],
    high: [0.84, 0.94] as [number, number]
  }
  
  return { mhr, zones }
}

// 1RM Calculator
export function calculateOneRM(
  weight: number,
  reps: number,
  formula: 'epley' | 'brzycki' | 'lombardi' | 'oconner' = 'epley'
): OneRMCalculation {
  let oneRepMax: number
  
  switch (formula) {
    case 'epley':
      // Epley: 1RM = W × (1 + R/30)
      oneRepMax = weight * (1 + reps / 30)
      break
    case 'brzycki':
      // Brzycki: 1RM = W × (36 / (37 - R))
      oneRepMax = weight * (36 / (37 - reps))
      break
    case 'lombardi':
      // Lombardi: 1RM = W × R^0.10
      oneRepMax = weight * Math.pow(reps, 0.10)
      break
    case 'oconner':
      // O'Connor: 1RM = W × (1 + R/40)
      oneRepMax = weight * (1 + reps / 40)
      break
    default:
      oneRepMax = weight * (1 + reps / 30)
  }
  
  return {
    oneRepMax: Math.round(oneRepMax * 10) / 10
  }
}

// Macro Calculator
export function calculateMacros(
  calories: number,
  proteinPercent: number = 0.30,
  carbPercent: number = 0.50,
  fatPercent: number = 0.20
): MacroCalculation {
  // Validate that percentages sum to 1.0
  const totalPercent = proteinPercent + carbPercent + fatPercent
  if (Math.abs(totalPercent - 1.0) > 0.01) {
    throw new Error('Macro percentages must sum to 1.0 (100%)')
  }
  
  // Calculate grams for each macro
  // Protein and carbs: 4 calories per gram
  // Fat: 9 calories per gram
  const protein_g = Math.round((calories * proteinPercent) / 4)
  const carbs_g = Math.round((calories * carbPercent) / 4)
  const fat_g = Math.round((calories * fatPercent) / 9)
  
  return {
    calories,
    protein_g,
    carbs_g,
    fat_g,
    ratios: {
      protein_percent: proteinPercent,
      carb_percent: carbPercent,
      fat_percent: fatPercent
    }
  }
}

// Utility functions
export function convertKgToLbs(kg: number): number {
  return kg * 2.20462
}

export function convertLbsToKg(lbs: number): number {
  return lbs / 2.20462
}

export function convertCmToInches(cm: number): number {
  return cm / 2.54
}

export function convertInchesToCm(inches: number): number {
  return inches * 2.54
}

export function convertCmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = convertCmToInches(cm)
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return { feet, inches }
}

export function convertFeetInchesToCm(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches
  return convertInchesToCm(totalInches)
}
