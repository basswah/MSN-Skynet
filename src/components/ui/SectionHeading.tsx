import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'

interface ISectionHeadingProps {
  titleKey: string
  eyebrowKey?: string
  className?: string
}

export function SectionHeading({ titleKey, eyebrowKey, className = '' }: ISectionHeadingProps) {
  const t = useI18nStore((state) => state.t)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className={`text-center mb-20 lg:mb-24 ${className}`}
    >
      {eyebrowKey && (
        <span className="inline-block rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium bg-primary-dark/5 text-primary-dark/60 mb-5">
          {t(eyebrowKey)}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none text-primary-dark mb-4">
        {t(titleKey)}
      </h2>
      <div className="w-16 h-0.5 bg-secondary rounded-full mx-auto mt-6" />
    </motion.div>
  )
}
