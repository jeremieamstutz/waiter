import Image from 'next/image'
import Link from 'next/link'
import { mutate } from 'swr'
import axios from 'axios'

import classes from './restaurant-card.module.css'

export default function RestaurantCard({ restaurant }) {
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
				pathname: '/[citySlug]/[restaurantSlug]',
				query: {
					citySlug: restaurant.citySlug,
					restaurantSlug: restaurant.restaurantSlug,
				},
			}}
		>
			<a>
				<div className={classes.card}>
					<div className={classes.image}>
						<Image
							src={restaurant.image}
							alt={restaurant.name}
							objectFit="cover"
							layout="responsive"
							width={176}
							height={234}
						/>
					</div>
					<h3 className={classes.title}>{restaurant.name}</h3>
					<p className={classes.description}>
						{restaurant.description}
					</p>
					<p className={classes.details}>
						<span
							className={`${classes.opening} ${
								restaurant.isOpen
									? classes.opened
									: classes.closed
							}`}
						>
							Opened until 23:00
						</span>
						·
						<span>
							{restaurant.rating.value} ({restaurant.rating.count}
							)
						</span>
					</p>
				</div>
			</a>
		</Link>
	)
}
