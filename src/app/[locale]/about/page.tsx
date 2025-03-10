'use client'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import ImageCarousel from '@/components/image-carousel'
import Footer from '@/components/footer'
import { useTranslations } from 'next-intl'

const AboutPage = () => {
  const lyrics = ['l1', 'l2', 'l3', 'l4']

  return (
    <main>
      <div className="snap-y snap-mandatory h-screen">
        {/* Первый текстовый блок */}
        <section
          key="first-section"
          className="h-screen w-full flex items-center justify-center snap-start first-snap-section"
        >
          <AnimatedText text={lyrics[0]} />
        </section>

        {/* Остальные текстовые блоки */}
        {lyrics.slice(1).map((text, index) => (
          <section
            key={index + 1}
            className="h-screen w-full flex items-center justify-center snap-start"
          >
            <AnimatedText text={text} />
          </section>
        ))}

        {/* Карусель изображений */}
        <section className="h-max w-full snap-start pb-20 pt-28 lg:pt-22 md:pt-24 2xl:pt-20 no-snap">
          <ImageCarousel />
        </section>

        {/* Футер */}
        <section className="snap-start">
          <Footer />
        </section>
      </div>
    </main>
  )
}

const AnimatedText = ({ text }: { text: string }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, {
    once: false,
    amount: 0.8,
  })

  const t = useTranslations('about.lyrics')

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-[90vw] text-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: isInView ? 1 : 0.5,
        opacity: isInView ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 1,
      }}
    >
      <div className="gradient-text text-[56px] leading-[79.68px] md:text-[96px] font-host font-extrabold">
        {t(text)}
      </div>
    </motion.div>
  )
}

export default AboutPage