import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import track from 'utils/track'

import { useFlags } from 'contexts/flags'
import { useRestaurant } from 'contexts/restaurant'
import useFavorites from 'contexts/favorites'

import translate from 'utils/translate'

import classes from './restaurant-header.module.css'
import GlobeIcon from 'components/icons/globe'
import PhoneIcon from 'components/icons/phone'
import PinIcon from 'components/icons/pin'
import ClockIcon from 'components/icons/clock'
import StarIcon from 'components/icons/star'

export default function RestaurantHeader() {
	const { flags } = useFlags()
	const { t } = useTranslation()
	const { data: session, status } = useSession()
	const router = useRouter()
	const { restaurant } = useRestaurant()
	const { data: favorites } = useFavorites()

	// console.log(restaurant)
	const { mutate } = useSWRConfig()

	const isFavorite = favorites.restaurantIds.includes(restaurant.id)

	const handleFavoriteRestaurant = async () => {
		track.event({
			event_category: 'restaurant',
			event_name: 'add_to_favorite',
			event_label: restaurant.name,
		})

		if (status === 'unauthenticated') {
			return router.push('/login')
		}

		if (!isFavorite) {
			router.push(
				{
					pathname: router.pathname,
					query: { ...router.query, showWishlists: true },
				},
				undefined,
				{ shallow: true },
			)
		}
	}

	return (
		<>
			<section>
				<div className={classes.container}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<h1 className={classes.title}>{restaurant.name}</h1>
						<div style={{ display: 'flex', gap: '0.5rem' }}>
							{status === 'authenticated' &&
								(session.user.id === restaurant.ownerId ||
									(session.user.role === 'admin' &&
										flags.analytics && (
											<Link
												href="/analytics"
												className="button"
											>
												Analytics
											</Link>
										)))}
							{flags.favorites && (
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
									className={`text ${classes.favorite} ${
										isFavorite ? classes.active : ''
									}`}
									onClick={handleFavoriteRestaurant}
								>
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
						{Array.from({ ...restaurant.images, length: 5 }).map(
							(image, index) => (
								<div
									key={index}
									className={classes.image}
									style={{
										gridRow: index === 0 ? '1 / 3' : 'auto',
										gridColumn:
											index == 0 ? '1 / 3' : 'auto',
									}}
								>
									<Image
										alt={image?.alt ?? ''}
										src={
											image?.url ??
											'/images/defaults/item.png'
										}
										width={400}
										height={300}
										sizes="640px"
										style={{
											display: 'block',
											width: '100%',
											height: 'auto',
											aspectRatio: 4 / 3,
											borderRadius: 0,
											objectFit: 'cover',
										}}
										priority={index === 0}
									/>
								</div>
							),
						)}
						{/* <button
							onClick={() =>
								router.push(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											showGallery: true,
										},
									},
									undefined,
									{ shallow: true },
								)
							}
							style={{
								position: 'absolute',
								bottom: '1rem',
								right: '1rem',
								// background: 'rgba(0, 0, 0, 0.3)',
								// color: '#fff',
								// backdropFilter: 'blur(8px)',
							}}
						>
							{t('restaurant:actions.seeAllImages')}
						</button> */}
					</div>
					<div className={classes.body}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
							}}
						>
							{restaurant.description && (
								<p className={classes.description}>
									{restaurant.description}
								</p>
							)}
							<div className={classes.info}>
								{restaurant.address && (
									<a
										target="_blank"
										rel="noreferrer noopener"
										aria-label="Restaurant's location"
										href={`https://www.google.ch/maps/place/${restaurant.address.full}`}
									>
										<PinIcon />
										<span>
											{restaurant.address.street}{' '}
											{restaurant.address.streetNumber}
										</span>
									</a>
								)}
								{restaurant.phone && (
									<a
										aria-label="Restaurant's phone"
										href={`tel:${restaurant.phone}`}
									>
										<PhoneIcon />
										<span>{restaurant.phone}</span>
									</a>
								)}
								{restaurant.website && (
									<a
										aria-label="Restaurant's website"
										href={restaurant.website}
										target="_blank"
										rel="noreferrer noopener"
									>
										<GlobeIcon />
										<span>
											{
												restaurant.website.match(
													/:\/\/(www[0-9]?\.)?(.[^/:]+)/i,
												)[2]
											}
										</span>
									</a>
								)}
								{flags.schedules && (
									<button
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
										<ClockIcon />
										<span>
											{t('restaurant:details.openUntil')}{' '}
											23:00
										</span>
									</button>
								)}
								{flags.reviews && (
									<button
										onClick={() =>
											router.push(
												{
													pathname: router.pathname,
													query: {
														restaurantSlug:
															router.query
																.restaurantSlug,
														reviews: true,
													},
												},
												undefined,
												{ shallow: true },
											)
										}
									>
										<StarIcon />
										<span>
											4.7 - 33{' '}
											{t('restaurant:details.reviews')}
										</span>
									</button>
								)}
							</div>
						</div>
						<div className={classes.actions}>
							{status === 'authenticated' &&
							(session.user.id === restaurant.ownerId ||
								session.user.role === 'admin') ? (
								<>
									<button
										onClick={() =>
											router.push(
												{
													pathname: router.pathname,
													query: {
														...router.query,
														editRestaurant: true,
													},
												},
												undefined,
												{ shallow: true },
											)
										}
									>
										{t('restaurant:actions.editInfos')}
									</button>
									{flags.bookings && (
										<button
											className="secondary"
											onClick={() =>
												router.push(
													{
														pathname:
															router.pathname,
														query: {
															...router.query,
															showBookings: true,
														},
													},
													undefined,
													{ shallow: true },
												)
											}
										>
											{t(
												'restaurant:actions.seeBookings',
											)}
										</button>
									)}
								</>
							) : (
								<>
									{flags.messages && (
										<Link
											href={{
												pathname:
													'/messages/' +
													restaurant.id,
											}}
											className="button"
										>
											{t(
												'restaurant:actions.sendAMessage',
											)}
										</Link>
									)}
									{flags.bookings && restaurant.allowBooking && (
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
