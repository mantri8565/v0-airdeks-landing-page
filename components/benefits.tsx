import { Dumbbell, Layers, Wrench } from "lucide-react"

const painPoints = [
  {
    title: "Big desks eat up your room",
    description: "Massive wooden tables permanently block space, even when done for the day.",
  },
  {
    title: "The daily setup headache",
    description: "Wasting 15 minutes assembling laptop, monitors, and chargers on the dining table.",
  },
  {
    title: "Shaky folding tables",
    description: "Low-quality tables shake when typing quickly. Not strong enough for expensive screens.",
  },
  {
    title: "Messy wires everywhere",
    description: "A huge tangle of cables ruins the look of your room and your peace of mind.",
  },
]

const specifications = [
  {
    title: "Space-Saving Architecture",
    detail: "5-inch folded profile, pneumatic dampening struts",
    benefit: "Reclaim room space",
  },
  {
    title: "Fully Articulate Mount Stand",
    detail: "Included 360° rotation, tilt, extension",
    benefit: "Work at max efficiency",
  },
  {
    title: "Heavy-Duty Durability",
    detail: "Supports weight up to 75 kg, laser-cut steel",
    benefit: "Rock-solid stability",
  },
]

export function Painpoints() {
  return (
    <section className="border-b border-white/10">
      {/* Intro: headline + subheadline */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your home is for living. Your desk is for building. Don&apos;t let them fight for space.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          Living in an apartment in cities like Bangalore, Mumbai, or Gurgaon shouldn&apos;t mean fighting your furniture for space.
        </p>
      </div>

      {/* Pain points grid */}
      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-6 md:pb-6 lg:grid-cols-2 lg:px-8">
        {painPoints.map((point) => (
          <div
            key={point.title}
            className="rounded-lg border border-white/10 bg-slate-900/50 p-6"
          >
            <h3 className="text-xl font-semibold text-white">{point.title}</h3>
            <p className="mt-2 text-base text-slate-400">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Benefits() {
  return (
    <section className="border-b border-white/10">
      {/* Specifications band */}
      <div className="bg-emerald-600">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Zero Compromise Engineering.
          </h2>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {specifications.map((spec) => (
              <div
                key={spec.title}
                className="rounded-2xl bg-white/10 p-8 ring-1 ring-white/15"
              >
                <h3 className="text-xl font-semibold text-white">{spec.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-emerald-50/90">{spec.detail}</p>
                <p className="mt-3 text-base font-semibold text-emerald-50">{spec.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
