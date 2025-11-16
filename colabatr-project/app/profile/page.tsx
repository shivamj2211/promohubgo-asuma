'use client'
import MobileDatePicker from '@/components/ui/mobile-date-picker'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ChevronLeft, Calendar as CalendarIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export default function ProfileDetailsPage() {
  const router = useRouter()

  const [gender, setGender] = useState<string>('Male')
  const [dob, setDob] = useState('January 1, 1994')
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const [languages, setLanguages] = useState<string[]>([])
  const allLanguages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati']

  const [whyDialogOpen, setWhyDialogOpen] = useState(false)

  const toggleLanguage = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    )
  }

 

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top progress bar */}
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-pink-300" style={{ width: '35%' }} />
        </div>

        <div className="max-w-xl mx-auto w-full px-4 pb-6 flex-1 flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <Link
              href="/location"
              className="flex items-center text-sm text-gray-700"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Link>

            <button className="px-3 py-1.5 rounded-full border text-xs font-medium text-gray-800 bg-gray-100">
              View Example Profile
            </button>

            {/* empty spacer for alignment */}
            <div className="w-5" />
          </div>

          {/* Title + description */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Help Brands Discover You
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Share a few details about yourself so we can match you with the right brand
            opportunities and help your profile stand out in search.
          </p>

          {/* Form fields */}
          <div className="space-y-4 flex-1">
            {/* Gender */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-800">{gender}</span>
                  <span className="text-gray-500 text-xs">▼</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-full">
                <DropdownMenuItem onClick={() => setGender('Male')}>
                  Male
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGender('Female')}>
                  Female
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGender('Non-binary')}>
                  Non-binary
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGender('Prefer not to say')}>
                  Prefer not to say
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Date of birth */}
            <div
              className="border rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer"
              onClick={() => setOpenDatePicker(true)}
            >
              <span className="text-sm text-gray-800">{dob}</span>
              <CalendarIcon className="w-5 h-5 text-gray-500" />
            </div>
            <MobileDatePicker
              open={openDatePicker}
              onOpenChange={setOpenDatePicker}
              onSelect={(date: string) => setDob(date)}
            />

            {/* Language select */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-500">
                    {languages.length ? 'Update your languages' : 'Select your language'}
                  </span>
                  <span className="text-gray-500 text-xs">▼</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-full">
                {allLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className="flex items-center justify-between"
                  >
                    <span>{lang}</span>
                    <input
                      type="checkbox"
                      checked={languages.includes(lang)}
                      onChange={() => toggleLanguage(lang)}
                      className="ml-2"
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Selected language chips */}
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className="px-3 py-1 rounded-xl bg-gray-100 text-xs text-gray-800 flex items-center gap-1"
                  >
                    {lang} <span className="text-gray-500">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom bar + button */}
          <div className="mt-8">
           <Button
            onClick={() => router.push('/content-selector')}
            className="w-full py-3 rounded-full bg-black text-white hover:bg-black/90"
          >
            Continue
          </Button>


            <p
              onClick={() => setWhyDialogOpen(true)}
              className="mt-3 text-center text-[11px] text-gray-500 underline underline-offset-2 cursor-pointer hover:text-gray-700"
            >
              Why do you ask this?
            </p>
          </div>
        </div>
      </div>

      {/* 🔽 Bottom-sheet “Why do you ask this?” Dialog goes HERE */}
      <Dialog open={whyDialogOpen} onOpenChange={setWhyDialogOpen}>
        <DialogContent
          className="
            max-w-full 
            rounded-t-3xl 
            fixed bottom-0 left-0 right-0 
            animate-slideUp 
            bg-white 
            p-6
            pb-8
            shadow-xl
            border-t
            sm:max-w-md sm:rounded-xl sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:translate-x-[-50%] sm:translate-y-[-50%]
          "
        >
          {/* Drag handle */}
          <div className="w-full flex justify-center mb-3">
            <div className="h-1.5 w-12 bg-gray-300 rounded-full"></div>
          </div>

          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Why We Ask This
            </DialogTitle>
            <DialogDescription className="text-center">
              Transparency helps you trust the process.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 text-sm text-gray-700 space-y-3">
            <p>
              To help brands discover the right creators for their campaigns, we ask for basic
              demographic information such as age, gender, ethnicity, and languages.
            </p>

            <p>
              This information helps us improve your matches, show you relevant opportunities,
              and personalize your experience on the platform.
            </p>

            <p>
              Your details are <span className="font-semibold">never shared publicly</span> and are
              only used to optimize your recommendations and improve the quality of collaborations
              you receive.
            </p>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => setWhyDialogOpen(false)}
              className="w-full rounded-full py-3"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
