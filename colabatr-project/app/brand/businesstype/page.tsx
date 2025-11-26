/*
 * Step three in the brand onboarding sequence.  Brands select the
 * category that best describes their business.  Only one option may
 * be chosen.  A progress bar shows the user is 60 % through the
 * onboarding.  Continue remains disabled until a choice is made.
 */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BusinessOption {
  value: string
  label: string
  icon: JSX.Element
}

export default function BusinessTypePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('')

  const options: BusinessOption[] = [
    {
      value: 'agency',
      label: 'Agency',
      icon: (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6M9 16h6M12 8v8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      value: 'ecommerce',
      label: 'E‑commerce',
      icon: (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h14l1.24-5.52A2 2 0 0020.28 6H6.76M7 13l-1 5h14M7 13H5m2 0l.4-2"
          />
        </svg>
      ),
    },
    {
      value: 'website_app',
      label: 'Website/App',
      icon: (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      value: 'local_business',
      label: 'Local Business',
      icon: (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l1-4h16l1 4M7 13h3v7H7v-7zm7 0h3v7h-3v-7z"
          />
        </svg>
      ),
    },
    {
      value: 'other',
      label: 'Other',
      icon: (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 8v.01"
          />
        </svg>
      ),
    },
  ]

  const progress = 60

  const handleContinue = () => {
    if (selected) {
      router.push('/brand/selectinfluencer')
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
        <p className="text-xs text-gray-600 mt-2 text-center">Step 3 of 5 ({progress}%)</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-left">
          What type of business are you?
        </h1>
        <div className="space-y-4">
          {options.map(opt => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors duration-150 ${
                selected === opt.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onClick={() => setSelected(opt.value)}
            >
              <input
                type="radio"
                name="business_type"
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => setSelected(opt.value)}
                className="sr-only"
              />
              <span className="shrink-0">{opt.icon}</span>
              <span className="text-gray-700 font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`mt-6 w-full py-3 text-white font-semibold rounded-lg transition ${
            selected
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