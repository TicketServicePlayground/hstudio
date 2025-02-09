'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks'
import { cards } from '@/data'

import {
  Label,
  CTA,
  Title,
  // InnerCard,
  CardNumber,
} from '@/components/home/solution-card'

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)

  const metrics = React.useMemo(() => {
    let sections = []
    let totalHeight = 0

    // Calculate the travel distance for each card's content
    const cardMetrics = cards.map((card) => {
      const startPos = 560
      const endPos = Math.max(0, window.innerHeight - card.innerBlockHeight)
      const travelDistance = startPos - endPos
      return {
        card,
        travelDistance,
        scrollHeight: window.innerHeight + travelDistance, // Entry + reveal
      }
    })

    // For first card, reduce initial scroll space since it's already visible
    cardMetrics[0].scrollHeight = cardMetrics[0].travelDistance

    // Calculate total scroll height
    totalHeight = cardMetrics.reduce((sum, m) => sum + m.scrollHeight, 0)

    // Calculate scroll positions
    let accumulatedHeight = 0
    cardMetrics.forEach((metric, index) => {
      const sectionStart = accumulatedHeight / totalHeight
      // First card doesn't need entry animation
      const entryPoint =
        index === 0
          ? sectionStart
          : (accumulatedHeight + window.innerHeight) / totalHeight
      accumulatedHeight += metric.scrollHeight
      const sectionEnd = accumulatedHeight / totalHeight

      sections.push({
        start: sectionStart,
        entryPoint: entryPoint,
        end: sectionEnd,
      })
    })

    return { sections, totalHeight }
  }, [cards])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${(metrics.totalHeight / window.innerHeight) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden rounded-b-[20px]">
        {cards.map((card, index) => (
          <MobileCard
            key={`${index}.${card.bg}`}
            card={card}
            scrollYProgress={scrollYProgress}
            start={metrics.sections[index].start}
            entryPoint={metrics.sections[index].entryPoint}
            end={metrics.sections[index].end}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

const MobileCard = ({
  card,
  scrollYProgress,
  start,
  end,
  entryPoint,
  index,
}) => {
  // Card slides in from start to entryPoint
  const y = useTransform(scrollYProgress, [start, entryPoint], ['100vh', '0vh'])

  // Content reveals from entryPoint to end
  const contentPosition = useTransform(
    scrollYProgress,
    [entryPoint, end],
    ['560px', Math.max(0, window.innerHeight - card.innerBlockHeight) + 'px']
  )

  const marg = 560 - Math.max(0, window.innerHeight - card.innerBlockHeight)

  const margChange = useTransform(
    scrollYProgress,
    [entryPoint, end],
    ['0px', -marg * 0.8 + 'px']
  )

  const isDark = card.bg === 'cardDark'

  return (
    <motion.div
      className={`bg-${card.bg} absolute inset-0 rounded-t-[20px]`}
      style={{ y }}
    >
      <motion.img
        src={`/img/mobile-covers/${card.pic}`}
        className={'absolute top-0 w-full'}
        alt={card.title}
        style={{
          marginTop: margChange,
          //
        }}
      />
      <CardNumber number={index + 1} />
      <div className="w-full h-full">
        <motion.div
          className={`
            flex flex-col
            card
            _blur-card
            _backdrop-blur-[150px]
            w-full absolute inset-0
            ${isDark ? 'card--dark' : ''}
            flex flex-col
            md:absolute md:top-0 md:right-0
            rounded-[20px]
            md:rounded-[32px]
            w-full
            md:w-[494px]
            p-[25px]
            md:p-[46px]
            gap-y-[40px]
            pb-[120px]
            md:pb-[46px]
            ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}
          `}
          style={{
            height: card.innerBlockHeight,
            top: contentPosition,
            background: isDark
              ? 'hsla(0, 0%, 100%, .05)'
              : 'hsla(0, 0%, 100%, .2)',
            // backgroundImage: 'url(http://localhost:3000/semi-transparent.png)',
          }}
        >
          <InnerCard card={card.card} title={card.title} isDark={isDark} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export const InnerCard = ({ card, title, isDark }) => {
  // 25 + 168 + 44

  return (
    <div className="flex flex-col gap-y-[40px] relative">
      <div
        className={`
          absolute
      font-medium not-italic leading-none font-host ${isDark ? 'text-white' : 'text-black'} 
      text-[42px]

          flex flex-col justify-end


          h-[168px]
          top-[-237px]
      _left-[25px]
      `}
      >
        {title}
      </div>
      <span className="font-host font-[500] text-[24px] leading-none">
        {card.heading}
      </span>
      {card.benefits && (
        <div className="flex flex-col gap-y-[12px]">
          <Label>Key Benefits</Label>
          <div className="flex flex-col gap-y-[8px]">
            {card.benefits.map((benefitItem) => (
              <span
                className="font-host text-[14px] font-[500] leading-none"
                key={benefitItem}
              >
                {benefitItem}
              </span>
            ))}
          </div>
        </div>
      )}
      {card.stack && (
        <div className="flex flex-col gap-y-[16px]">
          <Label>Technology Stack</Label>
          <div className="flex flex-wrap gap-[4px]">
            {card.stack.map((stackItem) => (
              <span
                className="flex items-center justify-center h-[24px] font-space text-[12px] font-[500] leading-none bg-white rounded-[9px] px-[12px]"
                key={stackItem}
              >
                {stackItem}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="block md:hidden">
        <CTA />
      </div>
    </div>
  )
}

export default Cards
