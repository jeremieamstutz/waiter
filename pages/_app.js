import { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'

import * as gtag from 'utils/gtag'
import Providers from 'components/misc/providers'

import 'styles/globals.css'
import 'styles/ui.css'
import { AnimatePresence } from 'framer-motion'
import DesktopUnavailable from 'components/misc/desktop-unavailable'

const isProduction = process.env.NODE_ENV === 'production'

export default function Waiter({ Component, pageProps, router }) {
	useEffect(() => {
		const handleRouteChange = () => {
			const title = document.title
			const location = window.location.href
			const pathname = window.location.pathname
			if (isProduction) gtag.pageview(title, location, pathname)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	return (
		<>
			<Head>
				<title>Waiter</title>
				<meta
					name="description"
					content="Menu of your favorite restaurants"
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width, viewport-fit=cover"
				/>
			</Head>
			<div className="tablet desktop">
				<DesktopUnavailable url={router.asPath} />
			</div>
			<div className="mobile">
				<SessionProvider session={pageProps.session}>
					<SWRConfig
						value={{
							fetcher: (url) =>
								axios.get(url).then((res) => res.data),
						}}
					>
						<Providers>
							<AnimatePresence key="page">
								<Component {...pageProps} />
							</AnimatePresence>
						</Providers>
					</SWRConfig>
				</SessionProvider>
			</div>
		</>
	)
}
