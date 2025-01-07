'use client'
import React from 'react'
import { motion, useInView } from 'motion/react'
import ImageCarousel from '@/components/image-carousel'

import Footer from '@/components/footer'

const AboutPage = () => {
  const lyrics = [
    'We focus on delivering',
    'scalable, secure, and',
    'innovative solutions',
  ]

  // return (
  //   <div className="pt-12">
  //     <ImageCarousel />
  //   </div>
  // )

  return (
    <main>
      {/* Container for all sections including animations and content */}
      <div className="snap-y snap-mandatory overflow-y-auto h-screen">
        {/* Animated text sections */}
        {lyrics.map((text, index) => (
          <section
            key={index}
            className="h-screen w-full flex items-center justify-center snap-start"
          >
            <AnimatedText text={text} />
          </section>
        ))}

        {/* Regular content sections */}
        <section className="h-screen w-full snap-start pt-28 md:pt-12">
          <ImageCarousel />
        </section>

        <section className="snap-start">
          <Footer />
        </section>
      </div>
    </main>
  )
}

const AnimatedText = ({ text }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, {
    once: false,
    amount: 0.8,
  })

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
      <div
        className="gradient-text text-[56px] leading-[79.68px] md:text-[96px] font-medium font-host font-extrabold"
        style={
          {
            // fontSize: 'clamp(2rem, 8vw, 8rem)',
            // lineHeight: '1.1',
            // whiteSpace: 'nowrap',
          }
        }
      >
        {text}
      </div>
    </motion.div>
  )
}

export default AboutPage
