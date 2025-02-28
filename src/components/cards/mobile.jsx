'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
// import { useMediaQuery } from '@/hooks'
// import { cards } from '@/data'

import { Label, CTA, Title, CardNumber } from '@/components/home/solution-card'

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)

  const totalHeight = cards.reduce((sum, card) => sum + card.blockHeightMobile, 0)

  // const metricsFunc = () => {
  //   let sections = []
  //   let totalHeight = 0
  //   const viewportHeight = window.innerHeight
  //
  //   const cardMetrics = cards.map((card) => {
  //     const contentScrollHeight = Math.max(
  //       0,
  //       card.innerBlockHeight + viewportHeight
  //     )
  //
  //     return {
  //       card,
  //       contentScrollHeight,
  //       scrollHeight: contentScrollHeight + viewportHeight,
  //     }
  //   })
  //
  //   totalHeight = cardMetrics.reduce((sum, m) => sum + m.scrollHeight, 0)
  //
  //   let accumulatedHeight = 0
  //   cardMetrics.forEach((metric, index) => {
  //     const sectionStart = accumulatedHeight / totalHeight
  //     const contentScrollEnd =
  //       (accumulatedHeight + metric.contentScrollHeight) / totalHeight
  //
  //     accumulatedHeight += metric.scrollHeight
  //     const sectionEnd = accumulatedHeight / totalHeight
  //
  //     sections.push({
  //       start: sectionStart,
  //       contentScrollEnd,
  //       end: sectionEnd,
  //       contentScrollHeight: metric.contentScrollHeight,
  //     })
  //   })
  //   return { sections, totalHeight }
  // }
  // const metrics = metricsFunc()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        // height: `${metrics.totalHeight}px`,
        height: `${totalHeight}px`,
        marginTop: '350px',
      }}
    >
      <div className="sticky top-0 h-screen rounded-b-[20px]">
        {cards.map((card, index) => {
          const isDark = card.bg === 'cardDark'

          if (index === 0) {
            return (
              <motion.div
                className={`bg-${card.bg} absolute top-[-350px] bottom-0 left-0 right-0 rounded-t-[20px] rounded-b-[20px]`}
                style={{ height: card.blockHeightMobile }}
                key={index+card.title}
              >
                <motion.img
                  src={`/img/mobile-covers/${card.pic}`}
                  className="absolute top-0 w-full"
                  alt={card.title}
                />
                <CardNumber number={index + 1} />
                <motion.div className="w-full h-max">
                  <div
                    className={`
                      flex flex-col card _blur-card _backdrop-blur-[150px] absolute inset-0
                      md:absolute md:top-0 md:right-0 rounded-[20px] md:rounded-[32px] w-full
                      md:w-[494px] p-[25px] md:p-[46px] gap-y-[40px] pb-[120px] md:pb-[46px]
                      ${isDark ? 'card--dark' : ''}
                      ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}
                  `}
                    style={{
                      height: card.innerBlockHeight,
                      top: `600px`,
                      background: isDark
                        ? 'hsla(0, 0%, 100%, .05)'
                        : 'hsla(0, 0%, 100%, .2)',
                    }}
                  >
                    <InnerCard
                      card={card.card}
                      title={card.title}
                      isDark={isDark}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          }

          const isLast = index === length - 1

          const prevCardsHeight = cards.slice(1, index).reduce((sum, c) => sum + c.blockHeightMobile, 0)
          const start = prevCardsHeight / (totalHeight - cards[0].blockHeightMobile)
          const end = (prevCardsHeight + card.blockHeightMobile) / (totalHeight - cards[0].blockHeightMobile)

          const viewportHeight = window.innerHeight

          const stop = Math.floor((card.blockHeightMobile - (Math.floor(card.blockHeightMobile / viewportHeight) * viewportHeight)) / viewportHeight * 100)

          const y = useTransform(
            scrollYProgress,
            [start, end],
            ['100vh', !isLast ? `-${stop}vh` : `0vh`]
          )

          return (
            <motion.div
              className={`bg-${card.bg} absolute inset-0 rounded-t-[20px] rounded-b-[20px]`}
              style={{ y: y, height: card.blockHeightMobile, willChange: 'transform' }}
              key={index+card.title}
            >
              <motion.img
                src={`/img/mobile-covers/${card.pic}`}
                className="absolute top-0 w-full"
                alt={card.title}
              />
              <CardNumber number={index + 1} />
              <motion.div
                className="w-full h-max"
              >
                <div
                  className={`
                      flex flex-col card _blur-card _backdrop-blur-[150px] absolute inset-0
                      md:absolute md:top-0 md:right-0 rounded-[20px] md:rounded-[32px] w-full
                      md:w-[494px] p-[25px] md:p-[46px] gap-y-[40px] pb-[120px] md:pb-[46px]
                      ${isDark ? 'card--dark' : ''}
                      ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}
                  `}
                  style={{
                    height: card.innerBlockHeight,
                    top: `600px`,
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

          // return (
          //   <MobileCard
          //     key={`${index}.${card.bg}`}
          //     card={card}
          //     scrollYProgress={scrollYProgress}
          //     metrics={metrics.sections[index]}
          //     index={index}
          //     length={cards.length}
          //   />
          // )
        })}
      </div>
    </div>
  )
}

const MobileCard = ({ card, scrollYProgress, metrics, index, length }) => {
  const { start, contentScrollEnd, end, contentScrollHeight } = metrics

  const viewportHeight = window.innerHeight

  const isDark = card.bg === 'cardDark'

  const stop = 13

  const isLast = index === length - 1

  // Карточка будет двигаться с прокруткой страницы
  const y = useTransform(
    scrollYProgress,
    [start * 0.9, end * 0.9],
    ['100vh', !isLast ? `-${stop}vh` : `0vh`]
  ) //index === 0 ? '0vh' :

  // Прокрутка контента внутри карточки
  // const contentY = useTransform(
  //     scrollYProgress,
  //     [start, contentScrollEnd],
  //     [570, `-${contentScrollHeight - 570 - window.innerHeight}px`]
  // )

  const cardY = useTransform(
    scrollYProgress,
    [start, contentScrollEnd],
    [570, -contentScrollHeight - window.innerHeight - 570]
  )

  return (
    <motion.div
      className={`bg-${card.bg} absolute inset-0 rounded-t-[20px] rounded-b-[20px]`}
      style={{ y: y, height: card.blockHeightMobile, willChange: 'transform' }}
    >
      <motion.img
        src={`/img/mobile-covers/${card.pic}`}
        className="absolute top-0 w-full"
        alt={card.title}
      />
      <CardNumber number={index + 1} />
      <motion.div
        className="w-full h-max"
        // style={{ y: cardY }}
      >
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
            top: `calc(100vh - ${card.innerBlockHeight}px + 20vh)`,
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
    <div className="flex flex-col gap-y-[40px] relative h-auto">
      <div
        className={`
          absolute
          font-medium not-italic leading-none font-host 
          ${isDark ? 'text-white' : 'text-black'} 
          text-[42px]
          flex flex-col justify-end
          h-auto
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
