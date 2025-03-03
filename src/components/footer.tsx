import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const services = [
    { title: 'services.s1', className: 'bg-liliac' },
    { title: 'services.s2', className: 'bg-orange' },
    { title: 'services.s3', className: 'bg-card' },
    { title: 'services.s4', className: 'bg-blue' },
    { title: 'services.s5', className: 'bg-lime' },
    {
      title: 'services.s6',
      className: 'bg-cardDark text-white',
    },
  ]

  const t = useTranslations('footer')

  return (
    <footer
      className={`
        flex flex-col items-start bg-white min-h-[570px] h-full shadow-footer

        pl-[25px] pr-[22px] pb-[172px] pt-[25.24px]
        md:pl-[65px] md:pr-[65px] md:pb-[38.97px] md:pt-[64px] 

        rounded-t-[20px] 
        md:rounded-t-[62px] 

        w-full
      `}
    >
      <div className="flex md:hidden w-full justify-between items-center mb-[83.76px]">
        <div className="block font-climate">
          <Link href="/" className="text-[20px]">
            H.STUDIO
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-x-[10px]">
          <Link
            href="https://x.com/hartung__?s=21"
            target="_blank"
            className="bg-black rounded-[10px] w-[36px] h-[36px] p-[8px] cursor-pointer hover:bg-black/80"
          >
            <img
              src="/img/social/x.svg"
              alt="X.com logo"
              className="w-[20px] h-[20px]"
            />
          </Link>
          <Link
            href="https://www.instagram.com/h_studio.dev?igsh=MTg0NnV4bWsycmlrMw%3D%3D&utm_source=qr"
            target="_blank"
            className="bg-black rounded-[10px] w-[36px] h-[36px] p-[8px] cursor-pointer hover:bg-black/80"
          >
            <img
              src="/img/social/instagram.svg"
              alt="Instagram logo"
              className="w-[20px] h-[20px]"
            />
          </Link>
        </div>
      </div>
      <div className="mb-[48px] md:mb-[60px] flex w-full justify-between">
        <h2 className="leading-none font-host text-[50px] md:text-[96px] font-medium">
          {t('title1')}
          <br />
          {t('title2')}
        </h2>

        {/* Social Icons */}
        <div className="hidden md:flex gap-x-[10px]">
          <Link
            href="https://x.com/hartung__?s=21"
            target="_blank"
            className="bg-black rounded-[10px] w-[36px] h-[36px] p-[8px] cursor-pointer hover:bg-black/80"
          >
            <img
              src="/img/social/x.svg"
              alt="X.com logo"
              className="w-[20px] h-[20px]"
            />
          </Link>
          <Link
            href="https://www.instagram.com/h_studio.dev?igsh=MTg0NnV4bWsycmlrMw%3D%3D&utm_source=qr"
            target="_blank"
            className="bg-black rounded-[10px] w-[36px] h-[36px] p-[8px] cursor-pointer hover:bg-black/80"
          >
            <img
              src="/img/social/instagram.svg"
              alt="Instagram logo"
              className="w-[20px] h-[20px]"
            />
          </Link>
        </div>
      </div>

      {/* Services Pills */}
      <div
        className={`
          flex flex-col gap-y-[32px] mb-[84px] 
          md:flex-row md:flex-wrap md:gap-x-[23.3px] md:gap-y-[10px] md:mb-[148.03px]
      `}
      >
        {services.map((service, index) => (
          <span
            key={index}
            className={`px-[16px] py-[10px] rounded-[12px] rounded-tl-[0px] text-[16px] font-medium font-space leading-none whitespace-pre-wrap ${service.className} w-max`}
          >
            {t(service.title)}
          </span>
        ))}
      </div>

      <div
        className={`
        grid grid-cols-2 gap-x-[45px] gap-y-[48px]
        md:flex md:flex-row md:justify-between md:w-full md:items-center
      `}
      >
        <div className="hidden md:block font-climate">
          <Link href="/" className="text-[20px]">
            H.STUDIO
          </Link>
        </div>

        {/* Links */}
        <Link
            href="/about"
            className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          {t('links.about')}
        </Link>
        <Link
          href="/terms"
          className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          {t('links.terms')}
        </Link>
        <Link
          href="/#"
          className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          {t('links.blog')}
        </Link>

        <Link
          href="/privacy"
          className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          {t('links.privacy')}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
