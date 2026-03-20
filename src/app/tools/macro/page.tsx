'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Macro Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your daily macronutrient needs based on your calorie goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Goals
            </h2>
            
            <div className="space-y-6">
              {/* Calories */}
              <div>
                <label htmlFor="macro-calories" className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Calorie Target
                </label>
                <input
                  id="macro-calories"
                  type="number"
                  min="500"
                  max="10000"
                  step="50"
                  value={formData.calories}
                  onChange={(e) => handleInputChange('calories', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use our <a href="/tools/calorie" className="text-purple-600 hover:underline">Calorie Calculator</a> to determine your TDEE
                </p>
              </div>

              {/* Macro Distribution */}
              <div>
                <label htmlFor="macro-protein" className="block text-sm font-medium text-gray-700 mb-4">
                  Macro Distribution
                </label>

                <div className="space-y-4">
                  {/* Protein */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="macro-protein" className="text-sm font-medium text-gray-700">Protein</label>
                      <span className="text-sm text-gray-500">
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="macro-carbs" className="text-sm font-medium text-gray-700">Carbohydrates</label>
                      <span className="text-sm text-gray-500">
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>20%</span>
                      <span>70%</span>
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="macro-fat" className="text-sm font-medium text-gray-700">Fat</label>
                      <span className="text-sm text-gray-500">
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>15%</span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>

                {/* Total Percentage */}
                <div className={`mt-4 p-3 rounded-lg ${
                  Math.abs(totalPercent - 1) < 0.01 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total:</span>
                    <span className={`text-sm font-bold ${
                      Math.abs(totalPercent - 1) < 0.01 ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {Math.round(totalPercent * 100)}%
                    </span>
                  </div>
                  {Math.abs(totalPercent - 1) >= 0.01 && (
                    <p className="text-xs text-red-600 mt-1">
                      Percentages must add up to 100%
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
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
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Macro Breakdown
            </h2>
            
            {showResults && results ? (
              <div className="space-y-6">
                {/* Total Calories */}
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {results.calories.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-600">Total Calories</div>
                </div>

                {/* Macro Grams */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {results.protein_g}g
                    </div>
                    <div className="text-sm text-blue-700">Protein</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {Math.round(results.ratios.protein_percent * 100)}%
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {results.carbs_g}g
                    </div>
                    <div className="text-sm text-green-700">Carbs</div>
                    <div className="text-xs text-green-600 mt-1">
                      {Math.round(results.ratios.carb_percent * 100)}%
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {results.fat_g}g
                    </div>
                    <div className="text-sm text-orange-700">Fat</div>
                    <div className="text-xs text-orange-600 mt-1">
                      {Math.round(results.ratios.fat_percent * 100)}%
                    </div>
                  </div>
                </div>

                {/* Calorie Breakdown */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">
                    Calorie Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Protein:</span>
                      <span className="font-semibold text-purple-800">
                        {Math.round(results.protein_g * 4)} cal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Carbohydrates:</span>
                      <span className="font-semibold text-purple-800">
                        {Math.round(results.carbs_g * 4)} cal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Fat:</span>
                      <span className="font-semibold text-purple-800">
                        {Math.round(results.fat_g * 9)} cal
                      </span>
                    </div>
                    <div className="border-t border-purple-200 pt-2 flex justify-between font-bold">
                      <span className="text-purple-900">Total:</span>
                      <span className="text-purple-900">
                        {Math.round(results.protein_g * 4 + results.carbs_g * 4 + results.fat_g * 9)} cal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                    Quick Tips
                  </h3>
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p>• <strong>Protein:</strong> Aim for 0.8-1.2g per kg body weight for general health</p>
                    <p>• <strong>Carbs:</strong> Time around workouts for optimal performance</p>
                    <p>• <strong>Fat:</strong> Include healthy fats from nuts, avocados, and olive oil</p>
                    <p>• <strong>Hydration:</strong> Drink plenty of water throughout the day</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your calorie target and macro preferences to see your breakdown
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-purple-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About Macronutrients
              </h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  <strong>Protein (4 calories/gram):</strong> Essential for muscle repair and growth. 
                  Important for maintaining muscle mass during weight loss and supporting recovery.
                </p>
                <p>
                  <strong>Carbohydrates (4 calories/gram):</strong> Your body&apos;s primary energy source. 
                  Important for brain function, exercise performance, and recovery.
                </p>
                <p>
                  <strong>Fat (9 calories/gram):</strong> Essential for hormone production, vitamin absorption, 
                  and providing sustained energy. Healthy fats support heart and brain health.
                </p>
                <p>
                  <strong>Recommended Ranges:</strong> Protein 10-35%, Carbs 45-65%, Fat 20-35% of total calories. 
                  These ranges can be adjusted based on individual goals, activity level, and preferences.
                </p>
                <p>
                  <strong>Important:</strong> These are general guidelines. Individual needs may vary based on 
                  activity level, body composition, and health goals. Consult with a nutritionist for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
