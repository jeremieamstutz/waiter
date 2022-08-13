import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function MessagesPage() {
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>Messages</h1>
					<section style={{ display: 'flex', gap: '1rem' }}>
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								minWidth: '20rem',
							}}
						>
							<div
								style={{
									padding: '1rem',
									background: '#eee',
									borderRadius: '0.5rem',
									display: 'flex',
									gap: '1rem',
								}}
							>
								<div
									style={{
										flexShrink: 0,
										width: '3rem',
										height: '3rem',
										borderRadius: '50%',
										background: '#222',
									}}
								/>
								<div>
									<div style={{ fontSize: '1.25rem' }}>
										Restaurant 1
									</div>
									<div style={{ fontFamily: 'Rubik' }}>
										Lorem ipsum dolor sit amet
									</div>
								</div>
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
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}
							>
								<div
									style={{
										background: 'blue',
										color: 'white',
										padding: '1rem',
										borderRadius: '0.5rem',
										width: 'fit-content',
									}}
								>
									Message 1
								</div>
								<div
									style={{
										background: 'blue',
										color: 'white',
										padding: '1rem',
										borderRadius: '0.5rem',
										width: 'fit-content',
									}}
								>
									Lorem ipsum dolor sit amet
								</div>
							</div>
						</div>
					</section>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
