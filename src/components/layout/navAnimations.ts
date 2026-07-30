const ease = [0.32, 0.72, 0, 1] as const

export const navStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export const navStaggerItem = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, type: 'spring' as const, stiffness: 120, damping: 18 },
  },
}

export const mobileLinkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease, delay: 0.08 + i * 0.04 },
  }),
}

export const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.15 } },
}

export const mobilePanelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 28 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease },
  },
}
