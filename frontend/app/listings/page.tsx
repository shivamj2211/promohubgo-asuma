'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SiteFooter } from '@/components/footer/site-footer'
const mockListings = [
  {
    id: 1,
    title: 'Instagram Promotion - Fashion Niche',
    creator: 'Sarah Anderson',
    category: 'Fashion',
    followers: '250K',
    engagement: '8.5%',
    price: '$1,500',
    image: '👗',
  },
  {
    id: 2,
    title: 'YouTube Video Review - Tech Products',
    creator: 'Tech Guru Mike',
    category: 'Technology',
    followers: '500K',
    engagement: '6.2%',
    price: '$2,500',
    image: '📱',
  },
  {
    id: 3,
    title: 'TikTok Content Series - Beauty',
    creator: 'Emma Chen',
    category: 'Beauty',
    followers: '1.2M',
    engagement: '9.1%',
    price: '$3,000',
    image: '💄',
  },
  {
    id: 4,
    title: 'Instagram Reels - Fitness Coaching',
    creator: 'James Fitness',
    category: 'Fitness',
    followers: '180K',
    engagement: '7.8%',
    price: '$1,200',
    image: '💪',
  },
  {
    id: 5,
    title: 'YouTube Shorts - Food Review',
    creator: 'Foodie Laura',
    category: 'Food',
    followers: '350K',
    engagement: '10.2%',
    price: '$1,800',
    image: '🍕',
  },
  {
    id: 6,
    title: 'TikTok Trending - Gaming Content',
    creator: 'Pro Gamer Alex',
    category: 'Gaming',
    followers: '800K',
    engagement: '12.5%',
    price: '$4,000',
    image: '🎮',
  },
]

export default function Listings() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'All',
    'Fashion',
    'Technology',
    'Beauty',
    'Fitness',
    'Food',
    'Gaming',
  ]

  const filteredListings = mockListings.filter(listing => {
    const categoryMatch =
      selectedCategory === 'all' ||
      listing.category.toLowerCase() === selectedCategory.toLowerCase()
    const searchMatch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.creator.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PromoHubGo
            </div>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Join Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Influencers</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover talented influencers across various niches ready to collaborate
          </p>

          {/* Search */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No influencers found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-48 flex items-center justify-center text-6xl">
                  {listing.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-4">by {listing.creator}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{listing.followers}</div>
                      <div className="text-gray-500">Followers</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-200">
                      <div className="font-bold text-gray-900">{listing.engagement}</div>
                      <div className="text-gray-500">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-indigo-600">{listing.price}</div>
                      <div className="text-gray-500">Per Post</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                      Contact
                    </Button>
                    {listing.id === 1 ? (
                      <a
                        href="https://www.instagram.com/pradeep.gameria?igsh=OXp1aW1jc2NqaHl1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm font-medium"
                      >
                        View Profile
                      </a>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      
      <SiteFooter />
    </div>
   
  )
}
