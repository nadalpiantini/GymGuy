'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { StatCard } from '@/components/ui/stat-card'
import { calculateMacros } from '@/lib/calculators'
import { Target, Info } from 'lucide-react'

export default function MacroCalculatorPage() {
  const [formData, setFormData] = useState({
    calories: 2000,
    proteinPercent: 0.30,
    carbPercent: 0.50,
    fatPercent: 0.20
  })

  const [results, setResults] = useState<ReturnType<typeof calculateMacros> | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    try {
      setError(null)
      const calculation = calculateMacros(
        formData.calories,
        formData.proteinPercent,
        formData.carbPercent,
        formData.fatPercent
      )
      setResults(calculation)
      setShowResults(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input')
      setShowResults(false)
    }
  }

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePercentChange = (field: string, value: number) => {
    const newFormData = {
      ...formData,
      [field]: value
    }

    // Auto-adjust other percentages to maintain 100% total
    const total = newFormData.proteinPercent + newFormData.carbPercent + newFormData.fatPercent
    if (total > 1) {
      const excess = total - 1
      if (field === 'proteinPercent') {
        newFormData.carbPercent = Math.max(0, newFormData.carbPercent - excess / 2)
        newFormData.fatPercent = Math.max(0, newFormData.fatPercent - excess / 2)
      } else if (field === 'carbPercent') {
        newFormData.proteinPercent = Math.max(0, newFormData.proteinPercent - excess / 2)
        newFormData.fatPercent = Math.max(0, newFormData.fatPercent - excess / 2)
      } else {
        newFormData.proteinPercent = Math.max(0, newFormData.proteinPercent - excess / 2)
        newFormData.carbPercent = Math.max(0, newFormData.carbPercent - excess / 2)
      }
    }

    setFormData(newFormData)
  }

  const totalPercent = formData.proteinPercent + formData.carbPercent + formData.fatPercent

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Macronutrient Planning"
        title="Macro Calculator"
        subtitle="Calculate your daily macronutrient needs based on your calorie goals"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Goals
            </h2>

            <div className="space-y-6">
              {/* Calories */}
              <div>
                <FormField
                  label="Daily Calorie Target"
                  id="macro-calories"
                  type="number"
                  min="500"
                  max="10000"
                  step="50"
                  value={formData.calories}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('calories', parseInt(e.target.value))}
                />
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Use our <a href="/tools/calorie" className="text-[var(--accent)] hover:underline">Calorie Calculator</a> to determine your TDEE
                </p>
              </div>

              {/* Macro Distribution */}
              <div>
                <label htmlFor="macro-protein" className="block text-sm font-medium text-[var(--text-secondary)] mb-4">
                  Macro Distribution
                </label>

                <div className="space-y-4">
                  {/* Protein */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="macro-protein" className="text-sm font-medium text-[var(--text-secondary)]">Protein</label>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {Math.round(formData.proteinPercent * 100)}%
                      </span>
                    </div>
                    <input
                      id="macro-protein"
                      type="range"
                      min="0.05"
                      max="0.50"
                      step="0.01"
                      value={formData.proteinPercent}
                      onChange={(e) => handlePercentChange('proteinPercent', parseFloat(e.target.value))}
                      className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    />
                    <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="macro-carbs" className="text-sm font-medium text-[var(--text-secondary)]">Carbohydrates</label>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {Math.round(formData.carbPercent * 100)}%
                      </span>
                    </div>
                    <input
                      id="macro-carbs"
                      type="range"
                      min="0.20"
                      max="0.70"
                      step="0.01"
                      value={formData.carbPercent}
                      onChange={(e) => handlePercentChange('carbPercent', parseFloat(e.target.value))}
                      className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    />
                    <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                      <span>20%</span>
                      <span>70%</span>
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="macro-fat" className="text-sm font-medium text-[var(--text-secondary)]">Fat</label>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {Math.round(formData.fatPercent * 100)}%
                      </span>
                    </div>
                    <input
                      id="macro-fat"
                      type="range"
                      min="0.15"
                      max="0.40"
                      step="0.01"
                      value={formData.fatPercent}
                      onChange={(e) => handlePercentChange('fatPercent', parseFloat(e.target.value))}
                      className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    />
                    <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                      <span>15%</span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>

                {/* Total Percentage */}
                <div className={`mt-4 p-3 rounded-lg border ${
                  Math.abs(totalPercent - 1) < 0.01
                    ? 'bg-[var(--success)]/10 border-[var(--success)]/30'
                    : 'bg-[var(--danger)]/10 border-[var(--danger)]/30'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Total:</span>
                    <span className={`text-sm font-bold ${
                      Math.abs(totalPercent - 1) < 0.01 ? 'text-[var(--success)]' : 'text-[var(--danger)]'
                    }`}>
                      {Math.round(totalPercent * 100)}%
                    </span>
                  </div>
                  {Math.abs(totalPercent - 1) >= 0.01 && (
                    <p className="text-xs text-[var(--danger)] mt-1">
                      Percentages must add up to 100%
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-lg p-3">
                  <p className="text-sm text-[var(--danger)]">{error}</p>
                </div>
              )}

              <Button
                onClick={handleCalculate}
                disabled={Math.abs(totalPercent - 1) >= 0.01}
                className="w-full py-3 text-lg"
              >
                Calculate Macros
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Macro Breakdown
            </h2>

            {showResults && results ? (
              <div className="space-y-6">
                <StatCard
                  value={results.calories.toLocaleString()}
                  label="Total Calories"
                  unit="cal"
                />

                {/* Macro Grams */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[var(--accent)]/10 rounded-lg p-4 text-center border border-[var(--accent)]/20">
                    <div className="text-2xl font-bold text-[var(--accent)] mb-1">
                      {results.protein_g}g
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">Protein</div>
                    <div className="text-xs text-[var(--accent)] mt-1">
                      {Math.round(results.ratios.protein_percent * 100)}%
                    </div>
                  </div>

                  <div className="bg-[var(--accent)]/10 rounded-lg p-4 text-center border border-[var(--accent)]/20">
                    <div className="text-2xl font-bold text-[var(--accent)] mb-1">
                      {results.carbs_g}g
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">Carbs</div>
                    <div className="text-xs text-[var(--accent)] mt-1">
                      {Math.round(results.ratios.carb_percent * 100)}%
                    </div>
                  </div>

                  <div className="bg-[var(--accent)]/10 rounded-lg p-4 text-center border border-[var(--accent)]/20">
                    <div className="text-2xl font-bold text-[var(--accent)] mb-1">
                      {results.fat_g}g
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">Fat</div>
                    <div className="text-xs text-[var(--accent)] mt-1">
                      {Math.round(results.ratios.fat_percent * 100)}%
                    </div>
                  </div>
                </div>

                {/* Calorie Breakdown */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Calorie Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Protein:</span>
                      <span className="font-bold text-[var(--text-primary)]">
                        {Math.round(results.protein_g * 4)} cal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Carbohydrates:</span>
                      <span className="font-bold text-[var(--text-primary)]">
                        {Math.round(results.carbs_g * 4)} cal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Fat:</span>
                      <span className="font-bold text-[var(--text-primary)]">
                        {Math.round(results.fat_g * 9)} cal
                      </span>
                    </div>
                    <div className="border-t border-[var(--border)] pt-2 flex justify-between font-bold">
                      <span className="text-[var(--text-primary)]">Total:</span>
                      <span className="text-[var(--text-primary)]">
                        {Math.round(results.protein_g * 4 + results.carbs_g * 4 + results.fat_g * 9)} cal
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Quick Tips */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Quick Tips
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] space-y-2">
                    <p>• <strong className="text-[var(--text-primary)]">Protein:</strong> Aim for 0.8-1.2g per kg body weight for general health</p>
                    <p>• <strong className="text-[var(--text-primary)]">Carbs:</strong> Time around workouts for optimal performance</p>
                    <p>• <strong className="text-[var(--text-primary)]">Fat:</strong> Include healthy fats from nuts, avocados, and olive oil</p>
                    <p>• <strong className="text-[var(--text-primary)]">Hydration:</strong> Drink plenty of water throughout the day</p>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <p className="text-[var(--text-secondary)]">
                  Enter your calorie target and macro preferences to see your breakdown
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
                About Macronutrients
              </h3>
              <div className="text-[var(--text-secondary)] space-y-3">
                <p>
                  <strong className="text-[var(--text-primary)]">Protein (4 calories/gram):</strong> Essential for muscle repair and growth.
                  Important for maintaining muscle mass during weight loss and supporting recovery.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Carbohydrates (4 calories/gram):</strong> Your body&apos;s primary energy source.
                  Important for brain function, exercise performance, and recovery.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Fat (9 calories/gram):</strong> Essential for hormone production, vitamin absorption,
                  and providing sustained energy. Healthy fats support heart and brain health.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Recommended Ranges:</strong> Protein 10-35%, Carbs 45-65%, Fat 20-35% of total calories.
                  These ranges can be adjusted based on individual goals, activity level, and preferences.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Important:</strong> These are general guidelines. Individual needs may vary based on
                  activity level, body composition, and health goals. Consult with a nutritionist for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
