import Image from 'next/image'
import Link from 'next/link'
import { mutate } from 'swr'
import axios from 'axios'

import classes from './restaurant-card.module.css'

export default function RestaurantCard({ restaurant, index }) {
	restaurant.rating = {
		value: 4.9,
		count: 10,
	}
	restaurant.isOpen = true

	// mutate(
	// 	`/api/restaurants/${restaurant.id}/like`,
	// 	axios
	// 		.get(`/api/restaurants/${restaurant.id}/like`)
	// 		.then((res) => res.data),
	// )
	
	return (
		<Link
			href={{
				pathname: '/[restaurantSlug]',
				query: {
					restaurantSlug: restaurant.slug,
				},
			}}
		>
			<a className={classes.card}>
				<div className={classes.image}>
					<Image
						src={
							restaurant.image
								? restaurant.image
								: '/images/defaults/item.png'
						}
						alt={restaurant.name}
						objectFit="cover"
						layout="responsive"
						width={171}
						height={256}
						sizes="50vw"
						priority={index < 2}
					/>
				</div>
				<h3 className={classes.title}>{restaurant.name}</h3>
				{/* <p className={classes.description}>
						{restaurant.description}
					</p> */}
				<p className={classes.description}>
					{restaurant.cuisine}
					{/* · 4.9 */}
				</p>
				<p className={classes.details}>
					{/* <span
							className={`${classes.opening} ${
								restaurant.isOpen
									? classes.opened
									: classes.closed
							}`}
						>
							Opened until 23:00
						</span>
						· */}
					<span
						className={`${classes.opening} ${
							restaurant.isOpen ? classes.open : classes.close
						}`}
					>
						{/* Ouvert jusqu&apos;à 23:00 */}
						Ouvert{' '}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>{' '}
						23:30
					</span>
					{/* <span className={classes.rating}>
							{restaurant.rating.value} ({restaurant.rating.count}
							)
						</span> */}
				</p>
			</a>
		</Link>
	)
}

export function RestaurantCardSkeleton() {
	return <div></div>
}
