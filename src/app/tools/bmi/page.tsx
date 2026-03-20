'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { StatCard } from '@/components/ui/stat-card'
import { calculateBMI } from '@/lib/calculators'
import { Scale, Info } from 'lucide-react'

export default function BMICalculatorPage() {
  const [formData, setFormData] = useState({
    weight: 70,
    height: 175
  })

  const [results, setResults] = useState<ReturnType<typeof calculateBMI> | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = () => {
    const calculation = calculateBMI(formData.weight, formData.height)
    setResults(calculation)
    setShowResults(true)
  }

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-[var(--accent)]'
    if (bmi < 25) return 'text-[var(--success)]'
    if (bmi < 30) return 'text-[var(--warning)]'
    return 'text-[var(--danger)]'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--text-primary)]'
      case 'Normal weight': return 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--text-primary)]'
      case 'Overweight': return 'bg-[var(--warning)]/10 border-[var(--warning)]/30 text-[var(--text-primary)]'
      case 'Obese': return 'bg-[var(--danger)]/10 border-[var(--danger)]/30 text-[var(--text-primary)]'
      default: return 'bg-[var(--bg-tertiary)] border-[var(--border)] text-[var(--text-primary)]'
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Body Mass Index"
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index to assess your weight status"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Measurements
            </h2>

            <div className="space-y-6">
              <FormField
                label="Weight (kg)"
                id="bmi-weight"
                type="number"
                min="1"
                max="500"
                step="0.1"
                value={formData.weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('weight', parseFloat(e.target.value))}
              />

              <FormField
                label="Height (cm)"
                id="bmi-height"
                type="number"
                min="50"
                max="250"
                value={formData.height}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('height', parseInt(e.target.value))}
              />

              <Button
                onClick={handleCalculate}
                className="w-full py-4 text-lg"
                variant="default"
                size="lg"
              >
                Calculate BMI
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your BMI Results
            </h2>

            {showResults && results ? (
              <div className="space-y-6">
                {/* BMI Value */}
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getBMIColor(results.bmi)}`}>
                    {results.bmi}
                  </div>
                  <div className="text-lg text-[var(--text-secondary)]">BMI</div>
                </div>

                {/* Category */}
                <div className={`rounded-lg p-6 border-2 ${getCategoryColor(results.category)}`}>
                  <h3 className="text-xl font-bold mb-2">
                    {results.category}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {results.category === 'Underweight' && 'You may need to gain weight for optimal health.'}
                    {results.category === 'Normal weight' && 'Great! You have a healthy weight for your height.'}
                    {results.category === 'Overweight' && 'Consider losing weight to improve your health.'}
                    {results.category === 'Obese' && 'It is recommended to lose weight for better health outcomes.'}
                  </p>
                </div>

                {/* BMI Chart */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    BMI Categories
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">Underweight</span>
                      <span className="text-sm font-medium text-[var(--accent)]">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">Normal weight</span>
                      <span className="text-sm font-medium text-[var(--success)]">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">Overweight</span>
                      <span className="text-sm font-medium text-[var(--warning)]">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">Obese</span>
                      <span className="text-sm font-medium text-[var(--danger)]">≥ 30.0</span>
                    </div>
                  </div>
                </Card>

                {/* Health Recommendations */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Health Recommendations
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] space-y-2">
                    {results.category === 'Underweight' && (
                      <>
                        <p>• Focus on gaining weight through healthy foods</p>
                        <p>• Include strength training to build muscle mass</p>
                        <p>• Consult a healthcare provider if weight loss is unintentional</p>
                      </>
                    )}
                    {results.category === 'Normal weight' && (
                      <>
                        <p>• Maintain your current healthy lifestyle</p>
                        <p>• Continue regular exercise and balanced nutrition</p>
                        <p>• Monitor your weight regularly</p>
                      </>
                    )}
                    {results.category === 'Overweight' && (
                      <>
                        <p>• Aim for gradual weight loss (0.5-1kg per week)</p>
                        <p>• Focus on a balanced diet and regular exercise</p>
                        <p>• Consider consulting a nutritionist or dietitian</p>
                      </>
                    )}
                    {results.category === 'Obese' && (
                      <>
                        <p>• Seek professional medical advice for weight management</p>
                        <p>• Start with small, sustainable lifestyle changes</p>
                        <p>• Consider working with a healthcare team</p>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <Scale className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <p className="text-[var(--text-secondary)]">
                  Enter your weight and height to calculate your BMI
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
                About BMI
              </h3>
              <div className="text-[var(--text-secondary)] space-y-3">
                <p>
                  Body Mass Index (BMI) is a measure of body fat based on height and weight.
                  It&apos;s calculated using the formula: <strong className="text-[var(--text-primary)]">BMI = weight (kg) / height (m)²</strong>
                </p>
                <p>
                  BMI is a useful screening tool to identify potential weight problems,
                  but it doesn&apos;t directly measure body fat or account for factors like muscle mass,
                  bone density, or overall body composition.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Limitations:</strong> BMI may not be accurate for athletes with high muscle mass,
                  older adults who have lost muscle mass, or people with certain medical conditions.
                  It&apos;s best used as a general guideline alongside other health assessments.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Important:</strong> Always consult with a healthcare professional for
                  personalized health advice and weight management recommendations.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
