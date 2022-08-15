import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export default function JobsPage() {
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>Emplois</h1>
					<p>
						Waiter développe le futur de la restauration.
						Rejoinez-nous dans cette aventure.
					</p>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						<li>
							<Link href="/jobs/coo">
								<a
									style={{
										display: 'flex',
										flexDirection: 'column',
										maxWidth: '40rem',
										padding: '1.5rem',
										background: '#eee',
										borderRadius: '1rem',
										color: '#333',
										gap: '0.5rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											fontSize: '1.25rem',
										}}
									>
										Chief Operating Officer{' '}
										<span
											style={{
												fontSize: '0.75rem',
												background: '#a00',
												color: 'white',
												padding: '0.25rem 0.5rem',
												borderRadius: '1.5rem',
											}}
										>
											NEW
										</span>
									</div>
									<div>
										<span
											style={{
												color: '#666',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
												fontSize: '1rem',
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={12}
												height={12}
												viewBox="0 0 20 20"
												fill="#666"
											>
												<path
													fillRule="evenodd"
													d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
													clipRule="evenodd"
												/>
											</svg>
											Lausanne, Suisse
										</span>
									</div>
								</a>
							</Link>
						</li>
					</ul>
				</Main>
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
