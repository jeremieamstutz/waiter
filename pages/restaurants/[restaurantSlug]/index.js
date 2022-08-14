import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useSWR from 'swr'

import { RestaurantProvider } from 'contexts/restaurant'
import { useOrder } from 'contexts/order'
import { getFullRestaurant } from 'pages/api/[restaurantSlug]'
import { getAllRestaurants } from 'pages/api/restaurants'

import Header from 'components/layout/header'
import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import RestaurantHeader from 'components/restaurant/restaurant-header'
import ItemList from 'components/item/item-list'

import flags from 'flags.json'

import classes from 'styles/restaurant.module.css'
const OpeningHoursModal = dynamic(() =>
	import('components/opening-hours/opening-hours-modal'),
)
const ReviewsModal = dynamic(() => import('components/reviews/reviews-modal'))
const BookingModal = dynamic(() => import('components/booking/booking-modal'))
const ItemModal = dynamic(() => import('components/item/item-modal'))
const EditItemModal = dynamic(() => import('components/item/edit-item-modal'))
const CategoryModal = dynamic(() =>
	import('components/category/category-modal'),
)
const OrderModal = dynamic(() => import('components/order/order-modal'))

export default function RestaurantPage({ restaurant: fallbackData, params }) {
	const router = useRouter()
	const { t } = useTranslation()
	const orderContext = useOrder()

	const { data: restaurant } = useSWR(`/api/restaurants/${fallbackData.id}`, {
		fallbackData,
	})

	const { data: session, status } = useSession()

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: restaurant.name,
		image: [restaurant.image],
		address: {
			'@type': 'PostalAddress',
			addressLocality: restaurant.city,
			addressRegion: '',
			postalCode: restaurant.postalCode,
			streetAddress: restaurant.street + ' ' + restaurant.streetNumber,
			addressCountry: restaurant.country,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: restaurant.latitude,
			longitude: restaurant.longitude,
		},
		// aggregateRating: {
		// 	'@type': 'AggregateRating',
		// 	ratingValue: '4',
		// 	reviewCount: '250',
		// },
		// review: [
		// 	{
		// 		'@type': 'Review',
		// 		reviewRating: {
		// 			'@type': 'Rating',
		// 			ratingValue: '4',
		// 			bestRating: '5',
		// 		},
		// 		author: {
		// 			'@type': 'Person',
		// 			name: 'Lillian Ruiz',
		// 		},
		// 	},
		// ],
		// openingHours: [
		// 	'Mo-Sa 11:00-14:30',
		// 	'Mo-Th 17:00-21:30',
		// 	'Fr-Sa 17:00-22:00',
		// ],
		// openingHoursSpecification: [
		// 	{
		// 		'@type': 'OpeningHoursSpecification',
		// 		dayOfWeek: ['Monday', 'Tuesday'],
		// 		opens: '11:30',
		// 		closes: '22:00',
		// 	},
		// 	{
		// 		'@type': 'OpeningHoursSpecification',
		// 		dayOfWeek: ['Wednesday', 'Thursday', 'Friday'],
		// 		opens: '11:30',
		// 		closes: '23:00',
		// 	},
		// 	{
		// 		'@type': 'OpeningHoursSpecification',
		// 		dayOfWeek: 'Saturday',
		// 		opens: '16:00',
		// 		closes: '23:00',
		// 	},
		// 	{
		// 		'@type': 'OpeningHoursSpecification',
		// 		dayOfWeek: 'Sunday',
		// 		opens: '16:00',
		// 		closes: '22:00',
		// 	},
		// ],
		priceRange: '$$',
		servesCuisine: restaurant.cuisine,
		telephone: restaurant.phone,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/${restaurant.slug}`,
		acceptsReservations: 'True',
	}

	return (
		<RestaurantProvider initialValue={restaurant}>
			<Head>
				<title>{`${restaurant.name} • Waiter`}</title>
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
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</Head>
			<Container>
				<Header />
				{router.query.showOpeningHours === 'true' && (
					<OpeningHoursModal
						onClose={() => {
							let { showOpeningHours, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.showReviews === 'true' && (
					<ReviewsModal
						onClose={() => {
							let { showReviews, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.showBooking === 'true' && (
					<BookingModal
						onClose={() => {
							let { showBooking, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.item && (
					<ItemModal
						item={
							restaurant.items.filter(
								(itm) => itm.id === router.query.item,
							)[0]
						}
						onClose={() => {
							const { item, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.editItem && (
					<EditItemModal
						item={
							restaurant.items.filter(
								(itm) => itm.id === router.query.editItem,
							)[0]
						}
						onClose={() => {
							const { editItem, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.showNewItem && (
					<EditItemModal
						onClose={() => {
							const {
								showNewItem,
								restaurantId,
								categoryId,
								...query
							} = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.showOrder === 'true' && (
					<OrderModal
						onClose={() => {
							const { showOrder, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.editCategory && (
					<CategoryModal
						category={
							restaurant.categories.filter(
								(cat) => cat.id === router.query.editCategory,
							)[0]
						}
						onClose={() => {
							const { editCategory, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
				{router.query.showNewCategory && (
					<CategoryModal
						onClose={() => {
							const { showNewCategory, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: query,
								},
								undefined,
								{ shallow: true },
							)
						}}
					/>
				)}
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
						(session.user.id === restaurant.ownerId ||
							session.user.role === 'admin') && (
							<button
								onClick={() =>
									router.push(
										{
											pathname: router.pathname,
											query: {
												restaurantSlug:
													router.query.restaurantSlug,
												showNewCategory: true,
											},
										},
										undefined,
										{ shallow: true },
									)
								}
							>
								New category
							</button>
						)}
					<div className={classes.disclaimer}>
						<p>Informations données à titre indicatif.</p>
						<p>
							Dernière mise à jour le{' '}
							{new Date(restaurant.updatedAt).toLocaleDateString(
								'fr-CH',
							)}
						</p>
					</div>
					{flags.ordering && orderContext.items.length > 0 && (
						<button
							onClick={() =>
								router.push(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											showOrder: true,
										},
									},
									undefined,
									{ shallow: true },
								)
							}
							style={{
								borderRadius: '0.75rem',
								position: 'sticky',
								bottom: '1rem',
								alignSelf: 'center',
								gap: '1rem',
								height: '3.5rem',
								padding: '1.5rem',
								justifyContent: 'space-between',
								// background: 'rgba(0,0,0,0.6)',
								// backdropFilter: 'blur(20px) saturate(150%)',
								minWidth: '26rem',
								// maxWidth: '30rem',
							}}
							className="secondary"
						>
							{/* <span
								style={{
									fontSize: '1.125rem',
									background: '#fff',
									color: '#222',
									padding: '0.25rem 1rem',
									borderRadius: '0.25rem',
									marginLeft: '-0.5rem',
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={20}
									height={20}
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
								</svg>
								{orderContext.items.reduce(
									(count, item) => count + item.quantity,
									0,
								)}
							</span> */}
							<span style={{ fontSize: '1.125rem' }}>
								{t('order:viewOrder')}
							</span>
							<span style={{ fontSize: '1.125rem' }}>
								CHF {orderContext.total.toFixed(2)}
							</span>
						</button>
					)}
				</main>
				<Footer />
			</Container>
		</RestaurantProvider>
	)
}

export async function getStaticPaths() {
	const restaurants = await getAllRestaurants()

	return {
		// paths: restaurants.map((restaurant) => ({
		// 	params: { restaurantSlug: restaurant.slug },
		// })),
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params, locale }) {
	const { restaurantSlug } = params
	const restaurant = await getFullRestaurant({ restaurantSlug })

	if (!restaurant) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			restaurant: JSON.parse(JSON.stringify(restaurant)),
			params,
			...(await serverSideTranslations(locale, [
				'common',
				'restaurant',
				'item',
				'order',
				'booking',
				'reviews',
			])),
		},
		revalidate: 5,
	}
}
