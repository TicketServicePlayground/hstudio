'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ImageCarousel from '@/components/image-carousel'
import Footer from '@/components/footer'
import { useTranslations } from 'next-intl'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
  const lyrics = ['l1', 'l2', 'l3', 'l4']
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scroller, setScroller] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setScroller(containerRef.current)
      ScrollTrigger.defaults({
        scroller: containerRef.current,
      })
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <main>
      <div
        ref={containerRef}
        className={
          'snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth'
        }
        style={{
          scrollSnapStop: 'always',
          willChange: 'scroll-position',
        }}
      >
        <section
          className={
            'h-screen w-full flex items-center justify-center snap-start'
          }
        >
          <AnimatedText text={lyrics[0]} scroller={scroller} />
        </section>

        {lyrics.slice(1).map((text, index) => (
          <section
            key={index + 1}
            className={
              'h-screen w-full flex items-center justify-center snap-start'
            }
          >
            <AnimatedText text={text} scroller={scroller} />
          </section>
        ))}

        <section
          className={
            'h-max w-full snap-start pb-20 pt-28 lg:pt-22 md:pt-24 2xl:pt-20'
          }
        >
          <ImageCarousel />
        </section>

        <section className={'snap-start'}>
          <Footer />
        </section>
      </div>
    </main>
  )
}

interface AnimatedTextProps {
  text: string
  scroller: HTMLElement | null
}

const AnimatedText = ({ text, scroller }: AnimatedTextProps) => {
  const elRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!elRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elRef.current,
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elRef.current,
            scroller: scroller,
            start: 'top center',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, elRef)

    return () => {
      ctx.revert()
    }
  }, [scroller])

  const t = useTranslations('about.lyrics')

  return (
    <div
      ref={elRef}
      className={
        'w-full max-w-[300px] md:max-w-[90vw] text-center gradient-text text-[58px] md:text-[96px] leading-[44.14px] md:leading-[79.68px] font-medium font-host'
      }
    >
      {t(text)}
    </div>
  )
}

export default AboutPage
