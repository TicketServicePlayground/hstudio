'use client'
import type { Metadata } from 'next'
import { Host_Grotesk, Space_Grotesk, Climate_Crisis } from 'next/font/google'
import { UserAgentContext } from '@/context/UserAgentContext'
import './globals.css'
import '@/assets/css/index.css'

import Header from '@/components/header'
import Footer from '@/components/footer'

// * FONTS * //
const hostGrotesk = Host_Grotesk({
  variable: '--font-host-grotesk',
  subsets: ['latin'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})
const climateCrisis = Climate_Crisis({
  variable: '--font-climate-crisis',
  subsets: ['latin'],
})

// * METADATA * //
export const metadata: Metadata = {
  title: 'H.studio',
  description: 'SEO Description',
}

export default function RootLayout({
  reqUserAgent,
  children,
}: Readonly<{
  reqUserAgent: UserAgent
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.variable} ${spaceGrotesk.variable} ${climateCrisis.variable} antialiased max-w-[100vw] overflow-x-hidden`}
      >
        <UserAgentContext.Provider value={reqUserAgent}>
          <div className="flex flex-col w-screen min-h-screen bg-background">
            <Header />
            {children}
            {/*
          <Footer />
          */}
          </div>
          {/*
          <CookieModal />
          */}
        </UserAgentContext.Provider>
      </body>
    </html>
  )
}

const CookieModal = () => (
  <div
    className={`
              fixed bottom-[30px] left-[30px]
              bg-white cookies-container

              bottom-[89px] w-[calc(100vw-46px)] left-[23px]
              justify-between lg:justify-start


              lg:w-[330px] py-[20px] px-[20px]
              pr-[20px] lg:pr-[28px]
              gap-x-[14px]
              flex
            `}
  >
    <span className="font-host text-[14px] font-medium leading-none lg:w-[256px] w-[240px]">
      By continuing to use this site, you consent to the processing of
      {` `}
      <a
        href="google.com"
        target="_blank"
        className="text-orange hover:opacity-70"
      >
        cookies
      </a>
      .
    </span>
    <div className="p-[3px] cursor-pointer hover:opacity-60">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        className="w-[14px] h-[14px] mt-[3px]"
      >
        <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
        <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
        <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
        <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
        <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
        <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
        <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
        <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
      </svg>
    </div>
  </div>
)

// <h2 className="text-4xl font-bold text-white" >
//   {card.title}
// </h2>
//

// import { UserAgentContext } from '@/context/UserAgentContext'

// export default function LayoutClient({
//   reqUserAgent,
//   children,
// }: {
//   reqUserAgent: UserAgent
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={''}>
//         <UserAgentContext.Provider value={reqUserAgent}>
//           <div className="flex flex-col w-screen min-h-screen bg-background">
//             {children}
//             {/*
//           <Footer />
//           */}
//           </div>
//         </UserAgentContext.Provider>
//       </body>
//     </html>
//   )
// }
