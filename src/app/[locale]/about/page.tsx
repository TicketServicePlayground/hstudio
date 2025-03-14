'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ImageCarousel from '@/components/image-carousel'
import Footer from '@/components/footer'
import { useTranslations } from 'next-intl'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
  const lyrics = ['l1', 'l2', 'l3', 'l4']
  const containerRef = useRef<HTMLDivElement | null>(null)

  // ---- Анимация шапки при скролле контейнера ----
  useEffect(() => {
    if (!containerRef.current) return
    const header = document.getElementById('global-header')
    if (!header) return

    let lastScrollY = containerRef.current.scrollTop
    let direction: 'up' | 'down' = 'up'

    const handleScroll = () => {
      const currentScrollY = containerRef.current!.scrollTop
      if (currentScrollY > lastScrollY && direction !== 'down') {
        direction = 'down'
        gsap.to(header, {
          y: -120,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else if (currentScrollY < lastScrollY && direction !== 'up') {
        direction = 'up'
        gsap.to(header, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      lastScrollY = currentScrollY
    }

    containerRef.current.addEventListener('scroll', handleScroll)
    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // ---- Перехват wheel: листаем контейнер, только когда он на экране полностью ----
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect()
      const isFullyVisible =
        rect.top >= 0 && rect.bottom <= window.innerHeight

      // Если контейнер НЕ полностью в вьюпорте,
      // то пусть скролл идёт родителю (не останавливаем событие)
      if (!isFullyVisible) {
        return
      }

      // Контейнер целиком виден – берём «управление» на себя
      const delta = e.deltaY
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight

      const canScrollDown = scrollTop + clientHeight < scrollHeight
      const canScrollUp = scrollTop > 0

      if (delta > 0) {
        // Скролл вниз
        if (!canScrollDown) {
          // Уже в самом низу => передаём событие «наружу»
          return
        } else {
          // Есть, куда листать внутри => блокируем родителя
          e.stopPropagation()
        }
      } else {
        // delta < 0 => скролл вверх
        if (!canScrollUp) {
          // Вверху контейнера => передаём скролл родителю
          return
        } else {
          // Блокируем (листая внутри)
          e.stopPropagation()
        }
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <main>
      {/* Контейнер, где хотим управлять скроллом */}
      <div
        ref={containerRef}
        id="scroll-container"
        className="
          h-screen
          snap-y
          snap-mandatory
          overflow-y-auto
          scroll-smooth
        "
        style={{
          willChange: 'scroll-position',
        }}
      >
        <section className="h-screen w-full flex items-center justify-center snap-start">
          <AnimatedText text={lyrics[0]} />
        </section>

        {lyrics.slice(1).map((text, index) => (
          <section
            key={index + 1}
            className="h-screen w-full flex items-center justify-center snap-start"
          >
            <AnimatedText text={text} />
          </section>
        ))}
      </div>

      {/* Контент ниже контейнера */}
      <section className="h-max w-full pb-20 pt-28 lg:pt-22 md:pt-24 2xl:pt-20">
        <ImageCarousel />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  )
}

// ---- Анимированный текст с переводами ----
interface AnimatedTextProps {
  text: string
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  const elRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslations('about.lyrics')

  useEffect(() => {
    if (!elRef.current) return

    const tween = gsap.fromTo(
      elRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elRef.current,
          scroller: '#scroll-container',
          start: 'top center',
          toggleActions: 'play reverse play reverse',
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text])

  return (
    <div
      ref={elRef}
      className="
        w-full max-w-[300px] md:max-w-[90vw] text-center
        gradient-text
        text-[58px] md:text-[96px]
        leading-[44.14px] md:leading-[79.68px]
        font-medium font-host
      "
    >
      {t(text)}
    </div>
  )
}

export default AboutPage