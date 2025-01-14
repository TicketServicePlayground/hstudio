'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Tabs from '@/components/tabs'

const MotionLink = motion(Link)

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    closed: {
      width: 60,
      height: 60,
      transition: {
        duration: 0.4,
        when: 'afterChildren',
      },
    },
    open: {
      width: 'calc(100vw - 24px)',
      height: '621px',
      transition: {
        duration: 0.4,
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
      <div className="w-full flex justify-center top-[26.4px] absolute">
        <Link href="/" className="text-[20px] cursor-pointer font-climate">
          H.STUDIO
        </Link>
      </div>
      <div className="fixed bottom-[13px] right-[12px] w-[calc(100vw-24px)]  z-40">
        {/* Bottom Fixed Buttons */}
        <div className="flex items-center gap-4">
          <MotionLink
            href="/contact"
            className="py-[21px] flex items-center justify-center font-host text-[20px] font-medium leading-none bg-black rounded-full text-white w-full flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            contact us
          </MotionLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[60px] h-[60px] bg-black text-white rounded-lg flex items-center justify-center shrink-0 relative z-50"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>

        {/* Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Menu container */}
              <motion.div
                className="absolute bottom-0 right-0 bg-[#FFFFFF40] backdrop-blur-[40px] border border-[#FFFFFF60] text-black rounded-[20px] overflow-hidden z-40"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                {/* Menu content */}
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
                        { text: 'eng', type: 'btn', onClick: () => {} },
                        { text: 'deu', type: 'btn', onClick: () => {} },
                      ]}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default MobileNav
