'use client'
import type { Metadata } from 'next'
import { Host_Grotesk, Space_Grotesk, Climate_Crisis } from 'next/font/google'
import { UserAgentContext } from '@/context/UserAgentContext'
import './globals.css'
import '@/assets/css/index.css'

import Header from '@/components/header'
// import {Cookie} from '@/components/Cookie/cookie'
import Footer from '@/components/footer'
import {useState} from "react";
import Cookie from '@/components/Cookie/cookie'
import { ToastContainer } from 'react-toastify'

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

          <Cookie />

        </UserAgentContext.Provider>
        <ToastContainer />
      </body>
    </html>
  )
}


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
