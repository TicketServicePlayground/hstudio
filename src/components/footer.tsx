import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const services = [
    { title: 'Backend Solutions\nDevelopment', className: 'bg-liliac' },
    { title: 'Web & Mobile Application\nDevelopment', className: 'bg-orange' },
    { title: 'Design & User\nExperience', className: 'bg-card' },
    { title: 'DevOps\n& Automation', className: 'bg-blue' },
    { title: 'Game & Web3\nPlatform Development', className: 'bg-lime' },
    {
      title: 'Seamless Integration\nAcross All Systems',
      className: 'bg-cardDark text-white',
    },
  ]

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
            href="#"
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
            href="#"
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
          Bringing your digital
          <br />
          vision to life
        </h2>

        {/* Social Icons */}
        <div className="hidden md:flex gap-x-[10px]">
          <Link
            href="#"
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
            href="#"
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
            {service.title}
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
          About us
        </Link>
        <Link
          href="/terms"
          className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          Terms of Service
        </Link>
        <Link
          href="/#"
          className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          Blog
        </Link>

        <Link
          href="/privacy"
          className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
