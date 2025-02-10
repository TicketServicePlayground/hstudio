'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks'
import { cards } from '@/data'

import { Label, CTA, Title, CardNumber } from '@/components/home/solution-card'

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)

  const metrics = React.useMemo(() => {
    let sections = []
    let totalHeight = 0
    const viewportHeight = window.innerHeight

    // Calculate metrics for each card
    const cardMetrics = cards.map((card) => {
      // How much we need to scroll to see the full card
      const contentScrollHeight = Math.max(
        0,
        card.innerBlockHeight + 560 - viewportHeight
      )

      return {
        card,
        contentScrollHeight,
        // Total scroll needed: content scroll + viewport height for next card entry
        scrollHeight: contentScrollHeight + viewportHeight,
      }
    })

    // First card starts in view
    cardMetrics[0].scrollHeight = cardMetrics[0].contentScrollHeight

    // Calculate total scroll height
    totalHeight = cardMetrics.reduce((sum, m) => sum + m.scrollHeight, 0)

    // Calculate scroll positions
    let accumulatedHeight = 0
    cardMetrics.forEach((metric, index) => {
      const sectionStart = accumulatedHeight / totalHeight
      // Point where content is fully visible
      const contentScrollEnd =
        (accumulatedHeight + metric.contentScrollHeight) / totalHeight

      accumulatedHeight += metric.scrollHeight
      const sectionEnd = accumulatedHeight / totalHeight

      sections.push({
        start: sectionStart,
        contentScrollEnd,
        end: sectionEnd,
        contentScrollHeight: metric.contentScrollHeight,
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
        height: `${metrics.totalHeight}px`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden rounded-b-[20px]">
        {cards.map((card, index) => (
          <MobileCard
            key={`${index}.${card.bg}`}
            card={card}
            scrollYProgress={scrollYProgress}
            metrics={metrics.sections[index]}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

const MobileCard = ({ card, scrollYProgress, metrics, index }) => {
  const { start, contentScrollEnd, end, contentScrollHeight } = metrics

  // Only animate card entry after previous content is fully scrolled
  const y = useTransform(
    scrollYProgress,
    [contentScrollEnd, end],
    ['100vh', '0vh']
  )

  // Scroll card up to reveal full content
  const cardY = useTransform(
    scrollYProgress,
    [start, contentScrollEnd],
    [0, -contentScrollHeight]
  )

  const isDark = card.bg === 'cardDark'

  return (
    <motion.div
      className={`bg-${card.bg} absolute inset-0 rounded-t-[20px]`}
      style={{ y }}
    >
      <motion.img
        src={`/img/mobile-covers/${card.pic}`}
        className="absolute top-0 w-full"
        alt={card.title}
      />
      <CardNumber number={index + 1} />
      <motion.div className="w-full h-full" style={{ y: cardY }}>
        <div
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
            top: 560,
            background: isDark
              ? 'hsla(0, 0%, 100%, .05)'
              : 'hsla(0, 0%, 100%, .2)',
          }}
        >
          <InnerCard card={card.card} title={card.title} isDark={isDark} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export const InnerCard = ({ card, title, isDark }) => {
  return (
    <div className="flex flex-col gap-y-[40px] relative">
      <div
        className={`
          absolute
          font-medium not-italic leading-none font-host 
          ${isDark ? 'text-white' : 'text-black'} 
          text-[42px]
          flex flex-col justify-end
          h-[168px]
          top-[-237px]
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
