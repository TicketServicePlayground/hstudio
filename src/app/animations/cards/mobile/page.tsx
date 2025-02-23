'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Page = () => {
  const cards = [
    {
      id: 1,
      title: 'First Card',
      color: 'bg-cyan-500',
      content:
        'This is some content that might be taller than the viewport'.repeat(
          20
        ),
      contentHeight: 200, // 200vh
    },
    {
      id: 2,
      title: 'Second Card',
      color: 'bg-green-500',
      content:
        'Another card with potentially tall content that spans multiple lines'.repeat(
          15
        ),
      contentHeight: 150, // 150vh
    },
    {
      id: 3,
      title: 'Third Card',
      color: 'bg-purple-500',
      content:
        'More content here that could be even taller than the previous cards'.repeat(
          25
        ),
      contentHeight: 300, // 300vh
    },
    {
      id: 4,
      title: 'Fourth Card',
      color: 'bg-red-500',
      content: 'Final card content'.repeat(10),
      contentHeight: 120, // 120vh
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
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Calculate total scroll height including content scrolling ranges
  const totalScrollHeight = React.useMemo(() => {
    if (isMobile) {
      return cards.reduce(
        (sum, card) => sum + Math.max(100, card.contentHeight),
        0
      )
    }
    // For desktop, we add extra scroll range for content scrolling
    return cards.reduce((sum, card) => {
      const extraScroll = Math.max(0, card.contentHeight - 100) // Additional scroll range for content
      return sum + 100 + extraScroll
    }, 0)
  }, [cards, isMobile])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Calculate progress ranges for each card
  const sections = React.useMemo(() => {
    let currentProgress = 0
    return cards.map((card) => {
      const cardScrollRange = 100 / totalScrollHeight
      const contentScrollRange = Math.max(
        0,
        (card.contentHeight - 100) / totalScrollHeight
      )
      const totalRange = cardScrollRange + contentScrollRange

      const section = {
        start: currentProgress,
        cardEnd: currentProgress + cardScrollRange,
        end: currentProgress + totalRange,
      }
      currentProgress += totalRange
      return section
    })
  }, [cards, totalScrollHeight])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {cards.map((card, i) => {
          const section = sections[i]

          // Card entrance/exit animation
          const y = useTransform(
            scrollYProgress,
            [
              Math.max(0, section.start - 0.1),
              section.start,
              section.cardEnd,
              Math.min(1, section.end + 0.1),
            ],
            ['100vh', '0vh', '0vh', '-100vh']
          )

          // Content scroll animation
          const contentY = useTransform(
            scrollYProgress,
            [section.cardEnd, section.end],
            ['0%', `${-(card.contentHeight - 100)}%`]
          )

          return (
            <motion.div
              key={card.id}
              className={`${card.color} absolute inset-0`}
              style={{
                y,
                zIndex: i,
              }}
            >

              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="w-full h-full border border-white flex flex-col items-center justify-start overflow-hidden">
                  <h2 className="text-4xl font-bold text-white p-4 sticky top-0 bg-inherit z-10">
                    {card.title}
                  </h2>
                  <motion.div
                    className="p-4 text-white w-full"
                    style={{
                      y: contentY,
                      height: `${card.contentHeight}vh`,
                    }}
                  >
                    {card.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
