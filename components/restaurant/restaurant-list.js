import RestaurantCard from 'components/restaurant/restaurant-card'
import useScrollRestoration from 'hooks/useScrollRestauration'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import slugify from 'slugify'

import classes from './restaurant-list.module.css'

export default function RestaurantList({ list, restaurants }) {
	const router = useRouter()
	const listRef = useRef()

	useScrollRestoration(
		listRef,
		`${router.asPath === '/' ? '/home' : router.asPath}/${slugify(
			list.name,
			{ lower: true },
		)}`,
	)

	return (
		<section className={classes.container}>
			<div className={classes.header}>
				<h2 className={classes.name}>{list.name}</h2>
				{list.description && (
					<p className={classes.description}>{list.description}</p>
				)}
			</div>
			<div className={classes.list} ref={listRef}>
				{restaurants.map((restaurant, index) => (
					<RestaurantCard restaurant={restaurant} key={index} />
				))}
			</div>
		</section>
	)
}
