const products = [
  {
    label: "Airdeks",
    name: "Airdeks Duo 24",
    image: "/images/airdeks-duo.png",
    specs: ["Two 24″ monitors", "Desk size 121cm × 61cm"],
    price: "From £999.17",
    swatches: ["#0f172a", "#1e293b", "#334155", "#475569", "#64748b"],
  },
  {
    label: "Airdeks Light",
    name: "Airdeks Duo 24 Light",
    image: "/images/airdeks-duo-light.png",
    specs: ["Two 24″ monitors", "Desk size 121cm × 55cm"],
    price: "From £457.50",
    swatches: ["#0f172a", "#1e293b", "#3f3f46", "#52525b", "#71717a"],
  },
]

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <div className="flex flex-col">
      <h3 className="mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {product.label}
      </h3>

      <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
        <div className="grid flex-1 items-center gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-slate-950/60">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold tracking-wide text-white">{product.name}</h4>
            <ul className="mt-4 space-y-1 text-sm leading-relaxed text-slate-400">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold text-emerald-400">{product.price}</p>
          </div>
        </div>

        {/* Swatches + CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2" aria-label="Available finishes">
            {product.swatches.map((color, i) => (
              <span
                key={i}
                className="size-8 rounded-md border border-white/15 ring-offset-2 ring-offset-slate-900"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold tracking-wide text-slate-950 transition-colors hover:bg-emerald-400"
          >
            VIEW
          </a>
        </div>
      </div>
    </div>
  )
}

export function ProductShowcase() {
  return (
    <section id="products" className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
