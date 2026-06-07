'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface ProductImageViewerProps {
  baseImage: string
  productName: string
  selectedColor?: string
  colorVariants?: Record<string, string[]>
  onColorChange?: (color: string) => void
}

// Utility function to preload images in background
const preloadImages = (imageSources: string[]) => {
  if (typeof window === 'undefined') return

  imageSources.forEach((src) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

export function ProductImageViewer({
  baseImage,
  productName,
  selectedColor,
  colorVariants = {},
  onColorChange,
}: ProductImageViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [displayImage, setDisplayImage] = useState(baseImage)
  const [imageViews, setImageViews] = useState<string[]>([baseImage])
  const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Preload all images on component mount and when color changes
  useEffect(() => {
    if (selectedColor && colorVariants && colorVariants[selectedColor]) {
      const images = Array.isArray(colorVariants[selectedColor])
        ? colorVariants[selectedColor]
        : [colorVariants[selectedColor]]
      preloadImages(images)
    }
  }, [selectedColor, colorVariants])

  // Preload all color variants on mount for faster color switching
  useEffect(() => {
    if (colorVariants) {
      const allImages = Object.values(colorVariants).flat()
      preloadImages(allImages)
    }
  }, [colorVariants])

  // Update image views and display image when color changes
  useEffect(() => {
    if (selectedColor && colorVariants && colorVariants[selectedColor]) {
      // If colorVariants[selectedColor] is an array, use it directly
      const images = Array.isArray(colorVariants[selectedColor])
        ? colorVariants[selectedColor]
        : [colorVariants[selectedColor]]
      setImageViews(images)
      setDisplayImage(images[0])
      setCurrentImageIndex(0)
    } else {
      // Fallback to baseImage wrapped in array
      setImageViews([baseImage])
      setDisplayImage(baseImage)
      setCurrentImageIndex(0)
    }
  }, [selectedColor, baseImage, colorVariants])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev === 0 ? imageViews.length - 1 : prev - 1
      setLoadingImageIndex(newIndex)
      setDisplayImage(imageViews[newIndex])
      return newIndex
    })
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev === imageViews.length - 1 ? 0 : prev + 1
      setLoadingImageIndex(newIndex)
      setDisplayImage(imageViews[newIndex])
      return newIndex
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isZoomed) return

    if (e.key === 'ArrowLeft') {
      handlePrevImage()
    } else if (e.key === 'ArrowRight') {
      handleNextImage()
    } else if (e.key === 'Escape') {
      handleCloseZoom()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchEndPos = e.changedTouches[0].clientX
    setTouchEnd(touchEndPos)
    handleSwipe(touchStart, touchEndPos)
  }

  const handleSwipe = (start: number, end: number) => {
    const distance = start - end
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      // Left swipe = next image
      handleNextImage()
    } else if (isRightSwipe) {
      // Right swipe = previous image
      handlePrevImage()
    }
  }

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      
      // Handle browser back button on mobile
      window.history.pushState(null, '', window.location.href)
      const handlePopState = () => {
        handleCloseZoom()
        window.history.pushState(null, '', window.location.href)
      }
      window.addEventListener('popstate', handlePopState)
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('popstate', handlePopState)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isZoomed])

  // Reset to default image when zoom is closed
  const handleCloseZoom = () => {
    setIsZoomed(false)
    setCurrentImageIndex(0)
    setDisplayImage(imageViews[0] || baseImage)
    setLoadingImageIndex(null)
  }

  return (
    <>
      {/* Regular Image Container */}
      <div
        className="group relative overflow-hidden rounded-xl bg-slate-950/60 cursor-zoom-in transition-transform hover:scale-105"
        onClick={() => setIsZoomed(true)}
        role="button"
        tabIndex={0}
        aria-label={`Click to zoom ${productName} image`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsZoomed(true)
          }
        }}
      >
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={displayImage || '/placeholder.svg'}
            alt={productName}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
          <span className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Click to zoom
          </span>
        </div>
      </div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-h-screen max-w-4xl w-full flex flex-col items-center justify-center">
            {/* Close Button - Mobile: dark background for visibility, Desktop: subtle */}
            <button
              onClick={handleCloseZoom}
              className="absolute top-4 left-4 z-10 rounded-full p-2 transition-colors bg-black/70 hover:bg-black/80 sm:bg-white/10 sm:hover:bg-white/20 sm:left-auto sm:right-4"
              aria-label="Close zoom view"
            >
              <X className="size-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative w-full flex items-center justify-center select-none">
              {loadingImageIndex === currentImageIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="size-8 text-white animate-spin" />
                </div>
              )}
              <img
                src={displayImage || '/placeholder.svg'}
                alt={`${productName} - zoomed view ${currentImageIndex + 1}`}
                className="max-h-[80vh] w-auto object-contain"
                onLoad={() => setLoadingImageIndex(null)}
              />

              {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
              {imageViews.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors hidden sm:flex"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors hidden sm:flex"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="mt-4 text-center text-sm text-white/70">
              Image {currentImageIndex + 1} of {imageViews.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
