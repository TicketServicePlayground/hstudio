'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cards } from '@/data'
import { useIsMobile } from '@/hooks'
import { CTA, Title, Card, CardNumber } from '@/components/home/solution-card'

export default function Home() {
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  })

  return (
    <div className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {cards.map((cardData, index) => {
          // Calculate ranges for sliding in
          const slideRange = [index * 0.33, index * 0.33 + 0.33]

          // Transform for sliding
          const y = useTransform(scrollYProgress, slideRange, ['100vh', '0vh'])

          return (
            <motion.div
              key={`${index}.${cardData.bg}`}
              style={{
                y: isMobile ? 0 : y,
              }}
              className={`
                absolute 
                inset-0
                w-full 
                md:w-[calc(100%-60px)]
                m-[0px]
                md:m-[30px]
                rounded-[20px]
                md:rounded-[32px]
                h-full
                min-h-[700px] 
                bg-${cardData.bg}
                flex 
                flex-col
                md:block
                ${index === 0 ? 'mt-[0px]' : 'mt-[-60px]'}
                md:mt-[unset]
              `}
            >
              <motion.img
                src={`/img/${isMobile ? 'mobile' : 'desktop'}-covers/${cardData.pic}`}
                className={isMobile ? 'absolute top-0 w-full' : ''}
                alt={cardData.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <CardNumber number={index + 1} />
              <Title
                isDark={cardData.bg === 'cardDark'}
                mobileTitleOffset={cardData.mobileTitleOffset}
              >
                {cardData.title}
              </Title>
              <div className="absolute bottom-[27px] right-[27px] hidden md:block">
                <CTA />
              </div>
              <Card card={cardData.card} isDark={cardData.bg === 'cardDark'} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
