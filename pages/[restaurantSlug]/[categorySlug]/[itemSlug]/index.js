import Head from 'next/head'

import { getAllItemSlugs } from 'pages/api/items'

import ItemDetail from 'components/item/item-detail'
import Container from 'components/layout/container'
import Header from 'components/layout/header'
import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'
import { getFullRestaurant } from 'pages/api/[restaurantSlug]'
import { useRouter } from 'next/router'

export default function ItemsPage({ restaurant: fallbackData }) {
	const router = useRouter()
	const observer = useRef()
	const listRef = useRef()

	const { data: restaurant } = useSWR(`/api/${router.query.restaurantSlug}`, {
		fallbackData,
	})

	const [query] = useState(router.query)
	const { restaurantSlug, categorySlug, itemSlug } = query
	const selectedItem = restaurant.items.filter(
		(item) =>
			item.restaurantSlug === restaurantSlug &&
			item.categorySlug === categorySlug &&
			item.slug === itemSlug,
	)[0]

	useEffect(() => {
		if (observer.current) return
		observer.current = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const id = entry.target.id
						const item = restaurant.items.filter(
							(item) => item.id == id,
						)[0]
						router.replace(
							{
								pathname:
									'/[restaurantSlug]/[categorySlug]/[itemSlug]',
								query: {
									restaurantSlug: item.restaurantSlug,
									categorySlug: item.categorySlug,
									itemSlug: item.slug,
								},
							},
							undefined,
							{ shallow: true },
						)
					}
				}
			},
			{ root: null, rootMargin: '0px', threshold: 0.7 },
		)
	}, [restaurant, router])

	useEffect(() => {
		const item = document.getElementById(selectedItem.id)
		item.scrollIntoView(true)
	}, [selectedItem.id])

	useEffect(() => {
		listRef.current.childNodes.forEach((item) => {
			observer.current.observe(item)
		})

		function handleScroll() {}
		document.addEventListener('scroll', handleScroll)
		return () => document.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<Head>
				<title>Détail des éléments - {restaurant.name} - Waiter</title>
				<meta name="description" content={restaurant.description} />
				<meta
					property="og:title"
					content={
						'Détail des éléments - ' + restaurant.name + ' - Waiter'
					}
				/>
				<meta
					property="og:description"
					content={restaurant.description}
				/>
				<meta property="og:image" content={restaurant.image} />
				<meta property="og:type" content="restaurant.menu_item" />
			</Head>
			<Container>
				<div ref={listRef}>
					{restaurant.items.map((item) => (
						<div
							id={item.id}
							key={item.id}
							style={{
								marginTop: '1rem',
								marginBottom: '2rem',
								minHeight: '90vh',
							}}
						>
							<ItemDetail item={item} />
						</div>
					))}
				</div>
			</Container>
			<Header />
		</>
	)
}

export async function getStaticPaths() {
	const itemSlugs = await getAllItemSlugs()

	return {
		// paths: itemsSlugs.map((item) => ({
		// 	params: item,
		// })),
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug } = params
	const restaurant = await getFullRestaurant({ restaurantSlug })

	return {
		props: { restaurant },
	}
}
