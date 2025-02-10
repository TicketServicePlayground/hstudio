'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RayProps {
  angle: number
  isOdd: boolean
}

const Ray: React.FC<RayProps> = ({ angle, isOdd }) => {
  const [isSwapped, setIsSwapped] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsSwapped((prev) => !prev)
    }, 2000) // Swap every 2 seconds
    return () => clearInterval(interval)
  }, [])

  const currentScale = isSwapped
    ? isOdd
      ? 1.1
      : 0.9 // Swapped state
    : isOdd
      ? 0.9
      : 1.1 // Initial state

  const currentOrigin = isSwapped
    ? isOdd
      ? '0% 50%'
      : '100% 50%' // Swapped state
    : isOdd
      ? '100% 50%'
      : '0% 50%' // Initial state

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `rotate(${angle}deg) translate(260px, -50%)`,
      }}
    >
      <motion.div
        style={{
          height: '2px',
          width: '188px',
          background: 'rgb(240, 240, 245)',
        }}
        animate={{
          scaleX: currentScale,
          transformOrigin: currentOrigin,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

const RayBackground: React.FC = () => {
  const angles: number[] = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <motion.div
        className="absolute w-full h-screen overflow-hidden bg-white -ml-[94px]"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-0">
          {angles
            .filter((_, ind) => ind % 2 === 0)
            .map((angle) => (
              <Ray key={`primary-${angle}`} angle={angle} isOdd={true} />
            ))}
        </div>
        <div className="absolute inset-0">
          {angles
            .filter((_, ind) => ind % 2 !== 0)
            .map((angle) => (
              <Ray key={`secondary-${angle}`} angle={angle} isOdd={false} />
            ))}
        </div>
      </motion.div>
    </div>
  )
}

export default RayBackground
