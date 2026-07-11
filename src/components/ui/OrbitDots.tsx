import { motion } from 'framer-motion'

const ORBIT_DOTS = 12

export function OrbitDots() {
  const dots = Array.from({ length: ORBIT_DOTS }).map((_, i) => ({
    id: i,
    angle: (360 / ORBIT_DOTS) * i,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: 3,
            height: 3,
            marginLeft: -1.5,
            marginTop: -1.5,
          }}
          animate={{
            rotate: [dot.angle, dot.angle + 360],
          }}
          transition={{
            duration: 20 + dot.id * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="w-[3px] h-[3px] rounded-full bg-[#4274D9]/50 dark:bg-[#95CCDD]/40"
            style={{
              transform: `translateX(${180 + (dot.id % 3) * 8}px)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
