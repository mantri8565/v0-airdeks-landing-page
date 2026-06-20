import { RotateCcw, MapPin, ShieldCheck, Wallet } from "lucide-react"

const badges = [
  {
    icon: RotateCcw,
    title: "Try risk free",
    sub: "90-day money back guarantee",
  },
  {
    icon: MapPin,
    title: "Made in India",
    sub: "Proudly engineered and manufactured in India",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    sub: "10 year warranty included",
  },
  {
    icon: Wallet,
    title: "100% Pay on Delivery",
    sub: "Pay ₹0 upfront. Inspect on delivery",
  },
]

export function TrustBadges() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 px-6 py-14 text-center"
            >
              <span className="flex size-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                <Icon className="size-7 text-emerald-400" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
