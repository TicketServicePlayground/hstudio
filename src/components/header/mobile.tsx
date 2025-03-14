'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Tabs from '@/components/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { gsap } from 'gsap'

const MobileNav = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('global.nav')
  const t1 = useTranslations('global')

  const handleLocaleChange = (newLocale: typeof locale) => {
    router.push(`/${newLocale}${pathname.substring(3)}`, { scroll: false })
  }

  // === "Hide on scroll" для нижнего блока (контакт + бургер) ===
  const [lastScrollY, setLastScrollY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Пытаемся получить кастомный скролл-контейнер
    const scrollContainer = document.getElementById('scroll-container') || window
    const handleScroll = () => {
      // Если найден кастомный контейнер, берем его scrollTop, иначе window.scrollY
      const currentScrollY =
        scrollContainer === window
          ? window.scrollY
          : (scrollContainer as HTMLElement).scrollTop

      if (currentScrollY > lastScrollY) {
        if (direction !== 'down') {
          setDirection('down')
          gsap.to(bottomRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.4,
            ease: 'circ.out',
          })
        }
      } else {
        if (direction !== 'up') {
          setDirection('up')
          gsap.to(bottomRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'circ.out',
          })
        }
      }
      setLastScrollY(currentScrollY)
    }

    if (scrollContainer === window) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    } else {
      (scrollContainer as HTMLElement).addEventListener('scroll', handleScroll, { passive: true })
    }
    return () => {
      if (scrollContainer === window) {
        window.removeEventListener('scroll', handleScroll)
      } else {
        (scrollContainer as HTMLElement).removeEventListener('scroll', handleScroll)
      }
    }
  }, [lastScrollY, direction])

  // === Меню-оверлей (бургер) ===
  const [isOpen, setIsOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuItemsRefs = useRef<HTMLAnchorElement[]>([])
  menuItemsRefs.current = [] // сбрасываем на каждом рендере

  // refs для иконки бургерных линий
  const topLineRef = useRef<SVGPathElement>(null)
  const middleLineRef = useRef<SVGPathElement>(null)
  const bottomLineRef = useRef<SVGPathElement>(null)
  const burgerGroupRef = useRef<SVGGElement>(null) // для rotate

  const PATH_TOP_DEFAULT = 'M16 22L44 22'
  const PATH_TOP_OPEN = 'M19.5 19.5L40.5 40.5'
  const PATH_MIDDLE = 'M16 30L44 30'
  const PATH_BOTTOM_DEFAULT = 'M16 38L44 38'
  const PATH_BOTTOM_OPEN = 'M19.5 40.5L40.5 19.5'

  const addToMenuItemsRefs = (el: HTMLAnchorElement) => {
    if (el && !menuItemsRefs.current.includes(el)) {
      menuItemsRefs.current.push(el)
    }
  }

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true)
      setMenuVisible(true)
    } else {
      setIsOpen(false)
    }
  }

  // Анимация иконки бургера при изменении isOpen
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: 'easeInOut' } })
    if (isOpen) {
      tl.to(burgerGroupRef.current, { rotate: 90, transformOrigin: '30px 30px' }, 0)
      tl.to(topLineRef.current, { attr: { d: PATH_TOP_OPEN } }, 0)
      tl.to(middleLineRef.current, { opacity: 0, duration: 0.2 }, 0)
      tl.to(bottomLineRef.current, { attr: { d: PATH_BOTTOM_OPEN } }, 0)
    } else {
      tl.to(burgerGroupRef.current, { rotate: 0 }, 0)
      tl.to(topLineRef.current, { attr: { d: PATH_TOP_DEFAULT } }, 0)
      tl.to(middleLineRef.current, { opacity: 1, duration: 0.2 }, 0)
      tl.to(bottomLineRef.current, { attr: { d: PATH_BOTTOM_DEFAULT } }, 0)
    }
  }, [isOpen])

  // Анимация оверлея при изменении isOpen
  useEffect(() => {
    if (!menuOverlayRef.current) return

    if (isOpen) {
      const tl = gsap.timeline()
      gsap.set(menuOverlayRef.current, {
        width: 60,
        height: 60,
        bottom: 21,
        right: 22,
        opacity: 1,
        display: 'block',
      })
      gsap.set(menuItemsRefs.current, { opacity: 0, x: 20 })

      tl.to(menuOverlayRef.current, {
        width: 'calc(100vw - 24px)',
        height: 621,
        bottom: 13,
        right: 12,
        duration: 0.3,
        ease: 'power1.out',
      })
      tl.to(
        menuItemsRefs.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.1'
      )
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setMenuVisible(false)
        },
      })
      tl.to(menuItemsRefs.current, {
        opacity: 0,
        x: 20,
        duration: 0.2,
        stagger: 0.05,
      })
      tl.to(
        menuOverlayRef.current,
        {
          width: 60,
          height: 60,
          bottom: 21,
          right: 22,
          duration: 0.3,
          ease: 'power1.inOut',
        },
        '-=0.1'
      )
      tl.to(menuOverlayRef.current, { opacity: 0, duration: 0.1 })
    }
  }, [isOpen])

  return (
    <>
      {/* Верхняя надпись (логотип) */}
      <div id="global-header" className="w-full flex justify-center top-[26.4px] absolute z-50">
        <Link href="/" className="text-[20px] cursor-pointer font-climate">
          H.STUDIO
        </Link>
      </div>

      {/* Нижний блок (контакт + бургер) */}
      <div
        ref={bottomRef}
        className="fixed bottom-0 right-0 w-screen flex flex-col z-40 min-w-screen"
        style={{ transform: 'translateY(0)', opacity: 1 }}
      >
        <div className="flex items-center gap-x-[14px] absolute bottom-[21px] left-[24px] right-[22px]">
          <Link
            href="/contacts"
            className="py-[21px] flex items-center justify-center font-host text-[20px] font-medium leading-none bg-black rounded-full text-white w-full flex-1 hover:scale-[1.02] active:scale-95 transition-transform duration-300"
          >
            {t1('contactus')}
          </Link>

          <button
            onClick={toggleMenu}
            className="w-[60px] h-[60px] bg-black text-white rounded-[16px] flex items-center justify-center shrink-0 relative z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <g ref={burgerGroupRef} style={{ transformOrigin: '30px 30px' }}>
                <rect width="60" height="60" rx="16" fill="black" />
                <path ref={topLineRef} d="M16 22L44 22" stroke="white" strokeWidth="4" />
                <path ref={middleLineRef} d="M16 30L44 30" stroke="white" strokeWidth="4" />
                <path ref={bottomLineRef} d="M16 38L44 38" stroke="white" strokeWidth="4" />
              </g>
            </svg>
          </button>
        </div>

        {/* Menu Overlay */}
        {menuVisible && (
          <div
            ref={menuOverlayRef}
            className="mobile-menu-container absolute bg-[#FFFFFF40] backdrop-blur-[40px] border border-[#FFFFFF60] text-black rounded-[20px] z-40"
            style={{ display: 'none' }} // GSAP выставит display при анимации
          >
            <div className="h-full w-full flex flex-col pt-[31px] pl-[27px] gap-y-[40px]">
              {[
                { title: t('clients'), href: '/clients' },
                { title: t('about'), href: '/about' },
                { title: t('contacts'), href: '/contacts' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={addToMenuItemsRefs}
                  className="text-[58px] leading-none font-medium font-host transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="absolute bottom-6 left-6">
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
                onReady={null}
                selectedBgColor="[#E4E9EF]"
                selectedTextColor="[#000000]"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MobileNav
