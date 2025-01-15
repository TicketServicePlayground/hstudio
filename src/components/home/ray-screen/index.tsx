'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks'

interface RayProps {
  angle: number
  isOdd: boolean
}

const Ray: React.FC<RayProps> = ({ angle, isOdd }) => {
  const [isSwapped, setIsSwapped] = React.useState(false)
  const isMobile = useIsMobile()

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
        transform: `rotate(${angle}deg) translate(${isMobile ? '140px' : '260px'}, -50%)`,
      }}
    >
      <motion.div
        className="w-[118px] md:w-[188px]"
        style={{
          height: '5px',
          // width: '188px',
          // background: isOdd ? 'red' : 'blue',
          // background: 'rgb(240, 240, 245)',
          background: 'white',
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
    <div className="relative w-full h-[808px] flex items-center justify-center overflow-hidden">
      {/*
      <div
        className="absolute left-0 top-[50vh] z-[1]"
        style={{ width: 322, height: 120, background: 'blue' }}
      />
      <div
        className="absolute right-0 top-[50vh] z-[1]"
        style={{ width: 322, height: 120, background: 'blue' }}
      />
      */}
      <div
        className="absolute w-full h-screen overflow-hidden"
        style={{
          transform: 'rotate(0.13deg)',
        }}
      >
        <div className="absolute inset-0 md:ml-[-94px] ml-[-118px] scale-[0.7]_md:scale-100">
          {angles
            .filter((_, ind) => ind % 2 === 0)
            .map((angle) => (
              <Ray key={`primary-${angle}`} angle={angle} isOdd={true} />
            ))}
        </div>
        <div className="absolute inset-0 md:ml-[-94px] ml-[-118px] scale-[0.7]_md:scale-100">
          {angles
            .filter((_, ind) => ind % 2 !== 0)
            .map((angle) => (
              <Ray key={`secondary-${angle}`} angle={angle} isOdd={false} />
            ))}
        </div>
      </div>

      <p className="block lg:hidden text-black font-medium font-host text-[24px] md:text-[42px] leading-none text-center z-[2]">
        We are{' '}
        <span className="text-blue">
          flexible and
          <br />
          collaborate
        </span>{' '}
        with trusted
        <br />
        partners to bring your
        <br />
        <span className="text-lime">vision to life</span>
        . While we
        <br />
        specialize in key areas,
        <br />
        we’re open to exploring
        <br />
        <span className="text-orange">new challenges</span> and
        <br />
        delivering tailored
        <br />
        solutions to meet your
        <br />
        <span className="text-liliac">unique project needs</span>
      </p>
      <p className="hidden lg:block text-black font-medium font-host text-[48px] leading-none text-center z-[2]">
        We are <span className="text-blue">flexible and collaborate</span> with
        trusted
        <br />
        partners to bring your <span className="text-lime">vision to life</span>
        . While we
        <br />
        specialize in key areas, we’re open to exploring
        <br />
        <span className="text-orange">new challenges</span> and delivering
        tailored solutions
        <br />
        to meet your <span className="text-liliac">unique project needs</span>
      </p>
    </div>
  )
}

export default RayBackground
