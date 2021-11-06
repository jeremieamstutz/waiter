import Head from 'next/head'

import ItemDetail from 'components/item/item-detail'
import { getItem } from 'pages/api/items/[itemId]'
import { getAllItemsSlugs } from 'pages/api/items'

import Container from 'components/layout/container'
import Header from 'components/layout/header'

export default function ItemDetailPage({ item, url }) {
	return (
		<>
			<Head>
				<title>{item.name} - Waiter</title>
				<meta name="description" content={item.description} />
				<meta property="og:title" content={item.name + ' - Waiter'} />
				<meta property="og:description" content={item.description} />
				<meta property="og:image" content={item.image} />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="restaurant.menu_item" />
			</Head>
			<Container>
				<ItemDetail item={item} />
			</Container>
			<Header />
		</>
	)
}

export async function getStaticProps({ params }) {
	const { restaurantSlug, itemSlug } = params
	const item = await getItem({ restaurantSlug, itemSlug })

	if (!item) {
		return {
			notFound: true,
		}
	}

	const url =
		process.env.NEXT_PUBLIC_DOMAIN + `/${restaurantSlug}/${itemSlug}`

	return {
		props: { item, url },
		revalidate: 5,
	}
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
