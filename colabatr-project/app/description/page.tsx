'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export default function DescriptionPage() {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const WORD_LIMIT = 200
    
  // ---- helpers ----
  const countWords = (text: string): number => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }

  const wordCount = useMemo(() => countWords(description), [description])

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    if (countWords(value) <= WORD_LIMIT) {
      setDescription(value)
    }
  }


  
  // 🔹 Decide suggestions based on selected content types
  useEffect(() => {
    let selected: string[] = []
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem('onboardingContentTypes')
      if (raw) {
        try {
          selected = JSON.parse(raw)
        } catch {
          selected = []
        }
      }
    }

    const primary = (selected[0] || '').toLowerCase()

    const generic = [
      `I’m a creator who shares honest, relatable content around my daily life, interests, and experiences. I focus on building a genuine connection with my audience and creating value through tips, stories, and behind-the-scenes moments.`,
      `I create content that blends education, entertainment, and personal stories. My goal is to inspire, inform, and motivate my audience while keeping things easy to understand and fun to watch.`,
      `My content highlights real-world experiences, practical advice, and creative ideas my audience can actually use. I focus on building trust and long-term relationships with the people who follow me.`,
    ]

    let typeBased: string[] = generic

    if (primary.includes('athlete') || primary.includes('sports')) {
      typeBased = [
        `I’m a sports and fitness creator sharing workouts, training sessions, and performance tips. My content focuses on helping people stay active, improve their game, and build a stronger, more confident body.`,
        `I create content around athletic lifestyle, recovery, and discipline — from daily training routines to mindset tips. My audience is people who love sports, want motivation, and enjoy watching real progress over time.`,
      ]
    } else if (primary.includes('music') || primary.includes('dance')) {
      typeBased = [
        `I’m a music and dance creator sharing choreography, freestyles, and performance clips. I love mixing trending sounds with my own style to create engaging, high-energy content.`,
        `My content focuses on dance routines, reels, and musical moments that are easy to watch, share, and try at home. My audience is people who enjoy music, movement, and expressive visuals.`,
      ]
    } else if (primary.includes('family') || primary.includes('children')) {
      typeBased = [
        `I create family and lifestyle content that shows real moments at home — from parenting and kids’ activities to everyday routines. My audience is families and parents who relate to honest, down-to-earth content.`,
        `My content highlights family time, children’s learning activities, and small, meaningful moments. I focus on positive, safe, and relatable stories that people can watch together.`,
      ]
    } else if (primary.includes('animals') || primary.includes('pets')) {
      typeBased = [
        `I’m a pet and animal content creator sharing funny, adorable, and heartwarming moments with animals. My audience loves seeing daily life with pets, training progress, and playful clips.`,
        `My content focuses on pet care tips, reactions, and personality moments that show how unique and lovable animals can be. I try to make every video feel like a mood booster.`,
      ]
    } else if (primary.includes('education')) {
      typeBased = [
        `I create educational content that simplifies complex topics into clear, practical lessons. My audience is students and young professionals who want straightforward explanations they can actually apply.`,
        `My focus is on breaking down concepts, sharing study strategies, and giving career or learning tips. I aim to make education feel friendly, useful, and less intimidating.`,
      ]
    } else if (primary.includes('gaming')) {
      typeBased = [
        `I’m a gaming creator who shares gameplay highlights, funny moments, and honest reactions. My content is fast-paced, entertaining, and built around interacting with the gaming community.`,
        `My audience is gamers who enjoy watching clips, live moments, and relatable gaming situations. I mix skill, humor, and commentary to keep things engaging.`,
      ]
    } else if (primary.includes('technology')) {
      typeBased = [
        `I create tech content focused on apps, tools, and devices that make everyday life easier. My audience follows me for simple breakdowns, practical reviews, and tips on how to use technology better.`,
        `My content explains complex tech in a friendly way, from productivity setups to app recommendations. I focus on real usage rather than just specs.`,
      ]
    } else if (primary.includes('entrepreneur') || primary.includes('business')) {
      typeBased = [
        `I’m a business and entrepreneurship creator sharing lessons from building projects, side hustles, and brands. My audience is people who want practical insights into marketing, growth, and digital income.`,
        `My content focuses on simplifying business concepts, sharing real numbers and stories, and helping people take small, realistic steps toward their own goals.`,
      ]
    } else if (primary.includes('vegan') || primary.includes('cannabis') || primary.includes('adventure') || primary.includes('outdoors') || primary.includes('automotive') || primary.includes('skilled')) {
      // group of niche lifestyle categories: vegan, cannabis, adventure, automotive, trades
      typeBased = [
        `I create niche lifestyle content focused on my specific area of interest. I share tips, experiences, and honest opinions to help people learn more and feel confident exploring this space.`,
        `My audience is people who are curious about this niche and want practical, real content instead of just polished ads. I focus on showing the day-to-day reality and useful takeaways.`,
      ]
    }

    setSuggestions(typeBased)
  }, [])

  const handleSuggestionClick = (text: string) => {
    if (countWords(text) <= WORD_LIMIT) {
      setDescription(text)
    } else {
      const words = text.trim().split(/\s+/).slice(0, WORD_LIMIT)
      setDescription(words.join(' '))
    }
  }

  const handleContinue = () => {
    if (!description.trim() || wordCount === 0 || wordCount > WORD_LIMIT) return
    console.log('Description:', description)
     router.push('/listings')
  }

  const isDisabled =
    !description.trim() || wordCount === 0 || wordCount > WORD_LIMIT

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-pink-300" style={{ width: '82%' }} />
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pb-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <Link
            href="/onboarding/summary"
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

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Describe yourself and your content
        </h1>

        {/* Textarea + counter */}
        <div className="relative w-full mb-4">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches."
            className="
              w-full min-h-[170px] px-4 py-3 border rounded-2xl text-sm
              focus:outline-none focus:ring-2 focus:ring-black/70 border-gray-300
            "
          />

          <p
            className={`text-xs mt-2 text-right ${
              wordCount > WORD_LIMIT ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {wordCount} / {WORD_LIMIT} words
          </p>
        </div>

        {/* Dynamic suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Need help? Try one of these example descriptions based on your content type:
            </p>

            <div className="space-y-2">
              {suggestions.map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionClick(text)}
                  className="
                    w-full text-left text-xs sm:text-sm p-3 rounded-2xl border
                    border-gray-200 bg-gray-50 hover:bg-gray-100 transition
                  "
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}
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
