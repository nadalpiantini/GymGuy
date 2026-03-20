'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubeVideo({ videoId, title, className = '' }: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
  }

  if (!isPlaying) {
    return (
      <div className={`relative cursor-pointer group ${className}`} onClick={handlePlay} role="button" tabIndex={0} aria-label={`Play video: ${title}`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlay(); } }}>
        <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`Video thumbnail: ${title}`}
            width={480}
            height={360}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-200">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">Click to watch video</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 z-10 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-200"
        aria-label="Close video"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
      <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  )
}