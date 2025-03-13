import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import LayoutClient from './layoutClient'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { ToastContainer } from 'react-toastify'
import { Climate_Crisis, Host_Grotesk, Space_Grotesk } from 'next/font/google'
import { ReactNode } from 'react'

export function generateStaticParams(): { locale: 'en' | 'de' }[] {
  return routing.locales.map(locale => ({ locale }))
}

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

export default async function Layout({
  children,
  params
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const {locale} = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  const reqUserAgent = userAgent({ headers: await headers() })

  return (
    <html lang={locale}>
    <body
      className={`${hostGrotesk.variable} ${spaceGrotesk.variable} ${climateCrisis.variable} antialiased max-w-[100vw] overflow-x-hidden`}
    >
    <NextIntlClientProvider messages={messages}>
      <LayoutClient reqUserAgent={reqUserAgent}>{children}</LayoutClient>
      <ToastContainer />
    </NextIntlClientProvider>
    </body>
    </html>
  )
}

// import type { Metadata } from 'next'
// import { Host_Grotesk, Space_Grotesk, Climate_Crisis } from 'next/font/google'
// import './globals.css'
// import '@/assets/css/index.css'

// import Header from '@/components/header'
// import Footer from '@/components/footer'

// // * FONTS * //
// const hostGrotesk = Host_Grotesk({
//   variable: '--font-host-grotesk',
//   subsets: ['latin'],
// })
// const spaceGrotesk = Space_Grotesk({
//   variable: '--font-space-grotesk',
//   subsets: ['latin'],
// })
// const climateCrisis = Climate_Crisis({
//   variable: '--font-climate-crisis',
//   subsets: ['latin'],
// })

// // * METADATA * //
// export const metadata: Metadata = {
//   title: 'H.studio',
//   description: 'SEO Description',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${hostGrotesk.variable} ${spaceGrotesk.variable} ${climateCrisis.variable} antialiased max-w-[100vw] overflow-x-hidden`}
//       >
//         <div className="flex flex-col w-screen min-h-screen bg-background">
//           <Header />
//           {children}
//           {/*
//           <Footer />
//           */}
//         </div>
//       </body>
//     </html>
//   )
// }

// // <h2 className="text-4xl font-bold text-white" >
// //   {card.title}
// // </h2>
