'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface ProductImageViewerProps {
  baseImage: string
  productName: string
  selectedColor?: string
  colorVariants?: Record<string, string[]>
  onColorChange?: (color: string) => void
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

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div className="relative max-h-screen max-w-4xl w-full flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={handleCloseZoom}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
              aria-label="Close zoom view"
            >
              <X className="size-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative w-full flex items-center justify-center">
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

              {/* Navigation Arrows */}
              {imageViews.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
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

            {/* Keyboard Hints */}
            <div className="mt-2 text-center text-xs text-white/50">
              Use arrow keys to navigate, ESC to close
            </div>
          </div>
        </div>
      )}
    </>
  )
}
