'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { StatCard } from '@/components/ui/stat-card'
import { calculateTDEE } from '@/lib/calculators'
import { Calculator, Info } from 'lucide-react'

export default function CalorieCalculatorPage() {
  const [formData, setFormData] = useState({
    sex: 'male' as 'male' | 'female',
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'very-active' | 'extra-active'
  })

  const [results, setResults] = useState<ReturnType<typeof calculateTDEE> | null>(null)
  const [showResults, setShowResults] = useState(false)

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'light', label: 'Light Activity', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate Activity', description: 'Moderate exercise 3-5 days/week' },
    { value: 'very-active', label: 'Very Active', description: 'Heavy exercise 6-7 days/week' },
    { value: 'extra-active', label: 'Extra Active', description: 'Very heavy exercise, physical job' }
  ]

  const handleCalculate = () => {
    const calculation = calculateTDEE(
      formData.weight,
      formData.height,
      formData.age,
      formData.sex,
      formData.activityLevel
    )
    setResults(calculation)
    setShowResults(true)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Calorie & TDEE"
        title="Calorie Calculator"
        subtitle="Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Information
            </h2>

            <div className="space-y-6">
              {/* Sex */}
              <div>
                <label htmlFor="calorie-sex-male" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Sex
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-[var(--text-primary)]">
                    <input
                      id="calorie-sex-male"
                      type="radio"
                      name="sex"
                      value="male"
                      checked={formData.sex === 'male'}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      className="mr-2 accent-[var(--accent)]"
                    />
                    Male
                  </label>
                  <label className="flex items-center text-[var(--text-primary)]">
                    <input
                      id="calorie-sex-female"
                      type="radio"
                      name="sex"
                      value="female"
                      checked={formData.sex === 'female'}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      className="mr-2 accent-[var(--accent)]"
                    />
                    Female
                  </label>
                </div>
              </div>

              <FormField
                label="Age (years)"
                id="calorie-age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('age', parseInt(e.target.value))}
              />

              <FormField
                label="Weight (kg)"
                id="calorie-weight"
                type="number"
                min="1"
                max="500"
                step="0.1"
                value={formData.weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('weight', parseFloat(e.target.value))}
              />

              <FormField
                label="Height (cm)"
                id="calorie-height"
                type="number"
                min="50"
                max="250"
                value={formData.height}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('height', parseInt(e.target.value))}
              />

              <FormField
                as="select"
                label="Activity Level"
                id="calorie-activity"
                value={formData.activityLevel}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange('activityLevel', e.target.value)}
              >
                {activityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label} - {level.description}
                  </option>
                ))}
              </FormField>

              <Button
                onClick={handleCalculate}
                className="w-full py-3 text-lg"
              >
                Calculate TDEE
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Results
            </h2>

            {showResults && results ? (
              <div className="space-y-6">
                <StatCard
                  value={results.bmr.toLocaleString()}
                  label="Basal Metabolic Rate (BMR)"
                  unit="cal/day"
                />

                <StatCard
                  value={results.tdee.toLocaleString()}
                  label="Total Daily Energy Expenditure (TDEE)"
                  unit="cal/day"
                />

                <StatCard
                  value={`${results.activityFactor}x`}
                  label="Activity Factor — multiplier applied to BMR"
                />

                {/* Macros */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Suggested Macros (30/40/30 split)
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--accent)]">
                        {results.macros.protein_g}g
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--accent)]">
                        {results.macros.carbs_g}g
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--accent)]">
                        {results.macros.fat_g}g
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">Fat</div>
                    </div>
                  </div>
                </Card>

                {/* Weight Goals */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Weight Goals
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Weight Loss (0.5kg/week):</span>
                      <span className="font-bold text-[var(--text-primary)]">
                        {Math.round(results.tdee - 500)} cal/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Weight Loss (1kg/week):</span>
                      <span className="font-bold text-[var(--text-primary)]">
                        {Math.round(results.tdee - 1000)} cal/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Weight Gain (0.5kg/week):</span>
                      <span className="font-bold text-[var(--text-primary)]">
                        {Math.round(results.tdee + 500)} cal/day
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <p className="text-[var(--text-secondary)]">
                  Enter your information and click &quot;Calculate TDEE&quot; to see your results
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Information */}
        <Card className="mt-8 p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-[var(--accent)] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                About This Calculator
              </h3>
              <div className="text-[var(--text-secondary)] space-y-3">
                <p>
                  This calculator uses the <strong className="text-[var(--text-primary)]">Mifflin-St Jeor equation</strong> to estimate your
                  Basal Metabolic Rate (BMR), which is the number of calories your body needs at rest
                  to maintain basic functions like breathing, circulation, and cell production.
                </p>
                <p>
                  Your Total Daily Energy Expenditure (TDEE) is calculated by multiplying your BMR
                  by an activity factor that accounts for your daily physical activity level.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Important:</strong> These are estimates and individual needs may vary.
                  Factors like muscle mass, genetics, and medical conditions can affect your actual
                  calorie needs. Consult with a healthcare professional for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
