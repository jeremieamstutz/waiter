import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import RestaurantList from 'components/restaurant/restaurant-list'

import Layout from 'components/layout/layout'
import classes from 'styles/home.module.css'
import { Flag, Restaurant } from 'db/models'

export default function HomePage({ restaurants }) {
	const { t } = useTranslation()
	return (
		<Layout
			head={{
				title: t('home:meta.title'),
				meta: {
					description: t('home:meta.description'),
					type: 'restaurants',
				},
			}}
		>
			<h1>{t('home:title')}</h1>
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
	const restaurants = await Restaurant.findAll({
		include: ['address', 'images'],
	})
	const flags = await Flag.findAll({ order: ['key'] })

	return {
		props: {
			restaurants: JSON.parse(JSON.stringify(restaurants)),
			flags: JSON.parse(JSON.stringify(flags)),
			...(await serverSideTranslations(locale, [
				'common',
				'home',
				'restaurant',
			])),
		},
	}
}
