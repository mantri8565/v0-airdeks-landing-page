import { TopBanner } from "@/components/top-banner"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { MediaShowcase } from "@/components/media-showcase"
import { ProductShowcase } from "@/components/product-showcase"
import { TrustBadges } from "@/components/trust-badges"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="sticky top-0 z-50">
        <TopBanner />
        <SiteHeader />
      </div>
      <main>
        <Hero />
        <Benefits />
        <MediaShowcase />
        <ProductShowcase />
        <TrustBadges />
      </main>
      <SiteFooter />
    </div>
  )
}
