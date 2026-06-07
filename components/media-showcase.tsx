'use client'

import { useState } from 'react'

const mediaItems = [
  {
    id: 1,
    type: 'image',
    src: '/media/img/airdeks best dual.jpg',
    alt: 'Product showcase 1',
    title: 'Mobile Setup',
  },
  {
    id: 2,
    type: 'image',
    src: '/media/img/open airdeks.jpg',
    alt: 'Product showcase 2',
    title: 'Tablet Setup',
  },
  {
    id: 3,
    type: 'image',
    src: '/media/img/side_view_airdeks.jpg',
    alt: 'Product showcase 3',
    title: 'Desktop Setup',
  },
  {
    id: 4,
    type: 'image',
    src: '/media/img/side_view_indian.jpg',
    alt: 'Product showcase 4',
    title: 'Work Environment',
  },
]

export function MediaShowcase() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <div className="mb-12">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            See Airdeks in action
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-300">
            Watch how Airdeks transforms different workspaces into streamlined, productive environments.
          </p>
        </div>

        {/* Mobile Grid - Simple Vertical Stack */}
        <div className="grid gap-6 sm:hidden">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg bg-slate-900/50 ring-1 ring-white/10"
            >
              {/* Media Container */}
              <div className="aspect-square w-full overflow-hidden bg-slate-950">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg bg-slate-900/50 ring-1 ring-white/10 transition-all hover:ring-white/20"
            >
              {/* Media Container */}
              <div className="aspect-square w-full overflow-hidden bg-slate-950">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <video
                    key={`video-${item.id}`}
                    src={item.src}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                <h3 className="text-sm font-semibold text-white sm:text-base">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
