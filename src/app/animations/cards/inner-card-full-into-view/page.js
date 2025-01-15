'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Page = () => {
  const cards = [
    { id: 1, title: 'First Card', color: 'bg-cyan-500', innerBlockHeight: 800 },
    {
      id: 2,
      title: 'Second Card',
      color: 'bg-green-500',
      innerBlockHeight: 500,
    },
    {
      id: 3,
      title: 'Third Card',
      color: 'bg-purple-500',
      innerBlockHeight: 600,
    },
    { id: 4, title: 'Fourth Card', color: 'bg-red-500', innerBlockHeight: 300 },
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

const FirstDesktopCard = ({ card, scrollYProgress }) => {
  const margin = useTransform(scrollYProgress, [0, 0.1], ['30px', '0px'])
  const padding = useTransform(scrollYProgress, [0, 0.1], ['0px', '30px'])

  return (
    <motion.div
      className={`${card.color} absolute inset-0`}
      style={{ margin, zIndex: 0 }}
    >
      <CardContent card={card} isMobile={false} padding={padding} />
    </motion.div>
  )
}

const SubsequentDesktopCard = ({
  card,
  index,
  totalCards,
  scrollYProgress,
}) => {
  const cardStart = 0.1 + (index - 1) * (0.9 / (totalCards - 1))
  const cardEnd = cardStart + 0.9 / (totalCards - 1)

  const margin = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    ['30px', '0px']
  )
  const padding = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    ['0px', '30px']
  )

  return (
    <motion.div
      className={`${card.color} absolute inset-0`}
      style={{ margin, zIndex: index }}
    >
      <CardContent card={card} isMobile={false} padding={padding} />
    </motion.div>
  )
}

const MobileCard = ({ card, scrollYProgress, start, entryPoint, end }) => {
  const y = useTransform(scrollYProgress, [start, entryPoint], ['100vh', '0vh'])
  const contentPosition = useTransform(
    scrollYProgress,
    [entryPoint, end],
    ['560px', Math.max(0, window.innerHeight - card.innerBlockHeight) + 'px']
  )

  return (
    <div className={`${card.color} absolute inset-0`}>
      <motion.div className="w-full h-full" style={{ y }}>
        <motion.div
          className="w-full relative"
          style={{
            height: card.innerBlockHeight,
            marginTop: contentPosition,
          }}
        >
          <div className="w-full h-full border border-white">
            <h2 className="text-4xl font-bold text-white p-4">{card.title}</h2>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const CardContent = ({ card, isMobile, padding }) => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ padding: isMobile ? 0 : padding }}
    >
      <div className="w-full h-full border border-white flex flex-col items-center justify-center">
        <div
          className={`
            border border-white
            text-white
            bg-black/20
            ${isMobile ? 'w-full h-full relative' : 'h-64 w-64 absolute top-0 right-0'}
          `}
          style={isMobile ? {} : { top: padding, right: padding }}
        >
          <h2 className="text-4xl font-bold text-white">{card.title}</h2>
        </div>
      </div>
    </motion.div>
  )
}

const Cards = ({ cards }) => {
  const containerRef = React.useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const metrics = React.useMemo(() => {
    let sections = []
    let totalHeight = 0

    if (isMobile) {
      // Calculate the travel distance for each card's content
      const cardMetrics = cards.map((card) => {
        const startPos = 560
        const endPos = Math.max(0, window.innerHeight - card.innerBlockHeight)
        const travelDistance = startPos - endPos
        return {
          card,
          travelDistance,
          scrollHeight: window.innerHeight + travelDistance,
        }
      })

      // For first card, reduce initial scroll space
      cardMetrics[0].scrollHeight = cardMetrics[0].travelDistance

      // Calculate total scroll height
      totalHeight = cardMetrics.reduce((sum, m) => sum + m.scrollHeight, 0)

      // Calculate scroll positions
      let accumulatedHeight = 0
      cardMetrics.forEach((metric, index) => {
        const sectionStart = accumulatedHeight / totalHeight
        const entryPoint =
          index === 0
            ? sectionStart
            : (accumulatedHeight + window.innerHeight) / totalHeight
        accumulatedHeight += metric.scrollHeight
        const sectionEnd = accumulatedHeight / totalHeight

        sections.push({
          start: sectionStart,
          entryPoint: entryPoint,
          end: sectionEnd,
        })
      })
    } else {
      totalHeight = window.innerHeight * (0.1 + (cards.length - 1))
    }

    return { sections, totalHeight }
  }, [cards, isMobile])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${(metrics.totalHeight / window.innerHeight) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {cards.map((card, i) => {
          if (isMobile) {
            return (
              <MobileCard
                key={card.id}
                card={card}
                scrollYProgress={scrollYProgress}
                start={metrics.sections[i].start}
                entryPoint={metrics.sections[i].entryPoint}
                end={metrics.sections[i].end}
              />
            )
          }

          return i === 0 ? (
            <FirstDesktopCard
              key={card.id}
              card={card}
              scrollYProgress={scrollYProgress}
            />
          ) : (
            <SubsequentDesktopCard
              key={card.id}
              card={card}
              index={i}
              totalCards={cards.length}
              scrollYProgress={scrollYProgress}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Page
