'use client'

import { useEffect } from 'react'

interface MediaContainerProps {
  src: string
  alt?: string
  aspectRatio?: "square" | "video" | "custom"
  customAspectClass?: string
}

// Utility function to preload images and videos
const preloadMedia = (src: string) => {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov')
  link.as = isVideo ? 'video' : 'image'
  link.href = src
  document.head.appendChild(link)
}

export function MediaContainer({
  src,
  alt = "Media content",
  aspectRatio = "custom",
  customAspectClass = "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]",
}: MediaContainerProps) {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov")

  // Preload media on mount
  useEffect(() => {
    preloadMedia(src)
  }, [src])

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    custom: customAspectClass,
  }

  const containerClass = `${aspectClasses[aspectRatio]} w-full object-cover`

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
      {isVideo ? (
        <video
          src={src}
          className={containerClass}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
      ) : (
        <img src={src} alt={alt} className={containerClass} />
      )}
    </div>
  )
}
