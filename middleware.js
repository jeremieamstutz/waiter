import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'

import { i18n } from './next.config.js'

acceptLanguage.languages(i18n.locales)

const PUBLIC_FILE = /\.(.*)$/

export function middleware(req) {
	if (
		req.nextUrl.pathname.startsWith('/_next') ||
		req.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return
	}
	if (req.nextUrl.locale === 'default') {
		const newUrl = req.nextUrl.clone()
		newUrl.locale = acceptLanguage.get(req.headers.get('accept-language'))
		return NextResponse.redirect(newUrl)
	}
}
