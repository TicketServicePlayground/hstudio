'use client'
import type { Metadata } from 'next'
import { UserAgent, UserAgentContext } from '@/context/UserAgentContext'
import '../globals.css'
import '@/assets/css/index.css'

import Header from '@/components/header'
import Cookie from '@/components/Cookie/cookie'

// * FONTS * //


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
