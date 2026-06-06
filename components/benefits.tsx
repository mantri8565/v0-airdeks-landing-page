import { Check, Dumbbell, Layers, Wrench } from "lucide-react"

const checklist = [
  "Your entire desk disappears in seconds",
  "Increased productivity by up to 42%",
  "Ergonomic and comfortable design",
  "Complements your decor",
]

const features = [
  {
    icon: Dumbbell,
    title: "Strong",
    body: "Desk supports up to 75kg / 165lbs without flex or wobble.",
  },
  {
    icon: Wrench,
    title: "Plasterboard friendly",
    body: "30 minute DIY installation on most types of walls.",
  },
  {
    icon: Layers,
    title: "Sustainably made",
    body: "87% of wood sourced from recycled and renewable sources.",
  },
]

export function Benefits() {
  return (
    <section className="border-b border-white/10">
      {/* Intro: headline + checklist */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your home is for living. Your desk is for building. Don&apos;t let them fight for space.
        </h2>

        <ul className="flex flex-col justify-center gap-5">
          {checklist.map((item) => (
            <li key={item} className="flex items-center gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-4 text-slate-950" strokeWidth={3} />
              </span>
              <span className="text-base text-slate-300 sm:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Feature band */}
      <div className="bg-emerald-600">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:py-20 lg:grid-cols-3 lg:px-8">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/10 p-8 ring-1 ring-white/15"
            >
              <Icon className="size-9 text-white" strokeWidth={1.5} />
              <h3 className="mt-12 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-emerald-50/90">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
