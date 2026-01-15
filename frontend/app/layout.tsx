import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromoHubGo - Influencer Marketplace',
  description: 'Connect with top influencers and brands',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
          {children}
        </main>
      </body>
    </html>
  )
}
