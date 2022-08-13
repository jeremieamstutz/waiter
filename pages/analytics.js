import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function AnalyticsPage() {
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>Analytics</h1>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
