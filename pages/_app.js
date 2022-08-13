import { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { SWRConfig } from 'swr'
import { SessionProvider, signIn, useSession } from 'next-auth/react'

import * as gtag from 'utils/gtag'
import Providers from 'components/misc/providers'

import 'styles/globals.css'
import 'styles/ui.css'
import Spinner from 'components/ui/spinner'
import { appWithTranslation } from 'next-i18next'

function Auth({ children }) {
	const { status } = useSession()

	if (status === 'loading') {
		return <Spinner />
	}

	if (status === 'unauthenticated') {
		signIn()
		return <Spinner />
	}

	return children
}

function App({ Component, pageProps, router }) {
	useEffect(() => {
		const handleRouteChange = () => {
			const title = document.title
			const location = window.location.href
			const pathname = window.location.pathname
			if (process.env.NODE_ENV === 'production')
				gtag.pageview(title, location, pathname)
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
					content="Découvrez les meilleurs restaurants autour de vous"
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width, viewport-fit=cover"
				/>
			</Head>
			<SessionProvider session={pageProps.session}>
				<SWRConfig
					value={{
						fetcher: (url) =>
							axios.get(url).then((res) => res.data),
					}}
				>
					<Providers>
						{Component.auth ? (
							<Auth>
								<Component {...pageProps} />
							</Auth>
						) : (
							<Component {...pageProps} />
						)}
					</Providers>
				</SWRConfig>
			</SessionProvider>
		</>
	)
}

export default appWithTranslation(App)
