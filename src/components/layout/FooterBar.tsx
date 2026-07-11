import { ArrowUp } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { useSmoothScroll } from './SmoothScrollLayout'

export function FooterBar() {
  const t = useI18nStore((state) => state.t)
  const { lenis } = useSmoothScroll()

  const backToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 })
  }

  return (
    <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-white/20 text-center sm:text-start">
        {t('footer.copyright')}
      </p>

      <div className="flex items-center gap-4">
        <a href="#" className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4274D9] rounded px-1">
          {t('footer.privacyPolicy')}
        </a>
        <span className="w-px h-3 bg-white/10" />
        <a href="#" className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4274D9] rounded px-1">
          {t('footer.termsOfService')}
        </a>
      </div>

      <button
        onClick={backToTop}
        className="group w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-[#95CCDD] hover:bg-[#4274D9]/10 hover:border-[#4274D9]/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
        aria-label={t('footer.backToTop')}
      >
        <ArrowUp size={14} weight="bold" className="transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  )
}
