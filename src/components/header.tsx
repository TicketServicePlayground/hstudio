'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Tabs from '@/components/tabs'
import Logo from '@/components/logo'

// DesktopNav.jsx
const DesktopNav = ({ showHeader, onLeftTabsReady, onRightTabsReady }) => {
  return (
    <motion.div
      className="absolute w-full top-[30px] px-[30px] flex justify-between items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: showHeader ? 1 : 0,
        y: showHeader ? 0 : 10,
      }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Tabs
        items={[
          { text: 'home', type: 'link', href: '/' },
          { text: 'clients', type: 'link', href: '/clients' },
          { text: 'about us', type: 'link', href: '/about', active: true },
          { text: 'contacts', type: 'link', href: '/contacts' },
        ]}
        onReady={onLeftTabsReady}
      />
      <div className="flex flex-row-reverse">
        <Tabs
          items={[
            { text: 'eng', type: 'btn', onClick: () => {} },
            { text: 'deu', type: 'btn', onClick: () => {} },
          ]}
          onReady={onRightTabsReady}
        />
        <div className="mr-[225.28px]">
          <Logo />
        </div>
      </div>
    </motion.div>
  )
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    closed: {
      width: 48,
      height: 48,
      transition: {
        duration: 0.4,
        when: 'afterChildren',
      },
    },
    open: {
      width: 'calc(100vw - 64px)',
      height: '480px',
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
    <div className="fixed bottom-8 inset-x-8 z-40">
      {/* Bottom Fixed Buttons */}
      <div className="flex items-center gap-4">
        <motion.a
          href="/contact"
          className="flex-1 py-3 bg-black text-white rounded-full text-sm text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          contact us
        </motion.a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center shrink-0 relative z-50"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu container */}
            <motion.div
              className="absolute bottom-0 right-0 bg-black/80 backdrop-blur-md text-white rounded-2xl overflow-hidden z-40"
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
                <div className="h-full w-full flex flex-col justify-center px-8 gap-6">
                  {[
                    { title: 'clients', href: '/clients' },
                    { title: 'about us', href: '/about' },
                    { title: 'blog', href: '/blog' },
                  ].map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      custom={i}
                      variants={menuItemVariants}
                      className="text-4xl font-light hover:text-yellow-300 transition-colors"
                    >
                      {item.title}
                    </motion.a>
                  ))}
                </div>

                {/* Language Toggle */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/10 rounded-full p-1 flex gap-1"
                  variants={menuItemVariants}
                  custom={3}
                >
                  <button className="flex-1 py-1 text-sm rounded-full bg-white text-black">
                    eng
                  </button>
                  <button className="flex-1 py-1 text-sm rounded-full hover:bg-white/5">
                    deu
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Header.jsx
const Header = () => {
  const [isLeftTabsReady, setIsLeftTabsReady] = useState(false)
  const [isRightTabsReady, setIsRightTabsReady] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isLeftTabsReady && isRightTabsReady) {
      setShowHeader(true)
    }
  }, [isLeftTabsReady, isRightTabsReady])

  if (isMobile) {
    return <MobileNav />
  }

  return (
    <div className="z-[1]">
      <DesktopNav
        showHeader={showHeader}
        onLeftTabsReady={() => setIsLeftTabsReady(true)}
        onRightTabsReady={() => setIsRightTabsReady(true)}
      />
    </div>
  )
}

export default Header
