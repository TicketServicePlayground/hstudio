'use client'
import { useState, useEffect } from 'react'

import MobileNav from './mobile'
import DesktopNav from './desktop'

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
