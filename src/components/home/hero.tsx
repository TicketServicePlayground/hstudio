import React, { useState, useEffect } from 'react'
// 1280-1024,
// 1024-768,

const Hero = () => (
  <div className="relative h-auto min-h-[900px] lg:min-h-[971px] overflow-hidden">
    <Circle />
    {/*
    <ParallaxCircle />
    */}

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
    {/*
     */}

    <div>
      <HeroTag
        className={`
          bg-orange
          rounded-tl-[0px] lg:rounded-tr-[0px]

          lg:top-[159.54px]
          top-[331px]

          lg:left-[410.31px]
          left-[265px]
        `}
      >
        Apps
      </HeroTag>
      <HeroTag
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
      >
        Frontend
      </HeroTag>
      <HeroTag
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
      >
        Backend
      </HeroTag>
      <HeroTag
        className={`
          bg-lime
          rounded-tr-[0px]

          top-[84px]
          lg:top-[514px]

          left-[58px]
          lg:left-[580px]
        `}
      >
        Design
      </HeroTag>
    </div>

    <LogoMarquee />
    {/*
     */}
  </div>
)

// bg-orange
// rounded-tr-[0px]

const HeroTag = ({ children, className }) => (
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

      ${className}
    `}
  >
    {children}
  </div>
)

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
  const logos = [
    { id: 3, alt: 'Societe', pic: 'societe.png' },
    { id: 4, alt: 'TON', pic: 'ton.png' },
    { id: 2, alt: 'Sber', pic: 'sber.png' },
    { id: 5, alt: 'QIWI', pic: 'qiwi.png' },
    { id: 1, alt: 'VTB', pic: 'vtb.png' },
  ]

  return (
    <div className="w-full overflow-hidden absolute top-[717px] lg:top-[841.78px]">
      <div className="relative flex items-center mx-[0px] lg:mx-[30px]">
        {/* Desktop static version */}
        <div className="hidden lg:flex w-full items-center justify-between">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center min-w-[150px]"
            >
              <img
                src={`/img/company-logos/${logo.pic}`}
                alt={logo.alt}
                className="w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile sliding version */}
        <div className="lg:hidden relative w-full overflow-hidden">
          <div className="flex gap-[50px] animate-marquee pl-[25px]">
            {/* First set of logos */}
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center min-w-[150px] shrink-0"
              >
                <img
                  src={`/img/company-logos/${logo.pic}`}
                  alt={logo.alt}
                  className="w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo) => (
              <div
                key={`${logo.id}-duplicate`}
                className="flex items-center justify-center min-w-[150px] shrink-0"
              >
                <img
                  src={`/img/company-logos/${logo.pic}`}
                  alt={logo.alt}
                  className="w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Circle = () => {
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
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 820 820"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Large ring */}
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

const ParallaxCircle = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse movement across the entire window
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position as percentage of window size
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate ring position (moving slightly opposite to mouse movement)
  const ringTransform = `translate(${-mousePosition.x / 10}px, ${-mousePosition.y / 10}px)`

  return (
    <svg viewBox="0 0 400 400" className="w-96 h-96">
      {/* Gradient definition */}
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: '#4F46E5', stopOpacity: 0.5 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: '#7C3AED', stopOpacity: 0.5 }}
          />
        </linearGradient>
      </defs>

      {/* Large ring */}
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth="2"
        className="opacity-50"
      />
    </svg>
  )

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Container for the ring */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: ringTransform,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <svg viewBox="0 0 400 400" className="w-96 h-96">
          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="ringGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: '#4F46E5', stopOpacity: 0.5 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#7C3AED', stopOpacity: 0.5 }}
              />
            </linearGradient>
          </defs>

          {/* Large ring */}
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            className="opacity-50"
          />

          {/* Smaller decorative ring */}
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="1"
            className="opacity-30"
          />
        </svg>
      </div>

      {/* Optional content container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="text-white text-4xl font-light">
          {/* Your content here */}
        </div>
      </div>
    </div>
  )
}

export default Hero
