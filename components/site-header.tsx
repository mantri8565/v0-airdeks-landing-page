"use client"
import Image from "next/image"
import { Phone } from "lucide-react"

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3" aria-label="Airdeks home">
      <span className="flex size-9 items-center justify-center rounded-md bg-emerald-500 overflow-hidden p-1">
        <Image
          src="/logo.png"
          alt="Airdeks logo"
          width={36}
          height={36}
          className="object-contain size-full"
        />

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
            href="tel:+919969965182"
            className="hidden text-lg font-medium text-slate-300 transition-colors hover:text-white md:block"
          >
            +91 996 996 5182
          </a>

          {/* Mobile/Tablet: Call icon */}
          <a
            href="tel:+919969965182"
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