'use client'

import { useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

interface IAccordionItem {
  id: string
  titleKey: string
  contentKey: string
  iconName: string
}

interface IHorizontalAccordionProps {
  items: IAccordionItem[]
}

function AccordionItem({ item, index }: { item: IAccordionItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useI18nStore((state) => state.t)
  const height = useMotionValue(0)
  const springHeight = useSpring(height, { stiffness: 200, damping: 25 })

  const toggleOpen = useCallback(() => {
    height.set(isOpen ? 0 : 120)
    setIsOpen(!isOpen)
  }, [isOpen, height])

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        delay: 0.08 * index,
      }}
      className="group relative flex flex-col justify-between bg-white rounded-3xl border border-tertiary/50 overflow-hidden cursor-pointer shadow-[0_4px_20px_-8px_rgba(41,54,129,0.06)] hover:shadow-[0_8px_30px_-8px_rgba(41,54,129,0.1)] transition-shadow duration-300"
      onClick={toggleOpen}
    >
      <div className="p-6">
        <h3 className="text-lg font-extrabold text-primary-dark mb-2">
          {t(item.titleKey)}
        </h3>
        <motion.div
          style={{ height: springHeight }}
          className="overflow-hidden"
        >
          <p className="text-sm text-primary-dark/60 leading-relaxed">
            {t(item.contentKey)}
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent flex items-center justify-center">
        <CaretDown
          size={20}
          className={`text-secondary transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
          weight="bold"
        />
      </div>
    </motion.div>
  )
}

export function HorizontalAccordion({ items }: IHorizontalAccordionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {items.map((item, i) => (
        <AccordionItem key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}