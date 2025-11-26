/*
 * Final input step in the onboarding wizard.  Brands choose which
 * social platforms they want to target.  Multiple selections are
 * supported and at least one must be chosen before continuing.  This
 * page ends the data collection and routes the user to the welcome
 * tour.
 */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PlatformOption {
  value: string
  label: string
}

export default function PlatformTargetPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const options: PlatformOption[] = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'ugc', label: 'User Generated Content' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'facebook', label: 'Facebook' },
  ]

  const progress = 100

  const togglePlatform = (value: string) => {
    if (selected.includes(value)) {
      setSelected(prev => prev.filter(v => v !== value))
    } else {
      setSelected(prev => [...prev, value])
    }
  }

  const handleContinue = () => {
    if (selected.length > 0) {
      router.push('/branddashboard/brandwelcom')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">Step 5 of 5 ({progress}%)</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-left">
          What platform are you targeting?
        </h1>
        <div className="space-y-4">
          {options.map(opt => {
            const isActive = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => togglePlatform(opt.value)}
                className={`w-full text-left px-4 py-3 border rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <span className="text-gray-700 font-medium">{opt.label}</span>
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