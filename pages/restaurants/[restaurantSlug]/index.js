import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useFlags } from 'contexts/flags'
import { useOrder } from 'contexts/order'

import { filter } from 'utils/search'

import Layout from 'components/layout/layout'

import RestaurantHeader from 'components/restaurant/restaurant-header'
import ItemList from 'components/item/item-list'

import classes from 'styles/restaurant.module.css'
import { useRestaurant } from 'contexts/restaurant'
import { Flag, Restaurant } from 'db/models'

const OpeningHoursModal = dynamic(() =>
	import('components/opening-hours/opening-hours-modal'),
)
const ReviewsModal = dynamic(() => import('components/review/reviews-modal'))
const BookingModal = dynamic(() => import('components/booking/booking-modal'))
const BookingsModal = dynamic(() => import('components/booking/bookings-modal'))
const ItemModal = dynamic(() => import('components/item/item-modal'))
const EditItemModal = dynamic(() => import('components/item/edit-item-modal'))
const EditCategoryModal = dynamic(() =>
	import('components/category/edit-category-modal'),
)
const EditRestaurantModal = dynamic(() =>
	import('components/restaurant/edit-restaurant-modal'),
)
const EditRestaurantImagesModal = dynamic(() =>
	import('components/restaurant/edit-restaurant-images-modal'),
)
const GalleryModal = dynamic(() =>
	import('components/restaurant/gallery-modal'),
)
const CartModal = dynamic(() => import('components/cart/cart-modal'))
const CheckoutModal = dynamic(() => import('components/payment/checkout-modal'))

function ViewOrderButton() {
	const { order } = useOrder()
	const { flags } = useFlags()
	const { t } = useTranslation()
	const router = useRouter()

	return (
		flags.orders &&
		order?.items.length > 0 && (
			<button
				onClick={() =>
					router.push(
						{
							pathname: router.pathname,
							query: {
								...router.query,
								showCart: true,
							},
						},
						undefined,
						{ shallow: true },
					)
				}
				style={{
					borderRadius: '0.75rem',
					position: 'sticky',
					bottom: 'max(1rem, env(safe-area-inset-bottom))',
					alignSelf: 'center',
					gap: '1rem',
					height: '3.5rem',
					padding: '1.5rem',
					justifyContent: 'space-between',
					width: 'min(26rem, calc(100vw - 2rem))',
					margin: '0.5rem 0',
					zIndex: 10,
				}}
				className="secondary"
			>
				<span style={{ fontSize: '1.125rem' }}>
					{t('order:viewOrder')}
				</span>
				<span style={{ fontSize: '1.125rem' }}>
					{order?.total.toFixed(2)}
				</span>
			</button>
		)
	)
}

