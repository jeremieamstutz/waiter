import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'

export default function PrivacyPage() {
	const { t } = useTranslation('privacy')
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>{t('title')}</h1>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'privacy'])),
		},
	}
}
