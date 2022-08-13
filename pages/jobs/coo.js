import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function CareersPage() {
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>COO</h1>
					<p>Intro</p>
					<section>
						<h2>Tasks</h2>
						<p>Intro</p>
						<ul>
							<li>Sales</li>
							<li>Marketing</li>
							<li>Communication</li>
							<li>Customer service</li>
						</ul>
					</section>
					<section>
						<h2>Requirements</h2>
						<p>Intro</p>
						<ul>
							<li></li>
						</ul>
					</section>
					<section>
						<h2>Benefits</h2>
						<p>Intro</p>
						<ul>
							<li></li>
						</ul>
					</section>
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
