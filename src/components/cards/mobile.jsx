'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Label, CTA, CardNumber } from '@/components/home/solution-card'

const Cards = ({ cards }) => {
  const containerRef = useRef(null)
  const [heights, setHeights] = useState([])

  // После монтирования вычисляем реальные высоты карточек
  useEffect(() => {
    const newHeights = cards.map((card) => {
      const element = document.getElementById(`card-${card.title}`)
      return element.offsetHeight + 50
    })
    setHeights(newHeights)
  }, [cards])

  // Общая высота всех карточек
  const totalHeight = useMemo(
    () => heights.reduce((sum, h) => sum + h, 0),
    [heights]
  )

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${totalHeight}px`,
        marginTop: '13vh',
        paddingTop: '13vh',
      }}
    >
      <div className="sticky top-0 h-screen rounded-b-[20px]">
        {cards.map((card, index) => {
          const isDark = card.bg === 'cardDark'

          if (index === 0) {
            return (
              <motion.div
                id={`card-${card.title}`}
                className={`bg-${card.bg} absolute top-[-300px] left-0 right-0 rounded-t-[20px]`}
                key={index + card.title}
                style={{ height: `${heights[index]}px` }}
              >
                <motion.img
                  src={`/img/mobile-covers/${card.pic}`}
                  className="absolute top-0 w-full"
                  alt={card.title}
                />
                <CardNumber number={index + 1} />
                <InnerCard card={card.card} title={card.title.split(' ').join('   ')} isDark={isDark} />
              </motion.div>
            )
          }

          const prevCardsHeight = useMemo(
            () => heights.slice(1, index).reduce((sum, h) => sum + h, 0),
            [heights, index]
          )

          const cardHeight = heights[index]

          const viewportHeight = window.innerHeight

          const start = prevCardsHeight / (totalHeight - heights[0])
          const end = (prevCardsHeight + cardHeight) / (totalHeight - heights[0])

          const stop = (cardHeight - viewportHeight) / viewportHeight * 100

          const y = useTransform(
            scrollYProgress,
            [start + 0.02, end + 0.02],
            ['100vh', `-${stop}vh`]
          )

          return (
            <motion.div
              id={`card-${card.title}`}
              className={`bg-${card.bg} absolute left-0 right-0 top-0 rounded-t-[20px]`}
              style={{ y, height: `${heights[index]}px` }}
              key={index + card.title}
            >
              <motion.img
                src={`/img/mobile-covers/${card.pic}`}
                className="absolute top-0 w-full"
                alt={card.title}
              />
              <CardNumber number={index + 1} />
              <InnerCard card={card.card} title={card.title} isDark={isDark} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export const InnerCard = ({ card, title, isDark }) => {
  return (
    <motion.div className={`bg-${card.bg} w-full h-auto pt-[450px]`}>
      <div
        className={`font-medium not-italic leading-none font-host ${isDark ? 'text-white' : 'text-black'} text-[42px] h-auto p-[25px]`}
      >
        {title}
      </div>
      <div
        className={`flex flex-col card _blur-card _backdrop-blur-[150px] rounded-[20px] w-full p-[25px] gap-y-[40px] pb-[120px] h-auto ${isDark ? 'card--dark' : ''} ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}`}
        style={{
          background: isDark ? 'hsla(0, 0%, 100%, .05)' : 'hsla(0, 0%, 100%, .2)',
        }}
      >
        <div className={'flex flex-col gap-y-[40px] relative h-auto'}>
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
      </div>
    </motion.div>
  )
}

export default Cards
