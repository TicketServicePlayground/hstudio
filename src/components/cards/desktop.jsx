'use client'
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import {
  Label,
  CTA,
  Title,
  InnerCard,
  CardNumber,
} from '@/components/home/solution-card'
import { useTranslations } from 'next-intl'

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const totalScrollHeight = (cards.length + 0.5) * 100

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen">
        {cards.map((card, index) => {
          const vertical = (window.innerHeight - 700) / 2

          if (index === 0) {
            return (
              <motion.div
                key={`${index}.${card.bg}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  marginTop: vertical,
                  marginBottom: vertical,
                  marginLeft: 30,
                  marginRight: 30,
                  zIndex: 1,
                  borderRadius: 32,
                }}
                className={`bg-${card.bg}`}
              >
                <motion.div className="w-full h-full flex items-center justify-center">
                  <CardContent card={card} index={index} borderRadius={32} />
                </motion.div>
              </motion.div>
            )
          }

          // For subsequent cards - start at previous card's halfway point
          const y = useTransform(
            scrollYProgress,
            [0.2 * (index - 1), 0.2 * index],
            ['100vh', '0vh']
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
                marginTop: vertical,
                marginBottom: vertical,
                marginLeft: 30,
                marginRight: 30,
                zIndex: index + 2,
                borderRadius: 32,
                willChange: "transform"
              }}
              className={`bg-${card.bg}`}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: card.backgroundImage,
                }}
              >
                <CardContent card={card} index={index} borderRadius={32} />
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

  const t = useTranslations('home.cards')

  return (
    <div className="w-full h-full border_border-white flex items-center justify-center relative">
      <img src={`/img/desktop-covers/${card.pic}`} alt={''} />
      <CardNumber number={index + 1} />
      <Title isDark={isDark} mobileTitleOffset={card.mobileTitleOffset}>
        {t(card.title)}
      </Title>
      <div className="absolute bottom-[27px] right-[27px] hidden md:block">
        <CTA category={card.category} />
      </div>
      <InnerCard card={card} isDark={isDark} />
    </div>
  )
}

export default Cards
