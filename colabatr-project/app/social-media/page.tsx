'use client'

import { useState, type ComponentType } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ExampleProfileDialog } from '@/components/exampleprofile/exapmleprofile'
import {
  ChevronLeft,
  Instagram,
  Music2,
  Youtube,
  Twitter,
  ShoppingBag,
  Link2,
} from 'lucide-react'

type PlatformKey =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitter'
  | 'amazon'
  | 'website'

type SocialData = {
  username: string
  followers: string
  url: string
}

type PlatformMeta = {
  key: PlatformKey
  label: string
  title: string
  Icon: ComponentType<{ className?: string }>
}

const followerRanges = [
  '0-1k',
  '1k-10k',
  '10k-50k',
  '50k-100k',
  '100k-500k',
  '500k-1m',
  '1m-5m',
  '5m+',
]

const platforms: PlatformMeta[] = [
  { key: 'instagram', label: 'Add Instagram', title: 'Instagram', Icon: Instagram },
  { key: 'tiktok', label: 'Add Tiktok', title: 'Tiktok', Icon: Music2 },
  { key: 'youtube', label: 'Add Youtube', title: 'Youtube', Icon: Youtube },
  { key: 'twitter', label: 'Add Twitter', title: 'Twitter / X', Icon: Twitter },
  { key: 'amazon', label: 'Add Amazon Storefront', title: 'Amazon Storefront', Icon: ShoppingBag },
  { key: 'website', label: 'Add Website', title: 'Website', Icon: Link2 },
]

// For auto URL generation
const urlPrefixes: Record<PlatformKey, string | null> = {
  instagram: 'https://www.instagram.com/',
  tiktok: 'https://www.tiktok.com/@',
  youtube: 'https://www.youtube.com/',
  twitter: 'https://twitter.com/',
  amazon: 'https://www.amazon.com/shop/',
  website: null, // no auto-prefix; user enters full URL
}

export default function SocialChannelsPage() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey | null>('instagram')
    const router = useRouter()

  const [socials, setSocials] = useState<Record<PlatformKey, SocialData>>({
    instagram: { username: '', followers: '', url: '' },
    tiktok: { username: '', followers: '', url: '' },
    youtube: { username: '', followers: '', url: '' },
    twitter: { username: '', followers: '', url: '' },
    amazon: { username: '', followers: '', url: '' },
    website: { username: '', followers: '', url: '' },
  })

  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const updateSocial = (
  key: PlatformKey,
  field: keyof SocialData,
  value: string
) => {
  setSocials((prev) => {
    const current = prev[key]
    const next: SocialData = {
      ...current,
      [field]: value,
    }

    // 🔄 Live auto URL whenever username changes
    if (field === 'username') {
      const cleanedUsername = value.replace(/^@+/, '').trim()
      const prefix = urlPrefixes[key]

      if (prefix) {
        // if username has content -> prefix + username
        // if username is empty -> clear the URL
        next.url = cleanedUsername ? prefix + cleanedUsername : ''
      }
    }

    return {
      ...prev,
      [key]: next,
    }
  })
}


  const isPlatformInvalid = (key: PlatformKey): boolean => {
    const s = socials[key]
    const vals = [s.username.trim(), s.followers.trim(), s.url.trim()]
    const filled = vals.filter(Boolean).length
    // if nothing touched -> valid (optional)
    if (filled === 0) return false
    // if partially filled -> invalid
    return filled > 0 && filled < 3
  }

  const hasCompleteSocial = Object.values(socials).some(
    (s) => s.username.trim() && s.followers.trim() && s.url.trim()
  )

  const hasPartialSocial = (Object.keys(socials) as PlatformKey[]).some((key) =>
    isPlatformInvalid(key)
  )

  const continueDisabled = !hasCompleteSocial || hasPartialSocial

  const handleContinue = () => {
  setAttemptedSubmit(true)

  if (continueDisabled) {
    return
  }

  console.log('Saved socials:', socials)
  router.push('/summary')
}

const handleSkip = () => {
  console.log('User skipped adding socials')
  router.push('/summary')
}


  const current = activePlatform ? socials[activePlatform] : null
  const currentMeta = platforms.find((p) => p.key === activePlatform) || null
  const currentHasError =
    attemptedSubmit && activePlatform !== null && isPlatformInvalid(activePlatform)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-pink-300" style={{ width: '65%' }} />
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pb-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <Link
            href="/onboarding/content-type"
            className="flex items-center text-sm text-gray-700"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Link>

       


<ExampleProfileDialog />


          <div className="w-5" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Add your social channels
        </h1>

        {/* Active platform editor */}
        {activePlatform && current && currentMeta && (
          <div className="mt-2 mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              {currentMeta.title}
            </p>

            {/* Row: username + followers */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={current.username}
                onChange={(e) =>
                  updateSocial(activePlatform, 'username', e.target.value)
                }
                placeholder={`${currentMeta.title} username`}
                className="w-full px-3 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/70 border-gray-300"
              />
              <select
                value={current.followers}
                onChange={(e) =>
                  updateSocial(activePlatform, 'followers', e.target.value)
                }
                className="w-full px-3 py-3 border rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/70 border-gray-300 bg-white"
              >
                <option value="">Followers</option>
                {followerRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile URL */}
            <input
              type="text"
              value={current.url}
              onChange={(e) =>
                updateSocial(activePlatform, 'url', e.target.value)
              }
              placeholder={
                currentMeta.key === 'website'
                  ? 'Website URL'
                  : `${currentMeta.title} profile link`
              }
              className="w-full px-3 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/70 border-gray-300"
            />

            {currentHasError && (
              <p className="mt-2 text-xs text-red-500">
                Please fill username, followers range, and profile link for{' '}
                {currentMeta.title}, or clear all fields for this channel.
              </p>
            )}
          </div>
        )}

        {/* List of channels */}
        <div className="space-y-3 mt-2 flex-1 overflow-y-auto pb-24">
          {platforms.map((p) => {
            const saved = socials[p.key]
            const isActive = activePlatform === p.key
            const hasData =
              saved.username.trim() || saved.url.trim() || saved.followers.trim()

            const Icon = p.Icon

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActivePlatform(p.key)}
                className={`
                  w-full border rounded-2xl px-4 py-3 flex items-center justify-between
                  ${isActive ? 'border-black' : 'border-gray-200'}
                  bg-white
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-gray-900">
                    {p.label}
                    {hasData && (
                      <span className="text-xs text-gray-500 ml-2">
                        (added)
                      </span>
                    )}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom: Continue + Skip */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-xl mx-auto space-y-2">
          {attemptedSubmit && continueDisabled && (
            <p className="text-[11px] text-red-500 text-center">
              Add at least one social channel with username, followers range and profile
              link to continue — or skip this step for now.
            </p>
          )}

          <Button
            onClick={handleContinue}
            disabled={continueDisabled}
            className="w-full py-3 rounded-full bg-black text-white hover:bg-black/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </Button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-center text-[11px] text-gray-500 underline underline-offset-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}
