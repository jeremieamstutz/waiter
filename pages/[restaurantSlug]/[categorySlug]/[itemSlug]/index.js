import Head from 'next/head'

import { getItem } from 'pages/api/items/[itemId]'
import { getAllItemsSlugs } from 'pages/api/items'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

import ItemDetail from 'components/item/item-detail'
import Container from 'components/layout/container'
import Header from 'components/layout/header'

export default function ItemDetailPage({ item, restaurant }) {
	return (
		<>
			<Head>
				<title>
					{item.name} - {restaurant.name} - Waiter
				</title>
				<meta name="description" content={item.description} />
				<meta
					property="og:title"
					content={item.name + ' - ' + restaurant.name + ' - Waiter'}
				/>
				<meta property="og:description" content={item.description} />
				<meta property="og:image" content={item.image} />
				<meta property="og:type" content="restaurant.menu_item" />
			</Head>
			<Container>
				<ItemDetail item={item} />
			</Container>
			<Header />
		</>
	)
}

export async function getStaticPaths() {
	const itemsSlugs = await getAllItemsSlugs()

	return {
		paths: itemsSlugs.map((item) => ({
			params: item,
		})),
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug, categorySlug, itemSlug } = params
	const item = await getItem({ restaurantSlug, categorySlug, itemSlug })
	const restaurant = await getRestaurant({ restaurantSlug })

	if (!item) {
		return {
			notFound: true,
		}
	}

	return {
		props: { item, restaurant },
		revalidate: 5,
	}
}
