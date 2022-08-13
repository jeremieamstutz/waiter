import Head from 'next/head'
import Link from 'next/link'

import { signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

export default function LogoutPage() {
	const { t } = useTranslation()
	return (
		<>
			<Head>
				<title>{t('auth:pages.logout.meta.title')}</title>
			</Head>
			<Container>
				<Header />
				<div
					style={{
						flex: 1,
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '10vh',
					}}
				>
					<div
						style={{
							width: '40rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<h1
							style={{
								marginBottom: '1.5rem',
							}}
						>
							{t('auth:pages.logout.title')}
						</h1>
						{/* <p style={{ marginTop: 0 }}>
							Es-tu sûr de vouloir te déconnecter ?
						</p> */}
						<div style={{ display: 'flex', gap: '1rem' }}>
							<Link href="/">
								<a className="button">
									{t('auth:pages.logout.actions.no')}
								</a>
							</Link>
							<button
								onClick={() =>
									signOut({
										callbackUrl:
											process.env.NEXT_PUBLIC_DOMAIN,
									})
								}
								className="secondary"
								style={{ alignSelf: 'stretch' }}
							>
								{t('auth:pages.logout.actions.yes')}
							</button>
						</div>
					</div>
				</div>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'auth'])),
		},
	}
}
