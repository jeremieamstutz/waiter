import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function EmailSentPage() {
	const { t } = useTranslation()
	return (
		<>
			<Container>
				<Header />
				<Main>
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<h1>{t('auth:pages.email-sent.title')}</h1>
						<p style={{ margin: 0 }}>
							{t('auth:pages.email-sent.body')}
						</p>
					</div>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'auth'])),
		},
	}
}
