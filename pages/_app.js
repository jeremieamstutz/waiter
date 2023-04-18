import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { SWRConfig } from 'swr'
import axios from 'axios'

import track from 'utils/track'

import Providers from 'components/misc/providers'
import Modals from 'components/misc/modals'
import Spinner from 'components/ui/spinner'

import 'styles/globals.css'
import 'styles/ui.css'

function Auth({ auth, children }) {
	const { data: session, status } = useSession()
	const router = useRouter()

	if (status === 'loading') {
		return <Spinner />
	}

	if (status === 'unauthenticated') {
		signIn()
		return <Spinner />
	}

	if (auth.role && auth.role !== session?.user?.role) {
		router.push(auth.unauthorized ?? '/')
	}

	return children
}

function App({ Component, pageProps: { session, ...pageProps } }) {
	useEffect(() => {
		if (window.performance) {
			const pageLoadDuration = Math.round(performance.now())

			track.event({
				event_category: 'general',
				event_name: 'loading_complete',
				value: pageLoadDuration,
				non_interaction: true,
			})
		}
	}, [])

	useEffect(() => {
		// Manual doesn't work well on iOS Safari https://github.com/vercel/next.js/issues/20951#issuecomment-1231966865
		const ua = window.navigator.userAgent.toLowerCase()
		const isMobileSafari = /safari/.test(ua) && /iphone|ipod|ipad/.test(ua)
		window.history.scrollRestoration = isMobileSafari ? 'auto' : 'manual'
	}, [])

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
			<SessionProvider session={session}>
				<SWRConfig
					value={{
						fetcher: (url) =>
							axios.get(url).then((res) => res.data),
					}}
				>
					<Providers {...pageProps}>
						<Modals />
						{Component.auth ? (
							<Auth auth={Component.auth}>
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
