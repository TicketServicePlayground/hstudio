'use client'
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks'
import { useIsMobile } from '@/hooks'

import {
  Label,
  CTA,
  Title,
  InnerCard,
  CardNumber,
} from '@/components/home/solution-card'

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Calculate the height needed:
  // - First card's expansion (0.1 of viewport)
  // - Plus space for each subsequent card (1 viewport each)
  const totalScrollHeight = (0.1 + (cards.length - 1)) * 100

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen">
        {cards.map((card, index) => {
          if (index === 0) {
            const vertical = (window.innerHeight - 700) / 2
            // const vertical = 30

            const marginVertical = useTransform(
              scrollYProgress,
              [0, 0.1],
              [`${vertical}px`, '0px']
            )

            const marginHorizontal = useTransform(
              scrollYProgress,
              [0, 0.1],
              ['30px', '0px']
            )

            const paddingVertical = useTransform(
              scrollYProgress,
              [0, 0.1],
              ['0px', `${vertical}px`]
            )

            const paddingHorizontal = useTransform(
              scrollYProgress,
              [0, 0.1],
              ['0px', '30px']
            )

            const borderRadius = useTransform(
              scrollYProgress,
              [0, 0.08, 0.1],
              ['32px', '32px', '0px']
            )

            return (
              <motion.div
                key={`${index}.${card.bg}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  marginTop: marginVertical,
                  marginBottom: marginVertical,
                  marginLeft: marginHorizontal,
                  marginRight: marginHorizontal,
                  zIndex: index,
                  borderRadius,
                }}
                className={`

                  bg-${card.bg}
                `}
              >
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    paddingTop: paddingVertical,
                    paddingBottom: paddingVertical,
                    paddingLeft: paddingHorizontal,
                    paddingRight: paddingHorizontal,
                    // background: card.backgroundImage,
                  }}
                >
                  <CardContent
                    card={card}
                    index={index}
                    borderRadius={borderRadius}
                  />
                </motion.div>
              </motion.div>
            )
          }

          const vertical = (window.innerHeight - 700) / 2
          // const vertical = 30

          // For subsequent cards
          const segmentSize = (1 - 0.1) / (cards.length - 1) // Remaining space divided by remaining cards
          const cardStart = 0.1 + (index - 1) * segmentSize // Start after first card's 0.1
          const cardEnd = cardStart + segmentSize

          const slideStart = cardStart
          const slideEnd = cardStart + segmentSize * 0.5

          const expandStart = slideEnd
          const expandEnd = cardEnd

          const y = useTransform(
            scrollYProgress,
            [slideStart, slideEnd],
            ['100vh', '0vh']
          )

          const marginVertical = useTransform(
            scrollYProgress,
            [expandStart, expandEnd],
            [`${vertical}px`, '0px']
          )

          const marginHorizontal = useTransform(
            scrollYProgress,
            [expandStart, expandEnd],
            ['30px', '0px']
          )

          const paddingVertical = useTransform(
            scrollYProgress,
            [expandStart, expandEnd],
            ['0px', `${vertical}px`]
          )

          const paddingHorizontal = useTransform(
            scrollYProgress,
            [expandStart, expandEnd],
            ['0px', '30px']
          )

          const borderRadius = useTransform(
            scrollYProgress,
            [expandStart, expandEnd - 0.02, expandEnd],
            ['32px', '32px', '0px']
          )

          return (
            <motion.div
              key={`${index}.${card.bg}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                y,
                marginTop: marginVertical,
                marginBottom: marginVertical,
                marginLeft: marginHorizontal,
                marginRight: marginHorizontal,
                zIndex: index,
                borderRadius,
              }}
              className={`
                bg-${card.bg}
              `}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center"
                style={{
                  paddingTop: paddingVertical,
                  paddingBottom: paddingVertical,
                  paddingLeft: paddingHorizontal,
                  paddingRight: paddingHorizontal,
                  background: card.backgroundImage,
                }}
              >
                <CardContent
                  card={card}
                  index={index}
                  borderRadius={borderRadius}
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const CardContent = ({ card, index }) => {
  const isDark = card.bg === 'cardDark'

  return (
    <div
      className="w-full h-full border_border-white flex items-center justify-center relative"
      style={
        {
          // background: card.backgroundImage,
        }
      }
    >
      <img src={`/img/desktop-covers/${card.pic}`} />

      <CardNumber number={index + 1} />
      <Title isDark={isDark} mobileTitleOffset={card.mobileTitleOffset}>
        {card.title}
      </Title>
      <div className="absolute bottom-[27px] right-[27px] hidden md:block">
        <CTA />
      </div>
      <InnerCard card={card.card} isDark={isDark} />
      {/*
      <h2 className="text-4xl font-bold text-white">{card.title}</h2>
      */}
    </div>
  )
}

export default Cards
