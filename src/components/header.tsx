'use client'
import Tabs from '@/components/tabs'

const Header = () => {
  return (
    <div className="absolute w-full top-[30px] px-[30px] flex justify-between items-center">
      <Tabs
        items={[
          {
            text: 'home',
            type: 'link',
            href: '/',
          },
          {
            text: 'clients',
            type: 'link',
            href: '/clients',
          },
          {
            text: 'about us',
            type: 'link',
            href: '/about',
            active: true,
          },
          {
            text: 'contacts',
            type: 'link',
            href: '/contacts',
          },
        ]}
      />
      <div className="flex flex-row-reverse">
        <Tabs
          items={[
            {
              text: 'eng',
              type: 'btn',
              onClick: () => {},
            },
            {
              text: 'deu',
              type: 'btn',
              onClick: () => {},
            },
          ]}
        />
        <div className="mr-[200px]">
          <Logo />
        </div>
      </div>
    </div>
  )
}

const Logo = () => (
  <div className="hidden md:block font-climate">
    <a href="/" className="text-[20px]">
      H.STUDIO
    </a>
  </div>
)

export default Header
