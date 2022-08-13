import Head from 'next/head'

import { getAllRestaurants } from 'pages/api/restaurants'

import Container from 'components/layout/container'
import RestaurantList from 'components/restaurant/restaurant-list'
import Header from 'components/layout/header'

import Footer from 'components/layout/footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function HomePage({ restaurants }) {
	const { t } = useTranslation()
	return (
		<>
			<Head>
				<title>Restaurants</title>
				{/* <meta
					name="description"
					content="De choix du restaurant, jusqu’au règlement de l’addition, en passant par la commande, Waiter est là pour vous."
				/> */}
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
				<h1>Restaurants</h1>
				<RestaurantList
					restaurants={restaurants}
					list={{
						name: 'Restaurants',
					}}
				/>
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
