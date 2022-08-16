import Image from 'next/image'
import Link from 'next/link'
import { mutate } from 'swr'
import axios from 'axios'
import { useState } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import flags from 'flags.json'

import classes from './restaurant-card.module.css'
import useFavorites from 'contexts/favorites'
import { signIn, useSession } from 'next-auth/react'
import { fadeIn } from 'animations'
import { useTranslation } from 'next-i18next'

export default function RestaurantCard({ restaurant, index }) {
	restaurant.rating = {
		value: 4.9,
		count: 10,
	}
	restaurant.isOpen = true

	const { status } = useSession()
	const { data: favorites } = useFavorites()
	const { t } = useTranslation()

	const isFavorite = favorites.restaurantIds.includes(restaurant.id)

	const handleFavoriteRestaurant = async (event) => {
		event.preventDefault()

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
		>
			<a className={classes.card}>
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
						>
							<SwiperSlide>
								<Image
									src={
										restaurant.image
											? restaurant.image
											: '/images/defaults/item.png'
									}
									alt={restaurant.name}
									objectFit="cover"
									layout="responsive"
									width={400}
									height={300}
									style={{
										borderRadius: '0',
									}}
									onLoad={(event) => {
										// TODO: detect when the image is downloaded, and doesn't come from the cache
										// console.log(event.target.complete)
										// setIsLoaded(true)
									}}
								/>
							</SwiperSlide>
							<SwiperSlide>
								<Image
									src={
										'https://source.unsplash.com/random/900%C3%97700/?restaurant'
									}
									alt={restaurant.name}
									objectFit="cover"
									layout="responsive"
									width={400}
									height={300}
									sizes="50vw"
									priority={index < 2}
									style={{ borderRadius: '0' }}
								/>
							</SwiperSlide>
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
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'end',
						padding: '0.125rem 0',
					}}
				>
					<h2 className={classes.title}>{restaurant.name}</h2>
					{flags.reviewing && (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.25rem',
								fontSize: '1.125rem',
							}}
						>
							{/* {(3 + Math.random() * 2).toFixed(1)} */}
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
				<p
					className={classes.description}
					style={{ fontSize: '1.1rem' }}
				>
					{restaurant.street} {restaurant.streetNumber}
				</p>
				<p
					className={classes.details}
					style={{ justifyContent: 'start', alignItems: 'center' }}
				>
					<span
						className={classes.description}
						style={{
							flex: 'unset',
							fontSize: '1.1rem',
							marginTop: '-0.2rem',
						}}
					>
						{restaurant.cuisine}
					</span>
					·<span>CHF 20</span>·
					<span
						className={`${classes.opening} ${
							restaurant.isOpen ? classes.open : classes.close
						}`}
						style={{ fontSize: '1.1rem' }}
					>
						{t('restaurant:details.open')}{' '}
					</span>
				</p>
			</a>
		</Link>
	)
}

export function RestaurantCardSkeleton() {
	return <div></div>
}
