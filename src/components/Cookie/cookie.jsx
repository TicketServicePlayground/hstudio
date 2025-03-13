import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CookieModal from '@/components/Cookie/cookie-modal'
import { clearCookies } from '@/utils/clearCookie'
import Cookies from 'js-cookie'

export default function Cookie() {
  const [isVisible, setIsVisible] = useState(false)
  const [modal, setModal] = useState(false)
  const t = useTranslations('cookie')

  useEffect(() => {
    const cookiesAccepted = Cookies.get('cookiesAccepted')
    if (cookiesAccepted === 'Rejected' || !cookiesAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptAllCookies = () => {
    Cookies.set('cookiesAccepted', 'All', { expires: 365 })
    Cookies.remove('customCookies')
    setIsVisible(false)
  }

  const rejectAllCookies = () => {
    clearCookies()
    Cookies.set('cookiesAccepted', 'Rejected', { expires: 365 })
    Cookies.remove('customCookies')
    setIsVisible(false)
  }

  const openSettings = () => {
    setModal(true)
  }

  if (!isVisible) return null

  return (
    <>
      <div
        className={`
              fixed bg-white cookies-container
              flex flex-col gap-4
              
              p-[20px]

              bottom-[100px] w-[calc(100vw-46px)] left-[23px] right-[23px]
              md:bottom-[50px] md:w-[400px] md:right-auto
            `}
      >
        <p className="font-host text-[14px] font-medium leading-none w-[90%]">
          {t('title1')}
          {` `}
          <Link
            href="/privacy"
            target="_blank"
            className="text-orange hover:opacity-70"
          >
            cookies
          </Link>
          {t('title2')}
        </p>
        <div className="flex flex-wrap gap-y-2 gap-x-2 font-host text-sm font-semibold md:gap-x-6">
          <button
            onClick={acceptAllCookies}
            className={
              'bg-white rounded-[33px] py-[10px] px-[14px] leading-none hover:bg-black hover:text-white active:bg-black/80 active:text-white transition-colors duration-200 ease-in-out'
            }
          >
            {t('all')}
          </button>
          <button
            onClick={rejectAllCookies}
            className={
              'bg-white rounded-[33px] py-[10px] px-[14px] leading-none hover:bg-black hover:text-white active:bg-black/80 active:text-white transition-colors duration-200 ease-in-out'
            }
          >
            {t('reject')}
          </button>
          <button
            onClick={openSettings}
            className={
              'bg-white rounded-[33px] py-[10px] px-[14px] leading-none hover:bg-black hover:text-white active:bg-black/80 active:text-white transition-colors duration-200 ease-in-out'
            }
          >
            {t('customize')}
          </button>
        </div>
        <p className="font-host text-[14px] font-medium leading-none w-[90%]">
          {t('more')}
          {` `}
          <Link
            href="/privacy"
            target="_blank"
            className="text-orange hover:opacity-70"
          >
            {t('policy')}
          </Link>
        </p>
      </div>
      <CookieModal
        isOpen={modal}
        onClose={() => {
          setModal(false)
          setIsVisible(false)
        }}
      />
    </>
  )
}
