import { MediaContainer } from "./media-container"

export function Hero() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <h1 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Engineered for Deep Work.<br />Designed for Limited Space.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            Airdeks is a premium wall-mounted folding desk that hides your workspace completely — stay hyper-productive when building, and entirely present the moment you log off.
          </p>

          <p className="mt-8 text-sm font-medium text-slate-300">
            Starting from ₹17,999 (Includes Industrial-Grade Full-Motion Mount Stand)
          </p>

          <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-950 transition-colors hover:bg-emerald-400"
            >
              SHOP NOW
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <MediaContainer
            src="/media/videos/shoot1.mp4"
            alt="Airdeks wall-mounted desk in a modern dark home office"
            aspectRatio="custom"
            customAspectClass="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  )
}
