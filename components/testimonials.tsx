'use client'

import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

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
    image: '/images/testimonial-customer-1.png',
    name: 'Rajesh Kumar',
    designation: 'Product Designer, Tech Startup',
    rating: 5,
    text: 'Airdeks Pro has completely transformed my home office setup. The dual monitor support keeps my workspace organized and clutter-free. The cable management is exceptional, and it genuinely disappears when I\'m done working. A game-changer for remote work.',
  },
  {
    id: '2',
    image: '/images/testimonial-customer-1.png',
    name: 'Priya Sharma',
    designation: 'Freelance Developer',
    rating: 5,
    text: 'I was skeptical about wall-mounted desks until I got Airdeks Light. The extendable mounts are incredibly smooth, and having that extra space back in my room has been amazing. The build quality is premium and it feels rock solid.',
  },
  {
    id: '3',
    image: '/images/testimonial-customer-1.png',
    name: 'Arjun Patel',
    designation: 'Content Creator & Streamer',
    rating: 5,
    text: 'The dual Type-C ports and power sockets on Airdeks Pro are a lifesaver for my streaming setup. Everything connects seamlessly, and the one-cable power solution keeps my desk looking pristine. Highly recommend to anyone serious about their workspace.',
  },
  {
    id: '4',
    image: '/images/testimonial-customer-1.png',
    name: 'Neha Singh',
    designation: 'Architect & Space Designer',
    rating: 5,
    text: 'As an architect, I appreciate good design. Airdeks isn\'t just functional; it\'s genuinely beautiful. The Sahara Sand finish is stunning, and it seamlessly blends into my minimalist apartment. Worth every penny.',
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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
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
            className="overflow-x-auto pb-4 scrollbar-hide"
          >
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full md:min-w-96">
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
