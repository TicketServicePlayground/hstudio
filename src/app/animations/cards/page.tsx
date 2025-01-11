'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Page = () => {
  const cards = [
    { id: 1, title: 'First Card', color: 'bg-cyan-500' },
    { id: 2, title: 'Second Card', color: 'bg-green-500' },
    { id: 3, title: 'Third Card', color: 'bg-purple-500' },
    { id: 4, title: 'Fourth Card', color: 'bg-red-500' },
  ]

  return (
    <div className="flex flex-col w-full">
      <section className="h-screen flex items-center justify-center text-3xl font-bold bg-slate-100">
        Hero Section
      </section>
      <Cards cards={cards} />
      <section className="h-screen flex items-center justify-center text-3xl font-bold bg-slate-100">
        End Section
      </section>
    </div>
  )
}

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
        {cards.map((card, i) => {
          if (i === 0) {
            const margin = useTransform(
              scrollYProgress,
              [0, 0.1],
              ['30px', '0px']
            )

            const padding = useTransform(
              scrollYProgress,
              [0, 0.1],
              ['0px', '30px']
            )

            return (
              <motion.div
                key={card.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin,
                  zIndex: i,
                }}
                className={`${card.color}`}
              >
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  style={{ padding }}
                >
                  <div className="w-full h-full border border-white flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">
                      {card.title}
                    </h2>
                  </div>
                </motion.div>
              </motion.div>
            )
          }

          // For subsequent cards
          const segmentSize = (1 - 0.1) / (cards.length - 1) // Remaining space divided by remaining cards
          const cardStart = 0.1 + (i - 1) * segmentSize // Start after first card's 0.1
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

          const margin = useTransform(
            scrollYProgress,
            [expandStart, expandEnd],
            ['30px', '0px']
          )

          const padding = useTransform(
            scrollYProgress,
            [expandStart, expandEnd],
            ['0px', '30px']
          )

          return (
            <motion.div
              key={card.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                y,
                margin,
                zIndex: i,
              }}
              className={`${card.color}`}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center"
                style={{ padding }}
              >
                <div className="w-full h-full border border-white flex items-center justify-center">
                  <h2 className="text-4xl font-bold text-white">
                    {card.title}
                  </h2>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
