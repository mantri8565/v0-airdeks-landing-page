'use client'

import { useState } from 'react'
import { Play, Pause } from 'lucide-react'

const mediaItems = [
  {
    id: 1,
    type: 'image',
    src: '/placeholder.svg?height=400&width=400',
    alt: 'Product showcase 1',
    title: 'Mobile Setup',
  },
  {
    id: 2,
    type: 'image',
    src: '/placeholder.svg?height=400&width=400',
    alt: 'Product showcase 2',
    title: 'Tablet Setup',
  },
  {
    id: 3,
    type: 'image',
    src: '/placeholder.svg?height=400&width=400',
    alt: 'Product showcase 3',
    title: 'Desktop Setup',
  },
  {
    id: 4,
    type: 'image',
    src: '/placeholder.svg?height=400&width=400',
    alt: 'Product showcase 4',
    title: 'Work Environment',
  },
]

export function MediaShowcase() {
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null)

  const toggleVideoPlay = (id: number) => {
    setPlayingVideoId(playingVideoId === id ? null : id)
  }

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <div className="mb-12">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            See Airdeks in action
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            Watch how Airdeks transforms different workspaces into streamlined, productive environments.
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <>
                    <video
                      src={item.src}
                      className="h-full w-full object-cover"
                      autoPlay={playingVideoId === item.id}
                      controls={playingVideoId === item.id}
                    />
                    <button
                      onClick={() => toggleVideoPlay(item.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/50"
                      aria-label={playingVideoId === item.id ? 'Pause video' : 'Play video'}
                    >
                      {playingVideoId === item.id ? (
                        <Pause className="h-12 w-12 text-white" />
                      ) : (
                        <Play className="h-12 w-12 text-white" />
                      )}
                    </button>
                  </>
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
