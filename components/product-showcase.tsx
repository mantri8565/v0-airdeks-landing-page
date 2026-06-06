const products = [
  {
    label: "Airdeks Pro",
    name: "Airdeks Pro",
    image: "/images/airdeks-duo.png",
    specs: [
      "Dual Monitor Support (<=27 inches)",
      "Dimensions: 138cm W x 60 cm H x 17 cm D",
      "Dual Extendable Mounts",
      "One-Cable Power",
      "4 Power Sockets",
      "Dual Type-C Ports",
      "Built-in Laptop Storage",
      "Hidden Cable Management",
    ],
    price: "₹24,999",
    swatches: ["#0f172a", "#1e293b"],
  },
  {
    label: "Airdeks Light",
    name: "Airdeks Light",
    image: "/images/airdeks-duo-light.png",
    specs: [
      "Single Screen (<=34 inches)",
      "Dimensions: 102cm W x 59 cm H x 17 cm D",
      "Extendable Mounts",
      "One-Cable Powered",
      "2 Power Sockets",
      "Dual Type-C Ports",
      "Built-in Laptop Storage",
      "Hidden Cable Management",
    ],
    price: "₹19,999",
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
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-3">
                  <span className="mt-1.5 inline-flex size-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold text-emerald-400">{product.price}</p>
          </div>
        </div>

        {/* Swatches + CTA */}
        <div className="mt-8 border-t border-white/10 pt-6">
          {/* Color Swatches */}
          <div className="mb-6 flex items-center gap-2" aria-label="Available finishes">
            {product.swatches.map((color, i) => (
              <span
                key={i}
                className="size-8 rounded-md border border-white/15 ring-offset-2 ring-offset-slate-900"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Primary CTA - WhatsApp */}
            <a
              href="#"
              className="flex flex-col items-center justify-center rounded-lg bg-emerald-500 px-6 py-4 text-center font-semibold tracking-wide text-slate-950 transition-colors hover:bg-emerald-400 sm:flex-1"
            >
              <span className="text-base">Order via WhatsApp</span>
              <span className="mt-1 text-xs text-slate-900/70">For any other customizations.</span>
            </a>

            {/* Secondary CTA - Buy Now */}
            <a
              href="#"
              className="flex flex-col items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-4 text-center font-semibold tracking-wide text-white transition-colors hover:bg-white/10 sm:flex-1"
            >
              <span className="text-base">Buy Now</span>
              <span className="mt-1 text-xs text-slate-400">Pay On Delivery</span>
            </a>
          </div>
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
