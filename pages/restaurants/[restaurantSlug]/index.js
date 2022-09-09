import { useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useSWR from 'swr'
import { Form, Formik } from 'formik'

import { getFullRestaurant } from 'pages/api/[restaurantSlug]'
import { getAllRestaurants } from 'pages/api/restaurants'

import { useFlags } from 'contexts/flags'
import { useOrder } from 'contexts/order'
import { RestaurantProvider } from 'contexts/restaurant'

import Main from 'components/layout/main'
import Header from 'components/layout/header'
import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import RestaurantHeader from 'components/restaurant/restaurant-header'
import ItemList from 'components/item/item-list'
import Select from 'components/form/select'
import Input from 'components/form/input'

import classes from 'styles/restaurant.module.css'

const OpeningHoursModal = dynamic(() =>
	import('components/opening-hours/opening-hours-modal'),
)
const ReviewsModal = dynamic(() => import('components/reviews/reviews-modal'))
const BookingModal = dynamic(() => import('components/booking/booking-modal'))
const ItemModal = dynamic(() => import('components/item/item-modal'))
const EditItemModal = dynamic(() => import('components/item/edit-item-modal'))
const EditCategoryModal = dynamic(() =>
	import('components/category/edit-category-modal'),
)
const EditRestaurantModal = dynamic(() =>
	import('components/restaurant/edit-restaurant-modal'),
)
const OrderModal = dynamic(() => import('components/order/order-modal'))

export default function RestaurantPage({ restaurant: fallbackData }) {
	const router = useRouter()
	const { flags } = useFlags()
	const { t } = useTranslation()
	const orderContext = useOrder()

	const { data: restaurant } = useSWR(`/api/restaurants/${fallbackData.id}`, {
		fallbackData,
	})

	const { data: session, status } = useSession()
	const [query, setQuery] = useState('')
	const filtersFormRef = useRef()

	function filter(string, query) {
		return string.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
	}

	const filteredItems = restaurant.items.filter(
		(item) => filter(item.name, query) || filter(item.description, query),
	)

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
					content={`${restaurant.name} • Waiter`}
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
							// let { showOpeningHours, ...query } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
						}}
					/>
				)}
				{router.query.reviews === 'true' && (
					<ReviewsModal
						onClose={() => {
							// let { showReviews, ...query } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
						}}
					/>
				)}
				{router.query.showBooking === 'true' && (
					<BookingModal
						onClose={() => {
							// let { showBooking, ...query } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
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
							router.back()
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
							const { restaurantSlug } = router.query
							router.push(
								{
									pathname: '/restaurants/[restaurantSlug]',
									query: {
										restaurantSlug,
									},
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
							// const {
							// 	showNewItem,
							// 	restaurantId,
							// 	categoryId,
							// 	...query
							// } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
						}}
					/>
				)}
				{router.query.showOrder === 'true' && (
					<OrderModal
						onClose={() => {
							// const { showOrder, ...query } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
						}}
					/>
				)}
				{router.query.editCategory && (
					<EditCategoryModal
						category={
							restaurant.categories.filter(
								(cat) => cat.id === router.query.editCategory,
							)[0]
						}
						onClose={() => {
							// const { editCategory, ...query } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
						}}
					/>
				)}
				{router.query.showNewCategory && (
					<EditCategoryModal
						onClose={() => {
							// const { showNewCategory, ...query } = router.query
							// router.push(
							// 	{
							// 		pathname: router.pathname,
							// 		query: query,
							// 	},
							// 	undefined,
							// 	{ shallow: true },
							// )
							router.back()
						}}
					/>
				)}
				{router.query.editRestaurant && (
					<EditRestaurantModal
						onClose={() => {
							router.back()
						}}
					/>
				)}
				<Main className={classes.container}>
					<RestaurantHeader />
					{/* <Formik
						innerRef={filtersFormRef}
						initialValues={{ menu: 'noon', query: '' }}
					>
						<Form>
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '1rem',
									justifyContent: 'space-between',
								}}
							>
								<Select
									name="menu"
									// style={{ flex: 0, minWidth: '30rem' }}
								>
									<option>Menu du midi</option>
								</Select>
								<Input
									prefix={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											width={18}
											height={18}
										>
											<path
												fillRule="evenodd"
												d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
												clipRule="evenodd"
											/>
										</svg>
									}
									name="query"
									placeholder={t(
										'common:misc.actions.search',
									)}
									onChange={(event) => {
										console.log(event.target.value)
										setQuery(event.target.value)
									}}
									value={query}
									// style={{
									// 	flex: 0,
									// 	with: 'fit-content',
									// 	minWidth: '30rem',
									// }}
									autoComplete="off"
								/>
							</div>
						</Form>
					</Formik> */}
					{restaurant.categories.map((category, index) =>
						query.length > 0 &&
						filteredItems.filter(
							(item) => item.categoryId === category.id,
						).length == 0 ? undefined : (
							<ItemList
								restaurant={restaurant}
								category={category}
								items={filteredItems.filter(
									(item) => item.categoryId === category.id,
								)}
								key={index}
							/>
						),
					)}
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
								{t('category:buttons.new.title')}
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
								width: 'min(26rem, calc(100vw - 2rem))',
								margin: '0.5rem 0',
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
				</Main>
				<Footer />
			</Container>
		</RestaurantProvider>
	)
}

export async function getStaticPaths() {
	const restaurants = await getAllRestaurants()

	return {
		paths: restaurants.map((restaurant) => ({
			params: { restaurantSlug: restaurant.slug },
		})),
		// paths: [],
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
			...(await serverSideTranslations(locale, [
				'common',
				'restaurant',
				'item',
				'category',
				'order',
				'booking',
				'reviews',
			])),
		},
		revalidate: 5,
	}
}
