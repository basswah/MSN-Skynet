import { motion } from 'framer-motion'

const WAVE_RING_COUNT = 3
const WAVE_DURATION = 3.2

export function WaveRings() {
  return (
    <>
      {Array.from({ length: WAVE_RING_COUNT }).map((_, i) => {
        const delay = i * (WAVE_DURATION / WAVE_RING_COUNT)
        const baseScale = 0.8 + i * 0.25

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: '90%',
              aspectRatio: '1',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-[#4274D9]/25 dark:border-[#95CCDD]/15"
              initial={{ scale: baseScale, opacity: 0.5 }}
              animate={{
                scale: [baseScale, baseScale + 0.8, baseScale + 1.4],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: WAVE_DURATION,
                repeat: Infinity,
                delay,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#4274D9]/15 dark:border-[#95CCDD]/10"
              initial={{ scale: baseScale, opacity: 0.3 }}
              animate={{
                scale: [baseScale, baseScale + 0.6, baseScale + 1.2],
                opacity: [0.3, 0.15, 0],
              }}
              transition={{
                duration: WAVE_DURATION,
                repeat: Infinity,
                delay: delay + 0.4,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}
