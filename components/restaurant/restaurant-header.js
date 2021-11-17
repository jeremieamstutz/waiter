import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import useSWR, { useSWRConfig } from 'swr'
import axios from 'axios'

import { useRestaurant } from 'contexts/restaurant'

import classes from './restaurant-header.module.css'
import useFavorites from 'contexts/favorites'

export default function RestaurantHeader() {
	const { restaurant } = useRestaurant()
	const { data: session, status } = useSession()
	const router = useRouter()

	const { mutate } = useSWRConfig()

	const { data: favorites } = useFavorites()

	const isFavorite = favorites.restaurantIds.includes(restaurant.id)

	const handleFavoriteRestaurant = async () => {
		if (status === 'unauthenticated') {
			return signIn()
		}
		if (isFavorite) {
			mutate(
				`/api/favorites`,
				{
					restaurantIds: favorites.restaurantIds.filter(
						(favorite) => favorite !== restaurant.id,
					),
				},
				false,
			)
			mutate(
				`/api/favorites`,
				axios
					.delete(`/api/favorites`, {
						data: {
							restaurantId: restaurant.id,
						},
					})
					.then((res) => res.data),
				false,
			)
		} else {
			mutate(
				`/api/favorites`,
				{ restaurantIds: [...favorites.restaurantIds, restaurant.id] },
				false,
			)
			mutate(
				`/api/favorites`,
				axios
					.post(`/api/favorites`, { restaurantId: restaurant.id })
					.then((res) => res.data),
				false,
			)
		}
	}

	return (
		<section>
			<div className={classes.container}>
				<h1 className={classes.title}>
					{restaurant.name}
					<button
						aria-label="Add to favorite"
						className={`${classes.favorite} ${
							isFavorite ? classes.active : ''
						}`}
						onClick={handleFavoriteRestaurant}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={26}
							height={26}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</button>
				</h1>
				<div className={classes.body}>
					<p className={classes.description}>
						{restaurant.description}
					</p>
					<a
						aria-label="See restaurant on map"
						href={`https://www.google.ch/maps/place/${restaurant.address}`}
						className={classes.row}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clipRule="evenodd"
							/>
						</svg>
						<p>
							{restaurant.street} {restaurant.streetNumber},{' '} {restaurant.postalCode} {restaurant.city}
						</p>
					</a>
					{restaurant.phone && (
						<a
							aria-label="Phone restaurant"
							href={`tel:${restaurant.phone}`}
							className={classes.row}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={20}
								height={20}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
							</svg>
							<p>{restaurant.phone}</p>
						</a>
					)}
					{/* <div className={classes.row}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={20}
									height={20}
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
										clipRule="evenodd"
									/>
								</svg>
								<p
									className={`${classes.opening} ${
										restaurant.isOpen
											? classes.opened
											: classes.closed
									}`}
								>
									Opened until 23:00
								</p>
								·
							<span>
								{restaurant.rating.value} (
								{restaurant.rating.count})
							</span>
							</div> */}
				</div>
				{status === 'authenticated' &&
					(session.user.id === restaurant.ownerId ||
						session.user.role === 'admin') && (
						<div className={classes.actions}>
							<Link
								href={{
									pathname: '/[restaurantSlug]/edit',
									query: {
										...router.query,
									},
								}}
							>
								<a className="button">Edit</a>
							</Link>
						</div>
						// 	restaurant.allowBooking ? (
						// 		<Link
						// 			href={{
						// 				pathname: router.pathname + '/booking',
						// 				query: router.query,
						// 			}}
						// 		>
						// 			<a
						// 				className={`${classes.booking} button secondary`}
						// 			>
						// 				Book a table
						// 			</a>
						// 		</Link>
						// 	) : null
						// ) : (
						// 	<Link
						// 		href={{
						// 			pathname: router.pathname + '/bookings',
						// 			query: router.query,
						// 		}}
						// 	>
						// 		<a
						// 			className={`${classes.booking} button secondary`}
						// 		>
						// 			Bookings
						// 		</a>
						// 	</Link>
						// )
					)}
				{/* {restaurant.allowBooking ? (
					<Link href="/lausanne/holycow/booking">
						<a className={`${classes.booking} button secondary`}>
							Book a table
						</a>
					</Link>
				) : null} */}
				{/* <Link href="/lausanne/holycow/bookings">
					<a className={`${classes.booking} button secondary`}>
						Bookings
					</a>
				</Link> */}
			</div>
		</section>
	)
}
