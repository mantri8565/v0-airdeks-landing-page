const footerCols = [
  { title: "Shop", links: ["Airdeks Duo 24", "Airdeks Duo 24 Light", "Accessories", "Finishes"] },
  { title: "Company", links: ["About Us", "Sustainability", "Reviews", "Careers"] },
  { title: "Support", links: ["Help Centre", "Installation", "Warranty", "Contact"] },
]

export function SiteFooter() {
  return (
    <footer className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-emerald-500">
                <svg viewBox="0 0 24 24" className="size-5 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 5h18" />
                  <path d="M5 5v6h14V5" />
                  <path d="M8 11v3" />
                  <path d="M16 11v3" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                Air<span className="text-emerald-400">deks</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              The premium wall-mounted desk that disappears when you&apos;re done. Designed for the
              way we work now.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Airdeks. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-300">Privacy</a>
            <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
