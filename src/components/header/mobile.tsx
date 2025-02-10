'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Tabs from '@/components/tabs'

const MotionLink = motion(Link)

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const menuVariants = {
    closed: {
      width: 60,
      height: 60,
      bottom: 21,
      right: 22,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
      },
    },
    open: {
      width: 'calc(100vw - 24px)',
      height: '621px',
      bottom: 13,
      right: 12,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
  }

  const menuItemsContainerVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <>
      {/* Logo with animation */}
      <motion.div
        className="w-full flex justify-center top-[26.4px] absolute"
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'circOut',
        }}
      >
        <Link href="/" className="text-[20px] cursor-pointer font-climate">
          H.STUDIO
        </Link>
      </motion.div>

      <motion.div
        className="fixed bottom-[0px] right-[0px] w-screen flex flex-col z-40 min-w-screen"
        animate={{
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'circOut',
        }}
      >
        {/* Rest of the code remains the same */}
        {/* Bottom Fixed Buttons */}
        <div className="flex items-center gap-x-[14px] absolute bottom-[21px] left-[24px] right-[22px]">
          <MotionLink
            href="/contact"
            className="py-[21px] flex items-center justify-center font-host text-[20px] font-medium leading-none bg-black rounded-full text-white w-full flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            contact us
          </MotionLink>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[60px] h-[60px] bg-black text-white rounded-[16px] flex items-center justify-center shrink-0 relative z-50"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <motion.g style={{ transformOrigin: '30px 30px' }}>
                <rect width="60" height="60" rx="16" fill="black" />

                <motion.path
                  d="M16 22L44 22"
                  stroke="white"
                  strokeWidth="4"
                  animate={{
                    d: isOpen ? 'M19.5 19.5L40.5 40.5' : 'M16 22L44 22',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M16 30L44 30"
                  stroke="white"
                  strokeWidth="4"
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    pathLength: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M16 38L44 38"
                  stroke="white"
                  strokeWidth="4"
                  animate={{
                    d: isOpen ? 'M19.5 40.5L40.5 19.5' : 'M16 38L44 38',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.g>
            </svg>
          </motion.button>
        </div>

        {/* Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="mobile-menu-container absolute bg-[#FFFFFF40] backdrop-blur-[40px] border border-[#FFFFFF60] text-black rounded-[20px] z-40"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <motion.div
                  className="h-full w-full"
                  variants={menuItemsContainerVariants}
                >
                  <div className="h-full w-full flex flex-col pt-[31px] pl-[27px] gap-y-[40px]">
                    {[
                      { title: 'home', type: 'link', href: '/' },
                      { title: 'clients', type: 'link', href: '/clients' },
                      { title: 'about us', type: 'link', href: '/about' },
                      { title: 'contacts', type: 'link', href: '/contacts' },
                    ].map((item, i) => (
                      <MotionLink
                        key={item.href}
                        href={item.href}
                        custom={i}
                        variants={menuItemVariants}
                        className="text-[58px] leading-none font-medium font-host transition-colors"
                        onClick={() => {
                          setIsOpen(false)
                        }}
                      >
                        {item.title}
                      </MotionLink>
                    ))}
                  </div>

                  <motion.div
                    className="absolute bottom-6 left-6"
                    variants={menuItemVariants}
                    custom={3}
                  >
                    <Tabs
                      items={[
                        {
                          text: 'eng',
                          type: 'btn',
                          onClick: () => {},
                          active: true,
                        },
                        { text: 'deu', type: 'btn', onClick: () => {} },
                      ]}
                      selectedBgColor="[#E4E9EF]"
                      selectedTextColor="[#000000]"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default MobileNav
