import { TopBanner } from "@/components/top-banner"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { ProductShowcase } from "@/components/product-showcase"
import { TrustBadges } from "@/components/trust-badges"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TopBanner />
      <SiteHeader />
      <main>
        <Hero />
        <Benefits />
        <ProductShowcase />
        <TrustBadges />
      </main>
      <SiteFooter />
    </div>
  )
}
