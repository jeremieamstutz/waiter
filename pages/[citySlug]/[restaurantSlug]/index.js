
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import Header from 'components/restaurant/header'
import Footer from 'components/layout/footer'
import ItemList from 'components/item/item-list'

import { RestaurantProvider } from 'contexts/restaurant'
import {
	getRestaurant,
	getRestaurantItems,
	getRestaurantCategories,
	getRestaurantsSlugs,
} from 'utils/db'

import classes from 'styles/restaurant.module.css'

export default function RestaurantPage({ restaurant }) {
	const router = useRouter()
	const [session, loading] = useSession()

	return (
		<RestaurantProvider initialValue={restaurant}>
			<Head>
				<title>{restaurant.name} - Waiter</title>
				<meta name="description" content={restaurant.description} />
				<meta
					property="og:title"
					content={restaurant.name + ' - Waiter'}
				/>
				<meta
					property="og:description"
					content={restaurant.description}
				/>
				<meta property="og:image" content={restaurant.image} />
				<meta property="og:url" content="https://www.waiter.so" />
				<meta property="og:type" content="restaurant.menu" />
			</Head>
			{/* {!!router.query.itemSlug && (
				<Modal
					onClose={() =>
						// router.push(
						// 	'/restaurants/[restaurantId]?restaurantId=holycow',
						// 	'/restaurants/holycow',
						// 	{ shallow: true, scroll: false },
						// )
						// TODO: REMPLACER LE PUSH PAR UN BACK SANS PROBLEME DE SCROLL
						// TEMPORARY FIX: AVEC USESCROLLRESTAURATION. SUIVRE lES UPDATES SUR LE SUJET. LE RETOUR EST LENT EN DEV ALORS QUE CA DEVRAIT ÊTRE INSTANT
						router.back()
					}
				>
					<ItemDetail
						item={
							restaurant.items.filter(
								(item) => item.slug == router.query.itemSlug,
							)[0]
						}
					/>
				</Modal>
			)}
			{!!router.asPath.split('?')[0].endsWith('/new-item') && (
				<Modal
					onClose={() =>
						router.back()
					}
				>
					<h1>New Item</h1>
					<p>Fill in all the details</p>
				</Modal>
			)} */}
			<div className={classes.imageWrapper}>
				<Image
					className={classes.image}
					src={restaurant.image}
					alt={restaurant.name}
					layout="responsive"
					objectFit="cover"
					width={375}
					height={470} // 500
					priority={true}
				/>
			</div>
			<main className={classes.container}>
				<Header />
				{restaurant.categories.map((category, index) => (
					<div key={index}>
						<ItemList
							category={category}
							items={restaurant.items.filter(
								(item) => (item.category = category.id),
							)}
						/>
						{!loading && session && (
							<div className={classes.actions}>
								{/* <Link
									href={{
										pathname: router.pathname + '/new-item',
										query: {
											...router.query,
											category: category.slug,
										},
									}}
								>
									<a className="button">New item</a>
								</Link> */}
							</div>
						)}
					</div>
				))}
				{!loading && session && (
					<div className={classes.actions}>
						<Link
							href={{
								pathname: router.pathname + '/new-category',
								query: {
									...router.query,
								},
							}}
						>
							<a className="button">New category</a>
						</Link>
						<Link
							href={{
								pathname: '/help',
							}}
						>
							<a className="button">Help</a>
						</Link>
					</div>
				)}
			</main>
			<Footer />
		</RestaurantProvider>
	)
}

export async function getStaticPaths() {
	const restaurantsSlug = await getRestaurantsSlugs()
	return {
		paths: restaurantsSlug.map((restaurant) => ({ params: restaurant })),
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug, citySlug } = params
	const restaurant = await getRestaurant({ restaurantSlug, citySlug })

	if (!restaurant) {
		return {
			notFound: true,
		}
	}
	const items = await getRestaurantItems({ restaurantSlug, citySlug })
	const categories = await getRestaurantCategories({
		restaurantSlug,
		citySlug,
	})

	restaurant.items = items
	restaurant.categories = categories
	restaurant.rating = {
		value: 4.9,
		count: 10,
	}
	restaurant.isOpen = true

	return {
		props: {
			restaurant: restaurant,
		},
		revalidate: 60
	}
}
