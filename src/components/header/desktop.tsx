'use client'
import { useRef, useEffect, useState } from 'react'
import Tabs from '@/components/tabs'
import Logo from '@/components/logo'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import { gsap } from 'gsap'

interface DesktopNavProps {
  showHeader: boolean
  onLeftTabsReady?: () => void
  onRightTabsReady?: () => void
}

const DesktopNav = ({ showHeader, onLeftTabsReady, onRightTabsReady }: DesktopNavProps) => {
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()

  const t = useTranslations('global.nav')

  // Реф для всей шапки, которую будем прятать/показывать при скролле
  const headerRef = useRef<HTMLDivElement>(null)

  const handleLocaleChange = (newLocale: typeof locale) => {
    router.push(`/${newLocale}${pathname.substring(3)}`, { scroll: false })
  }

  // Scroll hide
  const [lastScrollY, setLastScrollY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // Скролл вниз
        if (direction !== 'down') {
          setDirection('down')
          gsap.to(headerRef.current, {
            y: -120,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      } else {
        // Скролл вверх
        if (direction !== 'up') {
          setDirection('up')
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, direction])

  // Анимация появления при маунте (showHeader)
  useEffect(() => {
    if (headerRef.current) {
      // Если хотим плавное появление именно при рендере / при переключении showHeader
      if (showHeader) {
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      } else {
        gsap.to(headerRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }
  }, [showHeader])

  return (
    <div
      className="z-[10] absolute w-full top-[30px] px-[30px] flex justify-between items-center"
      ref={headerRef}
      style={{ opacity: 0, transform: 'translateY(10px)' }}
    >
      <Tabs
        items={[
          {
            text: t('clients'),
            type: 'link',
            href: `/${locale}/clients`,
            active: pathname === `/${locale}/clients`,
          },
          {
            text: t('about'),
            type: 'link',
            href: `/${locale}/about`,
            active: pathname === `/${locale}/about`,
          },
          {
            text: t('contacts'),
            type: 'link',
            href: `/${locale}/contacts`,
            active: pathname === `/${locale}/contacts`,
          },
        ]}
        onReady={onLeftTabsReady}
      />

      <div className="flex flex-row-reverse">
        <Tabs
          items={[
            {
              text: 'eng',
              type: 'btn',
              onClick: () => handleLocaleChange('en'),
              active: locale === 'en',
            },
            {
              text: 'deu',
              type: 'btn',
              onClick: () => handleLocaleChange('de'),
              active: locale === 'de',
            },
          ]}
          onReady={onRightTabsReady}
          selectedBgColor="[#E4E9EF]"
          selectedTextColor="[#000000]"
        />

        {/* Логотип */}
        <div className="absolute right-[calc(36.33vw-141.24px)]">
          <Logo className="leading-[48px]" />
        </div>
      </div>
    </div>
  )
}

export default DesktopNav
