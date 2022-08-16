import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import useSWR, { useSWRConfig } from 'swr'
import axios from 'axios'

import { useRestaurant } from 'contexts/restaurant'

import classes from './restaurant-header.module.css'
import useFavorites from 'contexts/favorites'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import flags from 'flags.json'

export default function RestaurantHeader() {
	const { restaurant } = useRestaurant()
	const { data: session, status } = useSession()
	const router = useRouter()
	const { t } = useTranslation()

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
	restaurant.allowBooking = true

	restaurant.images = [
		restaurant.image,
		'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
		'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
		'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1624&q=80',
		'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
	]

	return (
		<>
			<section>
				<div className={classes.container}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							margin: '0.5rem 0 0',
							alignItems: 'end',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								overflow: 'hidden',
							}}
						>
							<h1 className={classes.title}>{restaurant.name}</h1>
							<a
								aria-label="Restaurant's location"
								href={`https://www.google.ch/maps/place/${restaurant.address}`}
								className="text paragraph"
								style={{
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{restaurant.street} {restaurant.streetNumber},{' '}
								{restaurant.postalCode} {restaurant.city}
							</a>
						</div>
						<div style={{ display: 'flex', gap: '0.5rem' }}>
							<select
								value={router.locale}
								onChange={(event) =>
									router.push(router.asPath, undefined, {
										locale: event.target.value,
									})
								}
								style={{
									outline: 'none',
									padding: '0.75rem 0.5rem',
									minWidth: 'unset',
									width: 'fit-content',
									fontFamily: 'Gilroy',
									color: '#222',
									textAlign: 'right',
									background: 'white',
								}}
							>
								<option value="en">EN</option>
								<option value="fr">FR</option>
								<option value="de">DE</option>
							</select>
							{/* <button
									aria-label="Add to favorite"
									className="button"
								>
									Signaler
								</button> */}
							{/* <button
									aria-label="Add to favorite"
									className="button"
								>
									Partager
									{

									}
								</button> */}
							{status === 'authenticated' &&
							(session.user.id === restaurant.ownerId ||
								session.user.role === 'admin') ? (
								flags.analytics && (
									<Link href="/analytics">
										<a className="button">Analytics</a>
									</Link>
								)
							) : (
								<button
									aria-label={
										!isFavorite
											? t(
													'restaurant:actions.addToFavorites',
											  )
											: t(
													'restaurant:actions.removeFromFavorites',
											  )
									}
									className={`button ${classes.favorite} ${
										isFavorite ? classes.active : ''
									}`}
									onClick={handleFavoriteRestaurant}
								>
									{/* <svg
									xmlns="http://www.w3.org/2000/svg"
									width={24}
									height={24}
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg> */}
									{!isFavorite
										? t('restaurant:actions.addToFavorites')
										: t(
												'restaurant:actions.removeFromFavorites',
										  )}
								</button>
							)}
						</div>
					</div>
					<div className={classes.images}>
						<div style={{ flex: 4 }}>
							<Image
								className={classes.image}
								src={restaurant.images[0]}
								alt={restaurant.name}
								layout="responsive"
								objectFit="cover"
								width={400}
								height={300} // 500
								priority={true}
							/>
						</div>
						<div className={classes.first}>
							<Image
								className={classes.image}
								src={restaurant.images[1]}
								alt={restaurant.name}
								layout="responsive"
								objectFit="cover"
								width={400}
								height={295} // 500
								priority={true}
							/>
							<Image
								className={classes.image}
								src={restaurant.images[2]}
								alt={restaurant.name}
								layout="responsive"
								objectFit="cover"
								width={400}
								height={295} // 500
								priority={true}
							/>
						</div>
						<div className={classes.second}>
							<Image
								className={classes.image}
								src={restaurant.images[3]}
								alt={restaurant.name}
								layout="responsive"
								objectFit="cover"
								width={400}
								height={295} // 500
								priority={true}
							/>
							<Image
								className={classes.image}
								src={restaurant.images[4]}
								alt={restaurant.name}
								layout="responsive"
								objectFit="cover"
								width={400}
								height={295} // 500
								priority={true}
							/>
						</div>
					</div>
					<div className={classes.body}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.25rem',
							}}
						>
							{restaurant.description && (
								<p
									className={classes.description}
									style={{
										color: '#333',
									}}
								>
									{restaurant.description}
								</p>
							)}
							<div className={classes.info}>
								{/* {restaurant.address && (
										<a
											aria-label="Restaurant's location"
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
												{restaurant.street}{' '}
												{restaurant.streetNumber},{' '}
												{restaurant.postalCode}{' '}
												{restaurant.city}
											</p>
										</a>
									)} */}
								{restaurant.phone && (
									<a
										aria-label="Restaurant's phone"
										href={`tel:${restaurant.phone}`}
										className={`text ${classes.row}`}
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
								{restaurant.website && (
									<a
										aria-label="Restaurant's website"
										href={restaurant.website}
										className={`text ${classes.row}`}
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
												d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
												clipRule="evenodd"
											/>
										</svg>
										<p>
											{
												restaurant.website.match(
													/:\/\/(www[0-9]?\.)?(.[^/:]+)/i,
												)[2]
											}
										</p>
									</a>
								)}
								<button
									className={`text ${classes.row}`}
									onClick={() =>
										router.push(
											{
												pathname: router.pathname,
												query: {
													restaurantSlug:
														router.query
															.restaurantSlug,
													showOpeningHours: true,
												},
											},
											undefined,
											{ shallow: true },
										)
									}
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
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
											clipRule="evenodd"
										/>
									</svg>
									<p>
										{t('restaurant:details.openUntil')}{' '}
										23:00
									</p>
									{/* <svg
										xmlns="http://www.w3.org/2000/svg"
										width={20}
										height={20}
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg> */}
								</button>
								{flags.reviewing && (
									<button
										className={`text ${classes.row}`}
										onClick={() =>
											router.push(
												{
													pathname: router.pathname,
													query: {
														restaurantSlug:
															router.query
																.restaurantSlug,
														showReviews: true,
													},
												},
												undefined,
												{ shallow: true },
											)
										}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
										<p>
											{/* {(3 + Math.random() * 2).toFixed(1)}{' '} */}
											4.7 –{' '}
											{/* {(15 + Math.random() * 100).toFixed(
												0,
											)}{' '} */}
											33 {t('restaurant:details.reviews')}
										</p>
										{/* <svg
										xmlns="http://www.w3.org/2000/svg"
										width={20}
										height={20}
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg> */}
									</button>
								)}

								{/* <div className={classes.row}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
												clipRule="evenodd"
											/>
										</svg>
										<p>CHF 40</p>
									</div> */}
							</div>
						</div>
						<div className={classes.actions}>
							{status === 'authenticated' &&
							(session.user.id === restaurant.ownerId ||
								session.user.role === 'admin') ? (
								<>
									<Link
										href={{
											pathname:
												'/restaurants/[restaurantSlug]/edit',
											query: {
												...router.query,
											},
										}}
									>
										<a className={`button ${classes.edit}`}>
											{t('restaurant:actions.editInfos')}
										</a>
									</Link>
									{flags.booking && (
										<Link
											href={{
												pathname:
													'/restaurants/[restaurantSlug]/bookings',
												query: {
													...router.query,
												},
											}}
										>
											<a
												className={`button secondary ${classes.booking}`}
											>
												{t(
													'restaurant:actions.seeBookings',
												)}
											</a>
										</Link>
									)}
								</>
							) : (
								<>
									{flags.messaging && (
										<Link
											href={{
												pathname:
													'/messages/' +
													restaurant.id,
											}}
										>
											<a className="button">
												{t(
													'restaurant:actions.sendAMessage',
												)}
											</a>
										</Link>
									)}
									{flags.booking && (
										<button
											onClick={() =>
												router.push(
													{
														pathname:
															router.pathname,
														query: {
															restaurantSlug:
																router.query
																	.restaurantSlug,
															showBooking: true,
														},
													},
													undefined,
													{ shallow: true },
												)
											}
											className="secondary"
										>
											{t('restaurant:actions.bookATable')}
										</button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
