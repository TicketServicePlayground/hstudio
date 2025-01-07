'use client'
import { motion, useScroll, useTransform } from 'motion/react'

const ScrollCards = () => {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  })

  const cards = [
    { id: 1, title: 'First Card', color: 'bg-blue-500' },
    { id: 2, title: 'Second Card', color: 'bg-green-500' },
    { id: 3, title: 'Third Card', color: 'bg-purple-500' },
    { id: 4, title: 'Fourth Card', color: 'bg-red-500' },
  ]

  return (
    <div className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen">
        {cards.map((card, index) => {
          // Calculate ranges for sliding in and expanding
          const slideRange = [index * 0.33, index * 0.33 + 0.15] // Slide in first
          const expandRange = [index * 0.33 + 0.15, index * 0.33 + 0.33] // Then expand

          // Transform for sliding
          const y = useTransform(scrollYProgress, slideRange, ['100vh', '0vh'])

          // Transform for margin and expansion
          const margin = useTransform(scrollYProgress, expandRange, [
            '30px',
            '0px',
          ])

          // Transform for inner padding
          const padding = useTransform(scrollYProgress, expandRange, [
            '0px',
            '30px',
          ])

          return (
            <motion.div
              key={card.id}
              style={{
                y,
                margin,
                padding,
              }}
              className={`absolute inset-0 ${card.color} mb-8`}
            >
              <div className="h-full w-full flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">{card.title}</h2>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ScrollCards
