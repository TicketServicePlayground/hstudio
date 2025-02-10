'use client'
import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'motion/react'
import Image from 'next/image'

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    setIsMounted(true)

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDragStart = (event, info) => {
    setIsDragging(true)
    setDragStartX(info.point.x)
  }

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    const dragEndX = info.point.x
    const diff = dragStartX - dragEndX

    // Reduced threshold for more responsive swipes
    if (Math.abs(diff) > 20) {
      if (diff > 0 && currentIndex < teamMembers.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }

    // Snap back to position
    controls.start({
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    })
  }

  const teamMembers = [
    {
      name: 'Alex',
      experience:
        'A web and UI/UX design expert, bringing bold and engaging digital experiences to life for clients through creative and impactful solutions.',
      image: '/img/team/photo-5.png',
    },
    {
      name: 'Artem',
      experience:
        'Kotlin Backend Developer with a strong background in blockchain and Web3 technologies, focusing on scalable solutions for the gaming industry.',
      image: '/img/team/photo-4.png',
    },
    {
      name: 'Albert',
      experience:
        'Full-Stack Developer with 6 years of experience in web applications. Skilled in Python, Flask, .NET, CargoWise, AWS, and specializing in e-commerce, blockchain, and secure, user-friendly solutions.',
      image: '/img/team/photo-3.png',
    },
    {
      name: 'Alexander',
      experience:
        'Over 7 years of experience in fintech, specializing in high-load system development.',
      image: '/img/team/photo-0.png',
    },
    {
      name: 'George',
      experience:
        'Programming since 1988, expert in DevOps since its emergence in 2009.',
      image: '/img/team/photo-1.png',
    },
    {
      name: 'Ian',
      experience:
        '6 years of experience in frontend development with a focus on progressive web applications (PWA).',
      image: '/img/team/photo-2.png',
    },
  ]

  const activeMember = teamMembers[currentIndex]

  if (!isMounted) {
    return <div className="w-full px-4 min-h-[800px]" />
  }

  const getImageDimensions = (isActive) => {
    return isMobile
      ? isActive
        ? { width: 240, height: 340 }
        : { width: 200, height: 280 }
      : isActive
        ? { width: 380, height: 540 }
        : { width: 310, height: 440 }
  }

  const getSpacing = () => {
    return isMobile ? 220 : 350 // Restored original spacing
  }

  return (
    <div className="w-full px-4 overflow-hidden">
      <h1 className="text-center text-[24px] md:text-[28px] md:mb-[40px] lg:text-[48px] font-medium leading-[83%] font-host mb-[60px] lg:mb-[40px]">
        Meet the team
      </h1>

      <motion.div
        className={`relative ${isMobile ? 'h-[340px]' : 'h-[540px]'} flex justify-center items-center mb-[28px] lg:mb-[42px]`}
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
        animate={controls}
      >
        <div
          className={`relative ${isMobile ? 'w-[240px]' : 'w-[380px]'} h-full`}
        >
          {teamMembers.map((member, index) => {
            const position = index - currentIndex
            const isActive = index === currentIndex
            const dimensions = getImageDimensions(isActive)

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 cursor-pointer origin-center"
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                }}
                initial={{
                  x: `calc(${position * getSpacing()}px - 50%)`,
                  y: '-50%',
                  scale: isActive ? 1 : 0.815,
                  opacity: isActive ? 1 : 0.6,
                  zIndex: isActive ? 2 : 1,
                }}
                animate={{
                  x: `calc(${position * getSpacing()}px - 50%)`,
                  y: '-50%',
                  scale: isActive ? 1 : 0.815,
                  opacity: isActive ? 1 : 0.6,
                  zIndex: isActive ? 2 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => !isMobile && setCurrentIndex(index)}
              >
                <div
                  className={`relative w-full h-full rounded-3xl overflow-hidden ${
                    !isActive ? 'blur-sm' : ''
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    className={`object-cover grayscale ${isDragging ? 'pointer-events-none' : ''}`}
                    fill
                    sizes={`(max-width: 768px) ${dimensions.width}px, ${dimensions.width}px`}
                    priority={isActive}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="text-center"
      >
        <h2 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium font-host leading-none mb-[16px] lg:mb-[24px]">
          {activeMember.name}
        </h2>
        <p className="text-[14px] md:text-[20px] lg:text-[24px] font-medium font-host leading-none pb-2 max-w-[240px] md:max-w-[300px] lg:max-w-[580px] mx-auto">
          {activeMember.experience}
        </p>
      </motion.div>
    </div>
  )
}

export default ImageCarousel
