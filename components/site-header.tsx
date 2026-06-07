"use client"

import { Phone } from "lucide-react"

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3" aria-label="Airdeks home">
      <span className="flex size-9 items-center justify-center rounded-md bg-emerald-500">
        <svg viewBox="0 0 24 24" className="size-5 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5h18" />
          <path d="M5 5v6h14V5" />
          <path d="M8 11v3" />
          <path d="M16 11v3" />
        </svg>
      </span>
      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold leading-tight tracking-tight text-white">
          Air<span className="text-emerald-400">deks</span>
        </span>
        <span className="text-xs font-light leading-tight tracking-wider text-slate-400 uppercase md:mt-1">
          For Serious Builders and Creators
        </span>
      </div>
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-auto max-w-7xl items-center justify-between gap-4 px-6 py-4 md:h-20 md:py-0 lg:px-8">
        <Logo />

        <div className="flex items-center gap-4">
          {/* Desktop: Text link */}
          <a
            href="tel:+442045773550"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white md:block"
          >
            +44 (0) 20 4577 3550
          </a>

          {/* Mobile/Tablet: Call icon */}
          <a
            href="tel:+442045773550"
            aria-label="Call us"
            className="flex size-10 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-white/5 hover:text-emerald-400 md:hidden"
          >
            <Phone className="size-5" />
          </a>
        </div>
      </div>
    </header>
  )
}
