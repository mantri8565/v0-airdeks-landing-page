"use client"

import { useState } from "react"
import { Menu, ShoppingCart, X } from "lucide-react"

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
        <span className="text-lg font-semibold leading-none tracking-tight text-white">
          Air<span className="text-emerald-400">deks</span>
        </span>
        <span className="mt-1 text-xs font-light tracking-wider text-slate-400 uppercase">
          For Serious Builders and Creators
        </span>
      </div>
    </a>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20 lg:px-8">
        <Logo />

        <div className="flex items-center gap-4">
          <a
            href="tel:+442045773550"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white xl:block"
          >
            +44 (0) 20 4577 3550
          </a>
          <button
            type="button"
            aria-label="Cart"
            className="flex size-10 items-center justify-center rounded-full text-slate-200 transition-colors hover:bg-white/5 hover:text-emerald-400"
          >
            <ShoppingCart className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full text-slate-200 transition-colors hover:bg-white/5 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-slate-950 px-6 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            <li>
              <a href="tel:+442045773550" className="block rounded-md px-3 py-2.5 text-base font-medium text-emerald-400 transition-colors hover:bg-white/5">
                +44 (0) 20 4577 3550
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
