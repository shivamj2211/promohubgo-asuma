/*
 * This page represents the first step of the brand‑onboarding flow.
 * The user is asked what they are here to do and must pick exactly one option
 * before continuing. The progress bar at the top reflects that this is the
 * first of five onboarding steps (20 %). When the Continue button is
 * pressed, the router moves on to the next page (budget1).
 */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Definition of one of the selectable actions.  A simple object
// containing a machine value, a human‑readable label, and a small
// inline SVG icon.  In a real application you could extract these
// into a separate file or component.
interface Option {
  value: string
  label: string
  icon: JSX.Element
}

export default function HereToDoPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('')

  // Configure the available answers.  These icons are from Heroicons
  // (MIT licensed).  They’re kept small to prevent cognitive overload.
  const options: Option[] = [
    {
      value: 'one_time',
      label: 'Find influencers for a one‑time campaign',
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      value: 'ongoing',
      label: 'Get ongoing influencer content',
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
            d="M12 8v4l3 3m0 0l-3 3M15 15H3"
          />
        </svg>
      ),
    },
    {
      value: 'exploring',
      label: "I'm not sure yet, just exploring",
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
            d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13"
          />
        </svg>
      ),
    },
  ]

  // When the user clicks continue we push the next route.  The
  // selection is not persisted here – you may wish to store it in
  // context or local storage for later use.
  const handleContinue = () => {
    if (selected) {
      router.push('/brand/approximatebudget')
    }
  }

  // The progress value for the first step (20 %).  We calculate this
  // explicitly rather than deriving from length to avoid magic numbers.
  const progress = 20

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
        <p className="text-xs text-gray-600 mt-2 text-center">Step 1 of 5 ({progress}%)</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          What are you here to do?
        </h1>
        <div className="space-y-4">
          {options.map(opt => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors duration-150 ${
                selected === opt.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onClick={() => setSelected(opt.value)}
            >
              {/* The hidden radio input makes the component screen‑reader friendly. */}
              <input
                type="radio"
                name="heretodo"
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => setSelected(opt.value)}
                className="sr-only"
              />
              <span className="shrink-0">{opt.icon}</span>
              <span className="text-gray-700 font-medium flex-1">{opt.label}</span>
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