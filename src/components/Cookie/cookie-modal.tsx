import { FC, MouseEvent, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Switch from '@/components/ui/Switch/switch'
import { clearCookies } from '@/utils/clearCookie'
import Cookies from 'js-cookie'

interface IProps {
  isOpen: boolean
  onClose: () => void
}

const CookieModal: FC<IProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('cookie')
  const [cookie, setCookie] = useState<string | null>(null)
  const [necessary, setNecessary] = useState(false)
  const [preferences, setPreferences] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const [marketing, setMarketing] = useState(false)


  useEffect(() => {
    const storedCookie = Cookies.get('cookiesAccepted')
    const storedSetting = JSON.parse(Cookies.get('customCookies') || '{}')

    setCookie(storedCookie || null)

    if (storedCookie === 'All') {
      setNecessary(true)
      setPreferences(true)
      setStatistics(true)
      setMarketing(true)
    } else if (storedCookie === 'Custom') {
      setNecessary(storedSetting?.necessary || false)
      setPreferences(storedSetting?.preferences || false)
      setStatistics(storedSetting?.statistics || false)
      setMarketing(storedSetting?.marketing || false)
    }
  }, [isOpen])

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSave = () => {
    const settings = { necessary, preferences, statistics, marketing }

    if (necessary && preferences && statistics && marketing) {
      Cookies.set('cookiesAccepted', 'All', { expires: 365 })
      Cookies.remove('customCookies')
      setCookie('All')
    } else if (!necessary && !preferences && !statistics && !marketing) {
      clearCookies()
      Cookies.set('cookiesAccepted', 'Rejected', { expires: 365 })
      Cookies.remove('customCookies')
      setCookie('Rejected')
    } else {
      Cookies.set('cookiesAccepted', 'Custom', { expires: 365 })
      Cookies.set('customCookies', JSON.stringify(settings), { expires: 365 })
      setCookie('Custom')
      setNecessary(settings?.necessary || false)
      setPreferences(settings?.preferences || false)
      setStatistics(settings?.statistics || false)
      setMarketing(settings?.marketing || false)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={
        'fixed inset-0 flex items-center justify-center z-50 bg-black/50'
      }
      onClick={handleOverlayClick}
    >
      <div className={'absolute left-0 right-0 bottom-0 md:relative bg-[#F6F5FA] rounded-t-[20px] md:rounded-[20px] flex flex-col w-full p-9 md:w-[500px] md:p-5 font-host font-medium gap-[26px] md:gap-[16px]'}>
        <p className={'w-full'}>
          {t('fully1')}{' '}
          <Link
            href="/privacy"
            target="_blank"
            className="text-orange hover:opacity-70"
          >
            Cookies
          </Link>
          {t('fully2')}
        </p>

        <div className={'flex flex-wrap gap-[26px] md:gap-[17px]'}>
          <div className={'flex flex-col justify-center items-center gap-5'}>
            <p>{t('necessary')}</p>
            <Switch value={necessary} onClick={(newValue) => setNecessary(newValue)} />
          </div>
          <div className={'flex flex-col justify-center items-center gap-5'}>
            <p>{t('preferences')}</p>
            <Switch value={preferences} onClick={(newValue) => setPreferences(newValue)} />
          </div>
          <div className={'flex flex-col justify-center items-center gap-5'}>
            <p>{t('statistics')}</p>
            <Switch value={statistics} onClick={(newValue) => setStatistics(newValue)} />
          </div>
          <div className={'flex flex-col justify-center items-center gap-5'}>
            <p>{t('marketing')}</p>
            <Switch value={marketing} onClick={(newValue) => setMarketing(newValue)} />
          </div>
        </div>

        <button
          onClick={handleSave}
          className={
            'self-end bg-white rounded-[33px] py-[10px] px-[14px] leading-none hover:bg-black hover:text-white active:bg-black/80 active:text-white transition-colors duration-200 ease-in-out'
          }
        >
          {t('selection')}
        </button>
      </div>
    </div>
  )
}

export default CookieModal