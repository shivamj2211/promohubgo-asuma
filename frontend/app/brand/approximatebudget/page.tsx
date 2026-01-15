'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { apiFetch } from '@/lib/api' // ✅

interface BudgetOption {
  value: string
  label: string
}

export default function BudgetPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('')
  const [saving, setSaving] = useState(false)

  const options: BudgetOption[] = [
    { value: 'under_1000', label: 'Under $1,000' },
    { value: '1000_5000', label: '$1,000 – $5,000' },
    { value: '5000_10000', label: '$5,000 – $10,000' },
    { value: '10000_25000', label: '$10,000 – $25,000' },
    { value: '25000_50000', label: '$25,000 – $50,000' },
    { value: 'over_50000', label: '$50,000+' },
  ]

  const progress = 40

  const goNext = () => router.push('/brand/bussinesstype')

  const handleContinue = async () => {
    if (!selected) return

    try {
      setSaving(true)

      await apiFetch('/api/brand/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          approx_budget: selected,
        }),
      })

      goNext()
    } catch (e: any) {
      alert(e?.message || 'Failed to save budget')
    } finally {
      setSaving(false)
    }
  }

  const handleSkip = async () => {
    try {
      setSaving(true)

      // ✅ store null when skipped
      await apiFetch('/api/brand/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          approx_budget: null,
        }),
      })

      goNext()
    } catch (e: any) {
      alert(e?.message || 'Failed to skip budget')
    } finally {
      setSaving(false)
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
        <p className="text-xs text-gray-600 mt-2 text-center">
          Step 2 of 5 ({progress}%)
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-left">
          What’s your approximate budget for this campaign?
        </h1>

        <div className="space-y-4">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition-colors duration-150 ${
                selected === opt.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onClick={() => setSelected(opt.value)}
            >
              <input
                type="radio"
                name="budget"
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => setSelected(opt.value)}
                className="sr-only"
              />
              <span className="w-4 h-4 mr-3 inline-block border rounded-full flex items-center justify-center">
                {selected === opt.value && <span className="w-2 h-2 bg-indigo-600 rounded-full" />}
              </span>
              <span className="text-gray-700 font-medium">{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected || saving}
          className={`mt-6 w-full py-3 text-white font-semibold rounded-lg transition ${
            selected && !saving
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {saving ? 'Saving...' : 'Continue'}
        </button>

        <button
          onClick={handleSkip}
          disabled={saving}
          className="w-full mt-3 py-2 text-indigo-600 font-medium hover:underline disabled:opacity-50"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
