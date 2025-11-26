/*
 * Step four of the onboarding flow where a brand specifies which types
 * of influencers they’re interested in.  Multiple selections (up to
 * three) are permitted.  Once at least one option has been chosen,
 * the Continue button becomes active.  Attempting to select more than
 * three categories will do nothing and a message will appear.
 */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Category {
  value: string
  label: string
}

export default function InfluencerTypePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  // Unified list of influencer categories from the provided mocks
  const categories: Category[] = [
    { value: 'beauty', label: 'Beauty' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'travel', label: 'Travel' },
    { value: 'health_fitness', label: 'Health & Fitness' },
    { value: 'food_drink', label: 'Food & Drink' },
    { value: 'comedy_entertainment', label: 'Comedy & Entertainment' },
    { value: 'art_photography', label: 'Art & Photography' },
    { value: 'family_children', label: 'Family & Children' },
    { value: 'music_dance', label: 'Music & Dance' },
    { value: 'entrepreneur_business', label: 'Entrepreneur & Business' },
    { value: 'animals_pets', label: 'Animals & Pets' },
    { value: 'education', label: 'Education' },
    { value: 'athlete_sports', label: 'Athlete & Sports' },
    { value: 'adventure_outdoors', label: 'Adventure & Outdoors' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'skilled_trades', label: 'Skilled Trades' },
    { value: 'cannabis', label: 'Cannabis' },
  ]

  const progress = 80

  const toggleCategory = (value: string) => {
    if (selected.includes(value)) {
      setSelected(prev => prev.filter(v => v !== value))
      setError('')
      return
    }
    if (selected.length >= 3) {
      setError('You can select a maximum of three categories.')
      return
    }
    setSelected(prev => [...prev, value])
    setError('')
  }

  const handleContinue = () => {
    if (selected.length > 0) {
      router.push('/brand/targetplatforms')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      {/* Progress bar */}
      <div className="w-full max-w-3xl mb-8">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">Step 4 of 5 ({progress}%)</p>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-left">
          What type of influencers are you looking for?
        </h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(cat => {
            const isActive = selected.includes(cat.value)
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => toggleCategory(cat.value)}
                className={`px-4 py-3 border rounded-lg text-left transition-colors duration-150 ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <span className="text-gray-700 font-medium">{cat.label}</span>
              </button>
            )
          })}
        </div>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`mt-8 w-full py-3 text-white font-semibold rounded-lg transition ${
            selected.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}