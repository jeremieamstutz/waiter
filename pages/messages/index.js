import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function MessagesPage() {
	return (
		<>
			<Container>
				<Header />
				<h1>Messages</h1>
				<section style={{ display: 'flex', gap: '1rem' }}>
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
						}}
					>
						<div
							style={{
								padding: '1rem',
								background: '#eee',
								borderRadius: '0.5rem',
								fontSize: '1.125rem',
							}}
						>
							Restaurant 1
						</div>
						<div
							style={{
								padding: '1rem',
								// background: '#eee',
								borderRadius: '0.5rem',
								fontSize: '1.125rem',
							}}
						>
							Restaurant 2
						</div>
					</div>
					<div
						style={{
							flex: 3,
							background: '#eee',
							borderRadius: '1rem',
							padding: '1rem',
						}}
					>
						<div>
							<h2>Restaurant 1</h2>
						</div>
						<hr />
						<div>
							<div>Message 1</div>
							<div>Message 2</div>
						</div>
					</div>
				</section>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
