import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from 'components/layout/layout'
import RestaurantList from 'components/restaurant/restaurant-list'
import { Restaurant } from 'db/models'

export default function HomePage({ restaurants }) {
	const { t } = useTranslation()
	return (
		<Layout
			head={{
				title: 'Restaurants',
				meta: {
					description: t('home:meta.description'),
					url: 'https://www.waiter.so',
					type: 'restaurants',
				},
			}}
		>
			<h1>Restaurants</h1>
			<RestaurantList
				restaurants={restaurants}
				list={{
					name: 'Restaurants',
				}}
			/>
		</Layout>
	)
}

export async function getStaticProps({ locale }) {
	const restaurants = await Restaurant.findAll()

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
