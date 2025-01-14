'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import MobileNav from './mobile'
import DesktopNav from './desktop'

const Header = () => {
  const [isLeftTabsReady, setIsLeftTabsReady] = useState(false)
  const [isRightTabsReady, setIsRightTabsReady] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

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

  if (pathname.startsWith('/animaitons') || pathname.startsWith('/2')) {
    return null
  }

  if (isMobile) {
    return <MobileNav />
  }

  return (
    <DesktopNav
      showHeader={showHeader}
      onLeftTabsReady={() => setIsLeftTabsReady(true)}
      onRightTabsReady={() => setIsRightTabsReady(true)}
    />
  )
}

export default Header
