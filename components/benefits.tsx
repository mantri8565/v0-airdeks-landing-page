import { Dumbbell, Layers, Wrench } from "lucide-react"

const painPoints = [
  {
    title: "Big desks eat up your room",
    description: "Massive wooden tables permanently block space, even when done for the day.",
  },
  {
    title: "Screen safety & dust damage",
    description: "Constant anxiety about expensive monitors getting broken by playing kids or pets, and open screens catching dust when left exposed.",
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
    title: "Aesthetic Design",
    detail: "Minimalist 5-inch sleek, premium finish",
    benefit: "Complements your home interior perfectly",
  },
  {
    title: "Fully Articulate Mount Stand",
    detail: "Included 360° rotation, tilt, extension",
    benefit: "Designed to keep you in the \"flow state\" longer",
  },
  {
    title: "Frictionless Setup",
    detail: "DIY 15-min installation, precision-fit hardware",
    benefit: "Up and running without a carpenter",
  },
]

export function Painpoints() {
  return (
    <section className="border-b border-white/10">
      {/* Intro: headline + subheadline */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-16 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your home is for living. Your desk is for building. Don&apos;t let them fight for space.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          Building a high-impact career requires a world-class setup, but it shouldn’t force you into a daily compromise where wires and heavy gear take over your personal comfort.
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
