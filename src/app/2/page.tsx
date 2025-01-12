'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cards } from '@/data'
import { useIsMobile } from '@/hooks'

const AnimatedSolutions = () => {
  const containerRef = React.useRef(null)
  const isMobile = useIsMobile()

  const totalScrollHeight = React.useMemo(() => {
    if (isMobile) {
      return cards.length * 100 // One viewport height per card on mobile
    } else {
      return (0.1 + (cards.length - 1)) * 100
    }
  }, [isMobile, cards.length])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen">
        {cards.map((card, i) => (
          <AnimatedCard
            key={`${i}.${card.bg}`}
            card={card}
            index={i}
            scrollYProgress={scrollYProgress}
            totalCards={cards.length}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  )
}

const AnimatedCard = ({
  card,
  index,
  scrollYProgress,
  totalCards,
  isMobile,
}) => {
  const isDark = card.bg === 'cardDark'

  // Animation calculations
  const segmentSize = isMobile ? 1 / totalCards : (1 - 0.1) / (totalCards - 1)
  const cardStart = isMobile
    ? index * segmentSize
    : 0.1 + (index - 1) * segmentSize
  const cardEnd = cardStart + segmentSize

  // First card special handling
  if (index === 0) {
    const margin = useTransform(scrollYProgress, [0, 0.1], ['30px', '0px'])
    const padding = useTransform(scrollYProgress, [0, 0.1], ['0px', '30px'])
    const marginTop = useTransform(scrollYProgress, [0, 0.4], ['384px', '0px'])

    return (
      <motion.div
        className={`
          absolute inset-0
          w-full 
          md:w-[calc(100%-60px)]
          rounded-[20px]
          md:rounded-[32px]
          h-full
          min-h-[700px]
          bg-${card.bg}
          ${index === 0 ? 'mt-[0px]' : 'mt-[-60px]'}
          md:mt-[unset]
          overflow-hidden
        `}
        style={{
          margin: isMobile ? 0 : margin,
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(/img/${isMobile ? 'mobile' : 'desktop'}-covers/${card.pic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <InnerCard
          card={card}
          isDark={isDark}
          isMobile={isMobile}
          padding={isMobile ? 0 : padding}
          marginTop={isMobile ? marginTop : 0}
        />
      </motion.div>
    )
  }

  // Subsequent cards animations
  const slideStart = cardStart
  const slideEnd = isMobile
    ? cardStart + segmentSize * 0.4
    : cardStart + segmentSize * 0.5

  const y = useTransform(
    scrollYProgress,
    [slideStart, slideEnd],
    ['100vh', '0vh']
  )
  const margin = useTransform(
    scrollYProgress,
    [slideEnd, cardEnd],
    ['30px', '0px']
  )
  const padding = useTransform(
    scrollYProgress,
    [slideEnd, cardEnd],
    ['0px', '30px']
  )
  const marginTop = useTransform(
    scrollYProgress,
    [cardStart + segmentSize * 0.4, cardStart + segmentSize * 0.8],
    ['384px', '0px']
  )

  return (
    <motion.div
      className={`
        absolute inset-0
        w-full 
        md:w-[calc(100%-60px)]
        rounded-[20px]
        md:rounded-[32px]
        h-full
        min-h-[700px]
        bg-${card.bg}
        ${index === 0 ? 'mt-[0px]' : 'mt-[-60px]'}
        md:mt-[unset]
        overflow-hidden
      `}
      style={{
        y,
        margin: isMobile ? 0 : margin,
        zIndex: index,
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(/img/${isMobile ? 'mobile' : 'desktop'}-covers/${card.pic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <InnerCard
        card={card}
        isDark={isDark}
        isMobile={isMobile}
        padding={isMobile ? 0 : padding}
        marginTop={isMobile ? marginTop : 0}
      />
    </motion.div>
  )
}

const InnerCard = ({ card, isDark, isMobile, padding, marginTop }) => {
  const style = isMobile
    ? { marginTop }
    : {
        position: 'absolute' as const,
        top: padding,
        right: padding,
        width: '494px',
        height: 'auto',
      }

  return (
    <motion.div
      className={`
        card
        flex flex-col
        relative
        md:absolute md:top-0 md:right-0
        rounded-[20px]
        md:rounded-[32px]
        border border-[#FFFFFF60]
        backdrop-blur-[150px]
        w-full
        p-[25px]
        md:p-[46px]
        gap-y-[40px]
        pb-[120px]
        md:pb-[25px]
        ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}
      `}
      style={style}
    >
      <span className="font-host font-[500] text-[24px] leading-none">
        {card.heading}
      </span>
    </motion.div>
  )
}

export default AnimatedSolutions
