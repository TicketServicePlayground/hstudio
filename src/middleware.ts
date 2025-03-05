import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const DEFAULT_LOCALE = 'en'

const routes = {
  locales: ['en', 'de']
}

const redirectToLocalizedPath = (req: NextRequest): NextResponse | null => {
  const { pathname } = req.nextUrl
  const { locales } = routes

  const hasLocalePrefix = locales.some(locale => pathname.startsWith(`/${locale}`))
  const userLocale = req.cookies.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE

  if (!hasLocalePrefix && pathname !== '/' && !pathname.startsWith('/api')) {
    const res = NextResponse.redirect(new URL(`/${userLocale}${pathname}${req.nextUrl.search}`, req.url))
    res.cookies.set(LOCALE_COOKIE, userLocale, { path: '/' })
    return res
  }

  return null
}

export default function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico|webp|css|js|json|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  let locale = req.cookies.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE

  if (!req.cookies.has(LOCALE_COOKIE)) {
    const res = NextResponse.redirect(new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url))
    res.cookies.set(LOCALE_COOKIE, locale, { path: '/' })
    return res
  }

  const response = redirectToLocalizedPath(req)
  if (response) {
    return response
  }

  return createMiddleware(routing)(req)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
}
