import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const DEFAULT_LOCALE = 'en'
const VALID_LOCALES = ['en', 'de']

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico|webp|css|js|json|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  const cookiesAccepted = req.cookies.get('cookiesAccepted')?.value
  const customCookies = req.cookies.get('customCookies')
  let canSetLocale = false

  if (cookiesAccepted === 'All') {
    canSetLocale = true
  } else if (cookiesAccepted === 'Custom' && customCookies) {
    try {
      const parsed = JSON.parse(customCookies.value)
      canSetLocale = parsed?.preferences === true
    } catch (error) {
      console.error('Ошибка парсинга customCookies:', error)
    }
  }

  const hasLocalePrefix = VALID_LOCALES.some(locale => pathname.startsWith(`/${locale}`))
  const userLocaleCookie = req.cookies.get(LOCALE_COOKIE)?.value

  if (hasLocalePrefix) {
    const currentLocale = VALID_LOCALES.find(locale => pathname.startsWith(`/${locale}`))

    if (currentLocale && canSetLocale) {
      const res = NextResponse.next()
      res.cookies.set(LOCALE_COOKIE, currentLocale, { path: '/' })
      return res
    }

    return NextResponse.next()
  }

  const targetLocale = userLocaleCookie || DEFAULT_LOCALE
  const redirectUrl = new URL(`/${targetLocale}${pathname}${req.nextUrl.search}`, req.url)

  const res = NextResponse.redirect(redirectUrl)
  if (canSetLocale) {
    res.cookies.set(LOCALE_COOKIE, targetLocale, { path: '/' })
  }
  return res
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
}

export const internalMiddleware = createMiddleware(routing)
