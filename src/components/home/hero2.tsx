'use client'
import React, { useState, useEffect } from 'react'
import LogoMarquee from '@/components/logo-marquee'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative h-auto min-h-[900px] lg:min-h-[971px] overflow-hidden">
      <Circle mousePosition={mousePosition} />

      <HeroHeading>
        We build scalable
        <br />
        backend systems
      </HeroHeading>

      <div
        className={`
          absolute
          flex flex-col items-start
          gap-y-[26px]

          top-[405px] right-[22px]
          lg:top-[550px] lg:right-[92px]
      `}
      >
        <HeroText>
          designed to handle millions of messages per second, while ensuring
          seamless real-time data processing for high-demand industries
        </HeroText>
        <div className="hidden lg:block">
          <HeroCTA>contact us</HeroCTA>
        </div>
      </div>

      <div>
        <HeroTag
          mousePosition={mousePosition}
          index={0}
          className={`
            bg-orange
            rounded-tl-[0px] lg:rounded-tr-[0px]

            lg:top-[159.54px]
            top-[331px]

            lg:left-[410.31px]
            left-[265px]
          `}
          parallaxIntensity={0.05}
        >
          Apps
        </HeroTag>
        <HeroTag
          mousePosition={mousePosition}
          index={1}
          className={`
            bg-liliac
            rounded-tl-[0px]

            top-[499px]
            lg:top-[207px]

            left-[25px]
            lg:left-[unset]

            right-[unset]
            lg:right-[22.8vw]
            _lg:right-[328.38px]
            2xl:right-[28vw]
          `}
          parallaxIntensity={0.03}
        >
          Frontend
        </HeroTag>
        <HeroTag
          mousePosition={mousePosition}
          index={2}
          className={`
            bg-blue
            rounded-tl-[0px]

            top-[538px]
            lg:top-[293px]

            right-[unset]
            _lg:right-[209.38px]
            lg:right-[14.54vw]
            2xl:right-[20vw]

            left-[79px]
            lg:left-[unset]
          `}
          parallaxIntensity={0.04}
        >
          Backend
        </HeroTag>
        <HeroTag
          mousePosition={mousePosition}
          index={3}
          className={`
            bg-lime
            rounded-tr-[0px]

            top-[84px]
            lg:top-[514px]

            left-[58px]
            lg:left-[580px]
          `}
          parallaxIntensity={0.02}
        >
          Design
        </HeroTag>
      </div>

      <LogoMarquee />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(0px, -10px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
      `}</style>
    </div>
  )
}

const HeroTag = ({
  children,
  className,
  mousePosition,
  parallaxIntensity = 0.03,
  index = 0,
}) => {
  // Mouse movement calculations
  const x = -mousePosition.x * 0.1
  const y = -mousePosition.y * 0.1

  // Calculate different animation delays based on index
  const animationDelay = `${index * 0.6}s`

  return (
    <div
      className={`
        absolute
        py-[9.9px]
        pt-[9.91px]
        px-[14.86px]
        rounded-[11.1px]
        text-[14.858px]

        lg:py-[17.539px]
        lg:pt-[17.539px]
        lg:px-[26.309px]
        lg:rounded-[19.732px]
        lg:text-[26.309px]

        font-space
        font-medium
        leading-none
        
        w-max
        hover:scale-105

        ${className}
      `}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
        willChange: 'transform',
        animation: 'float 3s ease-in-out infinite',
        animationDelay,
      }}
    >
      {children}
    </div>
  )
}

const Circle = ({ mousePosition }) => {
  // Increase the movement multiplier for more noticeable effect
  const x = -mousePosition.x * 0.15
  const y = -mousePosition.y * 0.15

  return (
    <div
      className={`
        absolute z-0
        left-[67px] top-[52px]
        lg:left-[188px] lg:-top-[64px]

        lg:w-[unset] lg:h-[unset]
        lg:right-[30vw] lg:top-[-7.9vh]
        w-[625px] h-[625px]
      `}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
        willChange: 'transform',
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 820 820"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="410"
          cy="410"
          r="408"
          fill="none"
          stroke="#FFF"
          strokeWidth="5"
        />
      </svg>
    </div>
  )
}

// Other components remain unchanged
const HeroText = ({ children }) => (
  <p className="max-w-[166px] lg:max-w-[432px] font-host font-medium text-[16px] lg:text-[20px] leading-none">
    {children}
  </p>
)

const HeroCTA = ({ children }) => (
  <button
    type="submit"
    className="py-[21px] px-[92px] font-host text-[20px] font-medium leading-none bg-black rounded-full text-white w-full lg:w-max"
  >
    {children}
  </button>
)

const HeroHeading = ({ children }) => (
  <h1
    className={`
    absolute

    left-[25px] top-[154px]
    lg:left-[50px] lg:top-[272px]

    text-[58px]
    lg:text-[96px]

    font-medium leading-[83%] font-host
    `}
  >
    {children}
  </h1>
)

const LogoMarquee = () => {
  // LogoMarquee implementation remains unchanged
  return null
}

export default Hero
