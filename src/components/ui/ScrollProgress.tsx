import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.02 && !visible) setVisible(true)
      if (v < 0.01 && visible) setVisible(false)
    })
    return () => unsubscribe()
  }, [scrollYProgress, visible])

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-[3px] bg-[#4274D9] z-[60] origin-left"
      style={{ scaleX }}
    />
  )
}
