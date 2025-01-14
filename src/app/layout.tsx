import type { Metadata } from 'next'
import { Host_Grotesk, Space_Grotesk, Climate_Crisis } from 'next/font/google'
import './globals.css'

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
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.variable} ${spaceGrotesk.variable} ${climateCrisis.variable} antialiased max-w-[100vw] overflow-x-hidden`}
      >
        <div className="flex flex-col w-screen min-h-screen bg-background">
          <Header />
          {children}
          {/*
          <Footer />
          */}
        </div>
      </body>
    </html>
  )
}

// <h2 className="text-4xl font-bold text-white" >
//   {card.title}
// </h2>
