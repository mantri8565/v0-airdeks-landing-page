'use client'

import { useState } from 'react'
import { CheckoutModal } from './checkout-modal'
import { ProductImageViewer } from './product-image-viewer'

const products = [
  {
    label: "Airdeks Pro",
    name: "Airdeks Pro",
    image: "/images/Dual/White/DropTopWhite.png",
    // colorVariants now maps to arrays of image paths for each color
    colorVariants: {
      "#eaeaea": [
        "/images/Dual/White/DropTopWhite.png",
        "/images/Dual/DimensionsDual27BG.png",
        "/images/Dual/White/DualOpenWhite.png",
        "/images/Dual/White/DualClosedWhite.png",
      ],
      "#ba9a6e": [
        "/images/Dual/Brown/DropTopBrown.png",
        "/images/Dual/DimensionsDual27BG.png",
        "/images/Dual/Brown/DualBrownOpen.png",
        "/images/Dual/Brown/DualBrownClosed.png",
      ],
    },
    colorNames: {
      "#eaeaea": "Paper White",
      "#ba9a6e": "Sahara Sand",
    },
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
    swatches: ["#eaeaea", "#ba9a6e"],
  },
  {
    label: "Airdeks Light",
    name: "Airdeks Light",
    image: "/images/Single/White/Single34WhiteOpen.png",
    // colorVariants now maps to arrays of image paths for each color
    colorVariants: {
      "#eaeaea": [
        "/images/Single/White/Single34WhiteOpen.png",
        "/images/Single/Single34DimBG.png",
        "/images/Single/White/SingleOpenWhiteinternal.png",
        "/images/Single/White/WhiteClosedSingle.png",
        
      ],
      "#ba9a6e": [
        "/images/Single/Brown/Single34Open.png",
        "/images/Single/Single34DimBG.png",
        "/images/Single/Brown/BrownOpenInternal.png",
        "/images/Single/Brown/BrownSingleclosed.png",
        
      ],
    },
    colorNames: {
      "#eaeaea": "Paper White",
      "#ba9a6e": "Sahara Sand",
    },
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
    swatches: ["#eaeaea", "#ba9a6e"],
  },
]

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.swatches[0])
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)

  return (
    <div className="flex flex-col">
      <h3 className="mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {product.label}
      </h3>

      <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
        {/* Image + Specs Grid */}
        <div className="grid flex-1 items-start gap-6 sm:grid-cols-2">
          {/* Left Column: Image + Color Swatches */}
          <div className="flex flex-col gap-6">
            <ProductImageViewer
              baseImage={product.image}
              productName={product.name}
              selectedColor={selectedColor}
              colorVariants={product.colorVariants}
            />

            {/* Color Swatches below image */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Color</p>
              <div className="flex items-center gap-3" aria-label="Available finishes">
                {product.swatches.map((color, i) => (
                  <div key={i} className="relative">
                    <button
                      onClick={() => setSelectedColor(color)}
                      onMouseEnter={() => setHoveredColor(color)}
                      onMouseLeave={() => setHoveredColor(null)}
                      className={`size-10 rounded-md border-2 transition-all ring-offset-2 ring-offset-slate-900 ${
                        selectedColor === color
                          ? 'border-emerald-400 ring-2 ring-emerald-400'
                          : 'border-white/15 hover:border-white/30'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${product.colorNames[color as keyof typeof product.colorNames]} color`}
                    />
                    {hoveredColor === color && (
                      <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/10">
                        {product.colorNames[color as keyof typeof product.colorNames]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Specs and Price */}
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

        {/* CTA Buttons */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Primary CTA - WhatsApp */}
            {(() => {
              const colorName = product.colorNames[selectedColor as keyof typeof product.colorNames] || 'Color'
              const productInfo = selectedColor ? `${product.name} - ${colorName}` : `<${product.name}> <${colorName}>`
              const whatsappMessage = `Hi! I'm interested in customizing my ${productInfo} order.\n\nCustomer Details:\nName: <name>\nAddress: <address>\nPincode: <pincode>\n\nProduct: ${productInfo}\n\nCould you please help me with customization options? Thank you!`
              const whatsappLink = `https://wa.me/918023456789?text=${encodeURIComponent(whatsappMessage)}`

              return (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center rounded-lg bg-emerald-500 px-6 py-4 text-center font-semibold tracking-wide text-slate-950 transition-colors hover:bg-emerald-400 sm:flex-1"
                >
                  <span className="text-base">Order via WhatsApp</span>
                  <span className="mt-1 text-xs text-slate-900/70">For any other customizations</span>
                </a>
              )
            })()}

            {/* Secondary CTA - Buy Now */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-center font-semibold tracking-wide text-white transition-all hover:border-emerald-500/60 hover:bg-emerald-500/20 sm:flex-1"
            >
              <span className="text-base">Buy Now</span>
              <span className="mt-1 text-xs text-slate-300">Pay On Delivery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        selectedColor={product.colorNames[selectedColor as keyof typeof product.colorNames]}
        onSuccess={() => setShowSuccess(true)}
      />
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
