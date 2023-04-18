import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { mutate } from 'swr'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useFlags } from 'contexts/flags'
import useFavorites from 'contexts/favorites'

import track from 'utils/track'

import 'swiper/css'
import 'swiper/css/pagination'

import classes from './restaurant-card.module.css'

export default function RestaurantCard({ restaurant, index }) {
	restaurant.rating = {
		value: 4.9,
		count: 10,
	}
	restaurant.isOpen = true

	const router = useRouter()
	const { flags } = useFlags()
	const { t } = useTranslation()
	const { status } = useSession()
	const { data: favorites } = useFavorites()

	const isFavorite = favorites.restaurantIds.includes(restaurant.id)

	const handleFavoriteRestaurant = async (event) => {
		event.preventDefault()

		track.event({
			event_category: 'restaurant',
			event_name: 'add_to_favorite',
			event_label: restaurant.name,
		})

		if (status === 'unauthenticated') {
			return signIn()
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

	const [buttonPrev, setButtonPrev] = useState(null)
	const [buttonNext, setButtonNext] = useState(null)

	return (
		<Link
			href={{
				pathname: '/restaurants/[restaurantSlug]',
				query: {
					restaurantSlug: restaurant.slug,
				},
			}}
			className={classes.card}
		>
			<div
				className={classes.image}
				style={{
					borderRadius: '0.5rem',
					overflow: 'hidden',
					transform: 'translateZ(0)', // Crap for Safari
				}}
			>
				<div>
					<Swiper
						modules={[Navigation, Pagination]}
						loop={false}
						threshold={4}
						navigation={{
							prevEl: buttonPrev,
							nextEl: buttonNext,
							disabledClass: classes['button-disabled'],
						}}
						pagination={{ clickable: true }}
						onSlideChange={() => {
							track.event({
								event_category: 'restaurant',
								event_name: 'swipe_picture',
								event_label: restaurant.name,
							})
						}}
					>
						{restaurant?.images?.length > 0 ? (
							restaurant?.images?.map((image, idx) => (
								<SwiperSlide key={image.id}>
									<Image
										src={
											image.url ??
											'/images/defaults/item.png'
										}
										alt={image.alt ?? ''}
										width={400}
										height={300}
										style={{
											display: 'block',
											width: '100%',
											height: 'auto',
											aspectRatio: 4 / 3,
											borderRadius: 0,
											objectFit: 'cover',
										}}
										priority={index < 1 && idx < 1}
									/>
								</SwiperSlide>
							))
						) : (
							<SwiperSlide>
								<Image
									src={'/images/defaults/item.png'}
									alt=""
									width={400}
									height={300}
									sizes="640px"
									style={{
										display: 'block',
										width: '100%',
										height: 'auto',
										aspectRatio: 4 / 3,
										objectFit: 'cover',
									}}
								/>
							</SwiperSlide>
						)}
					</Swiper>
				</div>
				<div
					className={classes['button-prev']}
					style={{
						left: '1rem',
					}}
					ref={(node) => setButtonPrev(node)}
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
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div
					className={classes['button-next']}
					style={{
						right: '1rem',
					}}
					ref={(node) => setButtonNext(node)}
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
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>

				{/* {parseInt(restaurant.id.split('-')[0], 16) % 2 === 0 &&
						parseInt(restaurant.id.split('-')[0], 16) % 3 == 0 && (
							<div
								style={{
									position: 'absolute',
									top: '1rem',
									left: '1rem',
									padding: '0 0.76rem',
									height: '2.25rem',
									display: 'flex',
									alignItems: 'center',
									borderRadius: '0.5rem',
									background: '#fff',
									border: '1px solid #eee',
								}}
							>
								Sponsored
							</div>
						)} */}
				{flags.favorites && (
					<div
						style={{
							position: 'absolute',
							top: '1rem',
							right: '1rem',
							borderRadius: '0.5rem',
							width: '2.25rem',
							height: '2.25rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
						}}
						className={`${classes.favorite} ${
							isFavorite ? classes.active : ''
						}`}
						onClick={handleFavoriteRestaurant}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 24 24"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</div>
				)}
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'end',
					marginTop: '0.75rem',
				}}
			>
				<h3 className={classes.title}>{restaurant.name}</h3>
				{flags.reviews && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.25rem',
							fontSize: '1.125rem',
						}}
					>
						4.9
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={18}
							height={18}
							viewBox="0 0 20 20"
							fill="black"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					</div>
				)}
			</div>
			{/* {restaurant.description && (
				<p className={classes.description}>{restaurant.description}</p>
			)} */}
			<p
				className={classes.details}
				style={{
					justifyContent: 'start',
					alignItems: 'center',
					marginTop: '0.125rem',
				}}
			>
				{restaurant.cuisine && (
					<>
						<span>
							{t('restaurant:cuisines.' + restaurant.cuisine)}
						</span>
						·
					</>
				)}
				<span
					className={`${classes.opening} ${
						restaurant.isOpen ? classes.open : classes.close
					}`}
					style={{ fontSize: '1.1rem' }}
				>
					{t('restaurant:details.open')}{' '}
				</span>
			</p>
		</Link>
	)
}

export function RestaurantCardSkeleton() {
	return <div></div>
}
