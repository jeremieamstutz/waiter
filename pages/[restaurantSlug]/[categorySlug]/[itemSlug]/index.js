import Head from 'next/head'

import { getAllItemsSlugs } from 'pages/api/items'
import { getFullItem } from 'pages/api/[restaurantSlug]/[categorySlug]/[itemSlug]'

import ItemDetail from 'components/item/item-detail'
import Container from 'components/layout/container'
import Header from 'components/layout/header'
import useSWR from 'swr'

export default function ItemDetailPage({ item: fallbackData, params }) {
	const { data: item } = useSWR(
		`/api/${params.restaurantSlug}/${params.categorySlug}/${params.itemSlug}`,
		{
			fallbackData,
		},
	)

	return (
		<>
			<Head>
				<title>
					{item.name} - {item.restaurant.name} - Waiter
				</title>
				<meta name="description" content={item.description} />
				<meta
					property="og:title"
					content={
						item.name + ' - ' + item.restaurant.name + ' - Waiter'
					}
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
		// paths: itemsSlugs.map((item) => ({
		// 	params: item,
		// })),
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug, categorySlug, itemSlug } = params
	const item = await getFullItem({ restaurantSlug, categorySlug, itemSlug })

	if (!item) {
		return {
			notFound: true,
		}
	}

	return {
		props: { item, params },
		revalidate: 5,
	}
}
