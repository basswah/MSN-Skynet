import { CTABanner } from './CTABanner'
import { FooterGrid } from './FooterGrid'
import { FooterBar } from './FooterBar'

export function Footer() {
  return (
    <footer className="relative bg-[#020617] dark:bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(66,116,217,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4274D9]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-[#95CCDD]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <CTABanner />
        <FooterGrid />
        <FooterBar />
      </div>
    </footer>
  )
}
