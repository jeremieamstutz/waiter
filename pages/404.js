import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Custom404Page() {
	return (
		<Container>
			<Header>
				<link rel="canonical" href="/404" />
			</Header>
			<Main>
				<div
					style={{
						flex: 1,
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '10vh',
						gap: '1rem',
					}}
				>
					<h1 style={{ margin: 0, fontSize: '4rem' }}>404</h1>
					<p style={{ margin: 0 }}>Page not found</p>
				</div>
			</Main>
			<Footer />
		</Container>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
