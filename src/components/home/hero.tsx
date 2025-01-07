import React, { useState, useEffect } from 'react'
// import Header from '@/components/header'

const Hero = () => (
  <div className="relative h-auto md:min-h-[971px]">
    {/*
    <Header />
     */}

    {/*
    <ParallaxCircle />
*/}

    {/*
    <HeroHeading></HeroHeading>

    <HeroTags>
      <HeroTag></HeroTag>
    </HeroTags>

    <div>
      <HeroText></HeroText>
      <HeroCTA />
    </div>
    */}

    {/*
    <LogoMarquee />
    */}
  </div>
)

const LogoMarquee = () => {
  // Example logos - replace with actual logo URLs
  const logos = [
    { id: 1, alt: 'Company 1' },
    { id: 2, alt: 'Company 2' },
    { id: 3, alt: 'Company 3' },
    { id: 4, alt: 'Company 4' },
    { id: 5, alt: 'Company 5' },
    { id: 6, alt: 'Company 6' },
  ]

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="relative flex items-center">
        {/* First set of logos */}
        <div className="flex animate-marquee">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center mx-8 min-w-[150px]"
            >
              <img
                src={`/api/placeholder/150/60`}
                alt={logo.alt}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicated set of logos for seamless loop */}
        <div className="flex animate-marquee2 absolute left-full">
          {logos.map((logo) => (
            <div
              key={`${logo.id}-duplicate`}
              className="flex items-center justify-center mx-8 min-w-[150px]"
            >
              <img
                src={`/api/placeholder/150/60`}
                alt={logo.alt}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
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
