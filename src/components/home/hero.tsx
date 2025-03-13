'use client'
import React, { useState, useEffect } from 'react'
import LogoMarquee from '@/components/logo-marquee'
import { useIsMobile } from '@/hooks'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const t = useTranslations('home')
  const t1 = useTranslations('global')

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const x = (e.clientX / window.innerWidth) * 100
  //     const y = (e.clientY / window.innerHeight) * 100
  //     setMousePosition({ x, y })
  //   }

  //   window.addEventListener('mousemove', handleMouseMove)
  //   return () => window.removeEventListener('mousemove', handleMouseMove)
  // }, [])

  useEffect(() => {
    //@ts-ignore
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative h-auto min-h-[900px] lg:min-h-[971px] overflow-hidden">
      <Circle mousePosition={mousePosition} />

      <HeroHeading>
        {t('title1')}
        <br />
        {t('title2')}
        <br/>
        {t('title3')}
      </HeroHeading>

      <div
        className={`
          absolute
          flex flex-col items-start
          gap-y-[26px]

          top-[405px] right-[22px]
          lg:top-[unset] lg:bottom-[calc(40px+148px)] lg:right-[calc(36.33vw-432px)]
      `}
      >
        <HeroText>
          {t('heroText')}
        </HeroText>
        <div className="hidden lg:block">
          <HeroCTA>{t1('contactus')}</HeroCTA>
        </div>
      </div>

      <div>
        <HeroTag
          mousePosition={mousePosition}
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
          className={`
            bg-liliac
            !rounded-tl-[0px]

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
          className={`
            bg-blue
            !rounded-tl-[0px]

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
          className={`
            bg-lime
            !rounded-tr-[0px]

            top-[84px]
            _lg:top-[514px]
            lg:top-[604px]

            left-[58px]
            lg:left-[580px]
          `}
          parallaxIntensity={0.02}
        >
          Design
        </HeroTag>
      </div>

      <LogoMarquee />
    </div>
  )
}

//@ts-ignore
const HeroTag = ({ children, className, mousePosition, parallaxIntensity = 0.03, index = 0 }) => {
  // Reduced multiplier for more subtle movement
  const x = ((mousePosition.x - window.innerWidth / 2) / window.innerWidth) * 30 // reduced from 100
  const y =
    ((mousePosition.y - window.innerHeight / 2) / window.innerHeight) * 30 // reduced from 100

  return (
    <div
      style={{
        transform: `translate3d(${x * -0.12}px, ${y * -0.12}px, 0)`, // reduced from -0.5
      }}
    >
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
          transform: `translate3d(${x * -parallaxIntensity}px, ${y * -parallaxIntensity}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
          willChange: 'transform',
          animation: `float ${3 + parallaxIntensity * 10}s ease-in-out infinite`,
          animationDelay: `${parallaxIntensity * 5}s`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

//@ts-ignore
const Circle = ({ mousePosition }) => {
  // Increase the movement multiplier for more noticeable effect
  const x = -mousePosition.x * 0.03
  const y = -mousePosition.y * 0.03

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
//@ts-ignore
const HeroText = ({ children }) => (
  <p className="max-w-[166px] lg:max-w-[432px] font-host font-medium text-[16px] lg:text-[20px] leading-none">
    {children}
  </p>
)

//@ts-ignore
const HeroCTA = ({ children }) => (
  <Link
    href="/contacts"
    className="block py-[21px] px-[92px] font-host text-[20px] font-medium leading-none bg-black rounded-full text-white w-full lg:w-max"
  >
    {children}
  </Link>
)

//@ts-ignore
const HeroHeading = ({ children }) => {
  const isMobile = useIsMobile()

  return (
    <h1
      className={`
    absolute

    left-[25px] top-[154px]
    lg:left-[50px] lg:top-[unset]

    text-[58px]
    lg:text-[96px]

    font-medium leading-[83%] font-host
    `}
      style={
        !isMobile
          ? {
              // top: `calc(${(window.innerHeight - 159.36) / 2}px)`,
              top: (window.innerHeight - 159.36) / 2,
              // ...
            }
          : {}
      }
    >
      {children}
    </h1>
  )
}

// const LogoMarquee = () => {
//   // LogoMarquee implementation remains unchanged
//   return null
// }

export default Hero
