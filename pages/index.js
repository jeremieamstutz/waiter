import Link from 'next/link'
import Head from 'next/head'

import { getAllRestaurants } from 'pages/api/restaurants'

import Container from 'components/layout/container'
import RestaurantList from 'components/restaurant/restaurant-list'
import Header from 'components/layout/header'

import classes from 'styles/home.module.css'
import Footer from 'components/layout/footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function HomePage({ restaurants }) {
	const { t } = useTranslation()
	return (
		<>
			<Head>
				<title>{t('home:meta.title')}</title>
				<meta name="description" content={t('home:meta.description')} />
				<meta property="og:title" content="Waiter" />
				<meta
					property="og:description"
					content={t('home:meta.description')}
				/>
				<meta property="og:url" content="https://www.waiter.so" />
				<meta property="og:type" content="restaurants" />
			</Head>
			<Container>
				<Header />
				<h1>{t('home:title')}</h1>
				<RestaurantList
					restaurants={restaurants}
					list={{
						name: 'Restaurants',
					}}
				/>
				{/* <button
					className="secondary"
					style={{
						position: 'fixed',
						bottom: '4rem',
						left: '50%',
						transform: 'translateX(-50%)',
						// padding: 0
					}}
				>
					Show map
				</button> */}
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	const restaurants = await getAllRestaurants()

	return {
		props: {
			restaurants: JSON.parse(JSON.stringify(restaurants)),
			...(await serverSideTranslations(locale, [
				'common',
				'home',
				'restaurant',
			])),
		},
		revalidate: 5,
	}
}
