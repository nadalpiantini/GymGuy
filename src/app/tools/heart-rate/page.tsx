'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { StatCard } from '@/components/ui/stat-card'
import { calculateHeartRateZones } from '@/lib/calculators'
import { Heart, Info } from 'lucide-react'

export default function HeartRateCalculatorPage() {
  const [formData, setFormData] = useState({
    age: 30,
    sex: 'male' as 'male' | 'female'
  })

  const [results, setResults] = useState<ReturnType<typeof calculateHeartRateZones> | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = () => {
    const calculation = calculateHeartRateZones(formData.age, formData.sex)
    setResults(calculation)
    setShowResults(true)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getZoneColor = (zone: string) => {
    const colors = {
      sedentary: 'bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--text-primary)]',
      light: 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--text-primary)]',
      sporadic: 'bg-[var(--warning)]/10 border-[var(--warning)]/30 text-[var(--text-primary)]',
      regular: 'bg-[var(--warning)]/20 border-[var(--warning)]/40 text-[var(--text-primary)]',
      high: 'bg-[var(--danger)]/10 border-[var(--danger)]/30 text-[var(--text-primary)]'
    }
    return colors[zone as keyof typeof colors] || colors.sedentary
  }

  const getZoneDescription = (zone: string) => {
    const descriptions = {
      sedentary: 'Very light activity, recovery, warm-up',
      light: 'Light activity, fat burning, endurance base',
      sporadic: 'Moderate activity, aerobic fitness',
      regular: 'Vigorous activity, anaerobic threshold',
      high: 'Maximum effort, sprint intervals'
    }
    return descriptions[zone as keyof typeof descriptions] || ''
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Cardiovascular Training"
        title="Heart Rate Zones"
        subtitle="Calculate your maximum heart rate and training zones for optimal cardiovascular training"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Information
            </h2>

            <div className="space-y-6">
              <FormField
                label="Age (years)"
                id="hr-age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('age', parseInt(e.target.value))}
              />

              {/* Sex */}
              <div>
                <label htmlFor="hr-sex-male" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Sex
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-[var(--text-primary)]">
                    <input
                      id="hr-sex-male"
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
                      id="hr-sex-female"
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

              <Button
                onClick={handleCalculate}
                className="w-full py-3 text-lg"
              >
                Calculate Heart Rate Zones
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Your Heart Rate Zones
            </h2>

            {showResults && results ? (
              <div className="space-y-6">
                {/* Maximum Heart Rate Formulas */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Maximum Heart Rate (MHR) Formulas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">Fox (220 - age):</span>
                      <span className="font-bold text-[var(--text-primary)]">{Math.round(results.mhr.fox)} bpm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">Tanaka (208 - 0.7 × age):</span>
                      <span className="font-bold text-[var(--text-primary)]">{Math.round(results.mhr.tanaka)} bpm</span>
                    </div>
                    {formData.sex === 'female' && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--text-secondary)]">Gulati (206 - 0.88 × age):</span>
                        <span className="font-bold text-[var(--text-primary)]">{Math.round(results.mhr.gulati)} bpm</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--text-secondary)]">HUNT (211 - 0.64 × age):</span>
                      <span className="font-bold text-[var(--text-primary)]">{Math.round(results.mhr.hunt)} bpm</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-3">
                    * Using Tanaka formula as primary reference for zone calculations
                  </p>
                </Card>

                {/* Training Zones */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    Training Zones (Based on Tanaka MHR: {Math.round(results.mhr.tanaka)} bpm)
                  </h3>

                  {Object.entries(results.zones).map(([zone, range]) => {
                    const minHR = Math.round(results.mhr.tanaka * range[0])
                    const maxHR = Math.round(results.mhr.tanaka * range[1])

                    return (
                      <div key={zone} className={`rounded-lg p-4 border-2 ${getZoneColor(zone)}`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold capitalize">
                            {zone} Zone
                          </h4>
                          <span className="text-sm text-[var(--text-secondary)]">
                            {Math.round(range[0] * 100)}% - {Math.round(range[1] * 100)}%
                          </span>
                        </div>
                        <div className="text-lg font-bold mb-1 text-[var(--accent)]">
                          {minHR} - {maxHR} bpm
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {getZoneDescription(zone)}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Training Recommendations */}
                <Card className="p-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Training Recommendations
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] space-y-2">
                    <p>• <strong className="text-[var(--text-primary)]">Beginner:</strong> Start with sedentary and light zones (57-74% MHR)</p>
                    <p>• <strong className="text-[var(--text-primary)]">Endurance:</strong> Focus on light and sporadic zones (64-84% MHR)</p>
                    <p>• <strong className="text-[var(--text-primary)]">Fitness:</strong> Include regular zone training (80-91% MHR)</p>
                    <p>• <strong className="text-[var(--text-primary)]">Performance:</strong> Add high-intensity intervals (84-94% MHR)</p>
                    <p>• <strong className="text-[var(--text-primary)]">Recovery:</strong> Use sedentary zone for active recovery</p>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <p className="text-[var(--text-secondary)]">
                  Enter your age and sex to calculate your heart rate zones
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
                About Heart Rate Zones
              </h3>
              <div className="text-[var(--text-secondary)] space-y-3">
                <p>
                  Heart rate zones are percentage ranges of your maximum heart rate that correspond
                  to different training intensities and physiological benefits.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Multiple Formulas:</strong> We provide several MHR formulas because individual
                  variation exists. The Tanaka formula (208 - 0.7 × age) is generally considered more
                  accurate than the traditional Fox formula (220 - age).
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Zone Benefits:</strong> Each zone targets different energy systems and provides
                  specific training adaptations. Lower zones improve aerobic capacity and fat burning,
                  while higher zones develop anaerobic power and speed.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Individual Variation:</strong> These are estimates. Your actual maximum heart rate
                  may vary by ±10-15 bpm. Consider getting a professional assessment for more accurate zones.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Safety:</strong> Always consult with a healthcare professional before starting
                  any new exercise program, especially if you have cardiovascular conditions or are taking
                  medications that affect heart rate.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
