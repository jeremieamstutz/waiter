import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

const EMPLOYEES = [
	{
		name: 'Jérémie Amstutz',
		title: 'CEO & Co-Founder',
		image: {
			alt: 'Jérémie Amstutz',
			url: '/images/employees/jeremie-amstutz.png',
		},
	},
	{
		name: 'Luca Moessner',
		title: 'CMO & Co-Founder',
		image: {
			alt: 'Luca Moessner',
			url: '/images/employees/luca-moessner.png',
		},
	},
]

function EmployeeCard({ employee }) {
	return (
		<div>
			<Image
				alt={employee.image.alt}
				src={employee.image.url}
				width={128}
				height={128}
				style={{ borderRadius: '50%' }}
			/>
			<div
				style={{
					marginTop: '1rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '0.25rem',
				}}
			>
				<h3 style={{ margin: 0 }}>{employee.name}</h3>
				<p style={{ margin: 0 }}>{employee.title}</p>
			</div>
		</div>
	)
}

export default function AboutPage() {
	const { t } = useTranslation()

	return (
		<>
			<Head>
				<title>{t('about:head.title')}</title>
				<meta
					name="description"
					content={t('about:head.meta.description')}
				/>
				<meta property="og:title" content={t('about:head.title')} />
				<meta
					property="og:description"
					content={t('about:head.meta.description')}
				/>
			</Head>
			<Container>
				<Header />
				<Main>
					<h1 style={{ alignSelf: 'center', marginTop: '2rem' }}>
						{t('about:title')}
					</h1>
					<p
						style={{
							alignSelf: 'center',
							textAlign: 'center',
							margin: 0,
						}}
					>
						{t('about:description')}
					</p>
					<div
						style={{
							margin: '2rem 0',
							display: 'flex',
							justifyContent: 'center',
							gap: '3rem',
						}}
					>
						{EMPLOYEES.map((employee) => (
							<EmployeeCard
								employee={employee}
								key={employee.name}
							/>
						))}
					</div>
					<Link
						href="/jobs"
						className="button secondary"
						style={{
							alignSelf: 'center',
							width: '100%',
							maxWidth: '30rem',
						}}
					>
						{t('about:joinUs')}
					</Link>
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
