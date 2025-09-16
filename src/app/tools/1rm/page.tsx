'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            1RM Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Estimate your one-rep maximum strength using multiple validated formulas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Lift Data
            </h2>
            
            <div className="space-y-6">
              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight Lifted (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  step="0.5"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Reps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repetitions Completed
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.reps}
                  onChange={(e) => handleInputChange('reps', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the maximum reps you can perform with good form
                </p>
              </div>

              {/* Formula Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formula (Optional)
                </label>
                <select
                  value={formData.formula}
                  onChange={(e) => handleInputChange('formula', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {formulas.map((formula) => (
                    <option key={formula.value} value={formula.value}>
                      {formula.label} - {formula.description}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full py-3 text-lg"
              >
                Calculate 1RM
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your 1RM Estimates
            </h2>
            
            {showResults && results ? (
              <div className="space-y-6">
                {/* Primary Result */}
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    Selected Formula: {formulas.find(f => f.value === formData.formula)?.label}
                  </h3>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {results.oneRepMax} kg
                  </div>
                  <div className="text-sm text-orange-700">
                    Estimated 1RM
                  </div>
                </div>

                {/* All Formulas Comparison */}
                {allResults && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      All Formula Estimates
                    </h3>
                    <div className="space-y-3">
                      {formulas.map((formula) => {
                        const value = allResults[formula.value as keyof typeof allResults]
                        const isSelected = formula.value === formData.formula
                        
                        return (
                          <div key={formula.value} className={`flex justify-between items-center p-3 rounded-lg ${
                            isSelected ? 'bg-orange-100 border border-orange-200' : 'bg-white border border-gray-200'
                          }`}>
                            <div>
                              <div className="font-medium text-gray-900">{formula.label}</div>
                              <div className="text-xs text-gray-500">{formula.description}</div>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {value} kg
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Training Recommendations */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Training Recommendations
                  </h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• <strong>Strength Training:</strong> Use 80-90% of 1RM for 1-5 reps</p>
                    <p>• <strong>Power Training:</strong> Use 70-80% of 1RM for 3-6 reps</p>
                    <p>• <strong>Hypertrophy:</strong> Use 65-75% of 1RM for 6-12 reps</p>
                    <p>• <strong>Endurance:</strong> Use 50-65% of 1RM for 12+ reps</p>
                    <p>• <strong>Warm-up:</strong> Start with 40-50% of 1RM</p>
                  </div>
                </div>

                {/* Safety Notes */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                    Safety Guidelines
                  </h3>
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p>• Always use proper form and technique</p>
                    <p>• Have a spotter when attempting near-maximal lifts</p>
                    <p>• Warm up thoroughly before heavy lifting</p>
                    <p>• These are estimates - individual results may vary</p>
                    <p>• Progress gradually and listen to your body</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your weight and reps to estimate your 1RM
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-orange-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About 1RM Calculations
              </h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  One-Rep Maximum (1RM) is the maximum amount of weight you can lift for one repetition 
                  with proper form. Since testing true 1RM can be risky, we use validated formulas to estimate it.
                </p>
                <p>
                  <strong>Formula Accuracy:</strong> Different formulas work better for different rep ranges. 
                  Epley and Brzycki are most accurate for 1-10 reps, while Lombardi works well for higher rep ranges.
                </p>
                <p>
                  <strong>Individual Variation:</strong> These estimates can vary by ±5-10% from your actual 1RM. 
                  Factors like exercise selection, technique, and training experience affect accuracy.
                </p>
                <p>
                  <strong>Best Practices:</strong> Use these estimates as starting points for program design. 
                  Test your actual 1RM periodically under safe conditions with proper supervision.
                </p>
                <p>
                  <strong>Safety First:</strong> Never attempt true 1RM testing without proper preparation, 
                  equipment, and supervision. These calculations are safer alternatives for program planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
