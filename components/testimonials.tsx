'use client'

import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import test from 'node:test'

interface Testimonial {
  id: string
  image: string
  name: string
  designation: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    image: '/images/test_1.jpg',
    name: 'Advait Sharma',
    designation: 'Software Architect',
    rating: 5,
    text: 'Honestly, the Airdeks Pro completely changed my WFH setup. Running a dual-monitor rig used to look so messy, but the built-in cable management is next level—everything just disappears when I shut down for the day. Total game-changer if you want a clean, high-productivity workspace.',
  },
  {
    id: '2',
    image: '/images/test_4.jpg',
    name: 'Meera Iyer',
    designation: 'Design Lead',
    rating: 5,
    text: 'I was super skeptical about a wall-mounted desk at first—I always worried it would sag or shake while I typed. But the Airdeks Light is rock solid. No wobble at all. Plus, the monitor mounts are incredibly smooth; I can tilt and rotate my screen effortlessly. Seriously premium build.',
  },
  {
    id: '3',
    image: '/images/test_3.jpg',
    name: 'Kabir Malhotra',
    designation: 'Stock Market Trader',
    rating: 5,
    text: 'It’s rare to find office gear that functions perfectly and looks like a piece of art. The Sahara Sand finish is absolutely gorgeous and blends seamlessly into my tiny, minimalist bedroom. It completely elevated the space. Worth every single penny.',
  },
  {
    id: '4',
    image: '/images/test_2.jpg',
    name: 'Shreya Oberoi',
    designation: 'Consultant',
    rating: 5,
    text: 'The dual Type-C ports and built-in power sockets are a lifesaver for my streaming setup. Having just one main power cable running to the desk keeps the whole area looking completely pristine. On top of that, their customer service team was amazing and made the whole experience seamless. Highly recommend.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating
              ? 'fill-emerald-400 text-emerald-400'
              : 'text-slate-600'
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-slate-900/70 sm:p-8">
      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote Text */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-300 sm:text-base">
        {`"${testimonial.text}"`}
      </p>

      {/* Divider */}
      <div className="mb-6 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0" />

      {/* Customer Info */}
      <div className="flex items-center gap-4">
        <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-emerald-400/30">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{testimonial.name}</p>
          <p className="truncate text-sm text-slate-400">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isResetRef = useRef(false)

  // Duplicate testimonials for infinite loop
  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials,]

  useEffect(() => {
    // Initialize scroll position to the middle set of testimonials
    if (scrollContainerRef.current && !isResetRef.current) {
      const isMobile = window.innerWidth < 768
      const cardWidth = isMobile ? 320 : 384 // w-80 = 320px, md:w-96 = 384px
      const gapWidth = 24 // gap-6 is 24px
      const itemWidth = cardWidth + gapWidth
      const initialScroll = itemWidth * testimonials.length
      
      scrollContainerRef.current.scrollLeft = initialScroll
      isResetRef.current = true
    }
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const isMobile = window.innerWidth < 768
      const cardWidth = isMobile ? 320 : 384 // w-80 = 320px, md:w-96 = 384px
      const gapWidth = 24 // gap-6 is 24px
      const itemWidth = cardWidth + gapWidth
      
      // Check if we've scrolled to the end, if so loop back to start
      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        // Reset to beginning of middle set
        scrollContainerRef.current.scrollLeft = itemWidth * testimonials.length
      } 
      // Check if we've scrolled to the beginning, if so loop to end
      else if (scrollLeft <= 20) {
        scrollContainerRef.current.scrollLeft = itemWidth * testimonials.length * 2 - itemWidth
      }

      // Always show arrows in looped carousel
      setShowLeftArrow(true)
      setShowRightArrow(true)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768
      const cardWidth = isMobile ? 320 : 384 // w-80 = 320px, md:w-96 = 384px
      const scrollAmount = cardWidth + 24 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      scroll('right')
    } else if (isRightSwipe) {
      scroll('left')
    }
  }

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start gap-4 md:mb-16">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Loved by Creators & Builders
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            Join hundreds of professionals who&apos;ve transformed their workspace with Airdeks.
            See what they&apos;re saying.
          </p>
        </div>

        {/* Testimonials Horizontal Scroll */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-emerald-400/20 p-2 backdrop-blur-sm transition-all hover:bg-emerald-400/40 md:-left-6 ${
              !showLeftArrow ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover:opacity-100'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-emerald-400" size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-emerald-400/20 p-2 backdrop-blur-sm transition-all hover:bg-emerald-400/40 md:-right-6 ${
              !showRightArrow ? 'pointer-events-none opacity-0' : 'opacity-0 group-hover:opacity-100'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="text-emerald-400" size={24} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex gap-6">
              {loopedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="w-80 flex-shrink-0 md:w-96" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden pointer-events-none absolute bottom-0 right-0 h-12 w-12 bg-gradient-to-l from-slate-950 to-transparent" />
        </div>
      </div>
    </section>
  )
}
