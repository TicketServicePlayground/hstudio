'use client'

import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Label, CTA, CardNumber } from '@/components/home/solution-card'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({
  smoothTouch: true,
})

function Cards({ cards = [] }) {
  const containerRef = useRef(null)
  const [heights, setHeights] = useState([])
  const cardsRef = useRef([])

  useEffect(() => {
    if (!cards.length) return

    const newHeights = cardsRef.current.map((el) => {
      if (!el) return 0
      return el.offsetHeight
    })
    setHeights(newHeights)
  }, [cards])

  useEffect(() => {
    if (!heights.length) return

    ScrollTrigger.getAll().forEach((t) => t.kill())

    const totalHeight = heights.reduce((sum, h) => sum + h, 0)

    if (containerRef.current) {
      containerRef.current.style.height = `${totalHeight}px`
    }

    let currentOffset = 0

    gsap.set(cardsRef.current, { willChange: 'transform' })

    cardsRef.current.forEach((cardEl, index) => {
      if (!cardEl) return

      const cardHeight = heights[index]

      const startValue = currentOffset - window.innerHeight
      const endValue = currentOffset + cardHeight - window.innerHeight

      const vh = window.innerHeight
      const fromY = vh + 250
      const toY = -(cardHeight - vh)

      gsap.fromTo(
        cardEl,
        { y: fromY, force3D: true },
        {
          y: toY,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${startValue}px top`,
            end: `top+=${endValue}px top`,
            scrub: true,
            toggleActions: 'restart pause resume pause',
          },
        }
      )

      currentOffset += cardHeight
    })
  }, [heights])

  return (
    <div ref={containerRef} className="relative w-full -mt-[250px]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {cards.map((card, index) => {
          const isDark = card.bg === 'cardDark'
          return (
            <div
              key={`${card.title}-${index}`}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`
                absolute left-0 right-0 top-0 rounded-[20px]
                bg-${card.bg} 
                ${isDark ? 'text-white' : 'text-black'}
              `}
              style={{
                overflow: 'hidden',
              }}
            >
              <img
                src={`/img/mobile-covers/${card.pic}`}
                alt={card.title}
                className={`absolute ${index === cards.length - 1 ? 'top-20' : 'top-0'} w-full z-10`}
              />
              <CardNumber number={index + 1} />
              <InnerCard card={card} title={card.title} isDark={isDark} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const InnerCard = ({ card, title, isDark }) => {
  const t = useTranslations('home.cards')
  const t1 = useTranslations('home')
  return (
    <div className={`relative bg-${card.card.bg} w-full h-auto pt-[500px] z-20`}>
      <div
        className={`font-medium not-italic leading-none font-host w-5/6 ${isDark ? 'text-white' : 'text-black'} text-[42px] h-auto p-[25px]`}
      >
        {t(title)}
      </div>
      <div
        className={`flex flex-col card _blur-card _backdrop-blur-[150px] rounded-[20px] w-full p-[25px] gap-y-[40px] pb-[120px] h-auto ${isDark ? 'card--dark' : ''} ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}`}
        style={{
          background: isDark
            ? 'hsla(0, 0%, 100%, .05)'
            : 'hsla(0, 0%, 100%, .2)',
        }}
      >
        <div className={'flex flex-col gap-y-[40px] relative h-auto'}>
          <span className="font-host font-[500] text-[24px] leading-none">
            {t(card.card.heading)}
          </span>
          {card.card.benefits && (
            <div className="flex flex-col gap-y-[12px]">
              <Label>{t1('benefits')}</Label>
              <div className="flex flex-col gap-y-[8px]">
                {card.card.benefits.map((benefitItem) => (
                  <span
                    className="font-host text-[14px] font-[500] leading-none"
                    key={benefitItem}
                  >
                    {t(benefitItem)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {card.card.stack && (
            <div className="flex flex-col gap-y-[16px]">
              <Label>{t1('tech')}</Label>
              <div className="flex flex-wrap gap-[4px]">
                {card.card.stack.map((stackItem) => (
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
            <CTA category={card.category} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
