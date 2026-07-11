import { motion, useMotionValue, useTransform } from 'framer-motion'
import { WifiHigh } from '@phosphor-icons/react'

const NetworkNode = ({ 
  x, 
  y, 
  delay, 
  size = 40 
}: { 
  x: number
  y: number 
  delay: number
  size?: number
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, type: 'spring', stiffness: 200 }}
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <motion.div
      animate={{ 
        y: [0, -8, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        delay: delay * 0.5,
        ease: 'easeInOut'
      }}
      className="relative"
    >
      <div 
        className="bg-gradient-to-br from-[#4274D9] to-[#95CCDD] rounded-full flex items-center justify-center shadow-lg shadow-[#4274D9]/20"
        style={{ width: size, height: size }}
      >
        <WifiHigh size={size * 0.5} className="text-white" weight="bold" />
      </div>
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        className="absolute inset-0 bg-[#4274D9] rounded-full -z-10"
      />
    </motion.div>
  </motion.div>
)

const ConnectionLine = ({ 
  x1, y1, x2, y2, delay 
}: { 
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.3 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="absolute h-[2px] bg-gradient-to-r from-[#4274D9] to-[#95CCDD] origin-left"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: length,
        transform: `rotate(${angle}deg)`
      }}
    />
  )
}

export function NetworkViz() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5])
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5])

  return (
    <motion.div 
      className="relative h-[400px] sm:h-[500px]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative w-full h-full"
      >
        <ConnectionLine x1={20} y1={20} x2={80} y2={40} delay={0.3} />
        <ConnectionLine x1={80} y1={40} x2={50} y2={80} delay={0.5} />
        <ConnectionLine x1={50} y1={80} x2={20} y2={60} delay={0.7} />
        <ConnectionLine x1={20} y1={60} x2={20} y2={20} delay={0.9} />

        <NetworkNode x={15} y={15} delay={0.2} size={50} />
        <NetworkNode x={75} y={35} delay={0.4} size={40} />
        <NetworkNode x={45} y={75} delay={0.6} size={45} />
        <NetworkNode x={15} y={55} delay={0.8} size={35} />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-dashed border-[#4274D9]/10 dark:border-[#95CCDD]/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 border border-dashed border-[#95CCDD]/10 dark:border-[#4274D9]/10 rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}
