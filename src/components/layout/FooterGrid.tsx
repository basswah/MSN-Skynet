import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { FooterBrand } from './FooterBrand'
import { FooterQuickLinks } from './FooterQuickLinks'
import { FooterServices } from './FooterServices'
import { FooterContact } from './FooterContact'

export function FooterGrid() {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <FooterBrand prefersReduced={prefersReduced} />
        <FooterQuickLinks prefersReduced={prefersReduced} />
        <FooterServices prefersReduced={prefersReduced} />
        <FooterContact prefersReduced={prefersReduced} />
      </div>
    </div>
  )
}
