'use client'
import React, { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks'
import { useLocale, useTranslations } from 'next-intl'

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

const desktop_de = ["row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8"]
const mobile_de = ["row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8", "row9", "row10", "row11", "row12", "row13"]
const desktop_en = ["row1", "row2", "row3", "row4", "row5"]
const mobile_en = ["row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8", "row9", "row10"]

const RayBackground: React.FC = () => {
  const angles: number[] = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

  const t = useTranslations('home.ray')
  const locale = useLocale()

  // @ts-ignore
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
      <motion.div
        className="absolute w-full h-screen overflow-hidden"
        // style={{
        //   transform: 'rotate(0.13deg)',
        // }}

        animate={{
          rotate: 360,
        }}
        transition={{
          // duration: 90,
          duration: 80,
          ease: 'linear',
          repeat: Infinity,
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
      </motion.div>

      <p className="block lg:hidden text-black font-medium font-host text-[24px] md:text-[42px] leading-none text-center z-[2]">
        {(locale === 'en' ? mobile_en : mobile_de).map((row, index) => (
          <Fragment key={index}>
            <span>{
              t.rich(`mobile.${row}`, {
                blue: (chunks) => <span className="text-blue">{chunks}</span>,
                lime: (chunks) => <span className="text-lime">{chunks}</span>,
                orange: (chunks) => <span className="text-orange">{chunks}</span>,
                liliac: (chunks) => <span className="text-liliac">{chunks}</span>
              }
            )}</span>
            {index !== (locale === 'en' ? mobile_en : mobile_de).length - 1 && <br />}
          </Fragment>
        ))}
      </p>

      <p className="hidden lg:block text-black font-medium font-host text-[48px] leading-none text-center z-[2]">
        {(locale === 'en' ? desktop_en : desktop_de).map((row, index) => (
          <Fragment key={index}>
            <span>{
              t.rich(`desktop.${row}`, {
                blue: (chunks) => <span className="text-blue">{chunks}</span>,
                lime: (chunks) => <span className="text-lime">{chunks}</span>,
                orange: (chunks) => <span className="text-orange">{chunks}</span>,
                liliac: (chunks) => <span className="text-liliac">{chunks}</span>
              }
            )}</span>
            {index !== (locale === 'en' ? desktop_en : desktop_de).length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    </div>
  )
}

export default RayBackground
