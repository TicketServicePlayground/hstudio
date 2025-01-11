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

  const totalScrollHeight = React.useMemo(() => {
    if (isMobile) {
      return cards.length * 100 // One viewport height per card on mobile
    } else {
      return (0.1 + (cards.length - 1)) * 100 // Keep desktop calculation exactly the same
    }
  }, [isMobile, cards.length])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen">
        {cards.map((card, i) => {
          if (i === 0) {
            // First card animations (desktop only)
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

            const marginTop = useTransform(
              scrollYProgress,
              [0, 0.4],
              ['384px', '0px']
            )

            return (
              <motion.div
                key={card.id}
                className={`${card.color} absolute inset-0`}
                style={{
                  margin: isMobile ? 0 : margin,
                }}
              >
                <CardContent
                  card={card}
                  isMobile={isMobile}
                  padding={isMobile ? 0 : padding}
                  marginTop={isMobile ? marginTop : 0}
                />
              </motion.div>
            )
          }

          // For subsequent cards
          const segmentSize = isMobile
            ? 1 / cards.length
            : (1 - 0.1) / (cards.length - 1)

          const cardStart = isMobile
            ? i * segmentSize
            : 0.1 + (i - 1) * segmentSize

          const cardEnd = cardStart + segmentSize

          // Mobile animation timing
          const slideStart = cardStart
          const slideEnd = isMobile
            ? cardStart + segmentSize * 0.4 // Card enters in first 40%
            : cardStart + segmentSize * 0.5 // Desktop timing unchanged

          const y = useTransform(
            scrollYProgress,
            [slideStart, slideEnd],
            ['100vh', '0vh']
          )

          // Desktop expand animations (unchanged)
          const margin = useTransform(
            scrollYProgress,
            [slideEnd, cardEnd],
            ['30px', '0px']
          )

          const padding = useTransform(
            scrollYProgress,
            [slideEnd, cardEnd],
            ['0px', '30px']
          )

          // Mobile inner content animation
          const marginTop = useTransform(
            scrollYProgress,
            [cardStart + segmentSize * 0.4, cardStart + segmentSize * 0.8],
            ['384px', '0px']
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
              <CardContent
                card={card}
                isMobile={isMobile}
                padding={isMobile ? 0 : padding}
                marginTop={isMobile ? marginTop : 0}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const CardContent = ({ card, isMobile, padding, marginTop }) => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{
        padding: isMobile ? 0 : padding,
      }}
    >
      <div className="w-full h-full border border-white flex flex-col items-center justify-center">
        <CardInner
          card={card}
          isMobile={isMobile}
          padding={padding}
          marginTop={marginTop}
        />
      </div>
    </motion.div>
  )
}

const CardInner = ({ card, isMobile, padding, marginTop }) => {
  const style = isMobile
    ? { marginTop }
    : {
        position: 'absolute',
        top: padding,
        right: padding,
      }

  return (
    <motion.div
      className={`
        border border-white
        text-white
        bg-black/20
        ${isMobile ? 'w-full h-full relative' : 'h-64 w-64'}
      `}
      style={style}
    >
      <h2 className="text-4xl font-bold text-white">{card.title}</h2>
    </motion.div>
  )
}

export default Page
