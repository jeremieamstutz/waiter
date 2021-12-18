import RestaurantCard from 'components/restaurant/restaurant-card'
import useScrollRestoration from 'hooks/useScrollRestauration'
import { useRouter } from 'next/router'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import slugify from 'slugify'

import classes from './restaurant-list.module.css'

export default forwardRef(function RestaurantList({ list, restaurants }, ref) {
	const router = useRouter()

	const listRef = useRef()
	const resetScroll = useScrollRestoration(
		listRef,
		`${router.asPath === '/' ? '/home' : router.asPath}/${slugify(
			list.name,
			{ lower: true, remove: /[*+~.()'"!:@]/g },
		)}`,
	)

	useImperativeHandle(ref, () => ({
		resetScroll() {
			resetScroll()
		},
	}))

	return (
		<section className={classes.container}>
			<div className={classes.header}>
				<h2 className={classes.name}>{list.name}</h2>
				{list.description && (
					<p className={classes.description}>{list.description}</p>
				)}
			</div>
			<div className={classes.list} ref={listRef}>
				{restaurants.length < 1 ? (
					<p style={{ margin: 0 }}>Aucun restaurant</p>
				) : (
					restaurants.map((restaurant, index) => (
						<RestaurantCard
							restaurant={restaurant}
							key={index}
							index={index}
						/>
					))
				)}
			</div>
		</section>
	)
})
