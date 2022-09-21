import RestaurantCard from 'components/restaurant/restaurant-card'

import classes from './restaurant-list.module.css'

export default function RestaurantList({ restaurants }) {
	return (
		<div className={classes.list}>
			{restaurants.length < 1 ? (
				<p style={{ margin: 0 }}>Aucun restaurant</p>
			) : (
				restaurants.map((restaurant) => (
					<RestaurantCard
						restaurant={restaurant}
						key={restaurant.id}
					/>
				))
			)}
		</div>
	)
}
