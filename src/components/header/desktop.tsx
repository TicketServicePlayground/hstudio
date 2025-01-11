'use client'
import Tabs from '@/components/tabs'
import Logo from '@/components/logo'
import { motion, AnimatePresence } from 'framer-motion'

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

export default DesktopNav