export default function RestaurantPage() {
	const router = useRouter()
	const { t } = useTranslation()
	const { data: session, status } = useSession()

	const { restaurant } = useRestaurant()
	const { flags } = useFlags()

	const [query, setQuery] = useState('')
	const filtersFormRef = useRef()

	const filteredItems = restaurant.items.filter(
		(item) => filter(item.name, query) || filter(item.description, query),
	)
	restaurant.filteredItems = filteredItems

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: restaurant.name,
		image: restaurant.images[0],
		address: {
			'@type': 'PostalAddress',
			addressLocality: restaurant.address.city,
			addressRegion: '',
			postalCode: restaurant.address.postalCode,
			streetAddress:
				restaurant.address.street +
				' ' +
				restaurant.address.streetNumber,
			addressCountry: restaurant.address.country,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: restaurant.address.latitude,
			longitude: restaurant.address.longitude,
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
		// "hasMenu":{
		// 	"@type":"Menu",
		// 	"name":"Dine-In Menu",
		// 	"description":"Menu for in-restaurant dining only.",
		// 	"hasMenuSection":[
		// {
		// 	"@type":"MenuSection",
		// 	"name":"Soups & Salads",
		// 	"description":"Salads and a few choices of soup",
		// 	"image":"https://thisisarestaurant.com/soup_and_salad_dishes.jpg",
		// 	"offers":{
		// 	   "@type":"Offer",
		// 	   "availabilityEnds":"T8:22:00",
		// 	   "availabilityStarts":"T8:22:00"
		// 	},
		// 	"hasMenuItem":{
		// 	   "@type":"MenuItem",
		// 	   "name":"Pea Soup",
		// 	   "description":"Creamy pea soup topped with melted cheese and sourdough croutons.",
		// 	   "offers":{
		// 		  "@type":"Offer",
		// 		  "price":"3.49",
		// 		  "priceCurrency":"USD"
		// 	   }
		// 	}
		//  }
		priceRange: '$$',
		servesCuisine: restaurant.cuisines,
		telephone: restaurant.phone,
		acceptsReservations: 'True',
	}

	return (
		<Layout
			head={{
				title: restaurant.name,
				meta: {
					description: restaurant.description,
					image: restaurant.images[0].url,
					type: 'restaurant.menu',
					data: JSON.stringify(structuredData),
				},
			}}
		>
			{router.query.showOpeningHours === 'true' && (
				<OpeningHoursModal
					onClose={() => {
						router.back()
					}}
				/>
			)}
			{router.query.reviews === 'true' && (
				<ReviewsModal
					onClose={() => {
						router.back()
					}}
				/>
			)}
			{router.query.showBooking === 'true' && (
				<BookingModal
					onClose={() => {
						router.back()
					}}
				/>
			)}
			{router.query.showBookings && (
				<BookingsModal onClose={() => router.back()} />
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
						router.back()
					}}
				/>
			)}
			{router.query.showCart && (
				<CartModal
					onClose={() => {
						router.back()
					}}
				/>
			)}
			{router.query.showCheckout && (
				<CheckoutModal
					onClose={() => {
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
						router.back()
					}}
				/>
			)}
			{router.query.showNewCategory && (
				<EditCategoryModal
					onClose={() => {
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
			{router.query.editRestaurantImages && (
				<EditRestaurantImagesModal
					onClose={() => {
						router.back()
					}}
				/>
			)}
			{router.query.showGallery && (
				<GalleryModal
					onClose={() => {
						router.back()
					}}
				/>
			)}
			<RestaurantHeader />
			{/* <Formik
				innerRef={filtersFormRef}
				initialValues={{ menu: 'noon', query: '' }}
			>
				<Form
					className={classes.filters}
					style={{
						// position: 'sticky',
						top: 0,
						zIndex: 1,
						margin: '-0.75rem -1rem',
						padding: '0.75rem 1rem',
						background: '#ffffff',
					}}
				>
					{flags.menu && (
						<Select name="menu" className={classes.filter}>
							<option>Menu du midi</option>
							<option>Menu du soir</option>
							<option>Menu à l&apos;emporter</option>
						</Select>
					)}
					<Input
						name="query"
						placeholder={t('common:misc.actions.search')}
						onChange={(event) => {
							setQuery(event.target.value)
						}}
						value={query}
						autoComplete="off"
						className={classes.filter}
						prefix={
							<SearchIcon
								type="outline"
								width={18}
								height={18}
								stroke="#555"
							/>
						}
					/>
				</Form>
			</Formik> */}
			{restaurant.categories.map((category) =>
				query.length > 0 &&
				filteredItems.filter((item) => item.categoryId === category.id)
					.length == 0 ? undefined : (
					<ItemList key={category.id} category={category} />
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
					{new Date(restaurant.updatedAt).toLocaleDateString('fr-CH')}
				</p>
			</div>
			<ViewOrderButton />
		</Layout>
	)
}

export async function getStaticPaths() {
	const restaurants = await Restaurant.findAll({ attributes: ['slug'] })

	return {
		paths: restaurants.map((restaurant) => ({
			params: { restaurantSlug: restaurant.slug },
		})),
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params, locale }) {
	const { restaurantSlug } = params

	const restaurant = await Restaurant.findOne({
		where: { slug: restaurantSlug },
		include: ['address', 'images', 'categories', 'items'],
		order: [
			['images', 'id', 'ASC'],
			['categories', 'id', 'ASC'],
			['items', 'id', 'ASC'],
		],
	})

	if (!restaurant) {
		return {
			notFound: true,
		}
	}

	const flags = await Flag.findAll({ order: ['key'] })

	return {
		props: {
			restaurant: JSON.parse(JSON.stringify(restaurant)),
			flags: JSON.parse(JSON.stringify(flags)),
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
		// revalidate: 5,
	}
}
