import { Star } from "lucide-react"

export function Hero() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            The best home office desk you&apos;ll never see.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            Airdeks is a wall-mounted desk that folds your work away — helping you stay
            productive when it&apos;s time to focus, and present when it&apos;s time to stop.
          </p>

          <div className="mt-8 flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-emerald-400 text-emerald-400" />
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-slate-200">
              Trusted by over 10,000 professionals internationally.
            </p>
            <a
              href="#"
              className="mt-1 inline-block text-sm font-semibold text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
            >
              READ REVIEWS.
            </a>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-950 transition-colors hover:bg-emerald-400"
            >
              SHOP
            </a>
            <a
              href="#compare"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
            >
              COMPARE
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <img
              src="/images/airdeks-hero.png"
              alt="Airdeks wall-mounted desk in a modern dark home office"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
