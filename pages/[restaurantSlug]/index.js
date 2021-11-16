import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import Header from 'components/layout/header'
import RestaurantHeader from 'components/restaurant/restaurant-header'
import ItemList from 'components/item/item-list'

import { RestaurantProvider } from 'contexts/restaurant'
import {
	getRestaurant,
	getRestaurantItems,
	getRestaurantCategories,
} from 'pages/api/restaurants/[restaurantId]'

import classes from 'styles/restaurant.module.css'
import Container from 'components/layout/container'
import { getAllRestaurants } from 'pages/api/restaurants'

export default function RestaurantPage({ restaurant }) {
	const router = useRouter()

	const { data: session, status } = useSession()

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
			)}*/}
			<Container>
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
					<RestaurantHeader />
					{restaurant.categories.map((category, index) => (
						<ItemList
							restaurant={restaurant}
							category={category}
							items={restaurant.items.filter(
								(item) => item.categoryId === category.id,
							)}
							key={index}
						/>
					))}
					{status === 'authenticated' &&
						restaurant.ownerId === session.user.id && (
							<div className={classes.actions}>
								<Link
									href={{
										pathname:
											router.pathname + '/categories/new',
										query: {
											...router.query,
										},
									}}
								>
									<a className="button">New category</a>
								</Link>
								{/* <Link
							href={{
								pathname: '/help',
							}}
						>
							<a className="button">Get help</a>
						</Link>
						<Link
							href={{
								pathname: '/bugs',
							}}
						>
							<a className="button">Report a bug</a>
						</Link>
						<select>
							<option>English</option>
						</select> */}
							</div>
						)}
				</main>
			</Container>
			<Header>
				{/* <Link href="/deal"><a style={{color: 'white', background: 'var(--color-primary)', padding: '1rem', display: 'block'}}>GET AN INCREDIBLE DEAL !</a></Link> */}
				{/* <div style={{ padding: '0 1rem 1rem', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)' }}>
					<button className="secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
						<span>Cart · 2 items</span>
						<span>12.90 CHF</span>
					</button>
				</div> */}
			</Header>
		</RestaurantProvider>
	)
}

export async function getStaticPaths() {
	const restaurants = await getAllRestaurants()

	return {
		paths: restaurants.map((restaurant) => ({
			params: { restaurantSlug: restaurant.id },
		})),
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug } = params
	const restaurant = await getRestaurant({ restaurantSlug })

	if (!restaurant) {
		return {
			notFound: true,
		}
	}
	const items = await getRestaurantItems({ restaurantSlug })
	const categories = await getRestaurantCategories({
		restaurantSlug,
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
			restaurant,
		},
		revalidate: 5,
	}
}
