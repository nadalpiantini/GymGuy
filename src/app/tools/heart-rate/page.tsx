'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
      sedentary: 'bg-blue-50 border-blue-200 text-blue-800',
      light: 'bg-green-50 border-green-200 text-green-800',
      sporadic: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      regular: 'bg-orange-50 border-orange-200 text-orange-800',
      high: 'bg-red-50 border-red-200 text-red-800'
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Heart Rate Zones
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your maximum heart rate and training zones for optimal cardiovascular training
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Information
            </h2>
            
            <div className="space-y-6">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sex
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
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

              <Button
                onClick={handleCalculate}
                className="w-full py-3 text-lg"
              >
                Calculate Heart Rate Zones
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Heart Rate Zones
            </h2>
            
            {showResults && results ? (
              <div className="space-y-6">
                {/* Maximum Heart Rate Formulas */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Maximum Heart Rate (MHR) Formulas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fox (220 - age):</span>
                      <span className="font-semibold text-gray-900">{Math.round(results.mhr.fox)} bpm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tanaka (208 - 0.7 × age):</span>
                      <span className="font-semibold text-gray-900">{Math.round(results.mhr.tanaka)} bpm</span>
                    </div>
                    {formData.sex === 'female' && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Gulati (206 - 0.88 × age):</span>
                        <span className="font-semibold text-gray-900">{Math.round(results.mhr.gulati)} bpm</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">HUNT (211 - 0.64 × age):</span>
                      <span className="font-semibold text-gray-900">{Math.round(results.mhr.hunt)} bpm</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    * Using Tanaka formula as primary reference for zone calculations
                  </p>
                </div>

                {/* Training Zones */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Training Zones (Based on Tanaka MHR: {Math.round(results.mhr.tanaka)} bpm)
                  </h3>
                  
                  {Object.entries(results.zones).map(([zone, range]) => {
                    const minHR = Math.round(results.mhr.tanaka * range[0])
                    const maxHR = Math.round(results.mhr.tanaka * range[1])
                    
                    return (
                      <div key={zone} className={`rounded-lg p-4 border-2 ${getZoneColor(zone)}`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold capitalize">
                            {zone} Zone
                          </h4>
                          <span className="text-sm">
                            {Math.round(range[0] * 100)}% - {Math.round(range[1] * 100)}%
                          </span>
                        </div>
                        <div className="text-lg font-bold mb-1">
                          {minHR} - {maxHR} bpm
                        </div>
                        <div className="text-sm">
                          {getZoneDescription(zone)}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Training Recommendations */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Training Recommendations
                  </h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• <strong>Beginner:</strong> Start with sedentary and light zones (57-74% MHR)</p>
                    <p>• <strong>Endurance:</strong> Focus on light and sporadic zones (64-84% MHR)</p>
                    <p>• <strong>Fitness:</strong> Include regular zone training (80-91% MHR)</p>
                    <p>• <strong>Performance:</strong> Add high-intensity intervals (84-94% MHR)</p>
                    <p>• <strong>Recovery:</strong> Use sedentary zone for active recovery</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your age and sex to calculate your heart rate zones
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About Heart Rate Zones
              </h3>
              <div className="text-gray-600 space-y-3">
                <p>
                  Heart rate zones are percentage ranges of your maximum heart rate that correspond 
                  to different training intensities and physiological benefits.
                </p>
                <p>
                  <strong>Multiple Formulas:</strong> We provide several MHR formulas because individual 
                  variation exists. The Tanaka formula (208 - 0.7 × age) is generally considered more 
                  accurate than the traditional Fox formula (220 - age).
                </p>
                <p>
                  <strong>Zone Benefits:</strong> Each zone targets different energy systems and provides 
                  specific training adaptations. Lower zones improve aerobic capacity and fat burning, 
                  while higher zones develop anaerobic power and speed.
                </p>
                <p>
                  <strong>Individual Variation:</strong> These are estimates. Your actual maximum heart rate 
                  may vary by ±10-15 bpm. Consider getting a professional assessment for more accurate zones.
                </p>
                <p>
                  <strong>Safety:</strong> Always consult with a healthcare professional before starting 
                  any new exercise program, especially if you have cardiovascular conditions or are taking 
                  medications that affect heart rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
