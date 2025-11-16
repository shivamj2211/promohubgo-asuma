'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export default function SummaryPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')

  const handleContinue = () => {
    if (!title.trim()) return
    console.log('Profile title:', title)
    // TODO: send to backend, then go to dashboard / next step
    router.push('/description')
  }

  const isDisabled = !title.trim()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-pink-300" style={{ width: '75%' }} />
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pb-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <Link
            href="/social-media"
            className="flex items-center text-sm text-gray-700"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Link>

          <button className="px-3 py-1.5 rounded-full border text-xs font-medium text-gray-800 bg-gray-100">
            View Example Profile
          </button>

          <div className="w-5" />
        </div>

        {/* Title + description */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Summarize yourself, this is the title
          <br />
          shown on your profile
        </h1>

        {/* Input */}
        <div className="mt-2 flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. Fitness Content Creator & Student Athlete"
            className="w-full px-4 py-4 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/70 border-gray-300"
          />
        </div>
      </div>

      {/* Bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-xl mx-auto">
          <Button
            onClick={handleContinue}
            disabled={isDisabled}
            className="w-full py-3 rounded-full bg-black text-white hover:bg-black/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
