import { motion } from 'framer-motion'
import { Quotes, Star } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import type { ITestimonial } from '../../types'

const testimonials: ITestimonial[] = [
  { id: '1', nameKey: 'testimonial.name.1', roleKey: 'testimonial.role.1', quoteKey: 'testimonial.quote.1', rating: 5 },
  { id: '2', nameKey: 'testimonial.name.2', roleKey: 'testimonial.role.2', quoteKey: 'testimonial.quote.2', rating: 5 },
  { id: '3', nameKey: 'testimonial.name.3', roleKey: 'testimonial.role.3', quoteKey: 'testimonial.quote.3', rating: 4 },
]

const ease = [0.32, 0.72, 0, 1] as const

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < rating ? 'fill' : 'regular'}
          className={i < rating ? 'text-[#4274D9]' : 'text-slate-300 dark:text-slate-700'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const t = useI18nStore((state) => state.t)
  const featured = testimonials[0]

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-slate-50 via-[#D0E7E6]/30 to-[#D0E7E6] dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-16 sm:py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/3 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#293681]/5 dark:bg-[#4274D9]/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-widest uppercase mb-6">
            <Quotes size={14} weight="fill" />
            {t('testimonials.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none">
            {t('testimonials.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] dark:from-[#95CCDD] dark:to-[#4274D9] rounded-full mx-auto mt-6 mb-6" />
          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="relative rounded-3xl p-5 sm:p-8 lg:p-10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-[#4274D9]/10 dark:border-[#95CCDD]/15 shadow-[0_20px_60px_-15px_rgba(66,116,217,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#4274D9]/3 via-transparent to-[#95CCDD]/5 dark:from-[#4274D9]/5 dark:via-transparent dark:to-[#95CCDD]/5" />
                <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] rounded-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(66,116,217,0.4)] dark:shadow-[0_8px_20px_-4px_rgba(149,204,221,0.3)]">
                    <Quotes size={28} weight="fill" className="text-white dark:text-[#0F172A]" />
                  </div>
                  <StarRating rating={featured.rating} />
                </div>

                <blockquote className="text-xl lg:text-2xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed mb-10 min-h-[120px]">
                  {t(featured.quoteKey)}
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-[#4274D9]/8 dark:border-[#95CCDD]/10">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#D0E7E6]/40 dark:bg-[#4274D9]/15">
                    <img
                      src={`https://picsum.photos/seed/sky${featured.id}/200/200`}
                      alt={t(featured.nameKey)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-base">
                      {t(featured.nameKey)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t(featured.roleKey)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease }}
                className="group relative w-full p-5 lg:p-6 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-[#4274D9]/8 dark:border-[#95CCDD]/10 hover:bg-white/90 dark:hover:bg-slate-900/70 hover:border-[#4274D9]/20 dark:hover:border-[#95CCDD]/25 transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(66,116,217,0.12)]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#95CCDD]/30 to-[#D0E7E6]/40 dark:from-[#4274D9]/20 dark:to-[#95CCDD]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/sky${item.id}/100/100`}
                      alt={t(item.nameKey)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {t(item.nameKey)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {t(item.roleKey)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {t(item.quoteKey)}
                </p>
                <div className="mt-3">
                  <StarRating rating={item.rating} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
