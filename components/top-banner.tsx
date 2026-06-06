import { Zap } from "lucide-react"

export function TopBanner() {
  return (
    <div className="bg-emerald-500 text-slate-950">
      <a
        href="https://wa.me/442045773550"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2.5 text-center text-xs font-semibold tracking-tight transition-opacity hover:opacity-90 sm:text-sm lg:px-8"
      >
        <Zap className="size-4 shrink-0 fill-slate-950" aria-hidden="true" />
        <span className="text-balance">
          Need assistance? Order directly or chat with our team on WhatsApp NOW!
        </span>
      </a>
    </div>
  )
}
