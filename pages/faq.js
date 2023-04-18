import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from 'components/layout/layout'
import Accordion from 'components/ui/accordion'

export default function FAQPage() {
	const { t } = useTranslation()

	return (
		<Layout head={{ title: t('faq:header.title') }}>
			<h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
				{t('faq:title')}
			</h1>
			<section
				style={{
					maxWidth: '60rem',
					alignSelf: 'center',
					margin: '0 auto',
				}}
			>
				{t('faq:questions', { returnObjects: true }).map(
					({ header, content }, index) => (
						<Accordion
							key={index}
							header={header}
							content={content}
						/>
					),
				)}
			</section>
		</Layout>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'faq'])),
		},
	}
}
