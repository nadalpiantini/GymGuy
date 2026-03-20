'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
    if (bmi < 18.5) return 'text-blue-600'
    if (bmi < 25) return 'text-green-600'
    if (bmi < 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'Normal weight': return 'bg-green-50 border-green-200 text-green-800'
      case 'Overweight': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'Obese': return 'bg-red-50 border-red-200 text-red-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Scale className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BMI Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your Body Mass Index to assess your weight status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Measurements
            </h2>
            
            <div className="space-y-6">
              {/* Weight */}
              <div>
                <label htmlFor="bmi-weight" className="block text-sm font-semibold text-foreground mb-3">
                  Weight (kg)
                </label>
                <input
                  id="bmi-weight"
                  type="number"
                  min="1"
                  max="500"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Height */}
              <div>
                <label htmlFor="bmi-height" className="block text-sm font-semibold text-foreground mb-3">
                  Height (cm)
                </label>
                <input
                  id="bmi-height"
                  type="number"
                  min="50"
                  max="250"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  className="input-modern"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full py-4 text-lg shadow-colored-green"
                variant="gradient"
                size="lg"
              >
                Calculate BMI
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="card-modern p-8 lg:p-10">
            <h2 className="text-3xl font-bold mb-8">
              Your BMI Results
            </h2>
            
            {showResults && results ? (
              <div className="space-y-6">
                {/* BMI Value */}
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getBMIColor(results.bmi)}`}>
                    {results.bmi}
                  </div>
                  <div className="text-lg text-gray-600">BMI</div>
                </div>

                {/* Category */}
                <div className={`rounded-lg p-6 border-2 ${getCategoryColor(results.category)}`}>
                  <h3 className="text-xl font-semibold mb-2">
                    {results.category}
                  </h3>
                  <p className="text-sm">
                    {results.category === 'Underweight' && 'You may need to gain weight for optimal health.'}
                    {results.category === 'Normal weight' && 'Great! You have a healthy weight for your height.'}
                    {results.category === 'Overweight' && 'Consider losing weight to improve your health.'}
                    {results.category === 'Obese' && 'It is recommended to lose weight for better health outcomes.'}
                  </p>
                </div>

                {/* BMI Chart */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    BMI Categories
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Underweight</span>
                      <span className="text-sm font-medium text-blue-600">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Normal weight</span>
                      <span className="text-sm font-medium text-green-600">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Overweight</span>
                      <span className="text-sm font-medium text-yellow-600">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Obese</span>
                      <span className="text-sm font-medium text-red-600">≥ 30.0</span>
                    </div>
                  </div>
                </div>

                {/* Health Recommendations */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Health Recommendations
                  </h3>
                  <div className="text-sm text-blue-800 space-y-2">
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
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your weight and height to calculate your BMI
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About BMI
              </h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. 
                  It&apos;s calculated using the formula: <strong>BMI = weight (kg) / height (m)²</strong>
                </p>
                <p>
                  BMI is a useful screening tool to identify potential weight problems, 
                  but it doesn&apos;t directly measure body fat or account for factors like muscle mass, 
                  bone density, or overall body composition.
                </p>
                <p>
                  <strong>Limitations:</strong> BMI may not be accurate for athletes with high muscle mass, 
                  older adults who have lost muscle mass, or people with certain medical conditions. 
                  It&apos;s best used as a general guideline alongside other health assessments.
                </p>
                <p>
                  <strong>Important:</strong> Always consult with a healthcare professional for 
                  personalized health advice and weight management recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
