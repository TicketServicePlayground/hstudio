'use client'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import ImageCarousel from '@/components/image-carousel'
import Footer from '@/components/footer'

const AboutPage = () => {
  const lyrics = [
    'We focus on delivering scalable, secure, and innovative solutions',
    'across web, mobile, and blockchain platforms',
    'With expertise in seamless integration, DevOps automation, and UX/UI design',
    'we transform complex challenges into efficient digital products',
  ]

  return (
    <main>
      <div className="snap-y snap-mandatory overflow-y-auto h-screen">
        {/* First section needs an id for the observer */}
        <section
          key="first-section"
          className="h-screen w-full flex items-center justify-center snap-start first-snap-section"
        >
          <AnimatedText text={lyrics[0]} />
        </section>

        {/* Rest of the sections */}
        {lyrics.slice(1).map((text, index) => (
          <section
            key={index + 1}
            className="h-screen w-full flex items-center justify-center snap-start"
          >
            <AnimatedText text={text} />
          </section>
        ))}

        <section className="h-screen w-full snap-start pt-28 lg:pt-22 md:pt-24 2xl:pt-20">
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
      <div className="gradient-text text-[56px] leading-[79.68px] md:text-[96px] font-medium font-host font-extrabold">
        {text}
      </div>
    </motion.div>
  )
}

export default AboutPage
