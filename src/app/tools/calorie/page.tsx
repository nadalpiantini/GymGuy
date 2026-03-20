'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calorie Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Information
            </h2>
            
            <div className="space-y-6">
              {/* Sex */}
              <div>
                <label htmlFor="calorie-sex-male" className="block text-sm font-medium text-gray-700 mb-2">
                  Sex
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      id="calorie-sex-male"
                      type="radio"
                      name="sex"
                      value="male"
                      checked={formData.sex === 'male'}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      id="calorie-sex-female"
                      type="radio"
                      name="sex"
                      value="female"
                      checked={formData.sex === 'female'}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="calorie-age" className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  id="calorie-age"
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Weight */}
              <div>
                <label htmlFor="calorie-weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  id="calorie-weight"
                  type="number"
                  min="1"
                  max="500"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Height */}
              <div>
                <label htmlFor="calorie-height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  id="calorie-height"
                  type="number"
                  min="50"
                  max="250"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label htmlFor="calorie-activity" className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  id="calorie-activity"
                  value={formData.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full py-3 text-lg"
              >
                Calculate TDEE
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Results
            </h2>
            
            {showResults && results ? (
              <div className="space-y-6">
                {/* BMR */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Basal Metabolic Rate (BMR)
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {results.bmr.toLocaleString()} calories/day
                  </div>
                  <p className="text-sm text-blue-700">
                    The calories your body needs at rest to maintain basic functions
                  </p>
                </div>

                {/* TDEE */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Total Daily Energy Expenditure (TDEE)
                  </h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {results.tdee.toLocaleString()} calories/day
                  </div>
                  <p className="text-sm text-green-700">
                    Your total daily calorie needs including activity
                  </p>
                </div>

                {/* Activity Factor */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Activity Factor
                  </h3>
                  <div className="text-2xl font-bold text-gray-700 mb-2">
                    {results.activityFactor}x
                  </div>
                  <p className="text-sm text-gray-600">
                    Multiplier applied to BMR based on your activity level
                  </p>
                </div>

                {/* Macros */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">
                    Suggested Macros (30/40/30 split)
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">
                        {results.macros.protein_g}g
                      </div>
                      <div className="text-sm text-purple-700">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">
                        {results.macros.carbs_g}g
                      </div>
                      <div className="text-sm text-purple-700">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">
                        {results.macros.fat_g}g
                      </div>
                      <div className="text-sm text-purple-700">Fat</div>
                    </div>
                  </div>
                </div>

                {/* Weight Goals */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                    Weight Goals
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-yellow-700">Weight Loss (0.5kg/week):</span>
                      <span className="font-semibold text-yellow-800">
                        {Math.round(results.tdee - 500)} cal/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">Weight Loss (1kg/week):</span>
                      <span className="font-semibold text-yellow-800">
                        {Math.round(results.tdee - 1000)} cal/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700">Weight Gain (0.5kg/week):</span>
                      <span className="font-semibold text-yellow-800">
                        {Math.round(results.tdee + 500)} cal/day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your information and click &quot;Calculate TDEE&quot; to see your results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About This Calculator
              </h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  This calculator uses the <strong>Mifflin-St Jeor equation</strong> to estimate your 
                  Basal Metabolic Rate (BMR), which is the number of calories your body needs at rest 
                  to maintain basic functions like breathing, circulation, and cell production.
                </p>
                <p>
                  Your Total Daily Energy Expenditure (TDEE) is calculated by multiplying your BMR 
                  by an activity factor that accounts for your daily physical activity level.
                </p>
                <p>
                  <strong>Important:</strong> These are estimates and individual needs may vary. 
                  Factors like muscle mass, genetics, and medical conditions can affect your actual 
                  calorie needs. Consult with a healthcare professional for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
