import { useState, useEffect, useContext } from 'react'
import { UserAgentContext } from '@/context/UserAgentContext'

export const useIsMobile = () => {
  // Get initial state from UserAgent
  const userAgent = useContext(UserAgentContext)
  if (!userAgent) {
    throw new Error(
      'useIsMobile must be used within a UserAgentContext.Provider'
    )
  }

  const [isMobile, setIsMobile] = useState(userAgent.device.type === 'mobile')

  useEffect(() => {
    const checkMobile = () => {
      const fromViewport = window.innerWidth < 768
      // Update only if viewport detection differs from current state
      if (fromViewport !== isMobile) {
        setIsMobile(fromViewport)
      }
    }

    // Check once component mounts and window is available
    checkMobile()

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

  return isMobile
}
