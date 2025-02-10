'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Page = () => {
  const cards = [
    {
      id: 1,
      title: 'First Card',
      color: 'bg-cyan-500',
      content: 'This is some content that might be taller than the viewport',
    },
    {
      id: 2,
      title: 'Second Card',
      color: 'bg-green-500',
      content:
        'Another card with potentially tall content that spans multiple lines to demonstrate variable height',
    },
    {
      id: 3,
      title: 'Third Card',
      color: 'bg-purple-500',
      content:
        'More content here that could be even taller than the previous cards to show how the spacing adjusts',
    },
    {
      id: 4,
      title: 'Fourth Card',
      color: 'bg-red-500',
      content: 'Final card content',
    },
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

const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)
  const cardRefs = React.useRef([])
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [cardHeights, setCardHeights] = React.useState([])

  // Calculate card heights on mount and resize
  React.useEffect(() => {
    const calculateHeights = () => {
      const heights = cardRefs.current.map((ref) => {
        if (!ref) return 100 // Default to 100vh if ref not available
        const height = ref.scrollHeight
        const vh = (height / window.innerHeight) * 100
        return Math.max(100, vh) // Ensure minimum 100vh
      })
      setCardHeights(heights)
    }

    calculateHeights()
    window.addEventListener('resize', calculateHeights)
    return () => window.removeEventListener('resize', calculateHeights)
  }, [])

  // Calculate total scroll height based on card heights
  const totalScrollHeight = React.useMemo(() => {
    if (isMobile) {
      return cardHeights.reduce((sum, height) => sum + height, 0)
    } else {
      return (0.1 + (cards.length - 1)) * 100
    }
  }, [isMobile, cards.length, cardHeights])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Calculate cumulative heights for animation triggers
  const cumulativeHeights = React.useMemo(() => {
    const heights = []
    let sum = 0
    cardHeights.forEach((height) => {
      heights.push(sum)
      sum += height
    })
    return heights
  }, [cardHeights])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
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
                className={`${card.color} absolute inset-0`}
                style={{
                  margin: isMobile ? 0 : margin,
                }}
              >
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    padding: isMobile ? 16 : padding,
                  }}
                >
                  <div
                    ref={(el) => (cardRefs.current[i] = el)}
                    className="w-full h-full border border-white flex flex-col items-center justify-start overflow-y-auto"
                  >
                    <h2 className="text-4xl font-bold text-white p-4">
                      {card.title}
                    </h2>
                    <div className="p-4 text-white">{card.content}</div>
                  </div>
                </motion.div>
              </motion.div>
            )
          }

          const startProgress = isMobile
            ? cumulativeHeights[i - 1] / totalScrollHeight
            : 0.1 + ((i - 1) / (cards.length - 1)) * 0.9

          const endProgress = isMobile
            ? cumulativeHeights[i] / totalScrollHeight
            : startProgress + 0.9 / (cards.length - 1)

          const y = useTransform(
            scrollYProgress,
            [
              startProgress,
              startProgress + (endProgress - startProgress) * 0.5,
            ],
            ['100vh', '0vh']
          )

          // Expand animations (desktop only)
          const margin = useTransform(
            scrollYProgress,
            [startProgress + (endProgress - startProgress) * 0.5, endProgress],
            ['30px', '0px']
          )

          const padding = useTransform(
            scrollYProgress,
            [startProgress + (endProgress - startProgress) * 0.5, endProgress],
            ['0px', '30px']
          )

          return (
            <motion.div
              key={card.id}
              className={`${card.color} absolute inset-0`}
              style={{
                y,
                margin: isMobile ? 0 : margin,
                zIndex: i,
              }}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center"
                style={{
                  padding: isMobile ? 16 : padding,
                }}
              >
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="w-full h-full border border-white flex flex-col items-center justify-start overflow-y-auto"
                >
                  <h2 className="text-4xl font-bold text-white p-4">
                    {card.title}
                  </h2>
                  <div className="p-4 text-white">{card.content}</div>
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
