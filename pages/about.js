import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function AboutPage() {
	const { t } = useTranslation()

	return (
		<>
			<Head>
				<title>{t('about:meta.title')}</title>
			</Head>
			<Container>
				<Header />
				<Main>
					<h1>{t('about:title')}</h1>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'about'])),
		},
	}
}
