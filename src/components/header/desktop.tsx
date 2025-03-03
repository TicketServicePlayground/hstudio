'use client'
import Tabs from '@/components/tabs'
import Logo from '@/components/logo'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

//@ts-ignore
const DesktopNav = ({ showHeader, onLeftTabsReady, onRightTabsReady }) => {
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()

  const handleLocaleChange = (newLocale: typeof locale) => {
    router.push(`/${newLocale}${pathname.substring(3)}`, { scroll: false })
  }

  const t = useTranslations('global.nav')

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
            // { text: t('home'),, type: 'link', href: '/', active: pathname === '/' },
            {
              text: t('clients'),
              type: 'link',
              href: `/clients`,
              active: pathname === `/${locale}/clients`,
            },
            {
              text: t('about'),
              type: 'link',
              href: `/about`,
              active: pathname === `/${locale}/about`,
            },
            {
              text: t('contacts'),
              type: 'link',
              href: `/contacts`,
              active: pathname === `/${locale}/contacts`,
            },
          ]}
          onReady={onLeftTabsReady}
        />
        <div className="flex flex-row-reverse">
          <Tabs
            items={[
              { text: 'eng', type: 'btn', onClick: () => handleLocaleChange('en'), active: locale === 'en' },
              { text: 'deu', type: 'btn', onClick: () => handleLocaleChange('de'), active: locale === 'de' },
            ]}
            onReady={onRightTabsReady}
            selectedBgColor="[#E4E9EF]"
            selectedTextColor="[#000000]"
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
