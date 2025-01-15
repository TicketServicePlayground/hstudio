'use client'
import Tabs from '@/components/tabs'
import Logo from '@/components/logo'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const DesktopNav = ({ showHeader, onLeftTabsReady, onRightTabsReady }) => {
  const pathname = usePathname()

  return (
    <div className="z-[10]">
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
            // { text: 'home', type: 'link', href: '/', active: pathname === '/' },
            {
              text: 'clients',
              type: 'link',
              href: '/clients',
              active: pathname === '/clients',
            },
            {
              text: 'about us',
              type: 'link',
              href: '/about',
              active: pathname === '/about',
            },
            {
              text: 'contacts',
              type: 'link',
              href: '/contacts',
              active: pathname === '/contacts',
            },
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
          <div className="absolute right-[calc(36.33vw-141.24px)]">
            <Logo className="leading-[48px]" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DesktopNav
