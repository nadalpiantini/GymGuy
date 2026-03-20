'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { StatCard } from '@/components/ui/stat-card'
import { calculateOneRM } from '@/lib/calculators'
import { Zap, Info } from 'lucide-react'

export default function OneRMCalculatorPage() {
  const [formData, setFormData] = useState({
    weight: 100,
    reps: 5,
    formula: 'epley' as 'epley' | 'brzycki' | 'lombardi' | 'oconner'
  })

  const [results, setResults] = useState<ReturnType<typeof calculateOneRM> | null>(null)
  const [showResults, setShowResults] = useState(false)

  const formulas = [
    { value: 'epley', label: 'Epley', description: '1RM = W × (1 + R/30)' },
    { value: 'brzycki', label: 'Brzycki', description: '1RM = W × (36 / (37 - R))' },
    { value: 'lombardi', label: 'Lombardi', description: '1RM = W × R^0.10' },
    { value: 'oconner', label: 'O\'Connor', description: '1RM = W × (1 + R/40)' }
  ]

  const handleCalculate = () => {
    const calculation = calculateOneRM(formData.weight, formData.reps, formData.formula)
    setResults(calculation)
    setShowResults(true)
  }

  const handleInputChange = (field: string, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateAllFormulas = () => {
    if (!formData.weight || !formData.reps) return null

    return {
      epley: calculateOneRM(formData.weight, formData.reps, 'epley').oneRepMax,
      brzycki: calculateOneRM(formData.weight, formData.reps, 'brzycki').oneRepMax,
      lombardi: calculateOneRM(formData.weight, formData.reps, 'lombardi').oneRepMax,
      oconner: calculateOneRM(formData.weight, formData.reps, 'oconner').oneRepMax
    }
  }

  const allResults = calculateAllFormulas()

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Strength Testing"
        title="1RM Calculator"
        subtitle="Estimate your one-rep maximum strength using multiple validated formulas"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Lift Data
            </h2>

            <div className="space-y-6">
              <FormField
                label="Weight Lifted (kg)"
                id="1rm-weight"
                type="number"
                min="1"
                max="1000"
                step="0.5"
                value={formData.weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('weight', parseFloat(e.target.value))}
              />

              <div>
                <FormField
                  label="Repetitions Completed"
                  id="1rm-reps"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.reps}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('reps', parseInt(e.target.value))}
                />
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Enter the maximum reps you can perform with good form
                </p>
              </div>

              <FormField
                as="select"
                label="Formula (Optional)"
                id="1rm-formula"
                value={formData.formula}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange('formula', e.target.value)}
              >
                {formulas.map((formula) => (
                  <option key={formula.value} value={formula.value}>
                    {formula.label} - {formula.description}
                  </option>
                ))}
              </FormField>

              <Button
                onClick={handleCalculate}
                className="w-full py-3 text-lg"
              >
                Calculate 1RM
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your 1RM Estimates
            </h2>

            {showResults && results ? (
              <div className="space-y-6">
                {/* Primary Result */}
                <div className="text-center">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Selected Formula: {formulas.find(f => f.value === formData.formula)?.label}
                  </p>
                  <StatCard
                    value={results.oneRepMax}
                    label="Estimated 1RM"
                    unit="kg"
                  />
                </div>

                {/* All Formulas Comparison */}
                {allResults && (
                  <Card className="p-4">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                      All Formula Estimates
                    </h3>
                    <div className="space-y-3">
                      {formulas.map((formula) => {
                        const value = allResults[formula.value as keyof typeof allResults]
                        const isSelected = formula.value === formData.formula

                        return (
                          <div key={formula.value} className={`flex justify-between items-center p-3 rounded-lg border ${
                            isSelected
                              ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30'
                              : 'bg-[var(--bg-tertiary)] border-[var(--border)]'
                          }`}>
                            <div>
                              <div className="font-medium text-[var(--text-primary)]">{formula.label}</div>
                              <div className="text-xs text-[var(--text-secondary)]">{formula.description}</div>
                            </div>
                            <div className="text-lg font-bold text-[var(--accent)]">
                              {value} kg
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                )}

                {/* Training Recommendations */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Training Recommendations
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] space-y-2">
                    <p>• <strong className="text-[var(--text-primary)]">Strength Training:</strong> Use 80-90% of 1RM for 1-5 reps</p>
                    <p>• <strong className="text-[var(--text-primary)]">Power Training:</strong> Use 70-80% of 1RM for 3-6 reps</p>
                    <p>• <strong className="text-[var(--text-primary)]">Hypertrophy:</strong> Use 65-75% of 1RM for 6-12 reps</p>
                    <p>• <strong className="text-[var(--text-primary)]">Endurance:</strong> Use 50-65% of 1RM for 12+ reps</p>
                    <p>• <strong className="text-[var(--text-primary)]">Warm-up:</strong> Start with 40-50% of 1RM</p>
                  </div>
                </Card>

                {/* Safety Notes */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Safety Guidelines
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] space-y-2">
                    <p>• Always use proper form and technique</p>
                    <p>• Have a spotter when attempting near-maximal lifts</p>
                    <p>• Warm up thoroughly before heavy lifting</p>
                    <p>• These are estimates - individual results may vary</p>
                    <p>• Progress gradually and listen to your body</p>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <p className="text-[var(--text-secondary)]">
                  Enter your weight and reps to estimate your 1RM
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
                About 1RM Calculations
              </h3>
              <div className="text-[var(--text-secondary)] space-y-3">
                <p>
                  One-Rep Maximum (1RM) is the maximum amount of weight you can lift for one repetition
                  with proper form. Since testing true 1RM can be risky, we use validated formulas to estimate it.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Formula Accuracy:</strong> Different formulas work better for different rep ranges.
                  Epley and Brzycki are most accurate for 1-10 reps, while Lombardi works well for higher rep ranges.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Individual Variation:</strong> These estimates can vary by ±5-10% from your actual 1RM.
                  Factors like exercise selection, technique, and training experience affect accuracy.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Best Practices:</strong> Use these estimates as starting points for program design.
                  Test your actual 1RM periodically under safe conditions with proper supervision.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Safety First:</strong> Never attempt true 1RM testing without proper preparation,
                  equipment, and supervision. These calculations are safer alternatives for program planning.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
