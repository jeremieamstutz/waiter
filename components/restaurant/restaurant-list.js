import RestaurantCard from 'components/restaurant/restaurant-card'

import classes from './restaurant-list.module.css'

export default function RestaurantList({ restaurants }) {
	return (
		<section className={classes.container}>
			<div className={classes.list}>
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
}
